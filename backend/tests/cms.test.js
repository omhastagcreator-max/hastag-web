import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import handler from '../cms.js';

test('password editor protects drafts, persists publishing, revisions, logout and credential rotation', async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'hastag-cms-test-'));
  const previous = { ...process.env };
  process.env.EDITOR_PASSWORD = 'test-only-password';
  process.env.CMS_DATA_DIR = dir;
  delete process.env.VERCEL;
  delete process.env.BLOB_READ_WRITE_TOKEN;
  const server = createServer(handler);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const request = async (action, body, cookie, origin = base) => {
    const response = await fetch(`${base}/api/cms?action=${action}`, { method: body === undefined ? 'GET' : 'POST', headers: { ...(body === undefined ? {} : { 'Content-Type': 'application/json', Origin: origin }), ...(cookie ? { Cookie: cookie } : {}) }, body: body === undefined ? undefined : JSON.stringify(body) });
    return { response, data: await response.json() };
  };
  try {
    assert.equal((await request('session')).data.authenticated, false);
    assert.equal((await request('documents')).response.status, 401);
    assert.equal((await request('save', { docs: [] })).response.status, 401);
    assert.equal((await request('login', { password: 'wrong' })).response.status, 401);
    assert.equal((await request('login', { password: 'test-only-password' }, undefined, 'https://attacker.example')).response.status, 403);
    const login = await request('login', { password: 'test-only-password' });
    const cookie = login.response.headers.get('set-cookie').split(';')[0];
    assert.match(login.response.headers.get('set-cookie'), /HttpOnly/);
    assert.match(login.response.headers.get('set-cookie'), /SameSite=Strict/);
    assert.equal((await request('session', undefined, cookie)).data.authenticated, true);
    const doc = { slug: 'home', kind: 'page', title: 'Private draft', sections: [] };
    assert.equal((await request('save', { docs: [doc] }, cookie)).response.status, 200);
    assert.deepEqual((await request('published')).data.documents, {});
    assert.equal((await request('documents', undefined, cookie)).data.drafts.home.title, 'Private draft');
    assert.equal((await request('publish', { docs: [doc] }, cookie)).response.status, 200);
    assert.equal((await request('published')).data.documents.home.title, 'Private draft');
    assert.equal((await request('revisions&slug=home', undefined, cookie)).data.length, 1);
    assert.equal((await request('revisions&slug=home')).response.status, 401);
    assert.equal((await request('publish', { docs: [{ slug: '../bad' }] }, cookie)).response.status, 400);
    assert.equal((await request('upload', { type: 'text/html', base64: 'PHNjcmlwdD4=' }, cookie)).response.status, 400);
    assert.equal((await request('delete', { slug: 'home' }, cookie)).response.status, 200);
    assert.deepEqual((await request('published')).data.documents, {});
    const logout = await request('logout', {}, cookie);
    assert.match(logout.response.headers.get('set-cookie'), /Max-Age=0/);
    process.env.EDITOR_PASSWORD = 'rotated-password';
    assert.equal((await request('documents', undefined, cookie)).response.status, 401);
    process.env.VERCEL = '1';
    assert.equal((await request('published')).response.status, 503);
    delete process.env.EDITOR_PASSWORD;
    assert.equal((await request('session')).data.enabled, false);
    assert.equal((await request('login', { password: '' })).response.status, 503);
  } finally {
    await new Promise(resolve => server.close(resolve));
    await rm(dir, { recursive: true, force: true });
    for (const key of Object.keys(process.env)) if (!(key in previous)) delete process.env[key];
    Object.assign(process.env, previous);
  }
});

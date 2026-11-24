import { createHash, createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { mkdir, readFile, readdir, rename, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

const COOKIE = 'hastag_editor';
const MAX_BODY = 4_000_000;
const fail = (status, message) => Object.assign(new Error(message), { status });
const digest = (value) => createHash('sha256').update(value).digest();
const equal = (a, b) => timingSafeEqual(digest(a), digest(b));
const attempts = new Map(); // Per-instance protection; use a host firewall for a distributed login limit.
const slugKey = (slug) => Buffer.from(slug).toString('base64url');
const empty = () => ({ drafts: {}, published: {}, updatedAt: {} });

function signature(value) {
  return createHmac('sha256', process.env.EDITOR_PASSWORD).update(value).digest('base64url');
}
function authenticated(req) {
  const token = (req.headers.cookie || '').split(';').map(s => s.trim()).find(s => s.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1);
  if (!token) return false;
  const [expiry, nonce, sig] = token.split('.');
  return Number(expiry) > Date.now() && Number(expiry) < Date.now() + 9 * 3600_000 && !!nonce && !!sig && equal(sig, signature(`${expiry}.${nonce}`));
}
function setCookie(req, res, login) {
  const value = `${Date.now() + 8 * 3600_000}.${randomUUID()}`;
  const secure = process.env.VERCEL || req.socket?.encrypted;
  res.setHeader('Set-Cookie', `${COOKIE}=${login ? `${value}.${signature(value)}` : ''}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${login ? 28800 : 0}${secure ? '; Secure' : ''}`);
}
function storageReady() {
  if (process.env.VERCEL && !process.env.BLOB_READ_WRITE_TOKEN) throw fail(503, 'Connect a private Vercel Blob store (BLOB_READ_WRITE_TOKEN) to enable saving and publishing.');
}
async function store() {
  storageReady();
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await import('@vercel/blob');
    const prefix = 'hastag-cms/';
    return {
      async get(key) {
        const result = await blob.get(prefix + key, { access: 'private', useCache: false });
        return result ? Buffer.from(await new Response(result.stream).arrayBuffer()) : null;
      },
      async put(key, bytes, contentType = 'application/json') {
        await blob.put(prefix + key, bytes, { access: 'private', addRandomSuffix: false, allowOverwrite: true, contentType });
      },
      async list(keyPrefix) {
        const keys = [];
        let cursor;
        do {
          const result = await blob.list({ prefix: prefix + keyPrefix, cursor });
          keys.push(...result.blobs.map(b => b.pathname.slice(prefix.length)));
          cursor = result.hasMore ? result.cursor : undefined;
        } while (cursor);
        return keys;
      },
      async delete(key) { await blob.del(prefix + key); },
    };
  }
  const dir = path.resolve(process.env.CMS_DATA_DIR || '.cms-data');
  const filename = key => path.join(dir, Buffer.from(key).toString('base64url'));
  return {
    async get(key) { try { return await readFile(filename(key)); } catch (e) { if (e.code === 'ENOENT') return null; throw e; } },
    async put(key, bytes) {
      await mkdir(dir, { recursive: true, mode: 0o700 });
      const target = filename(key), temp = `${target}.${randomUUID()}.tmp`;
      await writeFile(temp, bytes, { mode: 0o600 });
      await rename(temp, target);
    },
    async list(prefix) {
      try { return (await readdir(dir)).filter(f => !f.endsWith('.tmp')).map(f => Buffer.from(f, 'base64url').toString()).filter(k => k.startsWith(prefix)); }
      catch (e) { if (e.code === 'ENOENT') return []; throw e; }
    },
    async delete(key) { try { await unlink(filename(key)); } catch (e) { if (e.code !== 'ENOENT') throw e; } },
  };
}
async function jsonBody(req) {
  if (req.body !== undefined) {
    const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    if (Buffer.byteLength(raw) > MAX_BODY) throw fail(413, 'Request too large. Use a hosted URL for large videos.');
    try { return JSON.parse(raw); } catch { throw fail(400, 'Invalid JSON'); }
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY) throw fail(413, 'Request too large. Use a hosted URL for large videos.');
    chunks.push(chunk);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString() || '{}'); } catch { throw fail(400, 'Invalid JSON'); }
}
const readJson = async (s, key) => { const raw = await s.get(key); return raw ? JSON.parse(raw.toString()) : null; };
const putJson = (s, key, value) => s.put(key, JSON.stringify(value));
const validSlug = value => typeof value === 'string' && /^[a-zA-Z0-9_/-]{1,180}$/.test(value);

export default async function handler(req, res) {
  const send = (status, data) => { res.statusCode = status; res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(data)); };
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  try {
    const url = new URL(req.url, 'http://localhost');
    const action = url.searchParams.get('action') || 'session';
    const enabled = !!process.env.EDITOR_PASSWORD;
    if (action === 'session' && req.method === 'GET') return send(200, { enabled, authenticated: enabled && authenticated(req) });
    if (!enabled) return send(action === 'published' ? 200 : 503, { enabled: false, error: 'Password editor is not configured.' });
    if (!['GET', 'POST'].includes(req.method)) throw fail(405, 'Method not allowed');
    if (req.method === 'POST') {
      const origin = req.headers.origin;
      const host = req.headers.host;
      if (!origin || new URL(origin).host !== host) throw fail(403, 'Request must come from this website.');
    }
    if (action === 'login' && req.method === 'POST') {
      const ip = process.env.VERCEL ? req.headers['x-vercel-forwarded-for'] || req.socket?.remoteAddress : req.socket?.remoteAddress;
      const now = Date.now();
      if (attempts.size > 10000) for (const [key, entry] of attempts) if (entry.until <= now) attempts.delete(key);
      const entry = attempts.get(ip) || { count: 0, until: now + 15 * 60_000 };
      if (entry.until <= now) { entry.count = 0; entry.until = now + 15 * 60_000; }
      if (entry.count >= 10) throw fail(429, 'Too many attempts. Try again in 15 minutes.');
      const body = await jsonBody(req);
      entry.count++; attempts.set(ip, entry);
      if (typeof body.password !== 'string' || !equal(body.password, process.env.EDITOR_PASSWORD)) throw fail(401, 'Incorrect editor password.');
      attempts.delete(ip);
      setCookie(req, res, true);
      return send(200, { authenticated: true });
    }
    if (action === 'logout' && req.method === 'POST') { setCookie(req, res, false); return send(200, { authenticated: false }); }
    const publicRead = req.method === 'GET' && ['published', 'asset'].includes(action);
    if (!publicRead && !authenticated(req)) throw fail(401, 'Please log in to the editor again.');
    const s = await store();
    if (action === 'published' && req.method === 'GET') {
      const documents = {};
      for (const key of await s.list('published/')) { const row = await readJson(s, key); if (row) documents[row.data.slug] = row.data; }
      return send(200, { enabled: true, documents });
    }
    if (action === 'documents' && req.method === 'GET') {
      const result = empty();
      for (const status of ['drafts', 'published']) for (const key of await s.list(status + '/')) {
        const row = await readJson(s, key);
        if (row) { result[status][row.data.slug] = row.data; result.updatedAt[row.data.slug] = row.updated_at; }
      }
      return send(200, result);
    }
    if (['save', 'publish', 'delete'].includes(action) && req.method === 'POST') {
      const body = await jsonBody(req);
      if (action === 'delete') {
        if (!validSlug(body.slug)) throw fail(400, 'Invalid page');
        for (const status of ['drafts', 'published']) await s.delete(`${status}/${slugKey(body.slug)}.json`);
      } else {
        if (!Array.isArray(body.docs) || !body.docs.length || body.docs.length > 200 || body.docs.some(d => !validSlug(d?.slug) || !['page', 'group', 'theme'].includes(d.kind) || (d.kind !== 'theme' && !Array.isArray(d.sections)))) throw fail(400, 'Invalid documents');
        for (const doc of body.docs) {
          const row = { data: doc, updated_at: new Date().toISOString() };
          await putJson(s, `drafts/${slugKey(doc.slug)}.json`, row);
          if (action === 'publish') {
            await putJson(s, `revisions/${slugKey(doc.slug)}/${Date.now()}-${randomUUID()}.json`, { ...row, id: randomUUID(), slug: doc.slug, created_at: row.updated_at, created_by: 'Password editor' });
            await putJson(s, `published/${slugKey(doc.slug)}.json`, row);
          }
        }
      }
      return send(200, { ok: true });
    }
    if (action === 'revisions' && req.method === 'GET') {
      const slug = url.searchParams.get('slug');
      if (!validSlug(slug)) throw fail(400, 'Invalid page');
      const keys = (await s.list(`revisions/${slugKey(slug)}/`)).sort().reverse().slice(0, 30);
      return send(200, (await Promise.all(keys.map(k => readJson(s, k)))).filter(Boolean));
    }
    if (action === 'media' && req.method === 'GET') {
      return send(200, (await s.list('media/')).map(key => ({ name: key.slice(6), url: `/api/cms?action=asset&name=${encodeURIComponent(key.slice(6))}` })));
    }
    if (action === 'upload' && req.method === 'POST') {
      const body = await jsonBody(req);
      const types = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'video/mp4': 'mp4', 'video/webm': 'webm' };
      if (!types[body.type] || typeof body.base64 !== 'string') throw fail(400, 'Upload a JPG, PNG, WebP, GIF, MP4 or WebM.');
      const name = `${randomUUID()}.${types[body.type]}`;
      await s.put(`media/${name}`, Buffer.from(body.base64, 'base64'), body.type);
      return send(200, { url: `/api/cms?action=asset&name=${name}` });
    }
    if (action === 'asset' && req.method === 'GET') {
      const name = url.searchParams.get('name') || '';
      if (!/^[a-f0-9-]+\.(jpg|png|webp|gif|mp4|webm)$/.test(name)) throw fail(404, 'Media not found');
      const data = await s.get(`media/${name}`);
      if (!data) throw fail(404, 'Media not found');
      const ext = name.split('.').pop();
      res.setHeader('Content-Type', ({ jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif', mp4: 'video/mp4', webm: 'video/webm' })[ext]);
      res.statusCode = 200; return res.end(data);
    }
    throw fail(404, 'Unknown editor action');
  } catch (error) {
    if (!error.status) console.error('CMS request failed:', error.message);
    return send(error.status || 500, { error: error.status ? error.message : 'Editor storage is unavailable. Check the server configuration.' });
  }
}

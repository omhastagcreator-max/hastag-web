import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { CmsDoc } from "./types";
import { editorRequest, usesPasswordEditor } from "./editorAccess";

/**
 * Supabase persistence.
 * Table cms_documents(slug, status 'draft'|'published', data jsonb).
 * Visitors can only read status='published' rows (RLS); admins can read/write all.
 */

export const MEDIA_BUCKET = "cms-media";
const CACHE_KEY = "cms:published:v1";
const PUBLIC_TIMEOUT_MS = 2000;

type DocMap = Record<string, CmsDoc>;

let published: DocMap | null = null;
let loadPromise: Promise<DocMap> | null = null;
const listeners = new Set<(d: DocMap) => void>();

function readCache(): DocMap | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(d: DocMap) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(d));
  } catch {
    /* storage full or blocked – fine */
  }
}

async function fetchSupabasePublished(): Promise<DocMap> {
  const query = supabase.from("cms_documents").select("slug,data").eq("status", "published");
  const timeout = new Promise<{ data: null; error: Error }>((resolve) =>
    setTimeout(() => resolve({ data: null, error: new Error("timeout") }), PUBLIC_TIMEOUT_MS),
  );
  const { data, error } = (await Promise.race([query, timeout])) as any;
  if (error || !data) throw error || new Error("no data");
  const map: DocMap = {};
  for (const row of data) map[row.slug] = row.data;
  return map;
}

async function fetchPublished(): Promise<DocMap> {
  const [original, password] = await Promise.allSettled([
    fetchSupabasePublished(),
    editorRequest<{ enabled: boolean; documents?: DocMap }>("published", undefined, 3000),
  ]);
  const base = original.status === "fulfilled" ? original.value : readCache() || {};
  if (password.status === "fulfilled" && password.value.enabled) return { ...base, ...password.value.documents };
  if (original.status === "rejected") throw original.reason;
  return base;
}

export function loadPublished(): Promise<DocMap> {
  if (!loadPromise) {
    loadPromise = fetchPublished()
      .then((map) => {
        published = map;
        writeCache(map);
        listeners.forEach((l) => l(map));
        return map;
      })
      .catch(() => {
        // Tables not created yet / offline: fall back to cache, then to code defaults.
        published = published || readCache() || {};
        listeners.forEach((l) => l(published!));
        return published;
      });
  }
  return loadPromise;
}

/** Published documents for the public site. `ready` is false only on a first-ever visit while loading. */
export function usePublishedDocs(): { docs: DocMap; ready: boolean } {
  const [state, setState] = useState<{ docs: DocMap; ready: boolean }>(() => {
    if (published) return { docs: published, ready: true };
    const cached = readCache();
    if (cached) {
      published = cached;
      return { docs: cached, ready: true };
    }
    return { docs: {}, ready: false };
  });
  useEffect(() => {
    const l = (d: DocMap) => setState({ docs: d, ready: true });
    listeners.add(l);
    loadPublished().then(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return state;
}

// ---------------------------------------------------------------------------
// Editor API (requires a signed-in admin)
// ---------------------------------------------------------------------------

export interface EditorData {
  drafts: DocMap;
  published: DocMap;
  updatedAt: Record<string, string>;
  setupError?: string;
}

export async function loadEditorData(): Promise<EditorData> {
  if (usesPasswordEditor()) {
    try {
      const data = await editorRequest<EditorData>("documents");
      const original = await fetchSupabasePublished().catch(() => ({}));
      return { ...data, published: { ...original, ...data.published } };
    } catch (error) {
      return { drafts: {}, published: {}, updatedAt: {}, setupError: error instanceof Error ? error.message : "Storage unavailable" };
    }
  }
  const { data, error } = await supabase.from("cms_documents").select("slug,status,data,updated_at");
  if (error) {
    return { drafts: {}, published: {}, updatedAt: {}, setupError: error.message };
  }
  const drafts: DocMap = {};
  const pub: DocMap = {};
  const updatedAt: Record<string, string> = {};
  for (const row of data || []) {
    if (row.status === "draft") drafts[row.slug] = row.data;
    else pub[row.slug] = row.data;
    if (!updatedAt[row.slug] || row.updated_at > updatedAt[row.slug]) updatedAt[row.slug] = row.updated_at;
  }
  return { drafts, published: pub, updatedAt };
}

async function upsert(slug: string, status: "draft" | "published", doc: CmsDoc) {
  const { data: u } = await supabase.auth.getUser();
  const { error } = await supabase.from("cms_documents").upsert(
    { slug, status, data: doc, updated_at: new Date().toISOString(), updated_by: u.user?.email || null },
    { onConflict: "slug,status" },
  );
  if (error) throw error;
}

export async function saveDrafts(docs: CmsDoc[]) {
  if (usesPasswordEditor()) return editorRequest("save", { docs });
  for (const d of docs) await upsert(d.slug, "draft", d);
}

export async function publishDocs(docs: CmsDoc[]) {
  if (usesPasswordEditor()) {
    await editorRequest("publish", { docs });
    invalidatePublished();
    return;
  }
  const { data: u } = await supabase.auth.getUser();
  for (const d of docs) {
    await upsert(d.slug, "draft", d);
    await upsert(d.slug, "published", d);
    // keep a revision so any publish can be rolled back
    await supabase.from("cms_revisions").insert({ slug: d.slug, data: d, created_by: u.user?.email || null });
  }
  // public cache is now stale
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch {
    /* ignore */
  }
}

function invalidatePublished() {
  published = null;
  loadPromise = null;
  try { localStorage.removeItem(CACHE_KEY); } catch { /* storage blocked */ }
}

export async function deleteDocs(slug: string) {
  if (usesPasswordEditor()) {
    await editorRequest("delete", { slug });
    invalidatePublished();
    return;
  }
  const { error } = await supabase.from("cms_documents").delete().eq("slug", slug);
  if (error) throw error;
}

export async function listRevisions(slug: string) {
  if (usesPasswordEditor()) return editorRequest<{ id: string; slug: string; data: CmsDoc; created_at: string; created_by: string | null }[]>("revisions&slug=" + encodeURIComponent(slug));
  const { data, error } = await supabase
    .from("cms_revisions")
    .select("id,slug,data,created_at,created_by")
    .eq("slug", slug)
    .order("created_at", { ascending: false })
    .limit(30);
  if (error) throw error;
  return data || [];
}

export async function uploadMedia(file: File): Promise<string> {
  if (usesPasswordEditor()) {
    if (file.size > 2_900_000) throw new Error("Upload files under 2.9 MB, or paste a hosted video/image URL.");
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    return (await editorRequest<{ url: string }>("upload", { type: file.type, base64 })).url;
  }
  const ext = (file.name.split(".").pop() || "bin").toLowerCase();
  const base = file.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40) || "file";
  const name = `${Date.now()}-${base}.${ext}`;
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(name, file, { cacheControl: "31536000", upsert: false });
  if (error) throw error;
  return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(name).data.publicUrl;
}

export async function listMedia(): Promise<{ name: string; url: string; created_at?: string }[]> {
  if (usesPasswordEditor()) return editorRequest<{ name: string; url: string; created_at?: string }[]>("media");
  const { data, error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .list("", { limit: 500, sortBy: { column: "created_at", order: "desc" } });
  if (error) throw error;
  return (data || [])
    .filter((f) => f.name && !f.name.startsWith("."))
    .map((f) => ({
      name: f.name,
      created_at: (f as any).created_at,
      url: supabase.storage.from(MEDIA_BUCKET).getPublicUrl(f.name).data.publicUrl,
    }));
}

export async function submitForm(form: string, payload: Record<string, any>) {
  const { error } = await supabase.from("cms_submissions").insert({ form, data: payload, page: window.location.pathname });
  if (error) throw error;
}

export async function listSubmissions() {
  if (usesPasswordEditor()) throw new Error("Existing form submissions require the original Supabase admin account. Password access covers website content and media.");
  const { data, error } = await supabase
    .from("cms_submissions")
    .select("id,form,data,page,created_at")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) throw error;
  return data || [];
}

export async function listProducts(): Promise<{ id: string; title: string; price: number; image_url?: string; description?: string }[]> {
  const { data, error } = await supabase
    .from("products")
    .select("id,title,price,image_url,description,icon_name,created_at")
    .neq("icon_name", "InfluencerVideo")
    .order("created_at", { ascending: false });
  if (error) return [];
  return data || [];
}

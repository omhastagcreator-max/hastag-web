import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle, ChevronDown, Copy, ExternalLink, Eye, EyeOff, FileText, GripVertical, History, LayoutTemplate, Loader2, LogOut,
  Monitor, MoreHorizontal, MousePointer2, Hand, Palette, Plus, Redo2, Smartphone, Tablet, Trash2, Undo2, Upload, Inbox,
  Image as ImageIcon, ArrowUp, ArrowDown, RotateCcw, Layers, Lock,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { editorRequest, setPasswordEditor, usesPasswordEditor } from "../editorAccess";
import type { CmsDoc, Device, PageDoc, SectionInstance, ThemeDoc } from "../types";
import { FOOTER_SLUG, HEADER_SLUG, PRODUCT_SLUG, THEME_SLUG } from "../types";
import { BUILTIN_PAGES, BUILTIN_FOOTER, BUILTIN_HEADER, BUILTIN_THEME, RESERVED_SLUGS, builtinDoc, isBuiltinPage, pathToSlug, slugToPath } from "../defaults";
import { createSection, getSectionType, newId } from "../registry";
import { deleteDocs, loadEditorData, publishDocs, saveDrafts } from "../store";
import type { SelectedInfo } from "../PreviewRoot";
import { AddSectionDialog, ElementPanel, PagePanel, RevisionsDialog, SectionPanel, SubmissionsDialog, ThemePanel } from "./panels";
import { MediaLibrary, PagePathsDatalist, inputCls } from "./fields";

type DocMap = Record<string, CmsDoc>;
type GroupKey = "header" | "page" | "footer";
interface Selection {
  slug: string;
  sectionId: string;
  info?: SelectedInfo; // set when an element inside the section is selected
}

const WIP_KEY = "cms:editor:wip:v1";
const clone = <T,>(x: T): T => (typeof structuredClone === "function" ? structuredClone(x) : JSON.parse(JSON.stringify(x)));
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const DEVICE_WIDTH: Record<Device, number> = { desktop: 1280, tablet: 820, mobile: 390 };

function normalize(doc: any): CmsDoc {
  if (!doc) return doc;
  if (doc.kind === "theme") return { ...BUILTIN_THEME, ...doc, colors: doc.colors || {} };
  return {
    seo: {},
    ...doc,
    sections: (doc.sections || []).map((s: any) => ({ enabled: true, settings: {}, style: {}, advanced: {}, overrides: {}, ...s })),
  };
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9/]+/g, "-")
    .replace(/\/+/g, "/")
    .replace(/^[-/]+|[-/]+$/g, "");

// ---------------------------------------------------------------------------
// Login gate
// ---------------------------------------------------------------------------
export default function EditorGate() {
  const [session, setSession] = useState<any>(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const [passwordMode, setPasswordMode] = useState(false);
  const [accessError, setAccessError] = useState("");
  useEffect(() => {
    document.title = "Website editor";
    let active = true;
    let unsubscribe: (() => void) | undefined;
    editorRequest<{ enabled: boolean; authenticated: boolean }>("session")
      .then(async (access) => {
        if (!active) return;
        setPasswordEditor(access.enabled);
        setPasswordMode(access.enabled);
        if (access.enabled) {
          setSession(access.authenticated ? { user: { email: "Password editor" } } : null);
        } else if (window.location.pathname === "/editor") {
          setAccessError("Set EDITOR_PASSWORD on the server to enable password access.");
          setSession(null);
        } else {
          const { data: { session } } = await supabase.auth.getSession();
          if (!active) return;
          setSession(session);
          const { data } = supabase.auth.onAuthStateChange((_e, session) => { if (active) setSession(session); });
          unsubscribe = () => data.subscription.unsubscribe();
        }
      })
      .catch(() => {
        if (active) { setAccessError("Editor backend is unavailable. Start the development server or check the deployment."); setSession(null); }
      });
    return () => { active = false; unsubscribe?.(); };
  }, []);

  if (session === undefined)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-100">
        <Loader2 className="animate-spin text-slate-400" />
      </div>
    );

  if (!session)
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-100 font-sans">
        <form
          className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            setErr("");
            try {
              if (passwordMode) {
                await editorRequest("login", { password });
                setPassword("");
                setSession({ user: { email: "Password editor" } });
              } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
              }
            } catch (error) { setErr(error instanceof Error ? error.message : "Login failed"); }
            finally { setBusy(false); }
          }}
        >
          <div className="flex items-center gap-2">
            <LayoutTemplate className="text-blue-600" />
            <h1 className="text-xl font-bold text-slate-900">Website editor</h1>
          </div>
          <p className="text-sm text-slate-500">{passwordMode ? "Enter your website editor password." : "Log in with your admin account."}</p>
          {accessError && <p role="alert" className="text-sm text-red-600">{accessError}</p>}
          {!passwordMode && <input className={inputCls} type="email" autoComplete="username" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />}
          <input className={inputCls} type="password" autoComplete="current-password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {err && <p className="text-sm text-red-600">{err}</p>}
          <button disabled={busy || !!accessError} className="w-full h-10 rounded-md bg-blue-600 text-white font-semibold flex items-center justify-center gap-2">
            {busy && <Loader2 size={16} className="animate-spin" />} Log in
          </button>
          <a href="/admin" className="block text-center text-sm text-slate-500 hover:underline">
            Back to admin
          </a>
        </form>
      </div>
    );

  return <EditorMain email={session.user?.email || ""} />;
}

// ---------------------------------------------------------------------------
// Editor
// ---------------------------------------------------------------------------
function EditorMain({ email }: { email: string }) {
  const [loading, setLoading] = useState(true);
  const [setupError, setSetupError] = useState<string | undefined>();
  const [docs, setDocs] = useState<DocMap>({});
  const [saved, setSaved] = useState<DocMap>({});
  const [live, setLive] = useState<DocMap>({});
  const [slug, setSlug] = useState("home");
  const [sel, setSel] = useState<Selection | null>(null);
  const [device, setDevice] = useState<Device>("desktop");
  const [mode, setMode] = useState<"select" | "interact">("select");
  const [leftTab, setLeftTab] = useState<"sections" | "pages" | "theme">("sections");
  const [addTarget, setAddTarget] = useState<{ slug: string; index: number; group: GroupKey } | null>(null);
  const [busy, setBusy] = useState<"" | "save" | "publish">("");
  const [toast, setToast] = useState<{ msg: string; kind: "ok" | "err" } | null>(null);
  const [wip, setWip] = useState<{ at: number; docs: DocMap } | null>(null);
  const [revSlug, setRevSlug] = useState<string | null>(null);
  const [showSubs, setShowSubs] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [newPageOpen, setNewPageOpen] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const docsRef = useRef<DocMap>({});
  const hist = useRef({ past: [] as DocMap[], future: [] as DocMap[], key: "", time: 0 });
  const [, force] = useState(0);

  const notify = useCallback((msg: string, kind: "ok" | "err" = "ok") => {
    setToast({ msg, kind });
    window.setTimeout(() => setToast((t) => (t?.msg === msg ? null : t)), kind === "err" ? 7000 : 3000);
  }, []);

  // ---------- load ----------
  useEffect(() => {
    (async () => {
      const data = await loadEditorData();
      const all: DocMap = {};
      const slugs = new Set<string>([...Object.keys(BUILTIN_PAGES), HEADER_SLUG, FOOTER_SLUG, THEME_SLUG, ...Object.keys(data.drafts), ...Object.keys(data.published)]);
      const liveMap: DocMap = {};
      for (const s of slugs) {
        const d = data.drafts[s] || data.published[s] || builtinDoc(s);
        if (d) all[s] = normalize(clone(d));
        if (data.published[s]) liveMap[s] = normalize(clone(data.published[s]));
      }
      docsRef.current = all;
      setDocs(all);
      setSaved(all);
      setLive(liveMap);
      setSetupError(data.setupError);
      try {
        const raw = localStorage.getItem(WIP_KEY);
        if (raw) {
          const w = JSON.parse(raw);
          const differs = Object.entries(w.docs || {}).some(([k, v]) => !same(all[k], v));
          if (differs) setWip(w);
        }
      } catch {
        /* ignore */
      }
      setLoading(false);
    })();
  }, []);

  // ---------- history ----------
  const commit = useCallback((next: DocMap, key?: string) => {
    const h = hist.current;
    const now = Date.now();
    if (!(key && key === h.key && now - h.time < 1200)) {
      h.past.push(docsRef.current);
      if (h.past.length > 200) h.past.shift();
    }
    h.future = [];
    h.key = key || "";
    h.time = now;
    docsRef.current = next;
    setDocs(next);
  }, []);

  const undo = useCallback(() => {
    const h = hist.current;
    const prev = h.past.pop();
    if (!prev) return;
    h.future.push(docsRef.current);
    h.key = "";
    docsRef.current = prev;
    setDocs(prev);
  }, []);
  const redo = useCallback(() => {
    const h = hist.current;
    const next = h.future.pop();
    if (!next) return;
    h.past.push(docsRef.current);
    h.key = "";
    docsRef.current = next;
    setDocs(next);
  }, []);

  const updateDoc = useCallback(
    <T extends CmsDoc>(s: string, fn: (d: T) => void, key?: string) => {
      const cur = docsRef.current[s] || builtinDoc(s);
      if (!cur) return;
      const copy = clone(cur) as T;
      fn(copy);
      commit({ ...docsRef.current, [s]: copy }, key ? `${s}:${key}` : undefined);
    },
    [commit],
  );

  const updateSection = useCallback(
    (s: string, id: string, fn: (sec: SectionInstance) => void, key?: string) =>
      updateDoc<PageDoc>(
        s,
        (d) => {
          const sec = d.sections.find((x) => x.id === id);
          if (sec) fn(sec);
        },
        key ? `${id}:${key}` : undefined,
      ),
    [updateDoc],
  );

  // ---------- derived ----------
  const page = docs[slug] as PageDoc | undefined;
  const header = docs[HEADER_SLUG] as PageDoc;
  const footer = docs[FOOTER_SLUG] as PageDoc;
  const theme = docs[THEME_SLUG] as ThemeDoc;
  const dirtySlugs = useMemo(() => Object.keys(docs).filter((s) => !same(docs[s], saved[s])), [docs, saved]);
  const unpublishedSlugs = useMemo(
    () => Object.keys(docs).filter((s) => !same(docs[s], live[s] ? live[s] : normalize(clone(builtinDoc(s) as any)))),
    [docs, live],
  );
  const pageSlugs = useMemo(() => {
    const list = Object.keys(docs).filter((s) => docs[s]?.kind === "page");
    const order = Object.keys(BUILTIN_PAGES);
    return list.sort((a, b) => {
      const ia = order.indexOf(a);
      const ib = order.indexOf(b);
      if (ia >= 0 && ib >= 0) return ia - ib;
      if (ia >= 0) return -1;
      if (ib >= 0) return 1;
      return a.localeCompare(b);
    });
  }, [docs]);
  const pagePaths = useMemo(() => pageSlugs.map(slugToPath), [pageSlugs]);

  const selectedSection = useMemo(() => {
    if (!sel) return null;
    const d = docs[sel.slug] as PageDoc | undefined;
    return d?.sections?.find((s) => s.id === sel.sectionId) || null;
  }, [sel, docs]);

  // ---------- preview messaging ----------
  const previewPath = slug === PRODUCT_SLUG ? "/product/preview" : slugToPath(slug);
  const postToPreview = useCallback((msg: any) => iframeRef.current?.contentWindow?.postMessage(msg, window.location.origin), []);

  useEffect(() => {
    if (!previewReady || !page) return;
    postToPreview({
      type: "cms:render",
      path: previewPath,
      mode,
      selection: sel ? { sectionId: sel.sectionId, path: sel.info?.path || "" } : null,
      docs: { page, header, footer, theme },
    });
  }, [previewReady, page, header, footer, theme, mode, previewPath]);

  useEffect(() => {
    if (!previewReady) return;
    postToPreview({ type: "cms:select", selection: sel ? { sectionId: sel.sectionId, path: sel.info?.path || "" } : null });
  }, [sel?.sectionId, sel?.info?.path, previewReady]);

  const findSectionSlug = useCallback(
    (sectionId: string) => [slug, HEADER_SLUG, FOOTER_SLUG].find((s) => (docsRef.current[s] as PageDoc)?.sections?.some((x) => x.id === sectionId)),
    [slug],
  );

  // keep latest handlers for the message listener
  const handlers = useRef<any>({});
  handlers.current = {
    selected: (info: SelectedInfo) => {
      const s = findSectionSlug(info.sectionId);
      if (!s) return;
      setSel({ slug: s, sectionId: info.sectionId, info: info.path ? info : undefined });
      setLeftTab("sections");
    },
    inlineText: (m: any) => {
      const s = findSectionSlug(m.sectionId);
      if (!s) return;
      updateSection(s, m.sectionId, (sec) => {
        sec.overrides = { ...(sec.overrides || {}), [m.path]: { ...(sec.overrides?.[m.path] || {}), label: m.label, text: m.text, html: undefined } };
        if (sec.overrides[m.path].html === undefined) delete sec.overrides[m.path].html;
      });
      setSel((cur) => (cur && cur.sectionId === m.sectionId && cur.info?.path === m.path ? { ...cur, info: { ...cur.info!, text: m.text } } : cur));
    },
    navigate: (path: string) => {
      const target = path.startsWith("/product/") ? PRODUCT_SLUG : pathToSlug(path.split("#")[0]);
      if (docsRef.current[target]) {
        setSlug(target);
        setSel(null);
      } else {
        notify(`"${path}" isn't a page in the editor`, "err");
        setPreviewReady(false);
        setTimeout(() => setPreviewReady(true), 0);
      }
    },
  };

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== window.location.origin || e.source !== iframeRef.current?.contentWindow) return;
      const m = e.data || {};
      if (m.type === "cms:ready") setPreviewReady(true);
      else if (m.type === "cms:selected") handlers.current.selected(m.info);
      else if (m.type === "cms:inline-text") handlers.current.inlineText(m);
      else if (m.type === "cms:navigate") handlers.current.navigate(m.path);
      else if (m.type === "cms:js-error") notify(`Custom code error in ${m.label}: ${m.message}`, "err");
      else if (m.type === "cms:key") {
        if (m.action === "undo") undo();
        else if (m.action === "redo") redo();
        else if (m.action === "save") handlers.current.save?.();
        else if (m.action === "escape") setSel((s) => (s?.info ? { ...s, info: undefined } : null));
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [undo, redo, notify]);

  // ---------- save / publish / discard ----------
  const save = useCallback(async () => {
    const list = Object.keys(docsRef.current).filter((s) => !same(docsRef.current[s], saved[s]));
    if (!list.length) return notify("Everything is saved");
    if (setupError) return notify("Can't save yet – check the storage setup message.", "err");
    setBusy("save");
    try {
      await saveDrafts(list.map((s) => docsRef.current[s]));
      setSaved((prev) => ({ ...prev, ...Object.fromEntries(list.map((s) => [s, docsRef.current[s]])) }));
      notify(`Draft saved (${list.length} ${list.length === 1 ? "item" : "items"}). Not live until you publish.`);
    } catch (e: any) {
      notify(`Save failed: ${e.message || e}`, "err");
    } finally {
      setBusy("");
    }
  }, [saved, setupError, notify]);
  handlers.current.save = save;

  const publish = useCallback(async () => {
    const list = unpublishedSlugs;
    if (!list.length) return notify("Nothing new to publish");
    if (setupError) return notify("Can't publish yet – check the storage setup message.", "err");
    const names = list.map((s) => (docsRef.current[s] as any)?.title || s).join(", ");
    if (!confirm(`Publish these changes to the live website?\n\n${names}`)) return;
    setBusy("publish");
    try {
      const out = list.map((s) => docsRef.current[s]);
      await publishDocs(out);
      const map = Object.fromEntries(list.map((s) => [s, docsRef.current[s]]));
      setSaved((p) => ({ ...p, ...map }));
      setLive((p) => ({ ...p, ...map }));
      notify("Published! Your changes are live.");
    } catch (e: any) {
      notify(`Publish failed: ${e.message || e}`, "err");
    } finally {
      setBusy("");
    }
  }, [unpublishedSlugs, setupError, notify]);

  const discard = useCallback(async () => {
    const targets = [slug, HEADER_SLUG, FOOTER_SLUG, THEME_SLUG].filter((s) => unpublishedSlugs.includes(s));
    if (!targets.length) return notify("No unpublished changes on this page");
    if (!confirm("Discard all unpublished changes to this page, the header, footer and theme? (You can still undo.)")) return;
    const next = { ...docsRef.current };
    for (const s of targets) next[s] = live[s] ? clone(live[s]) : normalize(clone(builtinDoc(s) as any));
    commit(next);
    setSel(null);
    if (!setupError) {
      try {
        await saveDrafts(targets.map((s) => next[s]));
        setSaved((p) => ({ ...p, ...Object.fromEntries(targets.map((s) => [s, next[s]])) }));
      } catch {
        /* the discard still applies locally */
      }
    }
    notify("Changes discarded");
  }, [slug, unpublishedSlugs, live, commit, setupError, notify]);

  // ---------- local safety net + leave warning ----------
  useEffect(() => {
    if (loading) return;
    const t = window.setTimeout(() => {
      try {
        if (dirtySlugs.length) localStorage.setItem(WIP_KEY, JSON.stringify({ at: Date.now(), docs: Object.fromEntries(dirtySlugs.map((s) => [s, docs[s]])) }));
        else localStorage.removeItem(WIP_KEY);
      } catch {
        /* ignore */
      }
    }, 600);
    return () => window.clearTimeout(t);
  }, [docs, dirtySlugs, loading]);

  useEffect(() => {
    const fn = (e: BeforeUnloadEvent) => {
      if (dirtySlugs.length) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", fn);
    return () => window.removeEventListener("beforeunload", fn);
  }, [dirtySlugs.length]);

  // ---------- keyboard ----------
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      const t = e.target as HTMLElement;
      const typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if (mod && e.key.toLowerCase() === "s") {
        e.preventDefault();
        save();
      } else if (mod && e.key.toLowerCase() === "z" && !typing) {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      } else if (mod && e.key.toLowerCase() === "y" && !typing) {
        e.preventDefault();
        redo();
      } else if (e.key === "Escape" && !typing) {
        setSel((s) => (s?.info ? { ...s, info: undefined } : null));
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [save, undo, redo]);

  // ---------- section operations ----------
  const groupDoc = (g: GroupKey) => (g === "header" ? HEADER_SLUG : g === "footer" ? FOOTER_SLUG : slug);

  const addSection = (type: string) => {
    if (!addTarget) return;
    const sec = createSection(type);
    updateDoc<PageDoc>(addTarget.slug, (d) => {
      d.sections.splice(addTarget.index, 0, sec);
    });
    setSel({ slug: addTarget.slug, sectionId: sec.id });
    setAddTarget(null);
    setTimeout(() => postToPreview({ type: "cms:scrollTo", sectionId: sec.id }), 300);
  };

  const duplicate = (s: string, id: string) => {
    updateDoc<PageDoc>(s, (d) => {
      const i = d.sections.findIndex((x) => x.id === id);
      if (i < 0) return;
      const copy = clone(d.sections[i]);
      copy.id = newId(copy.type.slice(0, 6));
      copy.name = (copy.name || getSectionType(copy.type)?.label || copy.type) + " (copy)";
      d.sections.splice(i + 1, 0, copy);
    });
  };

  const remove = (s: string, id: string) => {
    const sec = (docsRef.current[s] as PageDoc).sections.find((x) => x.id === id);
    if (!confirm(`Delete “${sec?.name || getSectionType(sec?.type || "")?.label}”? Tip: hiding (eye icon) keeps it for later.`)) return;
    updateDoc<PageDoc>(s, (d) => {
      d.sections = d.sections.filter((x) => x.id !== id);
    });
    if (sel?.sectionId === id) setSel(null);
  };

  const move = (s: string, from: number, to: number) => {
    updateDoc<PageDoc>(s, (d) => {
      if (to < 0 || to >= d.sections.length) return;
      const [m] = d.sections.splice(from, 1);
      d.sections.splice(to, 0, m);
    });
  };

  const copyToPage = (fromSlug: string, id: string, toSlug: string) => {
    const sec = (docsRef.current[fromSlug] as PageDoc).sections.find((x) => x.id === id);
    if (!sec) return;
    const copy = clone(sec);
    copy.id = newId(copy.type.slice(0, 6));
    updateDoc<PageDoc>(toSlug, (d) => {
      d.sections.push(copy);
    });
    notify(`Copied to ${(docsRef.current[toSlug] as PageDoc).title}`);
  };

  // ---------- pages ----------
  const createPage = (title: string, rawSlug: string, template: string, hideChrome: boolean) => {
    const s = slugify(rawSlug || title);
    if (!s) return notify("Please enter a URL", "err");
    if (docsRef.current[s] || RESERVED_SLUGS.includes(s.split("/")[0]) || s.startsWith("__")) return notify("That URL is already used or reserved", "err");
    let sections: SectionInstance[] = [];
    if (template === "landing") {
      sections = [
        createSection("hero-banner", { settings: { ...getSectionType("hero-banner")!.defaults, heading: title } }),
        createSection("logo-strip"),
        createSection("features"),
        createSection("testimonials"),
        createSection("lead-form", { settings: { formId: "audit-form", location: `lp_${s}` } }),
        createSection("accordion"),
        createSection("cta-banner"),
      ];
    } else if (template.startsWith("copy:")) {
      const src = docsRef.current[template.slice(5)] as PageDoc;
      sections = clone(src.sections).map((x) => ({ ...x, id: newId(x.type.slice(0, 6)) }));
    } else {
      sections = [createSection("rich-text", { settings: { ...getSectionType("rich-text")!.defaults, heading: title } })];
    }
    const doc: PageDoc = { kind: "page", slug: s, title, seo: { title }, sections, hideHeader: hideChrome, hideFooter: hideChrome };
    commit({ ...docsRef.current, [s]: doc });
    setSlug(s);
    setSel(null);
    setLeftTab("sections");
    setNewPageOpen(false);
    notify(`Page created at /${s} – publish to make it live`);
  };

  const deletePage = async (s: string) => {
    const builtin = isBuiltinPage(s);
    const msg = builtin
      ? `Reset “${(docs[s] as PageDoc).title}” to the original design? This removes your saved and published changes for this page.`
      : `Delete the page /${s}? It will disappear from the live site immediately.`;
    if (!confirm(msg)) return;
    try {
      if (!setupError) await deleteDocs(s);
      const next = { ...docsRef.current };
      if (builtin) next[s] = normalize(clone(BUILTIN_PAGES[s]));
      else delete next[s];
      commit(next);
      setSaved((p) => {
        const n = { ...p };
        if (builtin) n[s] = next[s];
        else delete n[s];
        return n;
      });
      setLive((p) => {
        const n = { ...p };
        delete n[s];
        return n;
      });
      if (!builtin && slug === s) setSlug("home");
      setSel(null);
      notify(builtin ? "Page reset to original" : "Page deleted");
    } catch (e: any) {
      notify(`Failed: ${e.message}`, "err");
    }
  };

  // ---------- canvas sizing ----------
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState({ w: 1000, h: 700 });
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setCanvas({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, [loading]);
  const frameW = DEVICE_WIDTH[device];
  const avail = canvas.w - (device === "desktop" ? 0 : 48);
  const scale = Math.min(1, avail / frameW);
  const frameH = (canvas.h - (device === "desktop" ? 0 : 32)) / scale;

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-100 gap-2 text-slate-500 font-sans">
        <Loader2 className="animate-spin" /> Loading editor…
      </div>
    );

  const groups: { key: GroupKey; doc: PageDoc; title: string; hidden?: boolean }[] = [
    { key: "header", doc: header, title: "Header", hidden: page?.hideHeader },
    { key: "page", doc: page!, title: slug === PRODUCT_SLUG ? "Product template" : "Template" },
    { key: "footer", doc: footer, title: "Footer", hidden: page?.hideFooter },
  ];

  const canUndo = hist.current.past.length > 0;
  const canRedo = hist.current.future.length > 0;
  const pageUnpublished = unpublishedSlugs.length;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-slate-100 font-sans text-slate-900">
      <PagePathsDatalist paths={pagePaths} />

      {/* ================= TOP BAR ================= */}
      <header className="h-[52px] shrink-0 bg-white border-b border-slate-200 flex items-center gap-2 px-3">
        <a href="/admin" title="Back to admin" className="flex items-center gap-2 pr-3 mr-1 border-r border-slate-200">
          <LayoutTemplate size={20} className="text-blue-600" />
          <span className="font-bold text-[14px] hidden xl:inline">Site editor</span>
        </a>
        <div className="relative">
          <select
            className="h-9 pl-3 pr-8 rounded-md border border-slate-300 bg-white text-[13px] font-semibold appearance-none max-w-[220px]"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSel(null);
            }}
          >
            <optgroup label="Pages">
              {pageSlugs.map((s) => (
                <option key={s} value={s}>
                  {(docs[s] as PageDoc).title} ({slugToPath(s)})
                </option>
              ))}
            </optgroup>
            <optgroup label="Templates">
              <option value={PRODUCT_SLUG}>Product page template</option>
            </optgroup>
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500" />
        </div>
        <button onClick={() => setNewPageOpen(true)} className="h-9 px-2.5 rounded-md border border-slate-300 text-[13px] font-semibold flex items-center gap-1 hover:bg-slate-50" title="New page">
          <Plus size={15} /> <span className="hidden lg:inline">Page</span>
        </button>

        <div className="mx-auto flex items-center gap-2">
          <div className="flex rounded-md bg-slate-100 p-0.5">
            {([
              ["desktop", Monitor],
              ["tablet", Tablet],
              ["mobile", Smartphone],
            ] as const).map(([d, I]) => (
              <button key={d} title={d} onClick={() => setDevice(d)} className={`w-9 h-8 rounded flex items-center justify-center ${device === d ? "bg-white shadow text-blue-700" : "text-slate-500"}`}>
                <I size={16} />
              </button>
            ))}
          </div>
          <div className="flex rounded-md bg-slate-100 p-0.5">
            <button title="Select mode: click elements to edit them" onClick={() => setMode("select")} className={`h-8 px-2.5 rounded flex items-center gap-1 text-[12px] font-semibold ${mode === "select" ? "bg-white shadow text-blue-700" : "text-slate-500"}`}>
              <MousePointer2 size={14} /> Edit
            </button>
            <button title="Interact mode: click buttons, open menus and accordions like a visitor" onClick={() => setMode("interact")} className={`h-8 px-2.5 rounded flex items-center gap-1 text-[12px] font-semibold ${mode === "interact" ? "bg-white shadow text-blue-700" : "text-slate-500"}`}>
              <Hand size={14} /> Interact
            </button>
          </div>
          <div className="flex">
            <button title="Undo (Ctrl/Cmd+Z)" disabled={!canUndo} onClick={undo} className="w-9 h-9 rounded-md flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30">
              <Undo2 size={17} />
            </button>
            <button title="Redo (Ctrl/Cmd+Shift+Z)" disabled={!canRedo} onClick={redo} className="w-9 h-9 rounded-md flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30">
              <Redo2 size={17} />
            </button>
          </div>
        </div>

        <span className="text-[12px] text-slate-500 hidden lg:inline mr-1">
          {dirtySlugs.length ? <span className="text-amber-600 font-semibold">● Unsaved changes</span> : pageUnpublished ? "Saved · not published" : "All changes live"}
        </span>
        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="w-9 h-9 rounded-md flex items-center justify-center text-slate-600 hover:bg-slate-100">
            <MoreHorizontal size={18} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-11 w-60 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-50 text-[13px]" onMouseLeave={() => setMenuOpen(false)}>
              <MenuItem icon={ExternalLink} onClick={() => window.open(slug === PRODUCT_SLUG ? "/" : slugToPath(slug), "_blank")}>View live page</MenuItem>
              <MenuItem icon={History} onClick={() => setRevSlug(slug)}>Version history (this page)</MenuItem>
              <MenuItem icon={ImageIcon} onClick={() => setShowMedia(true)}>Media library</MenuItem>
              <MenuItem icon={Inbox} onClick={() => setShowSubs(true)}>Form submissions</MenuItem>
              <MenuItem icon={RotateCcw} onClick={discard}>Discard unpublished changes</MenuItem>
              <div className="my-1 border-t" />
              <div className="px-3 py-1 text-[11px] text-slate-400 truncate">{email}</div>
              <MenuItem
                icon={LogOut}
                onClick={async () => {
                  if (usesPasswordEditor()) {
                    await editorRequest("logout", {});
                    window.location.assign("/editor");
                  } else await supabase.auth.signOut();
                }}
              >
                Log out
              </MenuItem>
            </div>
          )}
        </div>
        <button onClick={save} disabled={!!busy} className="h-9 px-3 rounded-md border border-slate-300 text-[13px] font-semibold hover:bg-slate-50 flex items-center gap-1.5 disabled:opacity-60">
          {busy === "save" && <Loader2 size={14} className="animate-spin" />} Save
        </button>
        <button onClick={publish} disabled={!!busy} className="h-9 px-3.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold flex items-center gap-1.5 disabled:opacity-60">
          {busy === "publish" ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />} Publish
          {pageUnpublished > 0 && <span className="ml-0.5 text-[10px] bg-white/25 rounded-full px-1.5">{pageUnpublished}</span>}
        </button>
      </header>

      {setupError && (
        <div className="shrink-0 bg-amber-50 border-b border-amber-200 text-amber-900 text-[12px] px-4 py-2 flex items-center gap-2">
          <AlertTriangle size={14} />
          <span>
            <b>Editor storage needs setup</b> ({setupError}). {usesPasswordEditor() ? "Connect a private Vercel Blob store, then redeploy." : "Run supabase/cms.sql in the Supabase SQL editor and add your email."} Until then, saving and publishing are unavailable. Your work is kept in this browser.
          </span>
        </div>
      )}
      {wip && (
        <div className="shrink-0 bg-blue-50 border-b border-blue-200 text-blue-900 text-[12px] px-4 py-2 flex items-center gap-3">
          <span>You have unsaved edits from {new Date(wip.at).toLocaleString()} in this browser.</span>
          <button
            className="font-semibold underline"
            onClick={() => {
              commit({ ...docsRef.current, ...Object.fromEntries(Object.entries(wip.docs).map(([k, v]) => [k, normalize(v)])) });
              setWip(null);
            }}
          >
            Restore them
          </button>
          <button
            className="text-blue-700/70 underline"
            onClick={() => {
              setWip(null);
              localStorage.removeItem(WIP_KEY);
            }}
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="flex-1 flex min-h-0">
        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="w-[290px] shrink-0 bg-white border-r border-slate-200 flex flex-col min-h-0">
          <div className="flex border-b border-slate-200">
            {([
              ["sections", Layers, "Sections"],
              ["pages", FileText, "Pages"],
              ["theme", Palette, "Theme"],
            ] as const).map(([k, I, l]) => (
              <button key={k} onClick={() => setLeftTab(k)} className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 text-[12px] font-semibold border-b-2 -mb-px ${leftTab === k ? "border-blue-600 text-blue-700" : "border-transparent text-slate-500"}`}>
                <I size={14} /> {l}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-auto">
            {leftTab === "sections" &&
              groups.map((g) => (
                <SectionGroup
                  key={g.key}
                  title={g.title}
                  muted={g.hidden}
                  doc={g.doc}
                  group={g.key}
                  selectedId={sel?.sectionId}
                  pages={pageSlugs.filter((p) => p !== slug).map((p) => ({ slug: p, title: (docs[p] as PageDoc).title }))}
                  onSelect={(id) => {
                    setSel({ slug: g.doc.slug, sectionId: id });
                    postToPreview({ type: "cms:scrollTo", sectionId: id });
                  }}
                  onToggle={(id) => updateSection(g.doc.slug, id, (s) => (s.enabled = !s.enabled))}
                  onAdd={(index) => setAddTarget({ slug: g.doc.slug, index, group: g.key })}
                  onMove={(from, to) => move(g.doc.slug, from, to)}
                  onDuplicate={(id) => duplicate(g.doc.slug, id)}
                  onDelete={(id) => remove(g.doc.slug, id)}
                  onCopyTo={(id, to) => copyToPage(g.doc.slug, id, to)}
                />
              ))}
            {leftTab === "pages" && (
              <PagesList
                docs={docs}
                pageSlugs={pageSlugs}
                current={slug}
                unpublished={unpublishedSlugs}
                live={live}
                onOpen={(s) => {
                  setSlug(s);
                  setSel(null);
                  setLeftTab("sections");
                }}
                onNew={() => setNewPageOpen(true)}
                onDelete={deletePage}
                onHistory={setRevSlug}
                onDuplicate={(s) => createPage(`${(docs[s] as PageDoc).title} copy`, `${s.replace(/\//g, "-")}-copy`, `copy:${s}`, !!(docs[s] as PageDoc).hideHeader)}
              />
            )}
            {leftTab === "theme" && theme && <ThemePanel theme={theme} update={(fn, key) => updateDoc<ThemeDoc>(THEME_SLUG, fn, key)} />}
          </div>
        </aside>

        {/* ================= PREVIEW ================= */}
        <main ref={canvasRef} className="flex-1 min-w-0 relative overflow-hidden flex justify-center" style={{ paddingTop: device === "desktop" ? 0 : 16 }}>
          <div
            style={{
              width: frameW,
              height: frameH,
              transform: `scale(${scale})`,
              transformOrigin: "top center",
              flexShrink: 0,
            }}
            className={device === "desktop" ? "bg-white" : "bg-white shadow-2xl rounded-[18px] overflow-hidden ring-1 ring-slate-300"}
          >
            <iframe ref={iframeRef} title="Preview" src="/__cms/preview" className="w-full h-full border-0 bg-white" />
          </div>
          {!previewReady && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Loader2 className="animate-spin text-slate-400" />
            </div>
          )}
        </main>

        {/* ================= RIGHT PANEL ================= */}
        <aside className="w-[340px] shrink-0 bg-white border-l border-slate-200 min-h-0">
          {sel && selectedSection && sel.info ? (
            <ElementPanel
              key={`${sel.sectionId}:${sel.info.path}`}
              section={selectedSection}
              info={sel.info}
              update={(fn, key) => updateSection(sel.slug, sel.sectionId, fn, key)}
              device={device}
              setDevice={setDevice}
              onBackToSection={() => setSel({ slug: sel.slug, sectionId: sel.sectionId })}
              onSelectPath={(p) => postToPreview({ type: "cms:select", selection: { sectionId: sel.sectionId, path: p }, requestInfo: true })}
            />
          ) : sel && selectedSection ? (
            <SectionPanel
              key={sel.sectionId}
              section={selectedSection}
              update={(fn, key) => updateSection(sel.slug, sel.sectionId, fn, key)}
              device={device}
              setDevice={setDevice}
              pages={pagePaths}
              onSelectElement={(p) => postToPreview({ type: "cms:select", selection: { sectionId: sel.sectionId, path: p }, requestInfo: true })}
              onClose={() => setSel(null)}
            />
          ) : page ? (
            <PagePanel key={slug} doc={page} builtin={isBuiltinPage(slug)} update={(fn, key) => updateDoc<PageDoc>(slug, fn, key)} />
          ) : null}
        </aside>
      </div>

      {/* ================= DIALOGS ================= */}
      <AddSectionDialog open={!!addTarget} group={addTarget?.group || "page"} onClose={() => setAddTarget(null)} onAdd={addSection} />
      <RevisionsDialog
        slug={revSlug}
        onClose={() => setRevSlug(null)}
        onRestore={(data) => {
          updateDoc(revSlug!, (d: any) => Object.assign(d, normalize(data)));
          setRevSlug(null);
          notify("Version loaded – publish to make it live");
        }}
      />
      <SubmissionsDialog open={showSubs} onClose={() => setShowSubs(false)} />
      <MediaLibrary
        open={showMedia}
        accept="any"
        onClose={() => setShowMedia(false)}
        onPick={(u) => {
          navigator.clipboard?.writeText(u);
          notify("URL copied to clipboard");
        }}
      />
      {newPageOpen && <NewPageDialog pages={pageSlugs.map((s) => ({ slug: s, title: (docs[s] as PageDoc).title }))} onClose={() => setNewPageOpen(false)} onCreate={createPage} />}

      {toast && (
        <div className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-[2000] px-4 py-2.5 rounded-lg shadow-xl text-[13px] font-medium max-w-[90vw] ${toast.kind === "err" ? "bg-red-600 text-white" : "bg-slate-900 text-white"}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

function MenuItem({ icon: I, children, onClick }: { icon: any; children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-2 px-3 py-2 text-left text-slate-700 hover:bg-slate-50">
      <I size={15} className="text-slate-500" /> {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Sidebar: one group of sections (header / page / footer)
// ---------------------------------------------------------------------------
function SectionGroup({
  title, doc, group, muted, selectedId, pages, onSelect, onToggle, onAdd, onMove, onDuplicate, onDelete, onCopyTo,
}: {
  title: string;
  doc: PageDoc;
  group: GroupKey;
  muted?: boolean;
  selectedId?: string;
  pages: { slug: string; title: string }[];
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
  onAdd: (index: number) => void;
  onMove: (from: number, to: number) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onCopyTo: (id: string, slug: string) => void;
}) {
  const [drag, setDrag] = useState<number | null>(null);
  const [over, setOver] = useState<number | null>(null);
  const [menu, setMenu] = useState<string | null>(null);
  if (!doc) return null;
  return (
    <div className={`py-2 border-b border-slate-200 ${muted ? "opacity-50" : ""}`}>
      <div className="px-3 py-1 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{title}</span>
        {muted && <span className="text-[10px] text-slate-400">hidden on this page</span>}
      </div>
      {doc.sections.map((s, i) => {
        const def = getSectionType(s.type);
        const label = s.name || def?.label || s.type;
        const hiddenDevices = Object.entries(s.advanced?.hideOn || {}).filter(([, v]) => v).map(([k]) => k);
        const conditional = s.advanced?.scheduleStart || s.advanced?.scheduleEnd || s.advanced?.urlParamKey;
        return (
          <div key={s.id}>
            <div
              draggable
              onDragStart={(e) => {
                setDrag(i);
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("text/plain", s.id);
              }}
              onDragEnd={() => {
                setDrag(null);
                setOver(null);
              }}
              onDragOver={(e) => {
                if (drag === null) return;
                e.preventDefault();
                setOver(i);
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (drag !== null && drag !== i) onMove(drag, i);
                setDrag(null);
                setOver(null);
              }}
              onClick={() => onSelect(s.id)}
              className={`group relative mx-1.5 flex items-center gap-1 pl-1 pr-1 h-9 rounded-md text-[13px] cursor-pointer select-none
                ${selectedId === s.id ? "bg-blue-50 text-blue-800 ring-1 ring-blue-200" : "hover:bg-slate-100 text-slate-700"}
                ${drag === i ? "opacity-40" : ""}
                ${over === i && drag !== null && drag !== i ? (drag < i ? "shadow-[0_2px_0_0_#2563eb]" : "shadow-[0_-2px_0_0_#2563eb]") : ""}`}
            >
              <GripVertical size={14} className="text-slate-300 group-hover:text-slate-500 cursor-grab shrink-0" />
              <span className={`flex-1 truncate ${s.enabled ? "" : "line-through text-slate-400"}`}>{label}</span>
              {def?.legacy && <Lock size={11} className="text-slate-300 shrink-0" aria-label="Existing section – edit by clicking in the preview" />}
              {hiddenDevices.length > 0 && <span className="text-[9px] text-slate-400 uppercase shrink-0" title={`Hidden on ${hiddenDevices.join(", ")}`}>{hiddenDevices.map((d) => d[0]).join("")}✕</span>}
              {conditional && <span className="text-[9px] bg-amber-100 text-amber-700 rounded px-1 shrink-0" title="Has visibility conditions">IF</span>}
              <button
                title={s.enabled ? "Hide" : "Show"}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(s.id);
                }}
                className={`p-1 rounded hover:bg-white shrink-0 ${s.enabled ? "opacity-0 group-hover:opacity-100 text-slate-500" : "text-slate-400"}`}
              >
                {s.enabled ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
              <button
                title="More"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenu(menu === s.id ? null : s.id);
                }}
                className="p-1 rounded hover:bg-white opacity-0 group-hover:opacity-100 text-slate-500 shrink-0"
              >
                <MoreHorizontal size={14} />
              </button>
              {menu === s.id && (
                <div className="absolute right-0 top-9 w-52 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-40 text-[13px]" onClick={(e) => e.stopPropagation()} onMouseLeave={() => setMenu(null)}>
                  <MenuItem icon={Copy} onClick={() => { onDuplicate(s.id); setMenu(null); }}>Duplicate</MenuItem>
                  <MenuItem icon={ArrowUp} onClick={() => { onMove(i, i - 1); setMenu(null); }}>Move up</MenuItem>
                  <MenuItem icon={ArrowDown} onClick={() => { onMove(i, i + 1); setMenu(null); }}>Move down</MenuItem>
                  <MenuItem icon={Plus} onClick={() => { onAdd(i + 1); setMenu(null); }}>Add section below</MenuItem>
                  {group === "page" && pages.length > 0 && (
                    <details className="px-3 py-1.5">
                      <summary className="text-slate-700 cursor-pointer">Copy to page…</summary>
                      <div className="max-h-40 overflow-auto mt-1">
                        {pages.map((p) => (
                          <button key={p.slug} className="block w-full text-left text-[12px] px-2 py-1 rounded hover:bg-slate-100" onClick={() => { onCopyTo(s.id, p.slug); setMenu(null); }}>
                            {p.title}
                          </button>
                        ))}
                      </div>
                    </details>
                  )}
                  <div className="my-1 border-t" />
                  <button onClick={() => { onDelete(s.id); setMenu(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-left text-red-600 hover:bg-red-50">
                    <Trash2 size={15} /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
      <button onClick={() => onAdd(doc.sections.length)} className="mx-1.5 mt-1 w-[calc(100%-12px)] h-8 flex items-center gap-1.5 px-2 rounded-md text-[13px] font-semibold text-blue-600 hover:bg-blue-50">
        <Plus size={15} /> Add section
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pages tab
// ---------------------------------------------------------------------------
function PagesList({
  docs, pageSlugs, current, unpublished, live, onOpen, onNew, onDelete, onHistory, onDuplicate,
}: {
  docs: DocMap;
  pageSlugs: string[];
  current: string;
  unpublished: string[];
  live: DocMap;
  onOpen: (s: string) => void;
  onNew: () => void;
  onDelete: (s: string) => void;
  onHistory: (s: string) => void;
  onDuplicate: (s: string) => void;
}) {
  const row = (s: string, title: string, path: string, builtin: boolean) => {
    const status = !builtin && !live[s] ? "Not published" : unpublished.includes(s) ? "Unpublished changes" : builtin && !live[s] ? "Original" : "Live";
    return (
      <div key={s} className={`group mx-1.5 px-2 py-2 rounded-md flex items-center gap-2 ${current === s ? "bg-blue-50" : "hover:bg-slate-50"}`}>
        <button className="flex-1 min-w-0 text-left" onClick={() => onOpen(s)}>
          <div className="text-[13px] font-semibold text-slate-800 truncate">{title}</div>
          <div className="text-[11px] text-slate-500 truncate">
            {path} · <span className={status === "Live" || status === "Original" ? "text-green-600" : "text-amber-600"}>{status}</span>
          </div>
        </button>
        <div className="flex opacity-0 group-hover:opacity-100">
          <button title="Version history" onClick={() => onHistory(s)} className="p-1 text-slate-400 hover:text-slate-800">
            <History size={14} />
          </button>
          {s !== PRODUCT_SLUG && (
            <button title="Duplicate page" onClick={() => onDuplicate(s)} className="p-1 text-slate-400 hover:text-slate-800">
              <Copy size={14} />
            </button>
          )}
          <button title={builtin ? "Reset to original" : "Delete page"} onClick={() => onDelete(s)} className="p-1 text-slate-400 hover:text-red-600">
            {builtin ? <RotateCcw size={14} /> : <Trash2 size={14} />}
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className="py-2">
      <div className="px-3 pb-2">
        <button onClick={onNew} className="w-full h-9 rounded-md bg-blue-600 text-white text-[13px] font-semibold flex items-center justify-center gap-1.5">
          <Plus size={15} /> New page
        </button>
      </div>
      <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">Pages</div>
      {pageSlugs.map((s) => row(s, (docs[s] as PageDoc).title, slugToPath(s), isBuiltinPage(s)))}
      <div className="px-3 pt-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">Templates</div>
      {row(PRODUCT_SLUG, "Product page", "/product/…", true)}
    </div>
  );
}

function NewPageDialog({ pages, onClose, onCreate }: { pages: { slug: string; title: string }[]; onClose: () => void; onCreate: (title: string, slug: string, template: string, hideChrome: boolean) => void }) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [touched, setTouched] = useState(false);
  const [template, setTemplate] = useState("landing");
  const [hide, setHide] = useState(false);
  return (
    <div className="fixed inset-0 z-[1000] bg-black/40 flex items-center justify-center p-4" onMouseDown={onClose}>
      <form
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-5 space-y-3"
        onMouseDown={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          onCreate(title.trim() || "New page", slug || slugify(title), template, hide);
        }}
      >
        <h3 className="font-semibold text-slate-900">New page</h3>
        <div>
          <label className="block text-[12px] font-semibold text-slate-600 mb-1">Page name</label>
          <input
            autoFocus
            className={inputCls}
            value={title}
            placeholder="e.g. Diwali Sale"
            onChange={(e) => {
              setTitle(e.target.value);
              if (!touched) setSlug(slugify(e.target.value));
            }}
          />
        </div>
        <div>
          <label className="block text-[12px] font-semibold text-slate-600 mb-1">URL</label>
          <div className="flex items-center">
            <span className="h-9 px-2 flex items-center bg-slate-100 border border-r-0 border-slate-300 rounded-l-md text-[13px] text-slate-500">/</span>
            <input
              className={`${inputCls} rounded-l-none`}
              value={slug}
              placeholder="diwali-sale"
              onChange={(e) => {
                setTouched(true);
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9/-]/g, "-"));
              }}
            />
          </div>
        </div>
        <div>
          <label className="block text-[12px] font-semibold text-slate-600 mb-1">Start from</label>
          <select className={inputCls} value={template} onChange={(e) => setTemplate(e.target.value)}>
            <option value="landing">Landing page template (hero, logos, features, reviews, form, FAQ, CTA)</option>
            <option value="blank">Blank page</option>
            <optgroup label="Copy of an existing page">
              {pages.map((p) => (
                <option key={p.slug} value={`copy:${p.slug}`}>
                  {p.title}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
        <label className="flex items-center gap-2 text-[13px] text-slate-700">
          <input type="checkbox" checked={hide} onChange={(e) => setHide(e.target.checked)} /> Hide header & footer (focused ad landing page)
        </label>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="h-9 px-3 rounded-md border border-slate-300 text-[13px] font-semibold">
            Cancel
          </button>
          <button className="h-9 px-4 rounded-md bg-blue-600 text-white text-[13px] font-semibold">Create page</button>
        </div>
      </form>
    </div>
  );
}

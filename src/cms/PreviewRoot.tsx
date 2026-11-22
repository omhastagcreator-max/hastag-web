import { useCallback, useEffect, useRef, useState } from "react";
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BookingProvider } from "@/components/BookingProvider";
import BookingModal from "@/components/BookingModal";
import { CmsPageView } from "./CmsPage";
import { PreviewContext } from "./ChromeContext";
import { describeElement, elementPath, isLeafElement, resolvePath } from "./overrides";
import type { PageDoc, ThemeDoc } from "./types";

/**
 * Runs INSIDE the editor's iframe. Renders the draft documents the editor sends,
 * and lets you hover / click / double-click elements to select and edit them.
 */

export interface SelectedInfo {
  sectionId: string;
  path: string; // "" = the whole section
  label: string;
  tag: string;
  isLeaf: boolean;
  text: string;
  html: string;
  src: string;
  alt: string;
  href: string;
  target: string;
  isMedia: boolean;
  isLink: boolean;
  crumbs: { path: string; label: string }[];
}

type Docs = { page?: PageDoc; header?: PageDoc; footer?: PageDoc; theme?: ThemeDoc };

/** Reuse unchanged objects from the previous render so untouched sections don't re-render. */
function share<T>(prev: any, next: T): T {
  if (prev === next) return prev;
  if (typeof prev !== "object" || typeof next !== "object" || !prev || !next) return next;
  if (Array.isArray(prev) !== Array.isArray(next)) return next;
  let allSame = true;
  const out: any = Array.isArray(next) ? [] : {};
  const keys = Object.keys(next as any);
  if (!Array.isArray(next) && Object.keys(prev).length !== keys.length) allSame = false;
  if (Array.isArray(next) && prev.length !== (next as any).length) allSame = false;
  for (const k of keys) {
    const pv = Array.isArray(next) ? prev.find?.((x: any) => x?.id && x.id === (next as any)[k]?.id) ?? prev[k] : prev[k];
    out[k] = share(pv, (next as any)[k]);
    if (out[k] !== prev[k]) allSame = false;
  }
  return allSame ? prev : out;
}

const post = (msg: any) => window.parent?.postMessage(msg, window.location.origin);

function sectionParts(target: Element | null) {
  if (!target) return null;
  let el: Element | null = target;
  // SVG internals → whole icon
  if (el instanceof SVGElement && el.tagName.toLowerCase() !== "svg") el = el.closest("svg");
  const sec = el?.closest("[data-cms-section]");
  if (!el || !sec) return null;
  const content = sec.querySelector(":scope > [data-cms-content]");
  const sectionId = sec.getAttribute("data-cms-section")!;
  if (!content || !content.contains(el) || el === content) return { sec, content, el: sec, sectionId, path: "" };
  // replacement clones (rich HTML overrides) map back to the original element
  if (el.closest("[data-cms-replacement]")) {
    const rep = el.closest("[data-cms-replacement]")!;
    el = rep.previousElementSibling || rep;
  }
  const path = elementPath(content, el) || "";
  return { sec, content, el, sectionId, path };
}

function buildInfo(sectionId: string, content: Element | null, el: Element, path: string): SelectedInfo {
  const tag = el.tagName.toLowerCase();
  const crumbs: { path: string; label: string }[] = [];
  if (content && path) {
    let cur: Element | null = el.parentElement;
    while (cur && cur !== content && content.contains(cur)) {
      const p = elementPath(content, cur);
      if (p) crumbs.unshift({ path: p, label: describeElement(cur) });
      cur = cur.parentElement;
    }
  }
  const linkEl = el.closest("a");
  return {
    sectionId,
    path,
    label: path ? describeElement(el) : "Section",
    tag,
    isLeaf: isLeafElement(el),
    text: (el.textContent || "").trim(),
    html: path ? (el as HTMLElement).innerHTML : "",
    src: el.getAttribute("src") || (el.querySelector("source")?.getAttribute("src") ?? ""),
    alt: el.getAttribute("alt") || "",
    href: el.getAttribute("data-cms-href") || linkEl?.getAttribute("href") || "",
    target: el.getAttribute("target") || "",
    isMedia: ["img", "video", "iframe", "source"].includes(tag),
    isLink: tag === "a" || tag === "button" || !!linkEl,
    crumbs,
  };
}

function makeBox(color: string, dashed: boolean) {
  const box = document.createElement("div");
  box.setAttribute("data-cms-ignore", "1");
  Object.assign(box.style, {
    position: "fixed",
    pointerEvents: "none",
    zIndex: "2147483646",
    border: `2px ${dashed ? "dashed" : "solid"} ${color}`,
    borderRadius: "4px",
    display: "none",
    boxSizing: "border-box",
    transition: "all 60ms linear",
  } as CSSStyleDeclaration);
  const tag = document.createElement("div");
  Object.assign(tag.style, {
    position: "absolute",
    left: "-2px",
    top: "-22px",
    background: color,
    color: "#fff",
    font: "600 11px/20px system-ui, sans-serif",
    padding: "0 6px",
    borderRadius: "4px 4px 0 0",
    whiteSpace: "nowrap",
    maxWidth: "320px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  } as CSSStyleDeclaration);
  box.appendChild(tag);
  document.body.appendChild(box);
  return { box, tag };
}

function placeBox(b: { box: HTMLDivElement; tag: HTMLDivElement }, el: Element | null, label: string) {
  if (!el || !el.isConnected) {
    b.box.style.display = "none";
    return;
  }
  let r = el.getBoundingClientRect();
  if (r.width === 0 && r.height === 0 && el.hasAttribute("data-cms-section")) {
    // header wrapper etc. (fixed children) → use first child
    const first = el.querySelector("[data-cms-content] > *");
    if (first) r = first.getBoundingClientRect();
  }
  if (r.width === 0 && r.height === 0) {
    b.box.style.display = "none";
    return;
  }
  b.box.style.display = "block";
  b.box.style.left = `${r.left}px`;
  b.box.style.top = `${r.top}px`;
  b.box.style.width = `${r.width}px`;
  b.box.style.height = `${r.height}px`;
  b.tag.textContent = label;
  b.tag.style.top = r.top < 24 ? "0px" : "-22px";
}

function PreviewInner() {
  const [docs, setDocs] = useState<Docs>({});
  const [mode, setMode] = useState<"select" | "interact">("select");
  const location = useLocation();
  const navigate = useNavigate();
  const selRef = useRef<{ sectionId: string; path: string } | null>(null);
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const editingRef = useRef<HTMLElement | null>(null);
  const expectedPath = useRef<string>("/");

  // ---------- messages from the editor ----------
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      const m = e.data;
      if (!m || typeof m !== "object") return;
      if (m.type === "cms:render") {
        setDocs((prev) => share(prev, m.docs));
        if (m.mode) setMode(m.mode);
        selRef.current = m.selection || null;
        if (m.path && m.path !== expectedPath.current) {
          expectedPath.current = m.path;
          navigate(m.path, { replace: true });
          window.scrollTo(0, 0);
        }
      } else if (m.type === "cms:select") {
        selRef.current = m.selection || null;
        if (m.requestInfo && m.selection) {
          const sec = document.querySelector(`[data-cms-section="${CSS.escape(m.selection.sectionId)}"]`);
          const content = sec?.querySelector(":scope > [data-cms-content]") || null;
          const el = m.selection.path && content ? resolvePath(content, m.selection.path) : sec;
          if (el) {
            post({ type: "cms:selected", info: buildInfo(m.selection.sectionId, content, el, m.selection.path || "") });
            (el as HTMLElement).scrollIntoView?.({ behavior: "smooth", block: "center" });
          }
        }
      } else if (m.type === "cms:scrollTo") {
        const el = document.querySelector(`[data-cms-section="${CSS.escape(m.sectionId)}"]`);
        const target = (el?.getBoundingClientRect().height ? el : el?.querySelector("[data-cms-content] > *")) as HTMLElement | null;
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("message", onMsg);
    post({ type: "cms:ready" });
    return () => window.removeEventListener("message", onMsg);
  }, [navigate]);

  useEffect(() => {
    (window as any).__cmsSelectMode = mode === "select";
  }, [mode]);

  // ---------- navigation inside the preview → tell the editor to switch page ----------
  useEffect(() => {
    const p = location.pathname;
    if (p !== expectedPath.current) {
      expectedPath.current = p;
      post({ type: "cms:navigate", path: p });
    }
  }, [location.pathname]);

  // ---------- hover / select overlay ----------
  const select = useCallback((target: Element | null) => {
    const parts = sectionParts(target);
    if (!parts) return;
    selRef.current = { sectionId: parts.sectionId, path: parts.path };
    post({ type: "cms:selected", info: buildInfo(parts.sectionId, parts.content, parts.el, parts.path) });
  }, []);

  useEffect(() => {
    const hover = makeBox("#3b82f6", true);
    const sel = makeBox("#2563eb", false);
    let hovered: Element | null = null;
    let hoverLabel = "";
    let raf = 0;

    const loop = () => {
      const s = selRef.current;
      let selEl: Element | null = null;
      let selLabel = "";
      if (s) {
        const sec = document.querySelector(`[data-cms-section="${CSS.escape(s.sectionId)}"]`);
        const content = sec?.querySelector(":scope > [data-cms-content]");
        selEl = s.path && content ? resolvePath(content, s.path) : sec;
        selLabel = selEl ? (s.path ? describeElement(selEl) : sec?.getAttribute("data-cms-label") || "Section") : "";
      }
      placeBox(sel, selEl, selLabel);
      placeBox(hover, modeRef.current === "select" && hovered !== selEl ? hovered : null, hoverLabel);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => {
      if (modeRef.current !== "select" || editingRef.current) {
        hovered = null;
        return;
      }
      const parts = sectionParts(e.target as Element);
      hovered = parts?.el || null;
      hoverLabel = parts ? (parts.path ? describeElement(parts.el) : "Section") : "";
    };
    const onLeave = () => (hovered = null);

    const block = (e: Event) => {
      if (editingRef.current && editingRef.current.contains(e.target as Node)) return true;
      if (modeRef.current !== "select") return false;
      if (!(e.target as Element)?.closest?.("[data-cms-section]")) return false;
      e.preventDefault();
      e.stopPropagation();
      (e as any).stopImmediatePropagation?.();
      return true;
    };

    const onClick = (e: MouseEvent) => {
      if (editingRef.current && editingRef.current.contains(e.target as Node)) return;
      if (editingRef.current) finishEdit(true);
      if (modeRef.current === "interact") {
        // keep the user inside the editor: links to other pages switch the editor's page instead
        const a = (e.target as Element).closest?.("a[href]") as HTMLAnchorElement | null;
        if (a) {
          const href = a.getAttribute("href") || "";
          if (/^https?:\/\//.test(href) && !href.startsWith(window.location.origin)) {
            e.preventDefault();
            e.stopPropagation();
          }
        }
        return;
      }
      if (block(e)) select(e.target as Element);
    };

    const finishEdit = (commit: boolean) => {
      const el = editingRef.current;
      if (!el) return;
      editingRef.current = null;
      el.removeAttribute("contenteditable");
      el.style.outline = "";
      const orig = el.dataset.cmsOrig ?? "";
      delete el.dataset.cmsOrig;
      const text = el.textContent || "";
      if (!commit) {
        el.textContent = orig;
        return;
      }
      if (text !== orig) {
        const parts = sectionParts(el);
        if (parts) post({ type: "cms:inline-text", sectionId: parts.sectionId, path: parts.path, text, label: describeElement(el) });
      }
    };

    const onDbl = (e: MouseEvent) => {
      if (modeRef.current !== "select") return;
      const parts = sectionParts(e.target as Element);
      if (!parts || !parts.path) return;
      const el = parts.el as HTMLElement;
      if (!isLeafElement(el) || !(el.textContent || "").trim() || el.tagName === "svg") return;
      e.preventDefault();
      e.stopPropagation();
      editingRef.current = el;
      el.dataset.cmsOrig = el.textContent || "";
      try {
        el.setAttribute("contenteditable", "plaintext-only");
        if ((el as any).contentEditable !== "plaintext-only") el.setAttribute("contenteditable", "true");
      } catch {
        el.setAttribute("contenteditable", "true");
      }
      el.style.outline = "2px solid #f59e0b";
      el.focus();
      const range = document.createRange();
      range.selectNodeContents(el);
      const s = window.getSelection();
      s?.removeAllRanges();
      s?.addRange(range);
    };

    const onKey = (e: KeyboardEvent) => {
      if (editingRef.current) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          finishEdit(true);
        } else if (e.key === "Escape") {
          e.preventDefault();
          finishEdit(false);
        }
        return;
      }
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "z") {
        e.preventDefault();
        post({ type: "cms:key", action: e.shiftKey ? "redo" : "undo" });
      } else if (mod && e.key.toLowerCase() === "y") {
        e.preventDefault();
        post({ type: "cms:key", action: "redo" });
      } else if (mod && e.key.toLowerCase() === "s") {
        e.preventDefault();
        post({ type: "cms:key", action: "save" });
      } else if (e.key === "Escape") {
        post({ type: "cms:key", action: "escape" });
      }
    };

    const onFocusOut = (e: FocusEvent) => {
      if (editingRef.current && e.target === editingRef.current) finishEdit(true);
    };

    const onSubmit = (e: Event) => {
      if (modeRef.current === "select") {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const stopDown = (e: Event) => {
      if (editingRef.current && editingRef.current.contains(e.target as Node)) return;
      if (modeRef.current === "select" && (e.target as Element)?.closest?.("[data-cms-section]")) {
        // stop focus/drag side effects, but keep the click itself
        if ((e.target as Element).closest("input,textarea,select")) e.preventDefault();
      }
    };

    window.addEventListener("mousemove", onMove, true);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("click", onClick, true);
    window.addEventListener("dblclick", onDbl, true);
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("focusout", onFocusOut, true);
    window.addEventListener("submit", onSubmit, true);
    window.addEventListener("mousedown", stopDown, true);
    return () => {
      cancelAnimationFrame(raf);
      hover.box.remove();
      sel.box.remove();
      window.removeEventListener("mousemove", onMove, true);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("dblclick", onDbl, true);
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("focusout", onFocusOut, true);
      window.removeEventListener("submit", onSubmit, true);
      window.removeEventListener("mousedown", stopDown, true);
    };
  }, [select]);

  if (!docs.page) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "system-ui", color: "#64748b" }}>
        Loading preview…
      </div>
    );
  }
  return (
    <PreviewContext.Provider value={true}>
      <CmsPageView page={docs.page} header={docs.header} footer={docs.footer} theme={docs.theme} />
    </PreviewContext.Provider>
  );
}

const queryClient = new QueryClient();

export default function PreviewApp() {
  useEffect(() => {
    document.documentElement.setAttribute("data-cms-preview", "1");
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BookingProvider>
          <Sonner />
          <MemoryRouter initialEntries={["/"]}>
            <PreviewInner />
            <BookingModal />
          </MemoryRouter>
        </BookingProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

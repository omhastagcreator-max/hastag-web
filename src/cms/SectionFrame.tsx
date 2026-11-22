import { Component, memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { getSectionType } from "./registry";
import { OverrideEngine } from "./overrides";
import { responsiveCss, scopeCss, MEDIA } from "./css";
import { useFollowLink } from "./links";
import { useIsPreview } from "./ChromeContext";
import type { SectionInstance } from "./types";

/** Contain crashes: one broken section never takes down the rest of the page. */
class SectionBoundary extends Component<{ label: string; preview: boolean; children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error) {
    console.error(`[cms] section "${this.props.label}" crashed:`, error);
  }
  render() {
    if (this.state.error) {
      return this.props.preview ? (
        <div style={{ padding: 24, margin: 16, border: "2px dashed #ef4444", borderRadius: 12, color: "#b91c1c", fontFamily: "system-ui", fontSize: 14 }}>
          <b>{this.props.label}</b> could not render: {this.state.error.message}
        </div>
      ) : null;
    }
    return this.props.children;
  }
}

/** Run user JavaScript isolated in try/catch. `section` = the section element. */
export function runUserCode(code: string, el: Element | null, label: string): (() => void) | void {
  if (!code || !code.trim()) return;
  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function("section", "root", "document", "window", `"use strict";\n${code}`);
    const ret = fn(el, el, document, window);
    if (typeof ret === "function") return ret;
  } catch (e) {
    console.error(`[cms] custom JS error in ${label}:`, e);
    window.parent?.postMessage({ type: "cms:js-error", label, message: String((e as Error)?.message || e) }, "*");
  }
}

/** <script> tags inside custom HTML don't run on their own when inserted by React – run them here. */
function runInlineScripts(container: Element | null, label: string) {
  if (!container) return;
  container.querySelectorAll("script").forEach((s) => {
    if (s.getAttribute("data-cms-ran")) return;
    s.setAttribute("data-cms-ran", "1");
    if (s.src) {
      const ext = document.createElement("script");
      ext.src = s.src;
      ext.async = true;
      s.after(ext);
    } else runUserCode(s.textContent || "", container, label);
  });
}

function isActiveNow(sec: SectionInstance): boolean {
  const a = sec.advanced || {};
  const now = Date.now();
  if (a.scheduleStart && now < Date.parse(a.scheduleStart)) return false;
  if (a.scheduleEnd && now > Date.parse(a.scheduleEnd)) return false;
  if (a.urlParamKey) {
    const v = new URLSearchParams(window.location.search).get(a.urlParamKey);
    if (v === null) return false;
    if (a.urlParamValue && v !== a.urlParamValue) return false;
  }
  return true;
}

const cssStr = (s: string) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

interface Props {
  section: SectionInstance;
}

function SectionFrame({ section }: Props) {
  const preview = useIsPreview();
  const def = getSectionType(section.type);
  const wrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<OverrideEngine | null>(null);
  const overridesRef = useRef(section.overrides);
  overridesRef.current = section.overrides;
  const follow = useFollowLink();
  const label = section.name || def?.label || section.type;
  const adv = section.advanced || {};
  const scope = `[data-cms-section="${cssStr(section.id)}"]`;

  // ---------- element overrides (text / images / links / visibility on any element) ----------
  useLayoutEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    const engine = new OverrideEngine(root);
    engineRef.current = engine;
    let frame = 0;
    const apply = () => {
      frame = 0;
      try {
        engine.apply(overridesRef.current);
      } catch (e) {
        console.error("[cms] override error", e);
      }
    };
    apply();
    const mo = new MutationObserver(() => {
      if (!frame) frame = requestAnimationFrame(apply);
    });
    mo.observe(root, { childList: true, subtree: true, characterData: true });
    return () => {
      mo.disconnect();
      if (frame) cancelAnimationFrame(frame);
      engine.dispose();
      engineRef.current = null;
    };
  }, [section.enabled]);

  useLayoutEffect(() => {
    engineRef.current?.apply(section.overrides);
  }, [section.overrides]);

  // ---------- entrance animation ----------
  const anim = adv.animation?.type && adv.animation.type !== "none" ? adv.animation : null;
  const [inView, setInView] = useState(!anim);
  useEffect(() => {
    if (!anim) {
      setInView(true);
      return;
    }
    setInView(false);
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [anim?.type, anim?.duration, anim?.delay]);

  // ---------- custom JS + scripts inside custom HTML ----------
  useEffect(() => {
    const cleanup = runUserCode(adv.js || "", wrapRef.current, label);
    return () => {
      if (typeof cleanup === "function") {
        try {
          cleanup();
        } catch {
          /* ignore */
        }
      }
    };
  }, [adv.js]);

  useEffect(() => {
    wrapRef.current?.querySelectorAll(":scope > .cms-code").forEach((c) => runInlineScripts(c, label));
  }, [adv.htmlBefore, adv.htmlAfter]);

  // ---------- generated CSS ----------
  const css = useMemo(() => {
    let out = responsiveCss(`${scope} > [data-cms-content] > *`, section.style);
    const hide = adv.hideOn || {};
    if (hide.desktop) out += `@media (min-width: 1024px) { ${scope} { display: none !important; } }\n`;
    if (hide.tablet) out += `@media (min-width: 768px) and (max-width: 1023px) { ${scope} { display: none !important; } }\n`;
    if (hide.mobile) out += `@media ${MEDIA.mobile} { ${scope} { display: none !important; } }\n`;
    for (const [path, ov] of Object.entries(section.overrides || {})) {
      if (ov.style) out += responsiveCss(`${scope} [data-cms-el="${cssStr(path)}"]`, ov.style, true);
    }
    if (adv.css) out += scopeCss(adv.css, scope);
    return out;
  }, [section.style, section.overrides, adv.css, adv.hideOn, scope]);

  if (!def) {
    return preview ? (
      <div data-cms-section={section.id} style={{ padding: 16, color: "#b91c1c" }}>
        Unknown section type “{section.type}”
      </div>
    ) : null;
  }
  if (!section.enabled) return null;
  if (!preview && !isActiveNow(section)) return null;

  const Comp = def.component;
  const animStyle = anim
    ? ({ "--cms-anim-duration": `${anim.duration ?? 700}ms`, "--cms-anim-delay": `${anim.delay ?? 0}ms` } as React.CSSProperties)
    : undefined;

  return (
    <div
      ref={wrapRef}
      data-cms-section={section.id}
      data-cms-type={section.type}
      id={adv.anchorId || undefined}
      className={["cms-section", adv.className, anim ? `cms-anim cms-anim-${anim.type}` : "", inView && anim ? "cms-in" : ""]
        .filter(Boolean)
        .join(" ")}
      style={animStyle}
      onClickCapture={(e) => {
        // links changed in the editor on existing elements (incl. buttons / router links)
        if (preview && (window as any).__cmsSelectMode) return;
        const t = (e.target as Element).closest?.("[data-cms-href]");
        if (!t || !wrapRef.current?.contains(t)) return;
        const href = t.getAttribute("data-cms-href") || "";
        if (!href) return;
        e.preventDefault();
        e.stopPropagation();
        follow(href, t.getAttribute("target") || undefined);
      }}
    >
      {css && <style data-cms-ignore="1">{css}</style>}
      {adv.htmlBefore && <div className="cms-code" data-cms-ignore="1" dangerouslySetInnerHTML={{ __html: adv.htmlBefore }} />}
      <div data-cms-content="" ref={contentRef} style={{ display: "contents" }}>
        <SectionBoundary label={label} preview={preview}>
          <Comp settings={{ ...def.defaults, ...section.settings }} section={section} />
        </SectionBoundary>
      </div>
      {adv.htmlAfter && <div className="cms-code" data-cms-ignore="1" dangerouslySetInnerHTML={{ __html: adv.htmlAfter }} />}
    </div>
  );
}

export default memo(SectionFrame);

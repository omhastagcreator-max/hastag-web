import { useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import SectionFrame, { runUserCode } from "./SectionFrame";
import { ChromeContext, useIsPreview } from "./ChromeContext";
import { builtinDoc, pathToSlug } from "./defaults";
import { usePublishedDocs } from "./store";
import { hexToHslTriplet, scopeCss } from "./css";
import { smoothScrollToElement } from "@/components/AuditCTA";
import NotFound from "@/pages/NotFound";
import type { CmsDoc, PageDoc, ThemeDoc } from "./types";
import { FOOTER_SLUG, HEADER_SLUG, THEME_SLUG } from "./types";
import "./cms.css";

// ---------------------------------------------------------------------------
// Theme (colors, fonts, global code)
// ---------------------------------------------------------------------------
const SYSTEM_FONTS = ["", "system-ui", "Arial", "Georgia", "Helvetica", "Times New Roman", "Verdana"];

function fontLink(fonts: string[]) {
  const fams = fonts.filter((f) => f && !SYSTEM_FONTS.includes(f));
  if (!fams.length) return "";
  return `https://fonts.googleapis.com/css2?${fams.map((f) => `family=${encodeURIComponent(f).replace(/%20/g, "+")}:wght@400;500;600;700;800;900`).join("&")}&display=swap`;
}

export function ThemeStyles({ theme }: { theme?: ThemeDoc }) {
  const css = useMemo(() => {
    if (!theme) return "";
    let vars = "";
    for (const [k, v] of Object.entries(theme.colors || {})) {
      const hsl = v ? hexToHslTriplet(v) : null;
      if (hsl) vars += `--${k}: ${hsl};`;
    }
    if (theme.radius) vars += `--radius: ${theme.radius};`;
    let out = vars ? `:root { ${vars} }\n` : "";
    if (theme.colors?.background) out += `body { background: ${theme.colors.background} !important; }\n`;
    if (theme.headingFont) out += `h1, h2, h3, h4, h5, h6, .font-display { font-family: "${theme.headingFont}", system-ui, sans-serif; }\n`;
    if (theme.bodyFont) out += `body, .font-body { font-family: "${theme.bodyFont}", system-ui, sans-serif; }\n`;
    if (theme.baseFontSize) out += `html { font-size: ${theme.baseFontSize}; }\n`;
    if (theme.customCss) out += theme.customCss + "\n";
    return out;
  }, [theme]);

  const fonts = fontLink([theme?.headingFont || "", theme?.bodyFont || ""]);

  useEffect(() => {
    const cleanup = runUserCode(theme?.customJs || "", document.body, "theme");
    return () => {
      if (typeof cleanup === "function") cleanup();
    };
  }, [theme?.customJs]);

  // extra <head> code (verification tags, pixels…)
  useEffect(() => {
    const html = theme?.headHtml;
    if (!html) return;
    const tpl = document.createElement("template");
    tpl.innerHTML = html;
    const added: Node[] = [];
    Array.from(tpl.content.childNodes).forEach((n) => {
      if (n.nodeName === "SCRIPT") {
        const old = n as HTMLScriptElement;
        const sc = document.createElement("script");
        Array.from(old.attributes).forEach((a) => sc.setAttribute(a.name, a.value));
        sc.textContent = old.textContent;
        document.head.appendChild(sc);
        added.push(sc);
      } else if (n.nodeType === Node.ELEMENT_NODE) {
        document.head.appendChild(n);
        added.push(n);
      }
    });
    return () => added.forEach((n) => n.parentNode?.removeChild(n));
  }, [theme?.headHtml]);

  return (
    <>
      {fonts && <link rel="stylesheet" href={fonts} />}
      {css && <style data-cms-theme="">{css}</style>}
    </>
  );
}

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------
const initialHead = typeof document !== "undefined"
  ? {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
      ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute("content") || "",
      ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute("content") || "",
      ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute("content") || "",
    }
  : null;

function setMeta(attr: "name" | "property", key: string, value: string | undefined) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!value) {
    if (el && el.dataset.cms) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    el.dataset.cms = "1";
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function useSeo(doc: PageDoc | undefined) {
  useEffect(() => {
    if (!doc || !initialHead) return;
    const seo = doc.seo || {};
    // pages written before the editor set their own title; only override when set in the editor
    if (seo.title) document.title = seo.title;
    else if (doc.slug === "home") document.title = initialHead.title;
    setMeta("name", "description", seo.description || initialHead.description);
    setMeta("property", "og:title", seo.title || initialHead.ogTitle);
    setMeta("property", "og:description", seo.description || initialHead.ogDescription);
    setMeta("property", "og:image", seo.ogImage || initialHead.ogImage);
    setMeta("name", "twitter:image", seo.ogImage || initialHead.ogImage);
    setMeta("name", "keywords", seo.keywords || undefined);
    setMeta("name", "robots", seo.noindex ? "noindex, nofollow" : undefined);
    let canon = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (seo.canonical) {
      if (!canon) {
        canon = document.createElement("link");
        canon.rel = "canonical";
        document.head.appendChild(canon);
      }
      canon.href = seo.canonical;
    } else canon?.remove();
  }, [doc?.slug, doc?.seo]);
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------
export function SectionList({ doc, chrome }: { doc?: PageDoc; chrome: "normal" | "suppress" }) {
  if (!doc) return null;
  return (
    <ChromeContext.Provider value={chrome}>
      <div data-cms-group={doc.slug}>
        {doc.sections.map((sec) => (
          <SectionFrame key={sec.id} section={sec} />
        ))}
      </div>
    </ChromeContext.Provider>
  );
}

export interface CmsPageViewProps {
  page?: PageDoc;
  header?: PageDoc;
  footer?: PageDoc;
  theme?: ThemeDoc;
}

export function CmsPageView({ page, header, footer, theme }: CmsPageViewProps) {
  const { hash, pathname } = useLocation();
  const preview = useIsPreview();
  const ref = useRef<HTMLDivElement>(null);
  useSeo(page);

  // Arriving with /#some-section → scroll there once sections have rendered
  useEffect(() => {
    if (!hash || preview) return;
    const id = decodeURIComponent(hash.slice(1));
    const t = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) smoothScrollToElement(el);
    }, 400);
    return () => window.clearTimeout(t);
  }, [hash, pathname, preview]);

  useEffect(() => {
    const cleanup = runUserCode(page?.customJs || "", ref.current, `page ${page?.slug}`);
    return () => {
      if (typeof cleanup === "function") cleanup();
    };
  }, [page?.customJs, page?.slug]);

  if (!page) return <NotFound />;
  const scope = `[data-cms-page="${page.slug}"]`;
  return (
    <>
      <ThemeStyles theme={theme} />
      {!page.hideHeader && <SectionList doc={header} chrome="normal" />}
      <div data-cms-page={page.slug} ref={ref}>
        {page.customCss && <style>{scopeCss(page.customCss, scope)}</style>}
        <SectionList doc={page} chrome="suppress" />
      </div>
      {!page.hideFooter && <SectionList doc={footer} chrome="normal" />}
    </>
  );
}

const pick = (docs: Record<string, CmsDoc>, slug: string) => (docs[slug] || builtinDoc(slug)) as any;

/** Public site: renders the published version of a page (or its built-in default). */
export function CmsPage({ slug }: { slug: string }) {
  const { docs, ready } = usePublishedDocs();
  if (!ready) {
    // first-ever visit: wait briefly for published content to avoid a flash of old content
    return <div style={{ minHeight: "100vh" }} />;
  }
  return (
    <CmsPageView
      page={pick(docs, slug) as PageDoc | undefined}
      header={pick(docs, HEADER_SLUG)}
      footer={pick(docs, FOOTER_SLUG)}
      theme={pick(docs, THEME_SLUG)}
    />
  );
}

/** Catch-all route: /anything → page with slug "anything" (built-in or created in the editor). */
export function CmsRoute() {
  const { pathname } = useLocation();
  const slug = pathToSlug(pathname);
  if (slug.startsWith("__")) return <NotFound />;
  return <CmsPage key={slug} slug={slug} />;
}

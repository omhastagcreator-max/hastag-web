import type { ElementOverride } from "./types";

/**
 * Element override engine.
 *
 * Lets you change ANY element inside ANY section (text, rich HTML, image/video
 * source, link, visibility, classes) without touching the source code. Elements
 * are addressed by a path relative to the section, e.g.
 *   "div.container-main:0>h1:0>span:0"
 * Each segment = tag + first CSS class + position among siblings with the same
 * tag+class, which survives most dynamic re-renders.
 *
 * Changes are applied to the live DOM after React renders and re-applied when
 * React updates the section (MutationObserver). Original values are remembered
 * so removing an override restores the element exactly.
 */

const IGNORE_ATTR = "data-cms-ignore";

const sig = (el: Element) => {
  const first = (el.getAttribute("class") || "").trim().split(/\s+/)[0] || "";
  const cls = first.replace(/[^a-zA-Z0-9_-]/g, "");
  return `${el.tagName.toLowerCase()}${cls ? "." + cls : ""}`;
};

const realChildren = (el: Element) =>
  Array.from(el.children).filter((c) => !c.hasAttribute(IGNORE_ATTR) && !c.hasAttribute("data-cms-replacement"));

export function elementPath(root: Element, el: Element): string | null {
  const segs: string[] = [];
  let cur: Element | null = el;
  while (cur && cur !== root) {
    const parent: Element | null = cur.parentElement;
    if (!parent) return null;
    const s = sig(cur);
    const same = realChildren(parent).filter((c) => sig(c) === s);
    const idx = same.indexOf(cur);
    if (idx < 0) return null;
    segs.unshift(`${s}:${idx}`);
    cur = parent;
  }
  return cur === root ? segs.join(">") : null;
}

export function resolvePath(root: Element, path: string): Element | null {
  if (!path) return null;
  let cur: Element | null = root;
  for (const seg of path.split(">")) {
    if (!cur) return null;
    const colon = seg.lastIndexOf(":");
    const s = seg.slice(0, colon);
    const idx = parseInt(seg.slice(colon + 1), 10);
    const same: Element[] = realChildren(cur).filter((c) => sig(c) === s);
    cur = same[idx] || null;
  }
  return cur;
}

export const isLeafElement = (el: Element) => el.children.length === 0;

export function describeElement(el: Element): string {
  const tag = el.tagName.toLowerCase();
  if (tag === "img") return `Image · ${(el as HTMLImageElement).alt || (el.getAttribute("src") || "").split("/").pop()}`;
  if (tag === "video") return "Video";
  const text = (el.textContent || "").replace(/\s+/g, " ").trim();
  const names: Record<string, string> = {
    a: "Link", button: "Button", h1: "Heading 1", h2: "Heading 2", h3: "Heading 3", h4: "Heading 4",
    p: "Paragraph", span: "Text", li: "List item", section: "Section", footer: "Footer", nav: "Navigation",
    svg: "Icon", path: "Icon", input: "Input", textarea: "Text area", form: "Form", ul: "List", img: "Image",
  };
  return `${names[tag] || tag}${text ? " · " + (text.length > 40 ? text.slice(0, 40) + "…" : text) : ""}`;
}

interface TouchRecord {
  textNodes?: Text[];
  textOrig?: (string | null)[];
  addedText?: Text;
  attrs?: Record<string, string | null>; // original attribute values
  addedClasses?: string[];
  replacement?: HTMLElement;
  replacementHtml?: string;
}

export class OverrideEngine {
  private touched = new Map<Element, TouchRecord>();
  constructor(private root: Element) {}

  private rec(el: Element): TouchRecord {
    let r = this.touched.get(el);
    if (!r) {
      r = {};
      this.touched.set(el, r);
    }
    return r;
  }

  private setAttr(el: Element, name: string, value: string | null) {
    const r = this.rec(el);
    r.attrs = r.attrs || {};
    if (!(name in r.attrs)) r.attrs[name] = el.getAttribute(name);
    if (value === null) {
      if (el.hasAttribute(name)) el.removeAttribute(name);
    } else if (el.getAttribute(name) !== value) {
      el.setAttribute(name, value);
    }
  }

  private restoreAttr(el: Element, r: TouchRecord, name: string) {
    if (!r.attrs || !(name in r.attrs)) return;
    const orig = r.attrs[name];
    if (orig === null) el.removeAttribute(name);
    else if (el.getAttribute(name) !== orig) el.setAttribute(name, orig);
    delete r.attrs[name];
  }

  private setText(el: Element, text: string) {
    if (!isLeafElement(el)) return;
    const r = this.rec(el);
    const nodes = Array.from(el.childNodes).filter((n) => n.nodeType === Node.TEXT_NODE) as Text[];
    if (!r.textNodes || r.textNodes.some((n) => n.parentNode !== el)) {
      r.textNodes = nodes;
      r.textOrig = nodes.map((n) => n.nodeValue);
    }
    if (nodes.length === 0) {
      if (!r.addedText || r.addedText.parentNode !== el) {
        r.addedText = document.createTextNode(text);
        el.appendChild(r.addedText);
      } else if (r.addedText.nodeValue !== text) r.addedText.nodeValue = text;
      return;
    }
    nodes.forEach((n, i) => {
      const v = i === 0 ? text : "";
      if (n.nodeValue !== v) n.nodeValue = v;
    });
  }

  private restoreText(el: Element, r: TouchRecord) {
    if (r.textNodes && r.textOrig) {
      r.textNodes.forEach((n, i) => {
        if (n.parentNode === el && n.nodeValue !== r.textOrig![i]) n.nodeValue = r.textOrig![i];
      });
    }
    if (r.addedText?.parentNode) r.addedText.parentNode.removeChild(r.addedText);
    r.textNodes = r.textOrig = undefined;
    r.addedText = undefined;
  }

  private setHtml(el: Element, html: string) {
    const r = this.rec(el);
    if (!r.replacement || !r.replacement.isConnected || r.replacement.previousElementSibling !== el) {
      r.replacement?.remove();
      const clone = document.createElement(el.tagName.toLowerCase());
      const cls = el.getAttribute("class");
      if (cls) clone.setAttribute("class", cls);
      clone.setAttribute("data-cms-replacement", "1");
      el.after(clone);
      r.replacement = clone;
      r.replacementHtml = undefined;
    }
    if (r.replacementHtml !== html) {
      r.replacement.innerHTML = html;
      r.replacementHtml = html;
    }
    this.setAttr(el, "data-cms-replaced", "1");
  }

  private restoreHtml(el: Element, r: TouchRecord) {
    r.replacement?.remove();
    r.replacement = undefined;
    r.replacementHtml = undefined;
    this.restoreAttr(el, r, "data-cms-replaced");
  }

  apply(overrides: Record<string, ElementOverride> | undefined) {
    const active = new Map<Element, ElementOverride & { path: string }>();
    for (const [path, ov] of Object.entries(overrides || {})) {
      const el = resolvePath(this.root, path);
      if (el) active.set(el, { ...ov, path });
    }

    // 1. restore elements that are no longer overridden (or lost a property)
    for (const [el, r] of Array.from(this.touched.entries())) {
      const ov = active.get(el);
      if (!el.isConnected) {
        r.replacement?.remove();
        this.touched.delete(el);
        continue;
      }
      if (!ov || ov.text === undefined || ov.html) this.restoreText(el, r);
      if (!ov || !ov.html) this.restoreHtml(el, r);
      if (!ov) {
        Object.keys(r.attrs || {}).forEach((a) => this.restoreAttr(el, r, a));
        r.addedClasses?.forEach((c) => el.classList.remove(c));
        this.touched.delete(el);
        continue;
      }
      const keep = new Set<string>(["data-cms-el"]);
      if (ov.hidden) keep.add("data-cms-hidden");
      if (ov.html) keep.add("data-cms-replaced");
      if (ov.src) ["src", "srcset", "poster", "style"].forEach((a) => keep.add(a));
      if (ov.alt !== undefined) keep.add("alt");
      if (ov.href) ["href", "target", "data-cms-href", "rel"].forEach((a) => keep.add(a));
      Object.keys(r.attrs || {}).forEach((a) => !keep.has(a) && this.restoreAttr(el, r, a));
      const wantClasses = (ov.className || "").split(/\s+/).filter(Boolean);
      (r.addedClasses || []).filter((c) => !wantClasses.includes(c)).forEach((c) => el.classList.remove(c));
    }

    // 2. apply current overrides
    for (const [el, ov] of active) {
      this.setAttr(el, "data-cms-el", ov.path);
      if (ov.hidden) this.setAttr(el, "data-cms-hidden", "1");
      if (ov.html) this.setHtml(el, ov.html);
      else if (ov.text !== undefined) this.setText(el, ov.text);

      if (ov.src) {
        const tag = el.tagName;
        if (tag === "IMG") {
          this.setAttr(el, "src", ov.src);
          this.setAttr(el, "srcset", null);
        } else if (tag === "VIDEO") {
          const source = el.querySelector("source");
          if (source) this.setAttr(source, "src", ov.src);
          this.setAttr(el, "src", ov.src);
        } else if (tag === "IFRAME" || tag === "SOURCE" || tag === "EMBED") {
          this.setAttr(el, "src", ov.src);
        } else {
          // any other element: use as background image
          const r = this.rec(el);
          r.attrs = r.attrs || {};
          this.setAttr(el, "style", `${r.attrs.style ?? el.getAttribute("style") ?? ""};background-image:url("${ov.src}");background-size:cover;background-position:center`);
        }
      }
      if (ov.alt !== undefined) this.setAttr(el, "alt", ov.alt);
      if (ov.href) {
        if (el.tagName === "A") this.setAttr(el, "href", ov.href);
        this.setAttr(el, "data-cms-href", ov.href);
        if (ov.target) {
          this.setAttr(el, "target", ov.target);
          if (ov.target === "_blank") this.setAttr(el, "rel", "noopener noreferrer");
        }
      }
      const r = this.rec(el);
      const want = (ov.className || "").split(/\s+/).filter(Boolean);
      want.forEach((c) => !el.classList.contains(c) && el.classList.add(c));
      r.addedClasses = want;
    }
  }

  dispose() {
    for (const r of this.touched.values()) r.replacement?.remove();
    this.touched.clear();
  }
}

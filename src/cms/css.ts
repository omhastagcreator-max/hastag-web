import type { Device, ResponsiveStyle, StyleProps } from "./types";

export const MEDIA: Record<Device, string | null> = {
  desktop: null,
  tablet: "(max-width: 1023px)",
  mobile: "(max-width: 767px)",
};

const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

/** Basic guard so a stray "}" or "<" in a style value can't escape the rule. */
const clean = (v: string) => String(v).replace(/[{}<>;]/g, "").trim();

export function styleToDecls(style: StyleProps | undefined, important = false): string {
  if (!style) return "";
  const imp = important ? " !important" : "";
  const out: string[] = [];
  const bgLayers: string[] = [];
  for (const [k, raw] of Object.entries(style)) {
    if (raw === undefined || raw === null || raw === "") continue;
    const v = clean(raw as string);
    if (!v) continue;
    if (k === "backgroundImage") {
      bgLayers.push(/^(url|linear-gradient|radial-gradient)\(/.test(v) ? v : `url("${v.replace(/"/g, "%22")}")`);
      continue;
    }
    if (k === "backgroundGradient") {
      bgLayers.unshift(v);
      continue;
    }
    out.push(`${kebab(k)}: ${v}${imp};`);
  }
  if (bgLayers.length) {
    out.push(`background-image: ${bgLayers.join(", ")}${imp};`);
    if (!style.backgroundSize) out.push(`background-size: cover${imp};`);
    if (!style.backgroundPosition) out.push(`background-position: center${imp};`);
    if (!style.backgroundRepeat) out.push(`background-repeat: no-repeat${imp};`);
  }
  return out.join(" ");
}

/** Build desktop/tablet/mobile rules for one selector. */
export function responsiveCss(selector: string, style: ResponsiveStyle | undefined, important = false): string {
  if (!style) return "";
  let css = "";
  (["desktop", "tablet", "mobile"] as Device[]).forEach((d) => {
    const decls = styleToDecls(style[d], important);
    if (!decls) return;
    const rule = `${selector} { ${decls} }`;
    css += MEDIA[d] ? `@media ${MEDIA[d]} { ${rule} }\n` : rule + "\n";
  });
  return css;
}

export function hasStyle(style?: ResponsiveStyle) {
  if (!style) return false;
  return Object.values(style).some((s) => s && Object.values(s).some((v) => v !== undefined && v !== ""));
}

/**
 * Scope arbitrary CSS to one section so it can't leak into the rest of the site.
 *  - `.title { }`            -> `#sec-x .title { }`
 *  - `& { }` / `:scope { }`  -> `#sec-x { }`
 *  - @media / @supports blocks are scoped recursively
 *  - @keyframes / @font-face are left untouched
 */
export function scopeCss(css: string, scope: string): string {
  if (!css) return "";
  // strip comments
  const src = css.replace(/\/\*[\s\S]*?\*\//g, "");
  let out = "";
  let i = 0;
  const n = src.length;

  const readBlock = (start: number): [string, number] => {
    // start is index right after "{"
    let depth = 1;
    let j = start;
    while (j < n && depth > 0) {
      const c = src[j];
      if (c === "{") depth++;
      else if (c === "}") depth--;
      j++;
    }
    return [src.slice(start, j - 1), j];
  };

  while (i < n) {
    const brace = src.indexOf("{", i);
    const semi = src.indexOf(";", i);
    if (brace === -1) break;
    // statements like @import x; before next block
    if (semi !== -1 && semi < brace) {
      const stmt = src.slice(i, semi + 1).trim();
      if (stmt.startsWith("@import") || stmt.startsWith("@charset")) out += stmt + "\n";
      i = semi + 1;
      continue;
    }
    const prelude = src.slice(i, brace).trim();
    const [body, next] = readBlock(brace + 1);
    i = next;
    if (!prelude) continue;
    if (/^@(media|supports|container|layer)/i.test(prelude)) {
      out += `${prelude} { ${scopeCss(body, scope)} }\n`;
    } else if (/^@/.test(prelude)) {
      out += `${prelude} { ${body} }\n`;
    } else {
      const sels = prelude
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => {
          if (s.includes("&")) return s.replace(/&/g, scope);
          if (s.includes(":scope")) return s.replace(/:scope/g, scope);
          if (s === ":root" || s === "html" || s === "body") return scope;
          return `${scope} ${s}`;
        });
      out += `${sels.join(", ")} { ${body} }\n`;
    }
  }
  return out;
}

/** "#0033FF" -> "228 100% 50%" (the HSL format the site's Tailwind theme uses) */
export function hexToHslTriplet(hex: string): string | null {
  const m = hex.trim().match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let hh = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        hh = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        hh = (b - r) / d + 2;
        break;
      default:
        hh = (r - g) / d + 4;
    }
    hh /= 6;
  }
  return `${Math.round(hh * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

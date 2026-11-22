import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft, Code2, Eye, EyeOff, History, Loader2, MousePointerClick, Plus, RotateCcw, Search, Trash2, X,
} from "lucide-react";
import type { Device, ElementOverride, PageDoc, SectionAdvanced, SectionInstance, ThemeDoc } from "../types";
import { getSectionType, allSectionTypes } from "../registry";
import { THEME_COLOR_FIELDS, slugToPath } from "../defaults";
import { listRevisions, listSubmissions } from "../store";
import type { SelectedInfo } from "../PreviewRoot";
import StyleEditor, { FONT_OPTIONS } from "./StyleEditor";
import { ColorInput, FieldsForm, Label, MediaInput, SelectInput, TextArea, TextInput, Toggle, inputCls } from "./fields";

export type UpdateSection = (fn: (s: SectionInstance) => void, coalesceKey?: string) => void;

function Tabs<T extends string>({ value, onChange, tabs }: { value: T; onChange: (t: T) => void; tabs: [T, string][] }) {
  return (
    <div className="flex border-b border-slate-200 px-3 gap-3 sticky top-0 bg-white z-10">
      {tabs.map(([k, l]) => (
        <button key={k} onClick={() => onChange(k)} className={`py-2.5 text-[13px] font-semibold border-b-2 -mb-px ${value === k ? "border-blue-600 text-blue-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
          {l}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section settings
// ---------------------------------------------------------------------------
export function SectionPanel({
  section,
  update,
  device,
  setDevice,
  pages,
  onSelectElement,
  onClose,
}: {
  section: SectionInstance;
  update: UpdateSection;
  device: Device;
  setDevice: (d: Device) => void;
  pages: string[];
  onSelectElement: (path: string) => void;
  onClose: () => void;
}) {
  const def = getSectionType(section.type);
  const [tab, setTab] = useState<"content" | "design" | "advanced">("content");
  const adv = section.advanced || {};
  const setAdv = <K extends keyof SectionAdvanced>(k: K, v: SectionAdvanced[K], key?: string) =>
    update((s) => {
      s.advanced = { ...(s.advanced || {}), [k]: v };
    }, key || `adv-${String(k)}`);
  const overrides = Object.entries(section.overrides || {});

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2.5 border-b border-slate-200 flex items-center gap-2">
        <button onClick={onClose} className="p-1 rounded hover:bg-slate-100 text-slate-500" title="Back to page settings">
          <ArrowLeft size={16} />
        </button>
        <div className="min-w-0 flex-1">
          <input
            className="w-full font-semibold text-[14px] text-slate-900 bg-transparent outline-none focus:bg-slate-50 rounded px-1 -mx-1"
            value={section.name ?? def?.label ?? section.type}
            onChange={(e) => update((s) => (s.name = e.target.value), "name")}
          />
          <div className="text-[11px] text-slate-400">{def?.label}</div>
        </div>
        <button onClick={() => update((s) => (s.enabled = !s.enabled))} className="p-1.5 rounded hover:bg-slate-100 text-slate-500" title={section.enabled ? "Hide section" : "Show section"}>
          {section.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
      </div>
      <Tabs<"content" | "design" | "advanced"> value={tab} onChange={setTab} tabs={[["content", "Content"], ["design", "Design"], ["advanced", "Advanced"]]} />
      <div className="flex-1 overflow-auto px-3 py-3 space-y-3">
        {!section.enabled && <div className="text-[12px] rounded-md bg-amber-50 text-amber-800 px-3 py-2">This section is hidden. Its content is kept — turn it back on with the eye icon.</div>}
        {tab === "content" && (
          <>
            {def?.description && <p className="text-[12px] text-slate-500 leading-snug">{def.description}</p>}
            {def && def.fields.length > 0 && (
              <FieldsForm
                fields={def.fields}
                values={{ ...def.defaults, ...section.settings }}
                onChange={(k, v) =>
                  update((s) => {
                    s.settings = { ...s.settings, [k]: v };
                  }, `set-${k}`)
                }
                pages={pages}
              />
            )}
            {(def?.legacy || overrides.length > 0) && (
              <div className="rounded-lg border border-blue-200 bg-blue-50/60 p-3 text-[12px] text-blue-900 space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold">
                  <MousePointerClick size={14} /> Edit anything inside this section
                </div>
                <p className="leading-snug">Click any text, image, button or box in the preview to edit it. Double-click text to type straight into the page.</p>
              </div>
            )}
            {overrides.length > 0 && (
              <div>
                <div className="flex items-center justify-between mt-2 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Edited elements ({overrides.length})</span>
                  <button
                    className="text-[11px] text-red-500 hover:underline"
                    onClick={() => {
                      if (confirm("Undo all element edits in this section?")) update((s) => (s.overrides = {}));
                    }}
                  >
                    Reset all
                  </button>
                </div>
                <div className="rounded-md border border-slate-200 divide-y">
                  {overrides.map(([p, ov]) => (
                    <div key={p} className="flex items-center gap-1 px-2 py-1.5 text-[12px]">
                      <button className="flex-1 text-left truncate text-slate-700 hover:text-blue-700" onClick={() => onSelectElement(p)} title={p}>
                        {ov.hidden && <EyeOff size={11} className="inline mr-1 text-slate-400" />}
                        {ov.label || p}
                      </button>
                      <button
                        title="Reset this element"
                        className="p-1 text-slate-400 hover:text-red-600"
                        onClick={() =>
                          update((s) => {
                            const o = { ...s.overrides };
                            delete o[p];
                            s.overrides = o;
                          })
                        }
                      >
                        <RotateCcw size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        {tab === "design" && (
          <StyleEditor
            value={section.style}
            device={device}
            onDeviceChange={setDevice}
            onChange={(v) =>
              update((s) => {
                s.style = v;
              }, "style")
            }
          />
        )}
        {tab === "advanced" && (
          <div className="space-y-4">
            <div>
              <Label help="Lets you link to this section with #your-id">Section ID (anchor)</Label>
              <TextInput value={adv.anchorId || ""} onChange={(v) => setAdv("anchorId", v.replace(/[^a-zA-Z0-9_-]/g, "-"))} placeholder="e.g. offers" />
            </div>
            <div>
              <Label>Extra CSS classes</Label>
              <TextInput value={adv.className || ""} onChange={(v) => setAdv("className", v)} placeholder="e.g. my-section dark" />
            </div>

            <div className="pt-2 border-t border-slate-200">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Show on devices</div>
              {(["desktop", "tablet", "mobile"] as Device[]).map((d) => (
                <Toggle key={d} label={<span className="capitalize">{d}</span>} checked={!adv.hideOn?.[d]} onChange={(on) => setAdv("hideOn", { ...(adv.hideOn || {}), [d]: !on })} />
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Visibility conditions</div>
              <div>
                <Label help="Leave empty to always show">Show from</Label>
                <input type="datetime-local" className={inputCls} value={adv.scheduleStart || ""} onChange={(e) => setAdv("scheduleStart", e.target.value)} />
              </div>
              <div>
                <Label>Show until</Label>
                <input type="datetime-local" className={inputCls} value={adv.scheduleEnd || ""} onChange={(e) => setAdv("scheduleEnd", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label help="Only show when the URL has…">URL parameter</Label>
                  <TextInput value={adv.urlParamKey || ""} onChange={(v) => setAdv("urlParamKey", v)} placeholder="utm_source" />
                </div>
                <div>
                  <Label help="(empty = any value)">equal to</Label>
                  <TextInput value={adv.urlParamValue || ""} onChange={(v) => setAdv("urlParamValue", v)} placeholder="meta" />
                </div>
              </div>
              <p className="text-[11px] text-slate-400">Conditions apply on the live site. The editor always shows the section.</p>
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Animation</div>
              <SelectInput
                value={adv.animation?.type || "none"}
                onChange={(v) => setAdv("animation", { ...(adv.animation || {}), type: v as any })}
                options={[
                  ["None", "none"], ["Fade in", "fade"], ["Fade up", "fade-up"], ["Fade down", "fade-down"], ["Slide from right", "slide-left"],
                  ["Slide from left", "slide-right"], ["Zoom in", "zoom-in"], ["Zoom out", "zoom-out"],
                ].map(([label, value]) => ({ label, value }))}
              />
              {adv.animation?.type && adv.animation.type !== "none" && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Duration (ms)</Label>
                    <input type="number" className={inputCls} value={adv.animation.duration ?? 700} onChange={(e) => setAdv("animation", { ...adv.animation!, duration: Number(e.target.value) })} />
                  </div>
                  <div>
                    <Label>Delay (ms)</Label>
                    <input type="number" className={inputCls} value={adv.animation.delay ?? 0} onChange={(e) => setAdv("animation", { ...adv.animation!, delay: Number(e.target.value) })} />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-3">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <Code2 size={13} /> Custom code
              </div>
              <div>
                <Label help="Automatically limited to this section. Use & { … } to style the section itself, e.g. & h2 { color: red }">Custom CSS</Label>
                <TextArea mono rows={6} value={adv.css || ""} onChange={(v) => setAdv("css", v, "css")} placeholder={"& { background: #f8fafc; }\nh2 { letter-spacing: -1px; }"} />
              </div>
              <div>
                <Label help="Runs after the section loads. `section` is this section's element. Errors are caught and can't break the page. Return a function to clean up.">Custom JavaScript</Label>
                <TextArea mono rows={6} value={adv.js || ""} onChange={(v) => setAdv("js", v, "js")} placeholder={"section.querySelector('h2')?.addEventListener('click', () => {\n  console.log('clicked');\n});"} />
              </div>
              <div>
                <Label>HTML before the section</Label>
                <TextArea mono rows={4} value={adv.htmlBefore || ""} onChange={(v) => setAdv("htmlBefore", v, "hb")} />
              </div>
              <div>
                <Label>HTML after the section</Label>
                <TextArea mono rows={4} value={adv.htmlAfter || ""} onChange={(v) => setAdv("htmlAfter", v, "ha")} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Single element (picked in the preview)
// ---------------------------------------------------------------------------
export function ElementPanel({
  section,
  info,
  update,
  device,
  setDevice,
  onBackToSection,
  onSelectPath,
}: {
  section: SectionInstance;
  info: SelectedInfo;
  update: UpdateSection;
  device: Device;
  setDevice: (d: Device) => void;
  onBackToSection: () => void;
  onSelectPath: (path: string) => void;
}) {
  const path = info.path;
  const ov: ElementOverride = section.overrides?.[path] || {};
  const def = getSectionType(section.type);
  const [htmlMode, setHtmlMode] = useState(!!ov.html || !info.isLeaf);
  useEffect(() => setHtmlMode(!!section.overrides?.[path]?.html || !info.isLeaf), [path]);

  const set = (patch: Partial<ElementOverride>, key?: string) =>
    update((s) => {
      const cur = { ...(s.overrides?.[path] || {}), label: info.label, ...patch };
      (Object.keys(cur) as (keyof ElementOverride)[]).forEach((k) => {
        if (cur[k] === undefined || cur[k] === "") delete cur[k];
      });
      const o = { ...(s.overrides || {}) };
      const meaningful = Object.keys(cur).some((k) => k !== "label");
      if (meaningful) o[path] = cur;
      else delete o[path];
      s.overrides = o;
    }, key ? `el-${path}-${key}` : undefined);

  const isText = info.isLeaf && info.tag !== "img" && info.tag !== "svg" && info.tag !== "video" && info.tag !== "input";
  const changed = !!section.overrides?.[path];

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2.5 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <button onClick={onBackToSection} className="p-1 rounded hover:bg-slate-100 text-slate-500" title="Back to section">
            <ArrowLeft size={16} />
          </button>
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-[14px] text-slate-900 truncate">{info.label}</div>
            <div className="text-[11px] text-slate-400 truncate">in {section.name || def?.label}</div>
          </div>
          {changed && (
            <button
              onClick={() =>
                update((s) => {
                  const o = { ...(s.overrides || {}) };
                  delete o[path];
                  s.overrides = o;
                })
              }
              className="text-[11px] font-semibold text-red-500 hover:underline flex items-center gap-1"
            >
              <RotateCcw size={12} /> Reset
            </button>
          )}
        </div>
        {info.crumbs.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1 text-[11px]">
            <button className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-blue-100" onClick={onBackToSection}>
              Whole section
            </button>
            <span className="text-slate-300 self-center">›</span>
            {info.crumbs.slice(-3).map((c) => (
              <button key={c.path} className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-blue-100 max-w-[140px] truncate" onClick={() => onSelectPath(c.path)} title={c.label}>
                {c.label.split(" · ")[0]} ›
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex-1 overflow-auto px-3 py-3 space-y-4">
        {/* content */}
        {info.tag !== "img" && info.tag !== "video" && info.tag !== "iframe" && (
          <div className="space-y-2">
            {isText && !htmlMode ? (
              <div>
                <Label help="Tip: double-click text in the preview to type directly.">Text</Label>
                <TextArea rows={3} value={ov.text ?? info.text} onChange={(v) => set({ text: v, html: undefined }, "text")} />
              </div>
            ) : (
              <div>
                <Label help={isText ? undefined : "Replaces everything inside this element. Interactive behaviour (e.g. a button's click) is replaced too."}>Content (HTML)</Label>
                <TextArea mono rows={6} value={ov.html ?? info.html} onChange={(v) => set({ html: v, text: undefined }, "html")} />
              </div>
            )}
            {isText && (
              <Toggle
                label="Use rich HTML (bold, links, line breaks)"
                checked={htmlMode}
                onChange={(on) => {
                  setHtmlMode(on);
                  if (!on && ov.html) set({ html: undefined });
                }}
              />
            )}
          </div>
        )}

        {/* media */}
        {info.isMedia ? (
          <div className="space-y-2">
            <div>
              <Label>{info.tag === "video" ? "Video" : info.tag === "iframe" ? "Embed URL" : "Image"}</Label>
              <MediaInput value={ov.src ?? info.src} onChange={(v) => set({ src: v }, "src")} kind={info.tag === "video" ? "video" : "image"} />
            </div>
            {info.tag === "img" && (
              <div>
                <Label help="Describes the image for SEO and screen readers">Alt text</Label>
                <TextInput value={ov.alt ?? info.alt} onChange={(v) => set({ alt: v }, "alt")} />
              </div>
            )}
          </div>
        ) : (
          <details className="group" open={!!ov.src}>
            <summary className="text-[12px] font-semibold text-slate-600 cursor-pointer">Background image</summary>
            <div className="mt-2">
              <MediaInput value={ov.src || ""} onChange={(v) => set({ src: v }, "src")} />
            </div>
          </details>
        )}

        {/* link */}
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <Label help={info.isLink ? "Where this goes when clicked. /page, #section, #audit (lead form) or https://…" : "Make this element clickable"}>Link</Label>
          <TextInput value={ov.href ?? info.href} onChange={(v) => set({ href: v }, "href")} placeholder="/contact or https://…" list="cms-page-paths" />
          <Toggle label="Open in new tab" checked={(ov.target ?? info.target) === "_blank"} onChange={(on) => set({ target: on ? "_blank" : "_self" })} />
        </div>

        {/* visibility + classes */}
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <Toggle label="Hide this element" checked={!!ov.hidden} onChange={(on) => set({ hidden: on || undefined })} />
          {ov.hidden && <p className="text-[11px] text-slate-400">Hidden elements stay in the “Edited elements” list of the section so you can bring them back.</p>}
          <div>
            <Label>Extra CSS classes</Label>
            <TextInput value={ov.className || ""} onChange={(v) => set({ className: v }, "cls")} placeholder="Tailwind or your own classes" />
          </div>
        </div>

        {/* style */}
        <div className="pt-2 border-t border-slate-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Style</div>
          <StyleEditor element value={ov.style} device={device} onDeviceChange={setDevice} onChange={(v) => set({ style: v }, "style")} />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page settings (shown when nothing is selected)
// ---------------------------------------------------------------------------
export function PagePanel({ doc, update, builtin }: { doc: PageDoc; update: (fn: (d: PageDoc) => void, key?: string) => void; builtin: boolean }) {
  const seo = doc.seo || {};
  const setSeo = (k: keyof PageDoc["seo"], v: any) =>
    update((d) => {
      d.seo = { ...(d.seo || {}), [k]: v };
    }, `seo-${k}`);
  const isGroup = doc.kind === "group";
  return (
    <div className="h-full overflow-auto">
      <div className="px-3 py-3 border-b border-slate-200">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{isGroup ? "Template" : "Page settings"}</div>
        <div className="font-semibold text-slate-900">{doc.title}</div>
        <div className="text-[12px] text-slate-500">{slugToPath(doc.slug)}</div>
      </div>
      <div className="px-3 py-3 space-y-3">
        <p className="text-[12px] text-slate-500 leading-snug">Select a section on the left (or click anything in the preview) to edit it.</p>
        <div>
          <Label>Page name (internal)</Label>
          <TextInput value={doc.title} onChange={(v) => update((d) => (d.title = v), "title")} />
        </div>
        {!isGroup && (
          <>
            <div className="pt-2 border-t border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400">SEO</div>
            <div>
              <Label help={`${(seo.title || "").length}/60 characters`}>Page title</Label>
              <TextInput value={seo.title || ""} onChange={(v) => setSeo("title", v)} placeholder={builtin ? "Keep the current title" : doc.title} />
            </div>
            <div>
              <Label help={`${(seo.description || "").length}/160 characters`}>Meta description</Label>
              <TextArea rows={3} value={seo.description || ""} onChange={(v) => setSeo("description", v)} />
            </div>
            <div>
              <Label>Keywords</Label>
              <TextInput value={seo.keywords || ""} onChange={(v) => setSeo("keywords", v)} />
            </div>
            <div>
              <Label>Social share image</Label>
              <MediaInput value={seo.ogImage || ""} onChange={(v) => setSeo("ogImage", v)} />
            </div>
            <div>
              <Label>Canonical URL</Label>
              <TextInput value={seo.canonical || ""} onChange={(v) => setSeo("canonical", v)} placeholder="https://hastagcreator.com/…" />
            </div>
            <Toggle label="Hide from Google (noindex)" checked={!!seo.noindex} onChange={(v) => setSeo("noindex", v)} />
            <div className="rounded-md bg-slate-50 border border-slate-200 p-2.5">
              <div className="text-[13px] text-blue-800 truncate">{seo.title || doc.title}</div>
              <div className="text-[11px] text-green-700 truncate">hastagcreator.com{slugToPath(doc.slug)}</div>
              <div className="text-[12px] text-slate-600 line-clamp-2">{seo.description || "Add a meta description to control what Google shows."}</div>
            </div>
            <div className="pt-2 border-t border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400">Layout</div>
            <Toggle label="Hide header on this page" checked={!!doc.hideHeader} onChange={(v) => update((d) => (d.hideHeader = v))} />
            <Toggle label="Hide footer on this page" checked={!!doc.hideFooter} onChange={(v) => update((d) => (d.hideFooter = v))} />
          </>
        )}
        <div className="pt-2 border-t border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400">Page code</div>
        <div>
          <Label help="Applies only to this page">Custom CSS</Label>
          <TextArea mono rows={5} value={doc.customCss || ""} onChange={(v) => update((d) => (d.customCss = v), "pcss")} />
        </div>
        <div>
          <Label help="Runs when this page opens. Errors are caught.">Custom JavaScript</Label>
          <TextArea mono rows={5} value={doc.customJs || ""} onChange={(v) => update((d) => (d.customJs = v), "pjs")} />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Theme settings
// ---------------------------------------------------------------------------
export function ThemePanel({ theme, update }: { theme: ThemeDoc; update: (fn: (t: ThemeDoc) => void, key?: string) => void }) {
  return (
    <div className="px-3 py-3 space-y-3">
      <p className="text-[12px] text-slate-500 leading-snug">Site-wide colors, fonts and code. Empty = keep the original design.</p>
      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Colors</div>
      {THEME_COLOR_FIELDS.map((c) => (
        <div key={c.key}>
          <Label>{c.label}</Label>
          <ColorInput value={theme.colors?.[c.key] || ""} placeholder={c.value} onChange={(v) => update((t) => (t.colors = { ...(t.colors || {}), [c.key]: v }), `c-${c.key}`)} />
        </div>
      ))}
      <div className="pt-2 border-t border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400">Typography</div>
      <div>
        <Label>Heading font</Label>
        <SelectInput value={theme.headingFont || ""} onChange={(v) => update((t) => (t.headingFont = v))} placeholder="Original (Outfit)" options={FONT_OPTIONS.map((f) => ({ label: f, value: f }))} />
      </div>
      <div>
        <Label>Body font</Label>
        <SelectInput value={theme.bodyFont || ""} onChange={(v) => update((t) => (t.bodyFont = v))} placeholder="Original (Inter)" options={FONT_OPTIONS.map((f) => ({ label: f, value: f }))} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label>Base font size</Label>
          <TextInput value={theme.baseFontSize || ""} onChange={(v) => update((t) => (t.baseFontSize = v), "bfs")} placeholder="16px" />
        </div>
        <div>
          <Label>Corner radius</Label>
          <TextInput value={theme.radius || ""} onChange={(v) => update((t) => (t.radius = v), "rad")} placeholder="1.5rem" />
        </div>
      </div>
      <div className="pt-2 border-t border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400">Global code</div>
      <div>
        <Label help="Applies to every page">Global CSS</Label>
        <TextArea mono rows={6} value={theme.customCss || ""} onChange={(v) => update((t) => (t.customCss = v), "gcss")} />
      </div>
      <div>
        <Label help="Runs on every page load. Errors are caught.">Global JavaScript</Label>
        <TextArea mono rows={6} value={theme.customJs || ""} onChange={(v) => update((t) => (t.customJs = v), "gjs")} />
      </div>
      <div>
        <Label help="Extra tags for <head>: verification meta tags, pixels, fonts… (your GTM, GA4, Meta Pixel and Clarity are already installed)">Head code</Label>
        <TextArea mono rows={5} value={theme.headHtml || ""} onChange={(v) => update((t) => (t.headHtml = v), "head")} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Add section dialog
// ---------------------------------------------------------------------------
export function AddSectionDialog({ open, onClose, onAdd, group }: { open: boolean; onClose: () => void; onAdd: (type: string) => void; group: "header" | "footer" | "page" }) {
  const [q, setQ] = useState("");
  const types = useMemo(
    () =>
      allSectionTypes().filter((t) => {
        if (t.type.startsWith("page-")) return false; // whole old pages are not re-addable
        if (t.group === "header" && group !== "header") return false;
        if (t.group === "footer" && group !== "footer") return false;
        if (!q) return true;
        return (t.label + " " + (t.description || "") + " " + t.category).toLowerCase().includes(q.toLowerCase());
      }),
    [q, group],
  );
  if (!open) return null;
  const cats = Array.from(new Set(types.map((t) => t.category)));
  const order = ["Text", "Media", "Commerce", "Social proof", "Forms", "Layout", "Header & footer", "Existing sections", "Advanced"];
  cats.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  return (
    <div className="fixed inset-0 z-[1000] bg-black/40 flex items-center justify-center p-4" onMouseDown={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col" onMouseDown={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 px-4 py-3 border-b">
          <h3 className="font-semibold text-slate-800">Add section</h3>
          <div className="relative ml-4 flex-1">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input autoFocus className={`${inputCls} pl-8`} placeholder="Search sections…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-500 hover:text-slate-900">
            <X size={18} />
          </button>
        </div>
        <div className="overflow-auto p-4 space-y-5">
          {cats.map((c) => (
            <div key={c}>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">{c}</div>
              <div className="grid sm:grid-cols-2 gap-2">
                {types
                  .filter((t) => t.category === c)
                  .map((t) => (
                    <button key={t.type} onClick={() => onAdd(t.type)} className="text-left p-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50">
                      <div className="font-semibold text-[13px] text-slate-900">{t.label}</div>
                      {t.description && <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{t.description}</div>}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Revisions + submissions
// ---------------------------------------------------------------------------
export function RevisionsDialog({ slug, onClose, onRestore }: { slug: string | null; onClose: () => void; onRestore: (data: any) => void }) {
  const [rows, setRows] = useState<any[] | null>(null);
  const [err, setErr] = useState("");
  useEffect(() => {
    if (!slug) return;
    setRows(null);
    listRevisions(slug)
      .then(setRows)
      .catch((e) => {
        setErr(e.message);
        setRows([]);
      });
  }, [slug]);
  if (!slug) return null;
  return (
    <div className="fixed inset-0 z-[1000] bg-black/40 flex items-center justify-center p-4" onMouseDown={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col" onMouseDown={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 px-4 py-3 border-b">
          <History size={16} />
          <h3 className="font-semibold text-slate-800">Published versions · {slugToPath(slug)}</h3>
          <button onClick={onClose} className="ml-auto p-1.5 text-slate-500 hover:text-slate-900">
            <X size={18} />
          </button>
        </div>
        <div className="overflow-auto divide-y">
          {rows === null && <Loader2 className="m-6 animate-spin text-slate-400" />}
          {err && <p className="p-4 text-sm text-red-600">{err}</p>}
          {rows?.length === 0 && !err && <p className="p-4 text-sm text-slate-500">No published versions yet.</p>}
          {rows?.map((r) => (
            <div key={r.id} className="flex items-center gap-3 px-4 py-2.5 text-[13px]">
              <div className="flex-1">
                <div className="font-medium text-slate-800">{new Date(r.created_at).toLocaleString()}</div>
                <div className="text-[11px] text-slate-500">{r.created_by || "—"} · {r.data?.sections?.length ?? "–"} sections</div>
              </div>
              <button
                className="text-[12px] font-semibold px-2.5 py-1 rounded-md border border-slate-300 hover:bg-slate-50"
                onClick={() => {
                  if (confirm("Load this version into the editor? (You can still undo, and nothing goes live until you publish.)")) onRestore(r.data);
                }}
              >
                Restore
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SubmissionsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [rows, setRows] = useState<any[] | null>(null);
  const [err, setErr] = useState("");
  useEffect(() => {
    if (!open) return;
    listSubmissions()
      .then(setRows)
      .catch((e) => {
        setErr(e.message);
        setRows([]);
      });
  }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[1000] bg-black/40 flex items-center justify-center p-4" onMouseDown={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col" onMouseDown={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 px-4 py-3 border-b">
          <h3 className="font-semibold text-slate-800">Form submissions (newsletter / contact sections)</h3>
          <button onClick={onClose} className="ml-auto p-1.5 text-slate-500 hover:text-slate-900">
            <X size={18} />
          </button>
        </div>
        <div className="overflow-auto">
          {rows === null && <Loader2 className="m-6 animate-spin text-slate-400" />}
          {err && <p className="p-4 text-sm text-red-600">{err}</p>}
          {rows?.length === 0 && !err && <p className="p-4 text-sm text-slate-500">No submissions yet.</p>}
          {rows && rows.length > 0 && (
            <table className="w-full text-[12px]">
              <thead className="bg-slate-50 text-slate-500 text-left">
                <tr>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Form</th>
                  <th className="px-3 py-2">Page</th>
                  <th className="px-3 py-2">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td className="px-3 py-2 whitespace-nowrap">{new Date(r.created_at).toLocaleString()}</td>
                    <td className="px-3 py-2">{r.form}</td>
                    <td className="px-3 py-2">{r.page}</td>
                    <td className="px-3 py-2">
                      {Object.entries(r.data || {}).map(([k, v]) => (
                        <div key={k}>
                          <b>{k}:</b> {String(v)}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export { Plus, Trash2 };

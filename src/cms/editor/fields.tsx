import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bold, ChevronDown, ChevronRight, Copy, Film, GripVertical, Heading2, Heading3, Image as ImageIcon, Italic, Link2,
  List, ListOrdered, Loader2, Plus, Quote, RemoveFormatting, Trash2, Underline, Upload, X, AlignLeft, AlignCenter, AlignRight,
} from "lucide-react";
import type { FieldDef } from "../types";
import { ICONS } from "../blocks";
import { listMedia, listProducts, uploadMedia } from "../store";
import { PUBLIC_ASSETS } from "./publicAssets";

// ---------------------------------------------------------------------------
// small UI primitives (editor look, independent of the site's theme)
// ---------------------------------------------------------------------------
export const inputCls =
  "w-full h-9 px-2.5 rounded-md border border-slate-300 bg-white text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500";
export const labelCls = "block text-[12px] font-semibold text-slate-600 mb-1";

export function Label({ children, help }: { children: React.ReactNode; help?: string }) {
  return (
    <div className="mb-1">
      <span className={labelCls}>{children}</span>
      {help && <span className="block text-[11px] text-slate-400 leading-snug -mt-0.5 mb-1">{help}</span>}
    </div>
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: React.ReactNode }) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer select-none py-1">
      {label && <span className="text-[13px] text-slate-700">{label}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${checked ? "bg-blue-600" : "bg-slate-300"}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-4" : ""}`} />
      </button>
    </label>
  );
}

export function TextInput({ value, onChange, placeholder, list, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; list?: string; type?: string }) {
  return <input type={type} className={inputCls} value={value ?? ""} placeholder={placeholder} list={list} onChange={(e) => onChange(e.target.value)} />;
}

export function TextArea({ value, onChange, rows = 3, mono, placeholder }: { value: string; onChange: (v: string) => void; rows?: number; mono?: boolean; placeholder?: string }) {
  return (
    <textarea
      className={`${inputCls} h-auto py-2 leading-relaxed ${mono ? "font-mono text-[12px] bg-slate-950 text-slate-100 border-slate-800" : ""}`}
      rows={rows}
      spellCheck={!mono}
      value={value ?? ""}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (mono && e.key === "Tab") {
          e.preventDefault();
          const t = e.currentTarget;
          const { selectionStart: s, selectionEnd: en } = t;
          const v = t.value.slice(0, s) + "  " + t.value.slice(en);
          onChange(v);
          requestAnimationFrame(() => t.setSelectionRange(s + 2, s + 2));
        }
      }}
    />
  );
}

export function ColorInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  const hex = /^#[0-9a-f]{6}$/i.test(value || "") ? value : /^#[0-9a-f]{6}$/i.test(placeholder || "") ? placeholder! : "#000000";
  return (
    <div className="flex items-center gap-1.5">
      <input type="color" value={hex} onChange={(e) => onChange(e.target.value)} className="w-9 h-9 rounded-md border border-slate-300 p-0.5 bg-white cursor-pointer shrink-0" />
      <input className={inputCls} value={value || ""} placeholder={placeholder || "e.g. #0033FF or rgba(…)"} onChange={(e) => onChange(e.target.value)} />
      {value && (
        <button type="button" title="Clear" onClick={() => onChange("")} className="p-1.5 text-slate-400 hover:text-slate-700">
          <X size={14} />
        </button>
      )}
    </div>
  );
}

export function SelectInput({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: { label: string; value: string }[]; placeholder?: string }) {
  return (
    <select className={inputCls} value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
      {placeholder !== undefined && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

// ---------------------------------------------------------------------------
// Rich text editor (no dependencies)
// ---------------------------------------------------------------------------
export function RichTextInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [source, setSource] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (el && document.activeElement !== el && el.innerHTML !== (value || "")) el.innerHTML = value || "";
  }, [value, source]);
  const cmd = (c: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand(c, false, arg);
    onChange(ref.current?.innerHTML || "");
  };
  const btn = (icon: React.ReactNode, title: string, fn: () => void) => (
    <button type="button" title={title} onMouseDown={(e) => e.preventDefault()} onClick={fn} className="p-1.5 rounded hover:bg-slate-200 text-slate-600">
      {icon}
    </button>
  );
  return (
    <div className="rounded-md border border-slate-300 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/40">
      <div className="flex flex-wrap items-center gap-0.5 px-1 py-1 border-b border-slate-200 bg-slate-50">
        {btn(<Bold size={14} />, "Bold", () => cmd("bold"))}
        {btn(<Italic size={14} />, "Italic", () => cmd("italic"))}
        {btn(<Underline size={14} />, "Underline", () => cmd("underline"))}
        {btn(<Heading2 size={14} />, "Heading", () => cmd("formatBlock", "<h2>"))}
        {btn(<Heading3 size={14} />, "Sub-heading", () => cmd("formatBlock", "<h3>"))}
        {btn(<span className="text-[11px] font-bold px-0.5">P</span>, "Paragraph", () => cmd("formatBlock", "<p>"))}
        {btn(<List size={14} />, "Bullet list", () => cmd("insertUnorderedList"))}
        {btn(<ListOrdered size={14} />, "Numbered list", () => cmd("insertOrderedList"))}
        {btn(<Quote size={14} />, "Quote", () => cmd("formatBlock", "<blockquote>"))}
        {btn(<AlignLeft size={14} />, "Align left", () => cmd("justifyLeft"))}
        {btn(<AlignCenter size={14} />, "Center", () => cmd("justifyCenter"))}
        {btn(<AlignRight size={14} />, "Align right", () => cmd("justifyRight"))}
        {btn(<Link2 size={14} />, "Link", () => {
          const url = prompt("Link URL (e.g. /contact or https://…)");
          if (url) cmd("createLink", url);
        })}
        {btn(<RemoveFormatting size={14} />, "Clear formatting", () => cmd("removeFormat"))}
        <button type="button" onClick={() => setSource(!source)} className={`ml-auto text-[11px] font-mono px-1.5 py-1 rounded ${source ? "bg-slate-800 text-white" : "text-slate-500 hover:bg-slate-200"}`}>
          {"</>"}
        </button>
      </div>
      {source ? (
        <textarea className="w-full min-h-[140px] p-2 font-mono text-[12px] bg-slate-950 text-slate-100 outline-none" value={value || ""} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          className="cms-prose min-h-[110px] max-h-[360px] overflow-auto p-2.5 text-[13px] text-slate-800 outline-none"
          onInput={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Media library
// ---------------------------------------------------------------------------
export function MediaLibrary({ open, onClose, onPick, accept = "image" }: { open: boolean; onClose: () => void; onPick: (url: string) => void; accept?: "image" | "video" | "any" }) {
  const [tab, setTab] = useState<"uploads" | "site" | "url">("uploads");
  const [items, setItems] = useState<{ name: string; url: string }[] | null>(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setErr("");
    listMedia()
      .then(setItems)
      .catch((e) => {
        setItems([]);
        setErr(e.message || String(e));
      });
  }, [open]);

  if (!open) return null;
  const isVideo = (u: string) => /\.(mp4|webm|mov|m4v)(\?|$)/i.test(u);
  const filter = (u: string) => (accept === "any" ? true : accept === "video" ? isVideo(u) : !isVideo(u));

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    setErr("");
    try {
      let last = "";
      for (const f of Array.from(files)) last = await uploadMedia(f);
      setItems(await listMedia());
      if (files.length === 1 && last) onPick(last);
    } catch (e: any) {
      setErr(e.message || String(e));
    } finally {
      setBusy(false);
    }
  };

  const Thumb = ({ u, name }: { u: string; name: string }) => (
    <button type="button" onClick={() => onPick(u)} className="group relative aspect-square rounded-lg overflow-hidden border border-slate-200 bg-[repeating-conic-gradient(#f1f5f9_0_25%,#fff_0_50%)] bg-[length:16px_16px] hover:ring-2 hover:ring-blue-500">
      {isVideo(u) ? (
        <video src={encodeURI(u)} className="w-full h-full object-cover" muted />
      ) : (
        <img src={encodeURI(u)} alt={name} className="w-full h-full object-contain" loading="lazy" />
      )}
      <span className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[10px] px-1.5 py-0.5 truncate opacity-0 group-hover:opacity-100">{name}</span>
    </button>
  );

  return (
    <div className="fixed inset-0 z-[1000] bg-black/40 flex items-center justify-center p-4" onMouseDown={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col" onMouseDown={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 px-4 py-3 border-b">
          <h3 className="font-semibold text-slate-800">Media library</h3>
          <div className="ml-4 flex gap-1 text-[13px]">
            {(["uploads", "site", "url"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 rounded-md ${tab === t ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
                {t === "uploads" ? "Uploaded" : t === "site" ? "Site files" : "From URL"}
              </button>
            ))}
          </div>
          <button onClick={onClose} className="ml-auto p-1.5 text-slate-500 hover:text-slate-900">
            <X size={18} />
          </button>
        </div>
        <div className="p-4 overflow-auto">
          {tab === "uploads" && (
            <>
              <input ref={fileRef} type="file" multiple accept={accept === "video" ? "video/*" : accept === "image" ? "image/*" : "image/*,video/*"} className="hidden" onChange={(e) => upload(e.target.files)} />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  upload(e.dataTransfer.files);
                }}
                className="w-full border-2 border-dashed border-slate-300 rounded-xl py-6 text-slate-500 hover:border-blue-500 hover:text-blue-600 flex flex-col items-center gap-2"
              >
                {busy ? <Loader2 className="animate-spin" /> : <Upload />}
                <span className="text-sm font-medium">{busy ? "Uploading…" : "Click or drop files to upload"}</span>
              </button>
              {err && <p className="mt-3 text-[12px] text-red-600">Upload/list failed: {err}. (Did you run supabase/cms.sql to create the “cms-media” bucket?)</p>}
              <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 gap-2">
                {items === null ? <Loader2 className="animate-spin text-slate-400" /> : items.filter((i) => filter(i.url)).map((i) => <Thumb key={i.url} u={i.url} name={i.name} />)}
              </div>
            </>
          )}
          {tab === "site" && (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {PUBLIC_ASSETS.filter(filter).map((u) => (
                <Thumb key={u} u={u} name={u} />
              ))}
            </div>
          )}
          {tab === "url" && (
            <div className="flex gap-2">
              <input className={inputCls} placeholder="https://…" value={url} onChange={(e) => setUrl(e.target.value)} />
              <button className="px-4 rounded-md bg-blue-600 text-white text-sm font-semibold" onClick={() => url && onPick(url)}>
                Use
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function MediaInput({ value, onChange, kind = "image" }: { value: string; onChange: (v: string) => void; kind?: "image" | "video" }) {
  const [open, setOpen] = useState(false);
  const isVid = kind === "video" || /\.(mp4|webm|mov)(\?|$)/i.test(value || "");
  return (
    <div>
      <div className="flex gap-2 items-stretch">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-16 h-16 shrink-0 rounded-md border border-slate-300 bg-[repeating-conic-gradient(#f1f5f9_0_25%,#fff_0_50%)] bg-[length:12px_12px] overflow-hidden flex items-center justify-center hover:ring-2 hover:ring-blue-500"
        >
          {value ? (
            isVid ? (
              <Film size={20} className="text-slate-500" />
            ) : (
              <img src={value.startsWith("/") ? encodeURI(value) : value} alt="" className="w-full h-full object-contain" />
            )
          ) : kind === "video" ? (
            <Film size={20} className="text-slate-400" />
          ) : (
            <ImageIcon size={20} className="text-slate-400" />
          )}
        </button>
        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          <input className={inputCls} value={value || ""} placeholder={kind === "video" ? "Upload or paste a video / YouTube URL" : "Upload or paste an image URL"} onChange={(e) => onChange(e.target.value)} />
          <div className="flex gap-1.5">
            <button type="button" onClick={() => setOpen(true)} className="text-[12px] font-semibold px-2.5 py-1 rounded-md bg-slate-900 text-white">
              {value ? "Change" : "Select"}
            </button>
            {value && (
              <button type="button" onClick={() => onChange("")} className="text-[12px] font-semibold px-2.5 py-1 rounded-md border border-slate-300 text-slate-600">
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
      <MediaLibrary
        open={open}
        accept={kind}
        onClose={() => setOpen(false)}
        onPick={(u) => {
          onChange(u);
          setOpen(false);
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Product picker
// ---------------------------------------------------------------------------
function ProductsInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [products, setProducts] = useState<{ id: string; title: string }[] | null>(null);
  useEffect(() => {
    listProducts().then(setProducts);
  }, []);
  const sel = Array.isArray(value) ? value.map(String) : [];
  if (!products) return <Loader2 size={16} className="animate-spin text-slate-400" />;
  if (!products.length) return <p className="text-[12px] text-slate-500">No products found. Add products in /admin.</p>;
  return (
    <div className="max-h-56 overflow-auto rounded-md border border-slate-200 divide-y">
      {products.map((p) => {
        const on = sel.includes(String(p.id));
        return (
          <label key={p.id} className="flex items-center gap-2 px-2.5 py-1.5 text-[13px] cursor-pointer hover:bg-slate-50">
            <input type="checkbox" checked={on} onChange={() => onChange(on ? sel.filter((x) => x !== String(p.id)) : [...sel, String(p.id)])} />
            <span className="truncate">{p.title}</span>
            {on && <span className="ml-auto text-[11px] text-slate-400">#{sel.indexOf(String(p.id)) + 1}</span>}
          </label>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Icon picker
// ---------------------------------------------------------------------------
function IconInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const C = (value && ICONS[value]) || null;
  return (
    <div>
      <button type="button" onClick={() => setOpen(!open)} className={`${inputCls} flex items-center gap-2 text-left`}>
        {C ? <C size={16} /> : <span className="w-4" />}
        <span className="flex-1">{value || "Choose icon"}</span>
        <ChevronDown size={14} />
      </button>
      {open && (
        <div className="mt-1 grid grid-cols-8 gap-1 p-2 rounded-md border border-slate-200 bg-white max-h-48 overflow-auto">
          {Object.entries(ICONS).map(([name, I]) => (
            <button
              key={name}
              type="button"
              title={name}
              onClick={() => {
                onChange(name);
                setOpen(false);
              }}
              className={`p-1.5 rounded hover:bg-blue-50 flex items-center justify-center ${value === name ? "bg-blue-100 text-blue-700" : "text-slate-600"}`}
            >
              <I size={16} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// List (repeater) field
// ---------------------------------------------------------------------------
function ListInput({ field, value, onChange, pages }: { field: FieldDef; value: any[]; onChange: (v: any[]) => void; pages: string[] }) {
  const items = Array.isArray(value) ? value : [];
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [drag, setDrag] = useState<number | null>(null);
  const titleOf = (it: any, i: number) => {
    const t = field.itemLabel ? it?.[field.itemLabel] : "";
    const s = typeof t === "string" ? t.replace(/<[^>]+>/g, "") : "";
    return s || `Item ${i + 1}`;
  };
  const set = (i: number, v: any) => onChange(items.map((x, k) => (k === i ? v : x)));
  const blank = () => Object.fromEntries((field.fields || []).filter((f) => f.type !== "heading").map((f) => [f.key, f.default ?? (f.type === "list" ? [] : f.type === "toggle" ? false : "")]));
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50/60">
      {items.map((it, i) => (
        <div
          key={i}
          className={`border-b border-slate-200 last:border-b-0 ${drag === i ? "opacity-40" : ""}`}
          draggable={openIdx === null}
          onDragStart={(e) => {
            setDrag(i);
            e.dataTransfer.effectAllowed = "move";
          }}
          onDragEnd={() => setDrag(null)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (drag === null || drag === i) return;
            const next = [...items];
            const [m] = next.splice(drag, 1);
            next.splice(i, 0, m);
            onChange(next);
            setDrag(null);
          }}
        >
          <div className="flex items-center gap-1 px-1.5 py-1.5">
            <GripVertical size={14} className="text-slate-400 cursor-grab shrink-0" />
            <button type="button" onClick={() => setOpenIdx(openIdx === i ? null : i)} className="flex-1 min-w-0 flex items-center gap-1 text-left text-[13px] text-slate-800">
              {openIdx === i ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              <span className="truncate">{titleOf(it, i)}</span>
            </button>
            <button type="button" title="Duplicate" onClick={() => onChange([...items.slice(0, i + 1), JSON.parse(JSON.stringify(it)), ...items.slice(i + 1)])} className="p-1 text-slate-400 hover:text-slate-800">
              <Copy size={13} />
            </button>
            <button
              type="button"
              title="Delete"
              onClick={() => {
                onChange(items.filter((_, k) => k !== i));
                setOpenIdx(null);
              }}
              className="p-1 text-slate-400 hover:text-red-600"
            >
              <Trash2 size={13} />
            </button>
          </div>
          {openIdx === i && (
            <div className="px-3 pb-3 pt-1 space-y-3 bg-white border-t border-slate-100">
              <FieldsForm fields={field.fields || []} values={it || {}} onChange={(k, v) => set(i, { ...(it || {}), [k]: v })} pages={pages} />
            </div>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          onChange([...items, blank()]);
          setOpenIdx(items.length);
        }}
        className="w-full flex items-center justify-center gap-1 py-2 text-[12px] font-semibold text-blue-600 hover:bg-blue-50 rounded-b-md"
      >
        <Plus size={14} /> Add {field.label.toLowerCase().replace(/s$/, "")}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Generic field + form
// ---------------------------------------------------------------------------
export function FieldControl({ field, value, onChange, pages }: { field: FieldDef; value: any; onChange: (v: any) => void; pages: string[] }) {
  const v = value ?? field.default;
  switch (field.type) {
    case "heading":
      return <div className="pt-3 -mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-t border-slate-200">{field.label}</div>;
    case "text":
      return (
        <div>
          <Label help={field.help}>{field.label}</Label>
          <TextInput value={v ?? ""} onChange={onChange} placeholder={field.placeholder} />
        </div>
      );
    case "url":
      return (
        <div>
          <Label help={field.help}>{field.label}</Label>
          <TextInput value={v ?? ""} onChange={onChange} placeholder={field.placeholder || "/page, #section or https://…"} list="cms-page-paths" />
        </div>
      );
    case "textarea":
      return (
        <div>
          <Label help={field.help}>{field.label}</Label>
          <TextArea value={v ?? ""} onChange={onChange} rows={3} />
        </div>
      );
    case "richtext":
      return (
        <div>
          <Label help={field.help}>{field.label}</Label>
          <RichTextInput value={v ?? ""} onChange={onChange} />
        </div>
      );
    case "code":
      return (
        <div>
          <Label help={field.help}>{field.label}</Label>
          <TextArea value={v ?? ""} onChange={onChange} rows={10} mono />
        </div>
      );
    case "image":
    case "video":
      return (
        <div>
          <Label help={field.help}>{field.label}</Label>
          <MediaInput value={v ?? ""} onChange={onChange} kind={field.type} />
        </div>
      );
    case "color":
      return (
        <div>
          <Label help={field.help}>{field.label}</Label>
          <ColorInput value={v ?? ""} onChange={onChange} />
        </div>
      );
    case "number":
      return (
        <div>
          <Label help={field.help}>{field.label}</Label>
          <input type="number" className={inputCls} value={v ?? ""} min={field.min} max={field.max} step={field.step} onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))} />
        </div>
      );
    case "range":
      return (
        <div>
          <div className="flex items-center justify-between">
            <Label help={field.help}>{field.label}</Label>
            <input
              type="number"
              className="w-16 h-7 px-1.5 text-right rounded border border-slate-300 text-[12px]"
              value={v ?? ""}
              min={field.min}
              max={field.max}
              onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
            />
          </div>
          <input type="range" className="w-full accent-blue-600" min={field.min ?? 0} max={field.max ?? 100} step={field.step ?? 1} value={Number(v ?? field.min ?? 0)} onChange={(e) => onChange(Number(e.target.value))} />
        </div>
      );
    case "toggle":
      return <Toggle checked={!!v} onChange={onChange} label={field.label} />;
    case "select":
      return (
        <div>
          <Label help={field.help}>{field.label}</Label>
          <SelectInput value={v ?? ""} onChange={onChange} options={field.options || []} />
        </div>
      );
    case "icon":
      return (
        <div>
          <Label help={field.help}>{field.label}</Label>
          <IconInput value={v ?? ""} onChange={onChange} />
        </div>
      );
    case "products":
      return (
        <div>
          <Label help={field.help}>{field.label}</Label>
          <ProductsInput value={v ?? []} onChange={onChange} />
        </div>
      );
    case "list":
      return (
        <div>
          <Label help={field.help}>{field.label}</Label>
          <ListInput field={field} value={v ?? []} onChange={onChange} pages={pages} />
        </div>
      );
    default:
      return null;
  }
}

export function FieldsForm({ fields, values, onChange, pages }: { fields: FieldDef[]; values: Record<string, any>; onChange: (key: string, v: any) => void; pages: string[] }) {
  return (
    <>
      {fields.map((f) => (
        <FieldControl key={f.key} field={f} value={values?.[f.key]} onChange={(v) => onChange(f.key, v)} pages={pages} />
      ))}
    </>
  );
}

/** Suggestions for link fields */
export function PagePathsDatalist({ paths }: { paths: string[] }) {
  const all = useMemo(() => Array.from(new Set([...paths, "#audit", "#faq", "#results", "#pricing"])), [paths]);
  return (
    <datalist id="cms-page-paths">
      {all.map((p) => (
        <option key={p} value={p} />
      ))}
    </datalist>
  );
}

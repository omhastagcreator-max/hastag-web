import { useState } from "react";
import { ChevronDown, ChevronRight, Monitor, Smartphone, Tablet } from "lucide-react";
import type { Device, ResponsiveStyle, StyleProps } from "../types";
import { ColorInput, Label, MediaInput, SelectInput, inputCls } from "./fields";

export const FONT_OPTIONS = [
  "Inter", "Outfit", "Poppins", "Montserrat", "DM Sans", "Plus Jakarta Sans", "Manrope", "Space Grotesk", "Sora", "Urbanist",
  "Lato", "Open Sans", "Roboto", "Raleway", "Nunito", "Work Sans", "Playfair Display", "Merriweather", "Lora", "DM Serif Display",
  "Bebas Neue", "Oswald", "Archivo", "Figtree", "Mulish",
];

const devIcon = { desktop: Monitor, tablet: Tablet, mobile: Smartphone };

export function DeviceTabs({ device, onChange }: { device: Device; onChange: (d: Device) => void }) {
  return (
    <div className="flex rounded-md bg-slate-100 p-0.5">
      {(["desktop", "tablet", "mobile"] as Device[]).map((d) => {
        const I = devIcon[d];
        return (
          <button
            key={d}
            type="button"
            onClick={() => onChange(d)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded text-[12px] font-semibold capitalize ${device === d ? "bg-white shadow text-slate-900" : "text-slate-500"}`}
          >
            <I size={13} /> {d}
          </button>
        );
      })}
    </div>
  );
}

function Group({ title, children, defaultOpen = false, count = 0 }: { title: string; children: React.ReactNode; defaultOpen?: boolean; count?: number }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-200">
      <button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center gap-1.5 py-2.5 text-[12px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900">
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        {title}
        {count > 0 && <span className="ml-auto text-[10px] font-bold bg-blue-100 text-blue-700 rounded-full px-1.5">{count}</span>}
      </button>
      {open && <div className="pb-4 space-y-3">{children}</div>}
    </div>
  );
}

/** A text box for CSS lengths that accepts plain numbers (→ px). */
function Len({ value, onChange, placeholder }: { value?: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      className={inputCls}
      value={value || ""}
      placeholder={placeholder || "auto"}
      onChange={(e) => onChange(e.target.value)}
      onBlur={(e) => {
        const v = e.target.value.trim();
        if (/^-?\d+(\.\d+)?$/.test(v) && v !== "0") onChange(v + "px");
      }}
    />
  );
}

function Box({ label, keys, style, set }: { label: string; keys: [keyof StyleProps, keyof StyleProps, keyof StyleProps, keyof StyleProps]; style: StyleProps; set: (k: keyof StyleProps, v: string) => void }) {
  const names = ["Top", "Right", "Bottom", "Left"];
  return (
    <div>
      <Label>{label}</Label>
      <div className="grid grid-cols-4 gap-1.5">
        {keys.map((k, i) => (
          <div key={k}>
            <Len value={style[k]} onChange={(v) => set(k, v)} placeholder="–" />
            <div className="text-[10px] text-center text-slate-400 mt-0.5">{names[i]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const countSet = (style: StyleProps, keys: (keyof StyleProps)[]) => keys.filter((k) => style[k]).length;

export default function StyleEditor({
  value,
  onChange,
  device,
  onDeviceChange,
  element = false,
}: {
  value: ResponsiveStyle | undefined;
  onChange: (v: ResponsiveStyle) => void;
  device: Device;
  onDeviceChange: (d: Device) => void;
  element?: boolean;
}) {
  const all = value || {};
  const style: StyleProps = all[device] || {};
  const inherited: StyleProps = device === "mobile" ? { ...(all.desktop || {}), ...(all.tablet || {}) } : device === "tablet" ? { ...(all.desktop || {}) } : {};
  const set = (k: keyof StyleProps, v: string) => {
    const next: StyleProps = { ...style, [k]: v };
    if (!v) delete next[k];
    onChange({ ...all, [device]: next });
  };
  const ph = (k: keyof StyleProps, d = "") => (inherited[k] ? `${inherited[k]} (inherited)` : d);
  const sel = (k: keyof StyleProps, opts: [string, string][]) => (
    <SelectInput value={style[k] || ""} onChange={(v) => set(k, v)} placeholder={inherited[k] ? `${inherited[k]} (inherited)` : "Default"} options={opts.map(([l, v]) => ({ label: l, value: v }))} />
  );

  return (
    <div>
      <DeviceTabs device={device} onChange={onDeviceChange} />
      <p className="text-[11px] text-slate-400 mt-1.5 mb-1 leading-snug">
        {device === "desktop" ? "Desktop styles apply everywhere unless tablet/mobile change them." : `Only applies on ${device}${device === "tablet" ? " and smaller" : ""}.`}
        {Object.keys(style).length > 0 && (
          <button type="button" className="ml-1 text-red-500 hover:underline" onClick={() => onChange({ ...all, [device]: {} })}>
            Clear {device}
          </button>
        )}
      </p>

      <Group title="Background" defaultOpen={!element} count={countSet(style, ["backgroundColor", "backgroundImage", "backgroundGradient"])}>
        <div>
          <Label>Color</Label>
          <ColorInput value={style.backgroundColor || ""} onChange={(v) => set("backgroundColor", v)} placeholder={ph("backgroundColor")} />
        </div>
        <div>
          <Label>Image</Label>
          <MediaInput value={style.backgroundImage || ""} onChange={(v) => set("backgroundImage", v)} />
        </div>
        {style.backgroundImage && (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Size</Label>
              {sel("backgroundSize", [["Cover", "cover"], ["Contain", "contain"], ["Original", "auto"]])}
            </div>
            <div>
              <Label>Position</Label>
              {sel("backgroundPosition", [["Center", "center"], ["Top", "top"], ["Bottom", "bottom"], ["Left", "left"], ["Right", "right"]])}
            </div>
          </div>
        )}
        <div>
          <Label help="e.g. linear-gradient(135deg, #0033FF, #001f99)">Gradient / overlay</Label>
          <input className={inputCls} value={style.backgroundGradient || ""} onChange={(e) => set("backgroundGradient", e.target.value)} placeholder={ph("backgroundGradient")} />
        </div>
      </Group>

      <Group title="Typography" defaultOpen={element} count={countSet(style, ["color", "fontFamily", "fontSize", "fontWeight", "textAlign", "lineHeight", "letterSpacing", "textTransform"])}>
        <div>
          <Label>Text color</Label>
          <ColorInput value={style.color || ""} onChange={(v) => set("color", v)} placeholder={ph("color")} />
        </div>
        <div>
          <Label>Font</Label>
          <SelectInput value={style.fontFamily || ""} onChange={(v) => set("fontFamily", v)} placeholder="Theme default" options={FONT_OPTIONS.map((f) => ({ label: f, value: `"${f}", sans-serif` }))} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label>Size</Label>
            <Len value={style.fontSize} onChange={(v) => set("fontSize", v)} placeholder={ph("fontSize", "e.g. 18px")} />
          </div>
          <div>
            <Label>Weight</Label>
            {sel("fontWeight", [["Light", "300"], ["Regular", "400"], ["Medium", "500"], ["Semibold", "600"], ["Bold", "700"], ["Extra bold", "800"], ["Black", "900"]])}
          </div>
          <div>
            <Label>Line height</Label>
            <input className={inputCls} value={style.lineHeight || ""} onChange={(e) => set("lineHeight", e.target.value)} placeholder={ph("lineHeight", "e.g. 1.4")} />
          </div>
          <div>
            <Label>Letter spacing</Label>
            <Len value={style.letterSpacing} onChange={(v) => set("letterSpacing", v)} placeholder={ph("letterSpacing", "e.g. 0.5px")} />
          </div>
          <div>
            <Label>Align</Label>
            {sel("textAlign", [["Left", "left"], ["Center", "center"], ["Right", "right"], ["Justify", "justify"]])}
          </div>
          <div>
            <Label>Case</Label>
            {sel("textTransform", [["None", "none"], ["UPPERCASE", "uppercase"], ["lowercase", "lowercase"], ["Capitalize", "capitalize"]])}
          </div>
          <div>
            <Label>Style</Label>
            {sel("fontStyle", [["Normal", "normal"], ["Italic", "italic"]])}
          </div>
          <div>
            <Label>Decoration</Label>
            {sel("textDecoration", [["None", "none"], ["Underline", "underline"], ["Strike", "line-through"]])}
          </div>
        </div>
      </Group>

      <Group title="Spacing" count={countSet(style, ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "marginTop", "marginRight", "marginBottom", "marginLeft", "gap"])}>
        <Box label="Padding (inside)" keys={["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"]} style={style} set={set} />
        <Box label="Margin (outside)" keys={["marginTop", "marginRight", "marginBottom", "marginLeft"]} style={style} set={set} />
        <div>
          <Label>Gap between items</Label>
          <Len value={style.gap} onChange={(v) => set("gap", v)} placeholder={ph("gap")} />
        </div>
      </Group>

      <Group title="Size" count={countSet(style, ["width", "maxWidth", "minWidth", "height", "minHeight", "maxHeight"])}>
        <div className="grid grid-cols-2 gap-2">
          {(["width", "maxWidth", "minWidth", "height", "minHeight", "maxHeight"] as (keyof StyleProps)[]).map((k) => (
            <div key={k}>
              <Label>{k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}</Label>
              <Len value={style[k]} onChange={(v) => set(k, v)} placeholder={ph(k, "e.g. 100%, 480px")} />
            </div>
          ))}
          <div>
            <Label>Image fit</Label>
            {sel("objectFit", [["Cover", "cover"], ["Contain", "contain"], ["Fill", "fill"]])}
          </div>
          <div>
            <Label>Overflow</Label>
            {sel("overflow", [["Visible", "visible"], ["Hidden", "hidden"], ["Scroll", "auto"]])}
          </div>
        </div>
      </Group>

      <Group title="Border & shadow" count={countSet(style, ["borderWidth", "borderColor", "borderRadius", "boxShadow"])}>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label>Border width</Label>
            <Len value={style.borderWidth} onChange={(v) => set("borderWidth", v)} placeholder={ph("borderWidth", "e.g. 1px")} />
          </div>
          <div>
            <Label>Border style</Label>
            {sel("borderStyle", [["Solid", "solid"], ["Dashed", "dashed"], ["Dotted", "dotted"], ["None", "none"]])}
          </div>
        </div>
        <div>
          <Label>Border color</Label>
          <ColorInput value={style.borderColor || ""} onChange={(v) => set("borderColor", v)} placeholder={ph("borderColor")} />
        </div>
        <div>
          <Label>Corner radius</Label>
          <Len value={style.borderRadius} onChange={(v) => set("borderRadius", v)} placeholder={ph("borderRadius", "e.g. 16px")} />
        </div>
        <div>
          <Label>Shadow</Label>
          {sel("boxShadow", [
            ["None", "none"],
            ["Soft", "0 4px 14px rgba(0,0,0,0.06)"],
            ["Medium", "0 10px 30px -10px rgba(0,0,0,0.25)"],
            ["Large", "0 25px 50px -12px rgba(0,0,0,0.35)"],
            ["Brand glow", "0 20px 40px -12px rgba(0,51,255,0.35)"],
          ])}
        </div>
      </Group>

      <Group title="Effects & display" count={countSet(style, ["opacity", "display", "zIndex"])}>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label>Opacity (0–1)</Label>
            <input className={inputCls} value={style.opacity || ""} onChange={(e) => set("opacity", e.target.value)} placeholder={ph("opacity", "1")} />
          </div>
          <div>
            <Label>Layer (z-index)</Label>
            <input className={inputCls} value={style.zIndex || ""} onChange={(e) => set("zIndex", e.target.value)} placeholder={ph("zIndex")} />
          </div>
          <div className="col-span-2">
            <Label>Display</Label>
            {sel("display", [["Block", "block"], ["Flex", "flex"], ["Grid", "grid"], ["Inline block", "inline-block"], ["Hidden", "none"]])}
          </div>
        </div>
      </Group>
    </div>
  );
}

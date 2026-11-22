// Core data types for the visual website editor (CMS).
// Every page, the header group, the footer group and the theme are stored as
// JSON "documents" in Supabase (table: cms_documents). Nothing is hardcoded:
// the code only ships *defaults* that are used until you save your own version.

export type Device = "desktop" | "tablet" | "mobile";
export const DEVICES: Device[] = ["desktop", "tablet", "mobile"];

/** CSS-like style properties. Values are plain CSS strings ("24px", "#fff", "1.2"). */
export interface StyleProps {
  color?: string;
  backgroundColor?: string;
  backgroundImage?: string; // URL only – we wrap it in url()
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  backgroundGradient?: string; // full CSS gradient, e.g. linear-gradient(...)
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  fontStyle?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textAlign?: string;
  textTransform?: string;
  textDecoration?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  width?: string;
  maxWidth?: string;
  minWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  gap?: string;
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;
  borderRadius?: string;
  boxShadow?: string;
  opacity?: string;
  display?: string;
  objectFit?: string;
  overflow?: string;
  zIndex?: string;
}

export type ResponsiveStyle = Partial<Record<Device, StyleProps>>;

/** A change made to a single element inside a section (picked by clicking it in the preview). */
export interface ElementOverride {
  /** Short description so the editor can show what this element was ("h2 · Frequently Asked…"). */
  label?: string;
  text?: string; // plain text replacement (leaf elements)
  html?: string; // rich HTML replacement (any element)
  src?: string; // image / video / iframe source
  alt?: string;
  href?: string; // link target
  target?: string; // _blank etc.
  hidden?: boolean;
  className?: string; // extra classes
  style?: ResponsiveStyle;
}

export type AnimationType =
  | "none"
  | "fade"
  | "fade-up"
  | "fade-down"
  | "slide-left"
  | "slide-right"
  | "zoom-in"
  | "zoom-out";

export interface SectionAdvanced {
  className?: string;
  anchorId?: string; // custom HTML id (for #links)
  css?: string; // scoped to this section automatically
  js?: string; // runs with `section` = this section's element; errors are contained
  htmlBefore?: string;
  htmlAfter?: string;
  hideOn?: Partial<Record<Device, boolean>>;
  scheduleStart?: string; // ISO datetime – show from
  scheduleEnd?: string; // ISO datetime – show until
  urlParamKey?: string; // only show when ?key=value is in the URL
  urlParamValue?: string;
  animation?: { type: AnimationType; duration?: number; delay?: number };
}

export interface SectionInstance {
  id: string;
  type: string;
  /** Custom label shown in the editor sidebar */
  name?: string;
  enabled: boolean;
  settings: Record<string, any>;
  style: ResponsiveStyle;
  advanced: SectionAdvanced;
  overrides: Record<string, ElementOverride>;
}

export interface PageSeo {
  title?: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
  keywords?: string;
}

export interface PageDoc {
  kind: "page" | "group";
  slug: string;
  title: string;
  seo: PageSeo;
  sections: SectionInstance[];
  /** Page-wide custom code */
  customCss?: string;
  customJs?: string;
  /** Hide global header/footer groups on this page (good for landing pages) */
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export interface ThemeDoc {
  kind: "theme";
  slug: "__theme";
  title: string;
  colors: Record<string, string>; // css var name (without --) -> hex
  headingFont?: string;
  bodyFont?: string;
  radius?: string;
  baseFontSize?: string;
  customCss?: string;
  customJs?: string;
  headHtml?: string;
}

export type CmsDoc = PageDoc | ThemeDoc;

export const HEADER_SLUG = "__header";
export const FOOTER_SLUG = "__footer";
export const THEME_SLUG = "__theme";
export const PRODUCT_SLUG = "__product";

export const isGlobalSlug = (slug: string) => slug.startsWith("__");

// ---------------------------------------------------------------------------
// Section schema (drives the editor's settings forms)
// ---------------------------------------------------------------------------

export type FieldType =
  | "text"
  | "textarea"
  | "richtext"
  | "url"
  | "image"
  | "video"
  | "color"
  | "number"
  | "range"
  | "toggle"
  | "select"
  | "icon"
  | "products"
  | "code"
  | "list"
  | "heading"; // visual separator in the form

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  help?: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
  step?: number;
  language?: "html" | "css" | "js";
  /** for type=list */
  fields?: FieldDef[];
  itemLabel?: string; // key used as the item title in list UI
  default?: any;
}

export interface SectionTypeDef {
  type: string;
  label: string;
  category: "Existing sections" | "Header & footer" | "Text" | "Media" | "Commerce" | "Social proof" | "Forms" | "Layout" | "Advanced";
  description?: string;
  /** Existing (hand-coded) components are edited by clicking elements in the preview */
  legacy?: boolean;
  /** Only allowed once / inside header or footer groups */
  group?: "header" | "footer" | "any";
  fields: FieldDef[];
  defaults: Record<string, any>;
  component: React.ComponentType<{ settings: Record<string, any>; section: SectionInstance }>;
}

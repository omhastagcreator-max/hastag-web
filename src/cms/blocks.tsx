import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, BadgeCheck, BarChart3, Bolt, Briefcase, Calendar, Camera, Check, ChevronDown, ChevronLeft, ChevronRight,
  Clock, Code2, Crown, Gift, Globe, Heart, Leaf, Lightbulb, Lock, Mail, MapPin, Megaphone, MessageCircle, MonitorPlay,
  Package, Phone, PieChart, Rocket, Search, Shield, ShoppingBag, ShoppingCart, Sparkles, Star, Target, ThumbsUp,
  TrendingUp, Truck, Users, Wallet, X, Zap, Volume2, VolumeX,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CmsLink } from "./links";
import { listProducts, submitForm } from "./store";
import { track } from "@/lib/track";
import LeadForm from "@/components/LeadForm";
import { supabase } from "@/lib/supabase";
import { fallbackVideos } from "@/pages/InfluencerUGC";

type BlockProps = { settings: Record<string, any> };

// ---------------------------------------------------------------------------
// shared helpers
// ---------------------------------------------------------------------------

export const ICONS: Record<string, LucideIcon> = {
  ArrowRight, BadgeCheck, BarChart3, Bolt, Briefcase, Calendar, Camera, Check, Clock, Code2, Crown, Gift, Globe, Heart,
  Leaf, Lightbulb, Lock, Mail, MapPin, Megaphone, MessageCircle, MonitorPlay, Package, Phone, PieChart, Rocket, Search,
  Shield, ShoppingBag, ShoppingCart, Sparkles, Star, Target, ThumbsUp, TrendingUp, Truck, Users, Wallet, Zap,
};

export const Icon = ({ name, className, size = 24 }: { name?: string; className?: string; size?: number }) => {
  const C = (name && ICONS[name]) || Sparkles;
  return <C className={className} size={size} />;
};

const Container = ({ wide, narrow, children, className = "" }: { wide?: boolean; narrow?: boolean; children: React.ReactNode; className?: string }) => (
  <div className={`${wide ? "w-full px-4 md:px-8" : "container-main"} ${className}`} style={narrow ? { maxWidth: 860 } : undefined}>
    {children}
  </div>
);

const SectionHeading = ({ heading, subheading, align = "center", color }: { heading?: string; subheading?: string; align?: string; color?: string }) =>
  heading || subheading ? (
    <div className="mb-10 md:mb-14" style={{ textAlign: align as any, color }}>
      {heading && <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">{heading}</h2>}
      {subheading && (
        <p className="mt-4 text-base md:text-lg opacity-75 max-w-2xl" style={{ marginLeft: align === "center" ? "auto" : undefined, marginRight: align === "center" ? "auto" : undefined }}>
          {subheading}
        </p>
      )}
    </div>
  ) : null;

export const Btn = ({ label, link, style = "primary", track: t }: { label?: string; link?: string; style?: string; track?: string }) =>
  label ? (
    <CmsLink href={link || "#audit"} className={`cms-btn cms-btn-${style || "primary"}`} trackLabel={t || "cms_button"}>
      {label}
      {style !== "outline" && <ArrowRight className="w-4 h-4" />}
    </CmsLink>
  ) : null;

const Rich = ({ html, className = "" }: { html?: string; className?: string }) =>
  html ? <div className={`cms-prose ${className}`} dangerouslySetInnerHTML={{ __html: html }} /> : null;

const gridVars = (d = 3, t = 2, m = 1, gap?: string) =>
  ({ "--cols-d": d, "--cols-t": t, "--cols-m": m, ...(gap ? { "--cms-gap": gap } : {}) }) as React.CSSProperties;

const pad = (s: Record<string, any>) => (s.compact ? "py-8 md:py-12" : "py-14 md:py-24");

function youtubeEmbed(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/);
  if (m) return `https://www.youtube.com/embed/${m[1]}`;
  const v = url.match(/vimeo\.com\/(\d+)/);
  if (v) return `https://player.vimeo.com/video/${v[1]}`;
  return null;
}

// ---------------------------------------------------------------------------
// Announcement bar
// ---------------------------------------------------------------------------
export function AnnouncementBar({ settings: s }: BlockProps) {
  const msgs: { text: string; link?: string }[] = (s.messages || []).filter((m: any) => m?.text);
  const [i, setI] = useState(0);
  const [closed, setClosed] = useState(false);
  useEffect(() => {
    if (msgs.length < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % msgs.length), Math.max(2, Number(s.interval) || 5) * 1000);
    return () => clearInterval(t);
  }, [msgs.length, s.interval]);
  if (!msgs.length || closed) return null;
  const m = msgs[i % msgs.length];
  return (
    <div
      className={`${s.sticky ? "sticky top-0" : "relative"} z-[60] w-full text-center text-xs sm:text-sm font-semibold py-2.5 px-10`}
      style={{ background: s.bgColor || "hsl(var(--primary))", color: s.textColor || "#fff" }}
    >
      {m.link ? (
        <CmsLink href={m.link} className="hover:underline underline-offset-2" trackLabel="announcement_bar">
          {m.text}
        </CmsLink>
      ) : (
        <span>{m.text}</span>
      )}
      {s.dismissible && (
        <button aria-label="Close" onClick={() => setClosed(true)} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100">
          <X size={16} />
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hero banner (generic, image/video background)
// ---------------------------------------------------------------------------
const heights: Record<string, string> = { auto: "auto", small: "50vh", medium: "70vh", large: "85vh", full: "100vh" };

export function HeroBanner({ settings: s }: BlockProps) {
  const align = s.align || "center";
  const buttons: any[] = s.buttons || [];
  return (
    <section className="relative overflow-hidden flex items-center" style={{ minHeight: heights[s.height || "large"], color: s.textColor || undefined }}>
      {(s.image || s.video) && (
        <div className="absolute inset-0 z-0">
          {s.video ? (
            <video className="w-full h-full object-cover" src={s.video} poster={s.image || undefined} autoPlay muted loop playsInline />
          ) : (
            <picture>
              {s.mobileImage && <source media="(max-width: 767px)" srcSet={s.mobileImage} />}
              <img src={s.image} alt={s.imageAlt || ""} className="w-full h-full object-cover" loading="eager" />
            </picture>
          )}
          <div className="absolute inset-0" style={{ background: s.overlayColor || "#000", opacity: (Number(s.overlayOpacity) || 0) / 100 }} />
        </div>
      )}
      <Container className="relative z-10 py-24 md:py-32">
        <div
          className="flex flex-col max-w-3xl"
          style={{
            alignItems: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
            textAlign: align as any,
            marginLeft: align === "left" ? 0 : "auto",
            marginRight: align === "right" ? 0 : "auto",
          }}
        >
          {s.eyebrow && (
            <span className="inline-flex px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-bold tracking-wide mb-6">{s.eyebrow}</span>
          )}
          {s.heading && <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.05]">{s.heading}</h1>}
          {s.subheading && <p className="mt-5 text-base sm:text-lg md:text-xl opacity-80 max-w-2xl leading-relaxed">{s.subheading}</p>}
          {buttons.length > 0 && (
            <div className="mt-8 flex flex-col sm:flex-row gap-3" style={{ justifyContent: align === "center" ? "center" : undefined }}>
              {buttons.map((b, i) => (
                <Btn key={i} label={b.label} link={b.link} style={b.style} track="hero_banner" />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Slideshow
// ---------------------------------------------------------------------------
export function Slideshow({ settings: s }: BlockProps) {
  const slides: any[] = (s.slides || []).filter((x: any) => x?.image || x?.heading);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!s.autoplay || slides.length < 2 || paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), Math.max(2, Number(s.interval) || 5) * 1000);
    return () => clearInterval(t);
  }, [s.autoplay, s.interval, slides.length, paused]);
  if (!slides.length) return null;
  const go = (d: number) => setI((x) => (x + d + slides.length) % slides.length);
  return (
    <section className="relative overflow-hidden" style={{ height: heights[s.height || "medium"] === "auto" ? "70vh" : heights[s.height || "medium"] }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {slides.map((sl, idx) => (
        <div key={idx} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: idx === i ? 1 : 0, pointerEvents: idx === i ? "auto" : "none" }} aria-hidden={idx !== i}>
          {sl.image && (
            <picture>
              {sl.mobileImage && <source media="(max-width: 767px)" srcSet={sl.mobileImage} />}
              <img src={sl.image} alt={sl.heading || ""} className="w-full h-full object-cover" loading={idx === 0 ? "eager" : "lazy"} />
            </picture>
          )}
          <div className="absolute inset-0" style={{ background: "#000", opacity: (Number(s.overlayOpacity) || 0) / 100 }} />
          <div className="absolute inset-0 flex items-center">
            <Container>
              <div className="max-w-2xl" style={{ color: sl.textColor || "#fff", textAlign: (sl.align || "left") as any, marginLeft: sl.align === "center" ? "auto" : undefined, marginRight: sl.align === "center" ? "auto" : undefined }}>
                {sl.heading && <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">{sl.heading}</h2>}
                {sl.text && <p className="mt-4 text-base md:text-lg opacity-90">{sl.text}</p>}
                {sl.buttonLabel && (
                  <div className="mt-7">
                    <Btn label={sl.buttonLabel} link={sl.buttonLink} style={sl.buttonStyle || "light"} track="slideshow" />
                  </div>
                )}
              </div>
            </Container>
          </div>
        </div>
      ))}
      {s.showArrows !== false && slides.length > 1 && (
        <>
          <button aria-label="Previous slide" onClick={() => go(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow">
            <ChevronLeft />
          </button>
          <button aria-label="Next slide" onClick={() => go(1)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow">
            <ChevronRight />
          </button>
        </>
      )}
      {s.showDots !== false && slides.length > 1 && (
        <div className="absolute bottom-5 left-0 right-0 z-10 flex justify-center gap-2">
          {slides.map((_, idx) => (
            <button key={idx} aria-label={`Slide ${idx + 1}`} onClick={() => setI(idx)} className="h-2.5 rounded-full transition-all" style={{ width: idx === i ? 28 : 10, background: idx === i ? "#fff" : "rgba(255,255,255,.55)" }} />
          ))}
        </div>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Rich text
// ---------------------------------------------------------------------------
export function RichText({ settings: s }: BlockProps) {
  return (
    <section className={pad(s)}>
      <Container narrow={s.width !== "wide"}>
        <div style={{ textAlign: (s.align || "left") as any }}>
          {s.eyebrow && <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-primary mb-3">{s.eyebrow}</p>}
          {s.heading && <h2 className="text-3xl md:text-4xl font-bold mb-6">{s.heading}</h2>}
          <Rich html={s.content} className="text-base md:text-lg text-foreground/80" />
          {s.buttonLabel && (
            <div className="mt-8">
              <Btn label={s.buttonLabel} link={s.buttonLink} style={s.buttonStyle} track="rich_text" />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Image with text
// ---------------------------------------------------------------------------
export function ImageWithText({ settings: s }: BlockProps) {
  const imageFirst = s.imagePosition !== "right";
  const media = s.video ? (
    <video src={s.video} poster={s.image} className="w-full h-full object-cover rounded-3xl" autoPlay muted loop playsInline />
  ) : s.image ? (
    <img src={s.image} alt={s.imageAlt || s.heading || ""} className="w-full h-full object-cover rounded-3xl shadow-xl" loading="lazy" style={{ aspectRatio: s.ratio && s.ratio !== "auto" ? s.ratio : undefined }} />
  ) : (
    <div className="w-full aspect-[4/3] rounded-3xl bg-secondary" />
  );
  return (
    <section className={pad(s)}>
      <Container>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className={imageFirst ? "" : "md:order-2"}>{media}</div>
          <div className={imageFirst ? "" : "md:order-1"}>
            {s.eyebrow && <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-primary mb-3">{s.eyebrow}</p>}
            {s.heading && <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5">{s.heading}</h2>}
            <Rich html={s.text} className="text-base md:text-lg text-foreground/75" />
            {s.buttonLabel && (
              <div className="mt-8">
                <Btn label={s.buttonLabel} link={s.buttonLink} style={s.buttonStyle} track="image_with_text" />
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Image
// ---------------------------------------------------------------------------
export function ImageBlock({ settings: s }: BlockProps) {
  if (!s.image) return null;
  const img = (
    <picture>
      {s.mobileImage && <source media="(max-width: 767px)" srcSet={s.mobileImage} />}
      <img src={s.image} alt={s.alt || ""} loading="lazy" className="w-full h-auto" style={{ borderRadius: s.rounded ? 24 : 0 }} />
    </picture>
  );
  return (
    <section className={s.fullWidth ? "" : pad(s)}>
      <div className={s.fullWidth ? "" : "container-main"}>
        {s.link ? <CmsLink href={s.link}>{img}</CmsLink> : img}
        {s.caption && <p className="mt-3 text-sm text-center text-muted-foreground">{s.caption}</p>}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Video
// ---------------------------------------------------------------------------
export function VideoBlock({ settings: s }: BlockProps) {
  const url: string = s.url || "";
  const embed = url ? youtubeEmbed(url) : null;
  const ratio = s.ratio || "16/9";
  return (
    <section className={pad(s)}>
      <Container narrow={s.width === "narrow"}>
        <SectionHeading heading={s.heading} subheading={s.subheading} />
        {url ? (
          <div className="relative w-full overflow-hidden rounded-3xl shadow-xl bg-black" style={{ aspectRatio: ratio }}>
            {embed ? (
              <iframe
                src={`${embed}?${s.autoplay ? "autoplay=1&mute=1&" : ""}rel=0`}
                title={s.heading || "Video"}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={url}
                poster={s.poster || undefined}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay={!!s.autoplay}
                muted={s.autoplay || s.muted}
                loop={!!s.loop}
                controls={s.controls !== false}
                playsInline
              />
            )}
          </div>
        ) : null}
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Embed (Calendly, maps, forms…)
// ---------------------------------------------------------------------------
export function EmbedBlock({ settings: s }: BlockProps) {
  return (
    <section className={pad(s)}>
      <Container narrow={s.width === "narrow"}>
        <SectionHeading heading={s.heading} subheading={s.subheading} />
        {s.url && (
          <iframe src={s.url} title={s.heading || "Embedded content"} className="w-full rounded-2xl border border-border bg-white" style={{ height: Number(s.height) || 600 }} loading="lazy" allowFullScreen />
        )}
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Product grid (from the Supabase "products" table managed in /admin)
// ---------------------------------------------------------------------------
type Product = { id: string; title: string; price: number; image_url?: string; description?: string };

export function ProductGrid({ settings: s }: BlockProps) {
  const [all, setAll] = useState<Product[] | null>(null);
  useEffect(() => {
    let live = true;
    listProducts().then((p) => live && setAll(p));
    return () => {
      live = false;
    };
  }, []);
  const products = useMemo(() => {
    if (!all) return [];
    let list = all;
    if (s.source === "selected" && Array.isArray(s.productIds) && s.productIds.length) {
      list = s.productIds.map((id: string) => all.find((p) => String(p.id) === String(id))).filter(Boolean) as Product[];
    }
    return list.slice(0, Number(s.limit) || 12);
  }, [all, s.source, s.productIds, s.limit]);
  const strip = (h?: string) => (h || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return (
    <section className={pad(s)}>
      <Container>
        <SectionHeading heading={s.heading} subheading={s.subheading} />
        {all === null ? (
          <div className="cms-grid" style={gridVars(s.columns || 3, s.columnsTablet || 2, s.columnsMobile || 1)}>
            {Array.from({ length: Math.min(3, Number(s.limit) || 3) }).map((_, i) => (
              <div key={i} className="h-80 rounded-3xl bg-secondary animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-muted-foreground">No products yet – add them in /admin.</p>
        ) : (
          <div className="cms-grid" style={gridVars(s.columns || 3, s.columnsTablet || 2, s.columnsMobile || 1)}>
            {products.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="group bg-card rounded-3xl overflow-hidden border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all flex flex-col">
                {p.image_url ? (
                  <div className="aspect-[4/3] overflow-hidden bg-secondary">
                    <img src={p.image_url} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-secondary flex items-center justify-center">
                    <Package className="w-10 h-10 text-muted-foreground" />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  {s.showDescription !== false && p.description && <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{strip(p.description)}</p>}
                  <div className="mt-auto pt-5 flex items-center justify-between">
                    {s.showPrice !== false && <span className="text-xl font-black">{p.price ? `₹${Number(p.price).toLocaleString("en-IN")}` : s.freeLabel || "Custom quote"}</span>}
                    <span className="text-sm font-bold text-primary inline-flex items-center gap-1">
                      {s.buttonLabel || "View details"} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------
export function Testimonials({ settings: s }: BlockProps) {
  const items: any[] = s.items || [];
  return (
    <section className={pad(s)}>
      <Container>
        <SectionHeading heading={s.heading} subheading={s.subheading} />
        <div className="cms-grid" style={gridVars(s.columns || 3, 2, 1)}>
          {items.map((t, i) => (
            <figure key={i} className="bg-card rounded-3xl p-7 border border-border shadow-card flex flex-col">
              {Number(t.rating) > 0 && (
                <div className="flex gap-0.5 mb-4 text-amber-400">
                  {Array.from({ length: Math.min(5, Number(t.rating)) }).map((_, k) => (
                    <Star key={k} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              )}
              <blockquote className="text-base leading-relaxed text-foreground/85 flex-1">“{t.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                {t.avatar ? (
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">{(t.name || "?").charAt(0)}</div>
                )}
                <div>
                  <div className="font-bold text-sm">{t.name}</div>
                  {t.role && <div className="text-xs text-muted-foreground">{t.role}</div>}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// FAQ / accordion (generic)
// ---------------------------------------------------------------------------
export function Accordion({ settings: s }: BlockProps) {
  const [open, setOpen] = useState<number | null>(s.firstOpen ? 0 : null);
  const items: any[] = s.items || [];
  return (
    <section className={pad(s)}>
      <Container narrow>
        <SectionHeading heading={s.heading} subheading={s.subheading} />
        <div className="space-y-2.5">
          {items.map((it, i) => (
            <div key={i} className="bg-card rounded-xl shadow-card overflow-hidden border border-border/60">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left min-h-[56px]" aria-expanded={open === i}>
                <span className="font-semibold text-sm md:text-base pr-4">{it.question}</span>
                <ChevronDown size={18} className={`text-muted-foreground transition-transform flex-shrink-0 ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <Rich html={it.answer} className="px-5 pb-5 text-sm text-muted-foreground" />}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Forms
// ---------------------------------------------------------------------------
function useFormSubmit(formName: string) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const submit = async (data: Record<string, any>) => {
    setState("sending");
    try {
      await submitForm(formName || "form", data);
      track("Form_Submit", { form_location: formName });
      setState("done");
    } catch {
      setState("error");
    }
  };
  return { state, submit };
}

export function Newsletter({ settings: s }: BlockProps) {
  const { state, submit } = useFormSubmit(s.formName || "newsletter");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  return (
    <section className={pad(s)}>
      <Container narrow>
        <div className="text-center">
          {s.heading && <h2 className="text-3xl md:text-4xl font-bold">{s.heading}</h2>}
          {s.text && <p className="mt-3 text-muted-foreground">{s.text}</p>}
          {state === "done" ? (
            <p className="mt-8 font-semibold text-green-600">{s.successMessage || "Thanks for subscribing!"}</p>
          ) : (
            <form
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                submit({ email, ...(s.collectName ? { name } : {}) });
              }}
            >
              {s.collectName && <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="flex-1 h-12 px-5 rounded-full border border-border bg-background" />}
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={s.placeholder || "Enter your email"} className="flex-1 h-12 px-5 rounded-full border border-border bg-background" />
              <button disabled={state === "sending"} className="cms-btn cms-btn-primary">
                {state === "sending" ? "…" : s.buttonLabel || "Subscribe"}
              </button>
            </form>
          )}
          {state === "error" && <p className="mt-3 text-sm text-red-600">Something went wrong. Please try again.</p>}
        </div>
      </Container>
    </section>
  );
}

export function ContactForm({ settings: s }: BlockProps) {
  const { state, submit } = useFormSubmit(s.formName || "contact");
  const fields = [
    { key: "name", label: "Name", type: "text", on: s.fieldName !== false },
    { key: "email", label: "Email", type: "email", on: s.fieldEmail !== false },
    { key: "phone", label: "Phone", type: "tel", on: s.fieldPhone !== false },
    { key: "company", label: s.companyLabel || "Brand / company", type: "text", on: !!s.fieldCompany },
  ].filter((f) => f.on);
  return (
    <section className={pad(s)}>
      <Container narrow>
        <SectionHeading heading={s.heading} subheading={s.subheading} />
        {state === "done" ? (
          <div className="text-center p-10 rounded-3xl bg-green-50 text-green-700 font-semibold">{s.successMessage || "Thanks! We'll get back to you shortly."}</div>
        ) : (
          <form
            className="bg-card rounded-3xl border border-border shadow-card p-6 md:p-10 grid gap-4 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              submit(Object.fromEntries(new FormData(e.currentTarget).entries()));
            }}
          >
            {fields.map((f) => (
              <label key={f.key} className="flex flex-col gap-1.5 text-sm font-semibold">
                {f.label}
                <input name={f.key} type={f.type} required={f.key !== "company"} className="h-12 px-4 rounded-xl border border-border bg-background font-normal" />
              </label>
            ))}
            {s.fieldMessage !== false && (
              <label className="flex flex-col gap-1.5 text-sm font-semibold md:col-span-2">
                {s.messageLabel || "Message"}
                <textarea name="message" rows={4} className="px-4 py-3 rounded-xl border border-border bg-background font-normal" />
              </label>
            )}
            <div className="md:col-span-2">
              <button disabled={state === "sending"} className="cms-btn cms-btn-primary w-full">
                {state === "sending" ? "Sending…" : s.buttonLabel || "Send message"}
              </button>
              {state === "error" && <p className="mt-3 text-sm text-red-600">Something went wrong. Please try again.</p>}
            </div>
          </form>
        )}
      </Container>
    </section>
  );
}

/** The site's existing audit lead form, as a section you can place on any page. */
export function LeadFormBlock({ settings: s }: BlockProps) {
  return (
    <section className={s.compact === false ? "py-14 md:py-24 bg-background" : "px-0 pb-12 md:pb-20 bg-background"}>
      <div className="container-main max-w-3xl">
        <LeadForm
          id={s.formId || "audit-form"}
          location={s.location || "cms_section"}
          heading={s.heading || undefined}
          subheading={s.subheading || undefined}
          buttonLabel={s.buttonLabel || undefined}
        />
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// CTA banner
// ---------------------------------------------------------------------------
export function CtaBanner({ settings: s }: BlockProps) {
  return (
    <section className={pad(s)}>
      <Container>
        <div
          className="relative overflow-hidden rounded-[2rem] px-6 py-14 md:px-16 md:py-20 text-center"
          style={{
            background: s.image ? `linear-gradient(rgba(0,0,0,${(Number(s.overlayOpacity) || 40) / 100}),rgba(0,0,0,${(Number(s.overlayOpacity) || 40) / 100})), url("${s.image}") center/cover` : s.bgColor || "hsl(var(--primary))",
            color: s.textColor || "#fff",
          }}
        >
          {s.heading && <h2 className="text-3xl md:text-5xl font-black tracking-tight">{s.heading}</h2>}
          {s.text && <p className="mt-4 text-base md:text-lg opacity-90 max-w-2xl mx-auto">{s.text}</p>}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Btn label={s.buttonLabel} link={s.buttonLink} style={s.buttonStyle || "light"} track="cta_banner" />
            <Btn label={s.secondaryLabel} link={s.secondaryLink} style="outline" track="cta_banner_secondary" />
          </div>
        </div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Features / icon grid
// ---------------------------------------------------------------------------
export function Features({ settings: s }: BlockProps) {
  const items: any[] = s.items || [];
  return (
    <section className={pad(s)}>
      <Container>
        <SectionHeading heading={s.heading} subheading={s.subheading} align={s.headingAlign} />
        <div className="cms-grid" style={gridVars(s.columns || 3, s.columnsTablet || 2, s.columnsMobile || 1)}>
          {items.map((it, i) => (
            <div key={i} className={s.cards !== false ? "bg-card rounded-3xl p-7 border border-border shadow-card" : "p-2"} style={{ textAlign: (s.itemAlign || "left") as any }}>
              {it.image ? (
                <img src={it.image} alt={it.title || ""} className="w-14 h-14 object-contain mb-5" style={{ marginLeft: s.itemAlign === "center" ? "auto" : undefined, marginRight: s.itemAlign === "center" ? "auto" : undefined }} />
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5" style={{ marginLeft: s.itemAlign === "center" ? "auto" : undefined, marginRight: s.itemAlign === "center" ? "auto" : undefined }}>
                  <Icon name={it.icon} size={22} />
                </div>
              )}
              {it.title && <h3 className="text-lg font-bold mb-2">{it.title}</h3>}
              {it.text && <p className="text-sm text-muted-foreground leading-relaxed">{it.text}</p>}
              {it.link && it.linkLabel && (
                <CmsLink href={it.link} className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary">
                  {it.linkLabel} <ArrowRight className="w-4 h-4" />
                </CmsLink>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Logo strip
// ---------------------------------------------------------------------------
export function LogoStrip({ settings: s }: BlockProps) {
  const logos: any[] = (s.logos || []).filter((l: any) => l?.image);
  const row = (key: string) =>
    logos.map((l, i) => {
      const img = (
        <img src={l.image} alt={l.alt || "Logo"} loading="lazy" className={`h-10 md:h-12 w-auto object-contain ${s.grayscale !== false ? "grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition" : ""}`} />
      );
      return (
        <div key={key + i} className="flex items-center justify-center shrink-0 px-6 md:px-10">
          {l.link ? <CmsLink href={l.link}>{img}</CmsLink> : img}
        </div>
      );
    });
  return (
    <section className={s.compact !== false ? "py-8 md:py-12" : "py-14 md:py-20"}>
      <Container wide={!!s.marquee}>
        {s.heading && <p className="text-center text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">{s.heading}</p>}
        {s.marquee ? (
          <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
            <div className="flex w-max" style={{ animation: `cms-marquee ${Number(s.speed) || 30}s linear infinite` }}>
              {row("a")}
              {row("b")}
            </div>
            <style>{"@keyframes cms-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}"}</style>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-y-6">{row("a")}</div>
        )}
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------
export function Stats({ settings: s }: BlockProps) {
  const items: any[] = s.items || [];
  return (
    <section className={pad(s)}>
      <Container>
        <SectionHeading heading={s.heading} subheading={s.subheading} />
        <div className="cms-grid" style={gridVars(s.columns || items.length || 4, 2, 2)}>
          {items.map((it, i) => (
            <div key={i} className="text-center p-6 rounded-3xl bg-card border border-border shadow-card">
              <div className="text-3xl md:text-5xl font-black text-primary tracking-tight">{it.value}</div>
              <div className="mt-2 text-sm font-semibold text-muted-foreground">{it.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Multi-column content
// ---------------------------------------------------------------------------
export function Columns({ settings: s }: BlockProps) {
  const cols: any[] = s.columnsList || [];
  return (
    <section className={pad(s)}>
      <Container>
        <SectionHeading heading={s.heading} subheading={s.subheading} />
        <div className="cms-grid" style={gridVars(s.columns || cols.length || 3, s.columnsTablet || 2, s.columnsMobile || 1, "2rem")}>
          {cols.map((c, i) => (
            <div key={i} className="flex flex-col">
              {c.image && <img src={c.image} alt={c.heading || ""} className="w-full rounded-2xl mb-5 object-cover" style={{ aspectRatio: s.imageRatio || "4/3" }} loading="lazy" />}
              {c.heading && <h3 className="text-xl font-bold mb-2">{c.heading}</h3>}
              <Rich html={c.text} className="text-sm md:text-base text-muted-foreground" />
              {c.buttonLabel && (
                <div className="mt-5">
                  <Btn label={c.buttonLabel} link={c.buttonLink} style={c.buttonStyle || "outline"} track="columns" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Pricing table
// ---------------------------------------------------------------------------
export function PricingTable({ settings: s }: BlockProps) {
  const plans: any[] = s.plans || [];
  return (
    <section className={pad(s)}>
      <Container>
        <SectionHeading heading={s.heading} subheading={s.subheading} />
        <div className="cms-grid items-stretch" style={gridVars(plans.length > 3 ? 4 : plans.length || 3, 2, 1)}>
          {plans.map((p, i) => (
            <div key={i} className={`relative rounded-3xl p-8 flex flex-col border ${p.highlighted ? "bg-foreground text-background border-foreground shadow-2xl md:-translate-y-2" : "bg-card border-border shadow-card"}`}>
              {p.badge && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">{p.badge}</span>}
              <h3 className="text-lg font-bold">{p.name}</h3>
              {p.description && <p className="mt-1 text-sm opacity-70">{p.description}</p>}
              <div className="mt-5 flex items-end gap-1">
                <span className="text-4xl font-black tracking-tight">{p.price}</span>
                {p.period && <span className="text-sm opacity-70 mb-1">{p.period}</span>}
              </div>
              <ul className="mt-6 space-y-2.5 text-sm flex-1">
                {String(p.features || "")
                  .split("\n")
                  .map((f) => f.trim())
                  .filter(Boolean)
                  .map((f, k) => (
                    <li key={k} className="flex gap-2">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-primary" /> {f}
                    </li>
                  ))}
              </ul>
              {p.buttonLabel && (
                <div className="mt-8">
                  <CmsLink href={p.buttonLink || "#audit"} className={`cms-btn w-full ${p.highlighted ? "cms-btn-primary" : "cms-btn-dark"}`} trackLabel="pricing_table">
                    {p.buttonLabel}
                  </CmsLink>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Countdown
// ---------------------------------------------------------------------------
export function Countdown({ settings: s }: BlockProps) {
  const end = s.endDate ? Date.parse(s.endDate) : NaN;
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (isNaN(end)) return null;
  const diff = Math.max(0, end - now);
  if (diff === 0 && s.hideWhenDone) return null;
  const parts = [
    ["Days", Math.floor(diff / 864e5)],
    ["Hours", Math.floor((diff / 36e5) % 24)],
    ["Minutes", Math.floor((diff / 6e4) % 60)],
    ["Seconds", Math.floor((diff / 1e3) % 60)],
  ] as const;
  return (
    <section className={pad({ compact: true })}>
      <Container>
        <div className="text-center">
          {s.heading && <h2 className="text-2xl md:text-4xl font-bold mb-6">{diff === 0 ? s.doneText || s.heading : s.heading}</h2>}
          {diff > 0 && (
            <div className="flex justify-center gap-3 md:gap-5">
              {parts.map(([l, v]) => (
                <div key={l} className="w-20 md:w-28 py-4 rounded-2xl bg-card border border-border shadow-card">
                  <div className="text-3xl md:text-5xl font-black tabular-nums text-primary">{String(v).padStart(2, "0")}</div>
                  <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">{l}</div>
                </div>
              ))}
            </div>
          )}
          {s.buttonLabel && (
            <div className="mt-8">
              <Btn label={s.buttonLabel} link={s.buttonLink} track="countdown" />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Contact info
// ---------------------------------------------------------------------------
export function ContactInfo({ settings: s }: BlockProps) {
  const rows = [
    { icon: MapPin, label: "Address", value: s.address },
    { icon: Phone, label: "Phone", value: s.phone, href: s.phone ? `tel:${String(s.phone).replace(/[^+\d]/g, "")}` : "" },
    { icon: Mail, label: "Email", value: s.email, href: s.email ? `mailto:${s.email}` : "" },
    { icon: MessageCircle, label: "WhatsApp", value: s.whatsapp, href: s.whatsapp ? `https://wa.me/${String(s.whatsapp).replace(/[^\d]/g, "")}` : "" },
    { icon: Clock, label: "Hours", value: s.hours },
  ].filter((r) => r.value);
  const socials: any[] = s.socials || [];
  return (
    <section className={pad(s)}>
      <Container>
        <SectionHeading heading={s.heading} subheading={s.subheading} />
        <div className={`grid gap-8 ${s.mapUrl ? "md:grid-cols-2" : ""}`}>
          <div className="space-y-4">
            {rows.map((r) => (
              <div key={r.label} className="flex gap-4 items-start p-5 rounded-2xl bg-card border border-border shadow-card">
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <r.icon size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{r.label}</div>
                  {r.href ? (
                    <a href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="font-semibold hover:text-primary whitespace-pre-line">
                      {r.value}
                    </a>
                  ) : (
                    <div className="font-semibold whitespace-pre-line">{r.value}</div>
                  )}
                </div>
              </div>
            ))}
            {socials.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {socials.map((so, i) => (
                  <a key={i} href={so.url} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-full border border-border text-sm font-semibold hover:border-primary hover:text-primary">
                    {so.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          {s.mapUrl && <iframe src={s.mapUrl} title="Map" className="w-full min-h-[320px] h-full rounded-3xl border border-border" loading="lazy" />}
        </div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Spacer / divider
// ---------------------------------------------------------------------------
export function Spacer({ settings: s }: BlockProps) {
  return (
    <div style={{ height: Number(s.height) || 48 }} className="flex items-center">
      {s.divider && <div className="container-main"><hr style={{ borderColor: s.color || "hsl(var(--border))" }} /></div>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Custom HTML
// ---------------------------------------------------------------------------
export function CustomHtml({ settings: s }: BlockProps) {
  const ref = useState<HTMLDivElement | null>(null);
  const [el, setEl] = ref;
  useEffect(() => {
    if (!el) return;
    el.querySelectorAll("script").forEach((sc) => {
      const n = document.createElement("script");
      if (sc.src) n.src = sc.src;
      else n.textContent = `try{${sc.textContent}}catch(e){console.error("[cms] custom HTML script error",e)}`;
      sc.replaceWith(n);
    });
  }, [el, s.html]);
  return <div ref={setEl} className={s.contained ? "container-main" : ""} dangerouslySetInnerHTML={{ __html: s.html || "" }} />;
}

// ===========================================================================
// VIDEO-FIRST BLOCKS
// ===========================================================================
type Reel = { id: string | number; title?: string; label?: string; category?: string; url: string; poster?: string };

/** Your video portfolio from /admin → Videos (stored in `products` with icon_name = InfluencerVideo). */
export function usePortfolioVideos(enabled: boolean) {
  const [videos, setVideos] = useState<Reel[] | null>(null);
  useEffect(() => {
    if (!enabled) return;
    let live = true;
    (async () => {
      try {
        const { data } = await supabase.from("products").select("id,title,description,image_url,created_at").eq("icon_name", "InfluencerVideo").order("created_at", { ascending: false });
        if (!live) return;
        if (data && data.length) {
          setVideos(
            data.map((v: any) => {
              const [cat, views, dur] = (v.description || "").split("||");
              return { id: v.id, title: v.title, category: cat || "sales", label: [dur, views ? `${views} views` : ""].filter(Boolean).join(" · "), url: v.image_url };
            }),
          );
          return;
        }
      } catch {
        /* fall through */
      }
      if (live) setVideos(fallbackVideos.map((v: any) => ({ id: v.id, title: v.title, category: v.category, label: `${v.duration} · ${v.views} views`, url: v.video_url })));
    })();
    return () => {
      live = false;
    };
  }, [enabled]);
  return videos;
}

export const VIDEO_CATEGORIES: Record<string, string> = { sales: "Sales ads", influencer: "Influencer / UGC", brand: "Brand awareness", tvc: "TVC / premium" };

function embedFor(url: string): { kind: "yt" | "ig" | "file"; src: string } {
  if (/youtube\.com|youtu\.be/.test(url)) {
    let id = "";
    try {
      const u = new URL(url);
      id = url.includes("/shorts/") ? u.pathname.split("/shorts/")[1] : u.hostname.includes("youtu.be") ? u.pathname.slice(1) : u.searchParams.get("v") || "";
      id = id.split(/[?/]/)[0];
    } catch {
      /* ignore */
    }
    return { kind: "yt", src: `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&playsinline=1&modestbranding=1&rel=0` };
  }
  if (url.includes("instagram.com")) return { kind: "ig", src: `${url.split("?")[0].replace(/\/$/, "")}/embed/` };
  return { kind: "file", src: url };
}

/** A vertical 9:16 reel that plays muted in view; click to unmute (uploaded/MP4 videos). */
export function ReelPlayer({ reel, className = "", showMeta = true }: { reel: Reel; className?: string; showMeta?: boolean }) {
  const e = embedFor(reel.url || "");
  const vidRef = useState<HTMLVideoElement | null>(null);
  const [vid, setVid] = vidRef;
  const [muted, setMuted] = useState(true);
  useEffect(() => {
    if (!vid || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([en]) => (en.isIntersecting ? vid.play().catch(() => {}) : vid.pause()), { threshold: 0.25 });
    io.observe(vid);
    return () => io.disconnect();
  }, [vid]);
  return (
    <div className={`relative aspect-[9/16] rounded-[1.4rem] overflow-hidden bg-slate-900 shadow-xl border border-white/10 group ${className}`}>
      {e.kind === "file" ? (
        <video
          ref={setVid}
          src={e.src}
          poster={reel.poster}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          onClick={() => setMuted((m) => !m)}
        />
      ) : (
        <iframe src={e.src} title={reel.title || "Video"} loading="lazy" allow="autoplay; encrypted-media" className={`absolute inset-0 w-full h-full ${e.kind === "yt" ? "scale-[1.35]" : ""} pointer-events-none`} />
      )}
      {showMeta && (reel.title || reel.label) && (
        <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none">
          {reel.label && <span className="inline-block text-[10px] md:text-[11px] font-bold text-white/85 bg-white/15 backdrop-blur px-2 py-0.5 rounded mb-1.5">{reel.label}</span>}
          {reel.title && <div className="text-white font-extrabold text-sm leading-tight">{reel.title}</div>}
        </div>
      )}
      {e.kind === "file" && (
        <button
          type="button"
          aria-label={muted ? "Unmute" : "Mute"}
          onClick={() => setMuted((m) => !m)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/45 text-white text-xs font-bold flex items-center justify-center backdrop-blur"
        >
          {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
      )}
    </div>
  );
}

const manualReels = (list: any[]): Reel[] =>
  (list || []).filter((v) => v?.video).map((v, i) => ({ id: `m${i}`, url: v.video, title: v.title, label: v.label, poster: v.poster, category: v.category }));

// ---------------------------------------------------------------------------
// Video hero: headline + stacked reels
// ---------------------------------------------------------------------------
export function VideoHero({ settings: s }: BlockProps) {
  const portfolio = usePortfolioVideos(s.source !== "manual");
  const reels = (s.source === "manual" ? manualReels(s.videos) : portfolio || []).slice(0, 3);
  const buttons: any[] = s.buttons || [];
  const stats: any[] = (s.stats || []).filter((x: any) => x?.value || x?.label);
  return (
    <section className="relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-20 bg-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 right-[-10%] w-[700px] max-w-[100vw] h-[600px] rounded-full bg-primary/10 blur-[110px]" />
      </div>
      <div className="container-main relative z-10 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-10 items-center">
        <div className="text-center lg:text-left">
          {s.eyebrow && (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-bold tracking-wide mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              {s.eyebrow}
            </span>
          )}
          <h1 className="text-[2.3rem] leading-[1.05] sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tighter text-foreground">
            {s.heading} {s.highlight && <span className="text-primary">{s.highlight}</span>}
          </h1>
          {s.subheading && <p className="mt-5 text-base sm:text-lg md:text-xl text-muted-foreground font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">{s.subheading}</p>}
          {buttons.length > 0 && (
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              {buttons.map((b, i) => (
                <Btn key={i} label={b.label} link={b.link} style={b.style} track="video_hero" />
              ))}
            </div>
          )}
          {stats.length > 0 && (
            <div className="mt-10 grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0">
              {stats.map((st, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-black text-foreground tracking-tight">{st.value}</div>
                  <div className="text-[11px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">{st.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative flex justify-center items-center gap-3 md:gap-4 min-h-[380px]">
          {reels.length === 0 && <div className="w-[260px] aspect-[9/16] rounded-[1.4rem] bg-secondary animate-pulse" />}
          {reels.map((r, i) => (
            <ReelPlayer
              key={r.id}
              reel={r}
              showMeta={false}
              className={
                i === 1
                  ? "w-[40%] max-w-[230px] z-20 ring-4 ring-background"
                  : `w-[30%] max-w-[180px] opacity-95 ${i === 0 ? "translate-y-8 -rotate-3" : "-translate-y-8 rotate-3"}`
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Video showcase: reels carousel/grid with category filters
// ---------------------------------------------------------------------------
export function VideoShowcase({ settings: s }: BlockProps) {
  const portfolio = usePortfolioVideos(s.source !== "manual");
  const all = s.source === "manual" ? manualReels(s.videos) : portfolio;
  const [cat, setCat] = useState("all");
  const cats = useMemo(() => Array.from(new Set((all || []).map((v) => v.category).filter(Boolean))) as string[], [all]);
  const list = (all || []).filter((v) => cat === "all" || v.category === cat).slice(0, Number(s.limit) || 12);
  const scroller = useState<HTMLDivElement | null>(null);
  const [el, setEl] = scroller;
  return (
    <section className={`${pad(s)} ${s.dark ? "bg-charcoal text-charcoal-foreground" : ""}`}>
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
          <div className="max-w-2xl">
            {s.eyebrow && <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-primary mb-3">{s.eyebrow}</p>}
            {s.heading && <h2 className="text-3xl md:text-5xl font-black tracking-tight">{s.heading}</h2>}
            {s.subheading && <p className="mt-4 text-base md:text-lg opacity-70">{s.subheading}</p>}
          </div>
          {s.layout !== "grid" && list.length > 2 && (
            <div className="hidden md:flex gap-2">
              <button aria-label="Scroll left" onClick={() => el?.scrollBy({ left: -el.clientWidth * 0.8, behavior: "smooth" })} className="w-11 h-11 rounded-full border border-current/20 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition">
                <ChevronLeft />
              </button>
              <button aria-label="Scroll right" onClick={() => el?.scrollBy({ left: el.clientWidth * 0.8, behavior: "smooth" })} className="w-11 h-11 rounded-full border border-current/20 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition">
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
        {s.showFilters !== false && cats.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
            {["all", ...cats].map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold border transition ${cat === c ? "bg-primary text-primary-foreground border-primary" : "border-current/15 opacity-80 hover:opacity-100"}`}
              >
                {c === "all" ? "All work" : VIDEO_CATEGORIES[c] || c}
              </button>
            ))}
          </div>
        )}
        {all === null ? (
          <div className="flex gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="w-[220px] aspect-[9/16] rounded-[1.4rem] bg-secondary animate-pulse shrink-0" />
            ))}
          </div>
        ) : s.layout === "grid" ? (
          <div className="cms-grid" style={gridVars(s.columns || 4, 3, 2, "1rem")}>
            {list.map((r) => (
              <ReelPlayer key={r.id} reel={r} />
            ))}
          </div>
        ) : (
          <div ref={setEl} className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {list.map((r) => (
              <ReelPlayer key={r.id} reel={r} className="snap-start shrink-0 w-[62vw] sm:w-[40vw] md:w-[260px]" />
            ))}
          </div>
        )}
        {s.buttonLabel && (
          <div className="mt-10 text-center">
            <Btn label={s.buttonLabel} link={s.buttonLink} style={s.buttonStyle || "primary"} track="video_showcase" />
          </div>
        )}
      </Container>
    </section>
  );
}

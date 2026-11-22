import { createSection } from "./registry";
import type { CmsDoc, PageDoc, SectionInstance, ThemeDoc } from "./types";
import { FOOTER_SLUG, HEADER_SLUG, PRODUCT_SLUG, THEME_SLUG } from "./types";

/**
 * Built-in content = exactly what the site looked like before the editor.
 * Used until you save/publish your own version of a page (and as the
 * "Reset to original" target). Section ids are fixed so drafts stay stable.
 */

const s = (id: string, type: string, extra: Partial<SectionInstance> = {}) => createSection(type, { id, ...extra });

const page = (slug: string, title: string, sections: SectionInstance[], seo: PageDoc["seo"] = {}): PageDoc => ({
  kind: "page",
  slug,
  title,
  seo,
  sections,
});

export const BUILTIN_PAGES: Record<string, PageDoc> = {
  // Home = ~80% video content studio, ~20% performance marketing.
  // The previous (ads-led) homepage sections are kept below, hidden – turn any back on with the eye icon.
  home: page(
    "home",
    "Home",
    [
      s("home-video-hero", "video-hero"),
      s("home-trusted-brands", "trusted-brands"),
      s("home-video-showcase", "video-showcase", { advanced: { anchorId: "work" } }),
      s("home-video-services", "features", {
        name: "Video services",
        advanced: { anchorId: "video-services" },
        settings: {
          heading: "Every kind of video your brand needs",
          subheading: "From one creator video to a full monthly content engine – planned, shot and edited in-house.",
          headingAlign: "center",
          items: [
            { icon: "Users", title: "UGC ads", text: "Real creators talking about your product in a natural, native style that performs on Meta and YouTube." },
            { icon: "Megaphone", title: "Influencer videos", text: "We match you with creators from our network, brief them and handle the content end to end." },
            { icon: "Camera", title: "Product shoots", text: "Studio and lifestyle product videos and photos for ads, PDPs and marketplaces." },
            { icon: "MonitorPlay", title: "Brand films & TVC", text: "Premium storytelling videos for launches, brand awareness and big campaigns." },
            { icon: "Sparkles", title: "AI video ads", text: "Fast, low-cost ad variations using AI visuals and voiceovers to test more angles." },
            { icon: "Zap", title: "Reels & social content", text: "A steady calendar of short-form content for Instagram, YouTube Shorts and more." },
            { icon: "Lightbulb", title: "Scripts & hooks", text: "Every video starts with research and hook-first scripts written to stop the scroll." },
            { icon: "Code2", title: "Editing & motion", text: "Sharp edits, captions, motion graphics and multiple cut-downs from every shoot." },
          ],
          columns: 4,
          columnsTablet: 2,
          columnsMobile: 1,
          cards: true,
          itemAlign: "left",
        },
      }),
      s("home-video-process", "features", {
        name: "Video process",
        settings: {
          heading: "How we make videos that sell",
          subheading: "A simple process built around testing – so every round of content gets better.",
          headingAlign: "center",
          items: [
            { icon: "Search", title: "1. Research", text: "Your product, customer, competitors and what's already working in your category." },
            { icon: "Lightbulb", title: "2. Script & hooks", text: "Multiple angles and hooks per video, approved by you before we shoot." },
            { icon: "Camera", title: "3. Shoot", text: "Creators, studio or AI – whatever fits the brief and the budget." },
            { icon: "Rocket", title: "4. Edit & launch", text: "Ad-ready cuts for every placement, tested and improved with real data." },
          ],
          columns: 4,
          columnsTablet: 2,
          columnsMobile: 1,
          cards: false,
          itemAlign: "left",
          compact: true,
        },
      }),
      s("home-whatsapp-testimonials", "whatsapp-testimonials"),
      s("home-performance", "image-with-text", {
        name: "Performance marketing (20%)",
        settings: {
          eyebrow: "Plus performance marketing",
          heading: "Great videos, run as profitable ads",
          text: "<p>Creative is the biggest lever in Meta and Google ads today. We don't just hand over files – our performance team launches your videos as ads, tests hooks and audiences, and scales the winners while watching ROAS, CAC and margins.</p><ul><li>Meta (Facebook & Instagram) and Google ads management</li><li>Creative testing built into every month</li><li>Landing pages and conversion optimisation</li></ul>",
          image: "/google-search-meta-andromeda.jpg",
          imagePosition: "right",
          ratio: "auto",
          buttonLabel: "Explore performance marketing",
          buttonLink: "/performance-marketing",
          buttonStyle: "dark",
        },
      }),
      s("home-dashboard-results", "dashboard-results"),
      s("home-google-reviews", "google-reviews"),
      s("home-lead-form", "lead-form", {
        settings: {
          formId: "audit-form",
          location: "home_video_form",
          heading: "Let's plan your next videos",
          subheading: "Tell us about your brand – we'll reply on WhatsApp with video ideas and a free review of your current ads.",
          buttonLabel: "Get My Free Video Strategy",
        },
      }),
      s("home-faq", "faq", {
        settings: {
          heading: "Frequently Asked Questions",
          items: [
            { q: "What kind of videos do you make?", a: "UGC ads, influencer videos, product shoots, brand films and TVCs, AI video ads, and regular reels/short-form content – all planned around what will perform for your brand." },
            { q: "Do you provide creators and influencers?", a: "Yes. We work with a network of creators and influencers, handle the brief, scripts and coordination, and deliver edited, ad-ready videos." },
            { q: "Can the videos be used as ads?", a: "Yes – that's the point. We edit every video in ad-ready formats (9:16, 4:5, 1:1) with hooks and captions, and can run them for you on Meta and Google." },
            { q: "Do you also run the ads?", a: "Yes. Our performance marketing team manages Meta and Google ads, tests your creatives and scales the winners while tracking ROAS and CAC." },
            { q: "How long does a video project take?", a: "It depends on the format and number of videos. We'll share a clear timeline after understanding your brief." },
            { q: "How much does it cost?", a: "Pricing depends on the number and type of videos and whether you want us to run the ads. Share your requirements and we'll send a proposal." },
          ],
        },
      }),

      // ---- previous homepage sections (hidden, content kept) ----
      s("home-hero", "hero", { enabled: false, name: "Old hero (ads-focused)" }),
      s("home-perf-glimpse", "perf-glimpse", { enabled: false }),
      s("home-influencer-glimpse", "influencer-glimpse", { enabled: false }),
      s("home-network-stats", "network-stats", { enabled: false }),
      s("home-how-it-works", "how-it-works", { enabled: false }),
      s("home-webdev-glimpse", "webdev-glimpse", { enabled: false }),
      s("home-marketing-breakdown", "marketing-breakdown", { enabled: false }),
      s("home-why-choose-us", "why-choose-us", { enabled: false }),
      s("home-pricing", "pricing", { enabled: false }),
      s("home-final-cta", "final-cta", { enabled: false }),
    ],
    {
      title: "HastagCreator | Video Content, UGC & Ads for D2C Brands",
      description:
        "HastagCreator is a video content studio for D2C brands: UGC ads, influencer videos, product shoots, brand films and AI video ads – plus Meta & Google ads management to turn great videos into profitable growth.",
    },
  ),
  contact: page("contact", "Contact", [s("contact-body", "page-contact")]),
  portfolio: page("portfolio", "Portfolio", [s("portfolio-body", "page-portfolio")]),
  services: page("services", "Services", [s("services-body", "page-services")]),
  "web-development": page("web-development", "Web Development", [s("webdev-body", "page-web-development")]),
  "performance-marketing": page("performance-marketing", "Performance Marketing", [s("perf-body", "page-performance-marketing")]),
  careers: page("careers", "Careers", [s("careers-body", "page-careers")]),
  "influencer-ugc": page("influencer-ugc", "Influencer & UGC", [s("ugc-body", "page-influencer-ugc")]),
  "privacy-policy": page("privacy-policy", "Privacy Policy", [s("privacy-body", "page-privacy")]),
  "terms-and-conditions": page("terms-and-conditions", "Terms & Conditions", [s("terms-body", "page-terms")]),
  [PRODUCT_SLUG]: {
    kind: "group",
    slug: PRODUCT_SLUG,
    title: "Product page template",
    seo: {},
    sections: [s("product-body", "page-product")],
  },
};

export const BUILTIN_HEADER: PageDoc = {
  kind: "group",
  slug: HEADER_SLUG,
  title: "Header",
  seo: {},
  sections: [
    s("header-main", "header", {
      settings: {
        topBarEnabled: true,
        topBarText: "HastagCreator · Video Content Studio for D2C Brands · UGC · Influencers · Ads",
        topBarMobileText: "#Creator · Video Content Studio",
        links: [
          { label: "Our Work", to: "/#work" },
          { label: "Video Services", to: "/#video-services" },
          { label: "UGC & Influencers", to: "/influencer-ugc" },
          { label: "Performance Marketing", to: "/performance-marketing" },
          { label: "Careers", to: "/careers" },
        ],
        ctaEnabled: true,
        ctaLabel: "Get Video Strategy →",
        mobileCtaLabel: "Get My Free Video Strategy →",
        ctaLink: "",
      },
    }),
  ],
};

export const BUILTIN_FOOTER: PageDoc = {
  kind: "group",
  slug: FOOTER_SLUG,
  title: "Footer",
  seo: {},
  sections: [
    s("footer-main", "footer", {
      settings: {
        about:
          "India-based video content studio for D2C brands – UGC ads, influencer videos, product shoots and brand films, backed by performance marketing that turns great creative into profitable growth.",
        columns: [
          {
            title: "Video",
            links: [
              { label: "UGC Ads", to: "/influencer-ugc" },
              { label: "Influencer Videos", to: "/influencer-ugc" },
              { label: "Product Shoots", to: "/#video-services" },
              { label: "Brand Films & TVC", to: "/#video-services" },
              { label: "AI Video Ads", to: "/#video-services" },
              { label: "Our Work", to: "/#work" },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "Home", to: "/" },
              { label: "Performance Marketing", to: "/performance-marketing" },
              { label: "Web Development", to: "/web-development" },
              { label: "Portfolio", to: "/portfolio" },
              { label: "Privacy Policy", to: "/privacy-policy" },
              { label: "Terms & Conditions", to: "/terms-and-conditions" },
            ],
          },
        ],
      },
    }),
    s("footer-whatsapp", "floating-whatsapp"),
    s("footer-mobile-cta", "mobile-sticky-cta"),
    s("footer-cursor", "custom-cursor"),
  ],
};

/** Current site colors (from src/index.css). Empty value = keep the stylesheet's color. */
export const THEME_COLOR_FIELDS: { key: string; label: string; value: string }[] = [
  { key: "primary", label: "Brand / primary", value: "#0033FF" },
  { key: "primary-foreground", label: "Text on primary", value: "#FFFFFF" },
  { key: "background", label: "Page background", value: "#FCFCFA" },
  { key: "foreground", label: "Main text", value: "#09090B" },
  { key: "secondary", label: "Soft background", value: "#F3F4F6" },
  { key: "muted-foreground", label: "Muted text", value: "#61616B" },
  { key: "card", label: "Card background", value: "#FFFFFF" },
  { key: "border", label: "Borders", value: "#E1E4EF" },
  { key: "charcoal", label: "Footer background", value: "#09090B" },
  { key: "charcoal-foreground", label: "Footer text", value: "#FFFFFF" },
];

export const BUILTIN_THEME: ThemeDoc = {
  kind: "theme",
  slug: THEME_SLUG,
  title: "Theme settings",
  colors: {},
  headingFont: "",
  bodyFont: "",
  radius: "",
  baseFontSize: "",
  customCss: "",
  customJs: "",
  headHtml: "",
};

export function builtinDoc(slug: string): CmsDoc | undefined {
  if (slug === HEADER_SLUG) return BUILTIN_HEADER;
  if (slug === FOOTER_SLUG) return BUILTIN_FOOTER;
  if (slug === THEME_SLUG) return BUILTIN_THEME;
  return BUILTIN_PAGES[slug];
}

export const isBuiltinPage = (slug: string) => !!BUILTIN_PAGES[slug];

/** URL path → page slug */
export const pathToSlug = (path: string) => {
  const clean = path.replace(/^\/+|\/+$/g, "").toLowerCase();
  return clean === "" ? "home" : clean;
};
export const slugToPath = (slug: string) => (slug === "home" ? "/" : slug === PRODUCT_SLUG ? "/product/…" : `/${slug}`);

export const RESERVED_SLUGS = ["admin", "__cms", "product", "api", "assets"];

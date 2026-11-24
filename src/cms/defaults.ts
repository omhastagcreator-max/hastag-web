import { HERO_REELS } from "./heroReels";
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
  // Home = ~80% sales-focused video, ~20% performance marketing.
  // The previous (ads-led) homepage sections are kept below, hidden – turn any back on with the eye icon.
  home: page(
    "home",
    "Home",
    [
      s("home-video-hero", "video-hero", { settings: { source: "manual", videos: HERO_REELS } }),
      s("home-trusted-brands", "trusted-brands"),
      s("home-video-showcase", "video-showcase", { advanced: { anchorId: "work" } }),
      s("home-video-formats", "features", {
        name: "Video formats",
        advanced: { anchorId: "video-formats" },
        settings: {
          heading: "Three video formats. One goal: sales.",
          subheading: "Pick the format that fits your product and budget – every video is scripted for buyers and built to run as an ad.",
          headingAlign: "center",
          items: [
            { icon: "Users", title: "Home Style UGC", text: "Real people using your product at home. Native, trustworthy videos that feel like a recommendation, not an ad – and turn viewers into buyers.", linkLabel: "See UGC videos", link: "/influencer-ugc" },
            { icon: "Camera", title: "Studio Shoot", text: "Clean, premium product videos shot in our studio. Show every detail, answer objections and close the sale – perfect for ads and product pages.", linkLabel: "See studio videos", link: "/influencer-ugc" },
            { icon: "Megaphone", title: "Influencer Reels", text: "Creators from our network of 20,000+ influencers selling your product to audiences who already trust them – with a clear call to buy.", linkLabel: "See influencer reels", link: "/influencer-ugc" },
          ],
          columns: 3,
          columnsTablet: 1,
          columnsMobile: 1,
          cards: true,
          itemAlign: "left",
        },
      }),
      s("home-video-sales-proof", "video-sales-proof", { advanced: { anchorId: "video-results" } }),
      s("home-video-process", "features", {
        name: "Video process",
        settings: {
          heading: "How we make videos that sell",
          subheading: "Built around purchases, not views – every round of videos is improved with real sales data.",
          headingAlign: "center",
          items: [
            { icon: "Search", title: "1. Buyer research", text: "Who buys, why they buy and what stops them – from your reviews, competitors and ad data." },
            { icon: "Lightbulb", title: "2. Sales scripts", text: "Hooks, proof and offer written to drive a purchase. You approve every script before we shoot." },
            { icon: "Camera", title: "3. Shoot", text: "Home style UGC, studio shoot or influencer reel – whichever sells your product best." },
            { icon: "TrendingUp", title: "4. Test & scale", text: "Multiple versions run as ads. We keep the ones that bring orders and drop the rest." },
          ],
          columns: 4,
          columnsTablet: 2,
          columnsMobile: 1,
          cards: false,
          itemAlign: "left",
          compact: true,
        },
      }),
      s("home-network-stats", "network-stats"),
      s("home-whatsapp-testimonials", "whatsapp-testimonials"),
      s("home-performance", "image-with-text", {
        name: "Performance marketing (20%)",
        settings: {
          eyebrow: "Plus performance marketing",
          heading: "We don't stop at the video – we run it to sell",
          text: "<p>A great video only makes money when it reaches the right buyers. Our performance team launches your videos as Meta and Google ads, tests hooks and audiences, and scales the winners while tracking ROAS, CAC and margins.</p><ul><li>Meta (Facebook &amp; Instagram) and Google ads management</li><li>Every video tested for orders, not views</li><li>Landing pages and conversion optimisation</li></ul>",
          image: "/google-search-meta-andromeda.jpg",
          imagePosition: "right",
          ratio: "auto",
          buttonLabel: "Explore performance marketing",
          buttonLink: "/performance-marketing",
          buttonStyle: "dark",
        },
      }),
      s("home-dashboard-results", "dashboard-results"),
      s("home-pricing", "pricing"),
      s("home-google-reviews", "google-reviews"),
      s("home-lead-form", "lead-form", {
        settings: {
          formId: "audit-form",
          location: "home_video_form",
          heading: "Get videos that sell for your brand",
          subheading: "Tell us about your product – we'll reply on WhatsApp with video ideas built to drive orders, plus a free review of your current ads.",
          buttonLabel: "Get My Free Video Strategy",
        },
      }),
      s("home-faq", "faq", {
        settings: {
          heading: "Frequently Asked Questions",
          items: [
            { q: "What kind of videos do you make?", a: "Three formats: Home Style UGC (real people using your product at home), Studio Shoots (premium product videos from our studio) and Influencer Reels (creators from our network). All of them are made to sell, not just to get views." },
            { q: "How are your videos different from a normal video agency?", a: "Most agencies chase views, likes and trends. We write every video for a buyer – hook, proof, offer and call to action – then test it as an ad and judge it by orders, revenue and ROAS." },
            { q: "Do you provide creators and influencers?", a: "Yes. We work with a network of 20,000+ influencers across India and handle the brief, scripts, shoot coordination and editing." },
            { q: "Do you also run the ads?", a: "Yes. Our performance marketing team manages Meta and Google ads, tests your videos and scales the ones that bring sales." },
            { q: "How much does it cost?", a: "UGC video production is ₹65,000 for 10 studio quality videos (₹6,500/video), or 30 home style videos at ₹2,600/video. Meta ads management is ₹42,465/month (₹35,271/month with our videos). Our Quick Scale Starter bundle is ₹64,999 one-time. See the pricing section for combos." },
            { q: "How long does a video project take?", a: "It depends on the format and number of videos. We'll share a clear timeline after understanding your brief." },
          ],
        },
      }),

      // ---- previous homepage sections (hidden, content kept) ----
      s("home-hero", "hero", { enabled: false, name: "Old hero (ads-focused)" }),
      s("home-perf-glimpse", "perf-glimpse", { enabled: false }),
      s("home-influencer-glimpse", "influencer-glimpse", { enabled: false }),
      s("home-how-it-works", "how-it-works", { enabled: false }),
      s("home-webdev-glimpse", "webdev-glimpse", { enabled: false }),
      s("home-marketing-breakdown", "marketing-breakdown", { enabled: false }),
      s("home-why-choose-us", "why-choose-us", { enabled: false }),
      s("home-final-cta", "final-cta", { enabled: false }),
    ],
    {
      title: "HastagCreator | Sales-Focused Video Ads – UGC, Studio Shoots & Influencer Reels",
      description:
        "HastagCreator makes sales-focused videos for D2C brands – Home Style UGC, Studio Shoots and Influencer Reels – scripted for buyers, run as Meta & Google ads and judged on orders, not views.",
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
        topBarText: "HastagCreator · Sales-Focused Video Ads · Home Style UGC · Studio Shoots · Influencer Reels",
        topBarMobileText: "#Creator · Videos That Sell",
        links: [
          { label: "Our Work", to: "/#work" },
          { label: "Results", to: "/#video-results" },
          { label: "Pricing", to: "/#pricing" },
          { label: "UGC & Influencers", to: "/influencer-ugc" },
          { label: "Performance Marketing", to: "/performance-marketing" },
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
          "India-based studio making sales-focused videos for D2C brands – Home Style UGC, Studio Shoots and Influencer Reels – backed by performance marketing that turns videos into orders.",
        columns: [
          {
            title: "Video",
            links: [
              { label: "Home Style UGC", to: "/#video-formats" },
              { label: "Studio Shoot", to: "/#video-formats" },
              { label: "Influencer Reels", to: "/#video-formats" },
              { label: "Our Work", to: "/#work" },
              { label: "Results", to: "/#video-results" },
              { label: "Pricing", to: "/#pricing" },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "Home", to: "/" },
              { label: "Performance Marketing", to: "/performance-marketing" },
              { label: "Web Development", to: "/web-development" },
              { label: "Portfolio", to: "/portfolio" },
              { label: "Careers", to: "/careers" },
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

export const RESERVED_SLUGS = ["admin", "editor", "__cms", "product", "api", "assets"];

import type { FieldDef, SectionInstance, SectionTypeDef } from "./types";
import * as B from "./blocks";

// Existing hand-built sections of the site
import Navbar, { navbarDefaults } from "@/components/Navbar";
import Footer, { footerDefaults } from "@/components/Footer";
import HeroSection, { heroDefaults } from "@/components/HeroSection";
import FAQ, { defaultFaqs } from "@/components/FAQ";
import TrustedBrands from "@/components/TrustedBrands";
import PerformanceMarketingGlimpse from "@/components/PerformanceMarketingGlimpse";
import InfluencerMarketingGlimpse from "@/components/InfluencerMarketingGlimpse";
import NetworkStats from "@/components/NetworkStats";
import HowItWorks from "@/components/HowItWorks";
import WebDevelopmentGlimpse from "@/components/WebDevelopmentGlimpse";
import MarketingBreakdown from "@/components/MarketingBreakdown";
import WhatsAppTestimonials from "@/components/WhatsAppTestimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import DashboardResultsSection from "@/components/DashboardResultsSection";
import GoogleReviews from "@/components/GoogleReviews";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import CaseStudySnapshot from "@/components/CaseStudySnapshot";
import ServicesGrid from "@/components/ServicesGrid";
import FounderSection from "@/components/FounderSection";
import OfficialPartners from "@/components/OfficialPartners";
import Process from "@/components/Process";
import ResultsSection from "@/components/ResultsSection";
import ScarcityBanner from "@/components/ScarcityBanner";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import CustomCursor from "@/components/CustomCursor";
import { useIsPreview } from "./ChromeContext";

// Whole existing pages (rendered as one editable "page content" section)
import Contact from "@/pages/Contact";
import Portfolio from "@/pages/Portfolio";
import Services from "@/pages/Services";
import WebDevelopment from "@/pages/WebDevelopment";
import PerformanceMarketing from "@/pages/PerformanceMarketing";
import Careers from "@/pages/Careers";
import InfluencerUGC from "@/pages/InfluencerUGC";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Terms from "@/pages/Terms";
import ProductDetail from "@/pages/ProductDetail";

const LINK_HELP = "A page (/contact), a section on this page (#faq), #audit for the lead form, or a full URL.";

// ---------------------------------------------------------------------------
// reusable field groups
// ---------------------------------------------------------------------------
const f = {
  heading: (d = ""): FieldDef => ({ key: "heading", label: "Heading", type: "text", default: d }),
  subheading: (d = ""): FieldDef => ({ key: "subheading", label: "Subheading", type: "textarea", default: d }),
  compact: (): FieldDef => ({ key: "compact", label: "Compact spacing", type: "toggle", default: false }),
  buttonStyle: (key = "buttonStyle", d = "primary"): FieldDef => ({
    key,
    label: "Button style",
    type: "select",
    default: d,
    options: [
      { label: "Primary", value: "primary" },
      { label: "Dark", value: "dark" },
      { label: "Light", value: "light" },
      { label: "Outline", value: "outline" },
      { label: "WhatsApp green", value: "whatsapp" },
    ],
  }),
  columns: (d = 3): FieldDef[] => [
    { key: "columns", label: "Columns – desktop", type: "range", min: 1, max: 6, default: d },
    { key: "columnsTablet", label: "Columns – tablet", type: "range", min: 1, max: 4, default: 2 },
    { key: "columnsMobile", label: "Columns – mobile", type: "range", min: 1, max: 2, default: 1 },
  ],
  align: (key = "align", d = "center"): FieldDef => ({
    key,
    label: "Alignment",
    type: "select",
    default: d,
    options: [
      { label: "Left", value: "left" },
      { label: "Center", value: "center" },
      { label: "Right", value: "right" },
    ],
  }),
};

const VIDEO_SOURCE: FieldDef = {
  key: "source",
  label: "Videos from",
  type: "select",
  options: [
    { label: "My video portfolio (/admin → Videos)", value: "portfolio" },
    { label: "Videos I add here", value: "manual" },
  ],
};
const VIDEO_FORMAT: FieldDef = {
  key: "category",
  label: "Video format",
  type: "select",
  options: [
    { label: "Home Style UGC", value: "ugc" },
    { label: "Studio Shoot", value: "studio" },
    { label: "Influencer Reels", value: "influencer" },
  ],
};
const MANUAL_VIDEOS: FieldDef = {
  key: "videos",
  label: "Videos (when 'Videos I add here')",
  type: "list",
  itemLabel: "title",
  fields: [
    { key: "video", label: "Video (upload, MP4, YouTube or Instagram link)", type: "video" },
    { key: "poster", label: "Cover image", type: "image" },
    { key: "title", label: "Title", type: "text" },
    { key: "label", label: "Small label (e.g. 0:15)", type: "text" },
    VIDEO_FORMAT,
    { key: "result", label: "Sales result (e.g. 3.8x ROAS · 240 orders)", type: "text" },
  ],
};

const linkField = (key: string, label = "Link"): FieldDef => ({ key, label, type: "url", help: LINK_HELP });

const legacy = (
  type: string,
  label: string,
  component: React.ComponentType<any>,
  description = "",
  category: SectionTypeDef["category"] = "Existing sections",
): SectionTypeDef => ({
  type,
  label,
  category,
  legacy: true,
  description: description || "Existing section of your site. Click any text, image or button in the preview to edit it.",
  fields: [],
  defaults: {},
  component: () => {
    const C = component;
    return <C />;
  },
});

// CustomCursor is hidden inside the editor so you can point & click normally
const CursorSection = () => (useIsPreview() ? null : <CustomCursor />);

// ---------------------------------------------------------------------------
// registry
// ---------------------------------------------------------------------------
const defs: SectionTypeDef[] = [
  // ----- header & footer -----
  {
    type: "announcement-bar",
    label: "Announcement bar",
    category: "Header & footer",
    description: "Slim message bar above the header. Rotates through several messages.",
    group: "any",
    fields: [
      {
        key: "messages",
        label: "Messages",
        type: "list",
        itemLabel: "text",
        fields: [
          { key: "text", label: "Text", type: "text" },
          linkField("link"),
        ],
      },
      { key: "interval", label: "Rotate every (seconds)", type: "range", min: 2, max: 15, default: 5 },
      { key: "bgColor", label: "Background", type: "color" },
      { key: "textColor", label: "Text color", type: "color" },
      { key: "dismissible", label: "Visitors can close it", type: "toggle", default: false },
      { key: "sticky", label: "Stick to top while scrolling", type: "toggle", default: false },
    ],
    defaults: { messages: [{ text: "🎉 Free D2C growth audit for this month's first 10 brands", link: "#audit" }], interval: 5 },
    component: B.AnnouncementBar,
  },
  {
    type: "header",
    label: "Header / navigation",
    category: "Header & footer",
    description: "Logo, menu links (with dropdowns), top trust bar and the main call-to-action button.",
    group: "header",
    fields: [
      { key: "_logo", label: "Logo", type: "heading" },
      { key: "logo", label: "Logo image", type: "image" },
      { key: "logoAlt", label: "Logo alt text", type: "text" },
      { key: "logoHeight", label: "Logo height (px)", type: "range", min: 20, max: 80 },
      { key: "_top", label: "Top bar", type: "heading" },
      { key: "topBarEnabled", label: "Show top bar", type: "toggle" },
      { key: "topBarText", label: "Top bar text", type: "text" },
      { key: "topBarMobileText", label: "Top bar text (mobile)", type: "text" },
      { key: "_menu", label: "Menu", type: "heading" },
      {
        key: "links",
        label: "Menu links",
        type: "list",
        itemLabel: "label",
        fields: [
          { key: "label", label: "Label", type: "text" },
          { key: "to", label: "Link", type: "url", help: LINK_HELP },
          {
            key: "dropdown",
            label: "Dropdown links (optional)",
            type: "list",
            itemLabel: "label",
            fields: [
              { key: "label", label: "Label", type: "text" },
              { key: "to", label: "Link", type: "url" },
            ],
          },
        ],
      },
      { key: "_cta", label: "Button", type: "heading" },
      { key: "ctaEnabled", label: "Show button", type: "toggle" },
      { key: "ctaLabel", label: "Button label", type: "text" },
      { key: "mobileCtaLabel", label: "Button label (mobile menu)", type: "text" },
      { key: "ctaLink", label: "Button link", type: "url", help: "Leave empty to scroll to the audit form. " + LINK_HELP },
    ],
    defaults: navbarDefaults,
    component: ({ settings }) => <Navbar {...settings} />,
  },
  {
    type: "footer",
    label: "Footer",
    category: "Header & footer",
    description: "Support banner, logo, about text, link columns, contact details and copyright.",
    group: "footer",
    fields: [
      { key: "_support", label: "Support banner", type: "heading" },
      { key: "supportEnabled", label: "Show support banner", type: "toggle" },
      { key: "supportHeading", label: "Heading", type: "text" },
      { key: "supportText", label: "Text", type: "textarea" },
      { key: "supportButtonLabel", label: "Button label", type: "text" },
      linkField("supportButtonLink", "Button link"),
      { key: "_brand", label: "Brand", type: "heading" },
      { key: "logo", label: "Logo", type: "image" },
      { key: "logoAlt", label: "Logo alt text", type: "text" },
      { key: "about", label: "About text", type: "textarea" },
      {
        key: "badges",
        label: "Badges",
        type: "list",
        itemLabel: "alt",
        fields: [
          { key: "image", label: "Image", type: "image" },
          { key: "alt", label: "Alt text", type: "text" },
        ],
      },
      {
        key: "socials",
        label: "Social links",
        type: "list",
        itemLabel: "label",
        fields: [
          { key: "label", label: "Label (e.g. Instagram)", type: "text" },
          { key: "url", label: "URL", type: "url" },
        ],
      },
      { key: "_cols", label: "Link columns", type: "heading" },
      {
        key: "columns",
        label: "Columns",
        type: "list",
        itemLabel: "title",
        fields: [
          { key: "title", label: "Title", type: "text" },
          {
            key: "links",
            label: "Links",
            type: "list",
            itemLabel: "label",
            fields: [
              { key: "label", label: "Label", type: "text" },
              { key: "to", label: "Link", type: "url" },
            ],
          },
        ],
      },
      { key: "_contact", label: "Contact", type: "heading" },
      { key: "contactTitle", label: "Title", type: "text" },
      { key: "address", label: "Address", type: "textarea" },
      { key: "email", label: "Email", type: "text" },
      { key: "phoneLabel", label: "Phone label", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "copyright", label: "Copyright text", type: "text" },
    ],
    defaults: footerDefaults,
    component: ({ settings }) => <Footer {...settings} />,
  },
  {
    type: "floating-whatsapp",
    label: "Floating WhatsApp button",
    category: "Header & footer",
    legacy: true,
    description: "Round WhatsApp button in the bottom-right corner (desktop).",
    fields: [],
    defaults: {},
    component: () => <WhatsAppButton />,
  },
  {
    type: "mobile-sticky-cta",
    label: "Mobile sticky bottom bar",
    category: "Header & footer",
    legacy: true,
    description: "Audit + WhatsApp bar pinned to the bottom of the screen on phones.",
    fields: [],
    defaults: {},
    component: () => <MobileStickyCTA />,
  },
  {
    type: "custom-cursor",
    label: "Custom cursor",
    category: "Header & footer",
    legacy: true,
    description: "The animated blue cursor on desktop. Hide it to use the normal mouse pointer.",
    fields: [],
    defaults: {},
    component: CursorSection,
  },

  // ----- existing site sections -----
  {
    type: "hero",
    label: "Hero (home)",
    category: "Existing sections",
    description: "The home page hero: badge, headline, sub-text, buttons and logo strip.",
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "headingLine1", label: "Headline", type: "text" },
      { key: "headingHighlight", label: "Headline (highlighted part)", type: "text" },
      { key: "subheading", label: "Sub-headline", type: "textarea" },
      { key: "qualification", label: "Qualification line", type: "text", help: "Leave empty to hide." },
      { key: "_btn", label: "Buttons", type: "heading" },
      { key: "primaryLabel", label: "Main button label", type: "text" },
      { key: "primaryLink", label: "Main button link", type: "url", help: "Empty = scroll to the audit form." },
      { key: "secondaryEnabled", label: "Show second button", type: "toggle" },
      { key: "secondaryLabel", label: "Second button label", type: "text" },
      linkField("secondaryLink", "Second button link"),
      { key: "_logos", label: "Logo strip", type: "heading" },
      { key: "logosEnabled", label: "Show logos", type: "toggle" },
      { key: "logosTitle", label: "Logo strip title", type: "text" },
      {
        key: "logos",
        label: "Logos",
        type: "list",
        itemLabel: "alt",
        fields: [
          { key: "image", label: "Image", type: "image" },
          { key: "alt", label: "Alt text", type: "text" },
        ],
      },
    ],
    defaults: heroDefaults,
    component: ({ settings }) => <HeroSection {...settings} />,
  },
  {
    type: "lead-form",
    label: "Audit lead form",
    category: "Forms",
    description: "Your existing free-audit lead form (name, phone, brand, ad spend…). All 'Get audit' buttons scroll here.",
    fields: [
      { key: "heading", label: "Form heading", type: "text", placeholder: "Find What's Blocking Your Growth" },
      { key: "subheading", label: "Form sub-text", type: "text", placeholder: "Get a free review of your Ads, Website, Offer & Conversion Funnel." },
      { key: "buttonLabel", label: "Button label", type: "text", placeholder: "Get My Free Growth Audit" },
      { key: "formId", label: "Anchor id", type: "text", help: "Keep 'audit-form' for the main form on a page." },
      { key: "location", label: "Analytics label", type: "text" },
    ],
    defaults: { formId: "audit-form", location: "after_hero" },
    component: B.LeadFormBlock,
  },
  {
    type: "faq",
    label: "FAQ (site style)",
    category: "Existing sections",
    description: "The site's FAQ accordion. Add, remove and reorder questions.",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      {
        key: "items",
        label: "Questions",
        type: "list",
        itemLabel: "q",
        fields: [
          { key: "q", label: "Question", type: "text" },
          { key: "a", label: "Answer", type: "textarea" },
        ],
      },
    ],
    defaults: { heading: "Frequently Asked Questions", items: defaultFaqs },
    component: ({ settings }) => <FAQ heading={settings.heading} items={settings.items} />,
  },
  {
    type: "services-grid",
    label: "Services / products grid (site style)",
    category: "Commerce",
    description: "Your existing services grid with checkout, pulled live from /admin products.",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
      { key: "filterKeyword", label: "Only show products containing", type: "text", help: "e.g. 'Shopify'. Leave empty for all." },
    ],
    defaults: {},
    component: ({ settings }) => (
      <ServicesGrid title={settings.title || undefined} subtitle={settings.subtitle || undefined} filterKeyword={settings.filterKeyword || undefined} />
    ),
  },
  legacy("trusted-brands", "Trusted brands marquee", TrustedBrands),
  legacy("perf-glimpse", "Problem / funnel section", PerformanceMarketingGlimpse),
  legacy("influencer-glimpse", "Ads problem section", InfluencerMarketingGlimpse),
  legacy("network-stats", "Experience + numbers", NetworkStats),
  legacy("how-it-works", "How we work", HowItWorks),
  legacy("webdev-glimpse", "Website / conversion section", WebDevelopmentGlimpse),
  legacy("marketing-breakdown", "Scaling section", MarketingBreakdown),
  legacy("whatsapp-testimonials", "WhatsApp proof screenshots", WhatsAppTestimonials),
  legacy("why-choose-us", "Why choose us", WhyChooseUs),
  legacy("dashboard-results", "Case studies / results", DashboardResultsSection),
  legacy("google-reviews", "Google reviews", GoogleReviews),
  legacy("pricing", "Pricing plans (site style)", Pricing),
  legacy("final-cta", "Final CTA + form", FinalCTA),
  legacy("case-study-snapshot", "Case study snapshot", CaseStudySnapshot),
  legacy("founder", "Founder section", FounderSection),
  legacy("official-partners", "Official partners", OfficialPartners),
  legacy("process", "Process steps", Process),
  legacy("results", "Results section", ResultsSection),
  legacy("scarcity-banner", "Scarcity banner", ScarcityBanner),

  // whole existing pages
  legacy("page-contact", "Contact page content", Contact, "The original Contact page. Click anything in the preview to edit it."),
  legacy("page-portfolio", "Portfolio page content", Portfolio),
  legacy("page-services", "Services page content", Services),
  legacy("page-web-development", "Web development page content", WebDevelopment),
  legacy("page-performance-marketing", "Performance marketing page content", PerformanceMarketing),
  legacy("page-careers", "Careers page content", Careers),
  legacy("page-influencer-ugc", "Influencer / UGC page content", InfluencerUGC),
  legacy("page-privacy", "Privacy policy content", PrivacyPolicy),
  legacy("page-terms", "Terms & conditions content", Terms),
  legacy("page-product", "Product details", ProductDetail, "The product page layout (title, gallery, price, checkout). Uses the product from the URL."),

  // ----- video-first blocks -----
  {
    type: "video-hero",
    label: "Video hero",
    category: "Media",
    description: "Headline + buttons beside three playing reels from your video portfolio.",
    fields: [
      { key: "eyebrow", label: "Small label", type: "text" },
      { key: "heading", label: "Headline", type: "text" },
      { key: "highlight", label: "Headline (highlighted part)", type: "text" },
      { key: "subheading", label: "Sub-headline", type: "textarea" },
      {
        key: "buttons",
        label: "Buttons",
        type: "list",
        itemLabel: "label",
        fields: [{ key: "label", label: "Label", type: "text" }, linkField("link"), f.buttonStyle("style")],
      },
      {
        key: "stats",
        label: "Proof points (under the buttons)",
        type: "list",
        itemLabel: "label",
        fields: [
          { key: "value", label: "Value", type: "text" },
          { key: "label", label: "Label", type: "text" },
        ],
      },
      { key: "_v", label: "Videos", type: "heading" },
      VIDEO_SOURCE,
      MANUAL_VIDEOS,
    ],
    defaults: {
      eyebrow: "Sales-focused video ads for D2C brands",
      heading: "Videos made to sell,",
      highlight: "not just to get views",
      subheading: "Home style UGC, studio shoots and influencer reels – each one scripted for buyers, run as ads and judged on orders, revenue and ROAS.",
      buttons: [
        { label: "See our work", link: "#work", style: "primary" },
        { label: "Get a free video strategy", link: "#audit", style: "outline" },
      ],
      stats: [],
      source: "portfolio",
    },
    component: B.VideoHero,
  },
  {
    type: "video-showcase",
    label: "Video showcase (reels)",
    category: "Media",
    description: "Your video portfolio as swipeable reels with category filters.",
    fields: [
      { key: "eyebrow", label: "Small label", type: "text" },
      f.heading(),
      f.subheading(),
      VIDEO_SOURCE,
      MANUAL_VIDEOS,
      { key: "limit", label: "Max videos", type: "range", min: 1, max: 30 },
      { key: "layout", label: "Layout", type: "select", options: [{ label: "Swipe carousel", value: "carousel" }, { label: "Grid", value: "grid" }] },
      { key: "columns", label: "Grid columns – desktop", type: "range", min: 2, max: 6 },
      { key: "showFilters", label: "Show category filters", type: "toggle", default: true },
      { key: "dark", label: "Dark background", type: "toggle" },
      { key: "buttonLabel", label: "Button label", type: "text" },
      linkField("buttonLink", "Button link"),
      f.buttonStyle(),
      f.compact(),
    ],
    defaults: {
      eyebrow: "Our work",
      heading: "Home style UGC, studio shoots & influencer reels",
      subheading: "Every video here was made with one job: getting people to buy.",
      source: "portfolio",
      limit: 12,
      layout: "carousel",
      columns: 4,
      showFilters: true,
      buttonLabel: "See all UGC & influencer work",
      buttonLink: "/influencer-ugc",
    },
    component: B.VideoShowcase,
  },
  {
    type: "video-sales-proof",
    label: "Videos that deliver sales (proof)",
    category: "Social proof",
    description: "'Orders, not views' comparison plus result cards: video + brand + sales result. Pulls videos from /admin that have a Sales result filled in.",
    fields: [
      { key: "eyebrow", label: "Small label", type: "text" },
      f.heading(),
      f.subheading(),
      { key: "_cmp", label: "Comparison", type: "heading" },
      { key: "notTitle", label: "Left title", type: "text" },
      { key: "notItems", label: "Left points (one per line)", type: "textarea" },
      { key: "yesTitle", label: "Right title", type: "text" },
      { key: "yesItems", label: "Right points (one per line)", type: "textarea" },
      { key: "_res", label: "Results", type: "heading" },
      {
        key: "results",
        label: "Result cards",
        type: "list",
        itemLabel: "brand",
        fields: [
          { key: "video", label: "Video (upload, MP4, YouTube or Instagram)", type: "video" },
          { key: "poster", label: "Cover image", type: "image" },
          { key: "brand", label: "Brand / product", type: "text" },
          VIDEO_FORMAT,
          { key: "result", label: "Headline result (e.g. 4.2x ROAS)", type: "text" },
          { key: "metrics", label: "More numbers (one per line, e.g. 312 orders in 21 days)", type: "textarea" },
        ],
      },
      { key: "includePortfolio", label: "Also show /admin videos that have a Sales result", type: "toggle", default: true },
      { key: "limit", label: "Max cards", type: "range", min: 1, max: 12 },
      { key: "dark", label: "Dark background", type: "toggle", default: true },
      { key: "buttonLabel", label: "Button label", type: "text" },
      linkField("buttonLink", "Button link"),
      f.buttonStyle(),
      f.compact(),
    ],
    defaults: {
      eyebrow: "Proof, not promises",
      heading: "Videos that deliver sales",
      subheading: "We judge every video by one thing: did it sell? Each one is scripted for a buyer, tested as an ad and improved with real purchase data.",
      notTitle: "What most video agencies sell",
      notItems: "Views and likes\nTrending audio and viral formats\nPretty videos with no sales goal\nOne video, no testing",
      yesTitle: "What we deliver",
      yesItems: "Orders, revenue and ROAS\nHooks and scripts written to make people buy\nMultiple versions tested as ads\nWinners scaled, losers cut fast",
      results: [],
      includePortfolio: true,
      limit: 6,
      dark: true,
      buttonLabel: "Get my free video strategy",
      buttonLink: "#audit",
    },
    component: B.VideoSalesProof,
  },

  // ----- new building blocks -----
  {
    type: "hero-banner",
    label: "Hero banner",
    category: "Media",
    description: "Big headline over an image or video, with buttons.",
    fields: [
      { key: "eyebrow", label: "Small label above", type: "text" },
      { key: "heading", label: "Heading", type: "text" },
      { key: "subheading", label: "Text", type: "textarea" },
      {
        key: "buttons",
        label: "Buttons",
        type: "list",
        itemLabel: "label",
        fields: [{ key: "label", label: "Label", type: "text" }, linkField("link"), f.buttonStyle("style")],
      },
      { key: "_bg", label: "Background", type: "heading" },
      { key: "image", label: "Image", type: "image" },
      { key: "mobileImage", label: "Mobile image (optional)", type: "image" },
      { key: "imageAlt", label: "Image alt text", type: "text" },
      { key: "video", label: "Background video (optional)", type: "video" },
      { key: "overlayColor", label: "Overlay color", type: "color" },
      { key: "overlayOpacity", label: "Overlay opacity %", type: "range", min: 0, max: 90 },
      { key: "textColor", label: "Text color", type: "color" },
      f.align(),
      {
        key: "height",
        label: "Height",
        type: "select",
        options: [
          { label: "Fit content", value: "auto" },
          { label: "Small", value: "small" },
          { label: "Medium", value: "medium" },
          { label: "Large", value: "large" },
          { label: "Full screen", value: "full" },
        ],
      },
    ],
    defaults: {
      eyebrow: "New",
      heading: "Your big headline goes here",
      subheading: "Tell visitors what you do and why it matters in one or two lines.",
      buttons: [{ label: "Get started", link: "#audit", style: "primary" }],
      height: "medium",
      align: "center",
      overlayOpacity: 0,
    },
    component: B.HeroBanner,
  },
  {
    type: "slideshow",
    label: "Slideshow / slider",
    category: "Media",
    description: "Rotating full-width slides with text and a button.",
    fields: [
      {
        key: "slides",
        label: "Slides",
        type: "list",
        itemLabel: "heading",
        fields: [
          { key: "image", label: "Image", type: "image" },
          { key: "mobileImage", label: "Mobile image", type: "image" },
          { key: "heading", label: "Heading", type: "text" },
          { key: "text", label: "Text", type: "textarea" },
          { key: "buttonLabel", label: "Button label", type: "text" },
          linkField("buttonLink", "Button link"),
          f.buttonStyle("buttonStyle", "light"),
          { key: "textColor", label: "Text color", type: "color" },
          f.align("align", "left"),
        ],
      },
      { key: "autoplay", label: "Autoplay", type: "toggle", default: true },
      { key: "interval", label: "Change every (seconds)", type: "range", min: 2, max: 15, default: 5 },
      { key: "overlayOpacity", label: "Darken images %", type: "range", min: 0, max: 80, default: 30 },
      { key: "showArrows", label: "Show arrows", type: "toggle", default: true },
      { key: "showDots", label: "Show dots", type: "toggle", default: true },
      {
        key: "height",
        label: "Height",
        type: "select",
        options: [
          { label: "Small", value: "small" },
          { label: "Medium", value: "medium" },
          { label: "Large", value: "large" },
          { label: "Full screen", value: "full" },
        ],
      },
    ],
    defaults: {
      slides: [
        { image: "/banner.png", heading: "Slide one", text: "Add your message", buttonLabel: "Learn more", buttonLink: "#audit" },
        { image: "/website-mockup.png", heading: "Slide two", text: "Another message", buttonLabel: "Get started", buttonLink: "#audit" },
      ],
      autoplay: true,
      interval: 5,
      overlayOpacity: 30,
      height: "medium",
    },
    component: B.Slideshow,
  },
  {
    type: "rich-text",
    label: "Rich text",
    category: "Text",
    description: "Heading and formatted text (bold, links, lists…).",
    fields: [
      { key: "eyebrow", label: "Small label", type: "text" },
      f.heading(),
      { key: "content", label: "Content", type: "richtext" },
      f.align("align", "left"),
      { key: "width", label: "Width", type: "select", options: [{ label: "Narrow (easy reading)", value: "narrow" }, { label: "Wide", value: "wide" }] },
      { key: "buttonLabel", label: "Button label", type: "text" },
      linkField("buttonLink", "Button link"),
      f.buttonStyle(),
      f.compact(),
    ],
    defaults: { heading: "Talk about your brand", content: "<p>Share information about your brand with your customers. Describe a product, make announcements, or welcome customers to your store.</p>", align: "left", width: "narrow" },
    component: B.RichText,
  },
  {
    type: "image-with-text",
    label: "Image with text",
    category: "Text",
    description: "Image (or video) beside a heading, text and button.",
    fields: [
      { key: "image", label: "Image", type: "image" },
      { key: "imageAlt", label: "Image alt text", type: "text" },
      { key: "video", label: "Video instead of image (optional)", type: "video" },
      { key: "imagePosition", label: "Image position", type: "select", options: [{ label: "Left", value: "left" }, { label: "Right", value: "right" }] },
      { key: "ratio", label: "Image shape", type: "select", options: [{ label: "Original", value: "auto" }, { label: "Square", value: "1/1" }, { label: "Landscape 4:3", value: "4/3" }, { label: "Portrait 4:5", value: "4/5" }, { label: "Wide 16:9", value: "16/9" }] },
      { key: "eyebrow", label: "Small label", type: "text" },
      f.heading(),
      { key: "text", label: "Text", type: "richtext" },
      { key: "buttonLabel", label: "Button label", type: "text" },
      linkField("buttonLink", "Button link"),
      f.buttonStyle(),
      f.compact(),
    ],
    defaults: { image: "/website-mockup.png", heading: "Image with text", text: "<p>Pair text with an image to focus on your chosen product, collection, or story.</p>", buttonLabel: "Learn more", buttonLink: "#audit", imagePosition: "left", ratio: "auto" },
    component: B.ImageWithText,
  },
  {
    type: "columns",
    label: "Multi-column",
    category: "Layout",
    description: "2–6 columns, each with optional image, heading, text and button.",
    fields: [
      f.heading(),
      f.subheading(),
      {
        key: "columnsList",
        label: "Columns",
        type: "list",
        itemLabel: "heading",
        fields: [
          { key: "image", label: "Image", type: "image" },
          { key: "heading", label: "Heading", type: "text" },
          { key: "text", label: "Text", type: "richtext" },
          { key: "buttonLabel", label: "Button label", type: "text" },
          linkField("buttonLink", "Button link"),
          f.buttonStyle("buttonStyle", "outline"),
        ],
      },
      ...f.columns(3),
      { key: "imageRatio", label: "Image shape", type: "select", options: [{ label: "Landscape", value: "4/3" }, { label: "Square", value: "1/1" }, { label: "Portrait", value: "4/5" }, { label: "Wide", value: "16/9" }] },
      f.compact(),
    ],
    defaults: {
      heading: "Multi-column",
      columnsList: [
        { heading: "Column one", text: "<p>Short description.</p>" },
        { heading: "Column two", text: "<p>Short description.</p>" },
        { heading: "Column three", text: "<p>Short description.</p>" },
      ],
      columns: 3,
    },
    component: B.Columns,
  },
  {
    type: "features",
    label: "Features / icon grid",
    category: "Text",
    description: "Grid of icons (or small images) with titles and text.",
    fields: [
      f.heading(),
      f.subheading(),
      f.align("headingAlign", "center"),
      {
        key: "items",
        label: "Items",
        type: "list",
        itemLabel: "title",
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "image", label: "Or an image", type: "image" },
          { key: "title", label: "Title", type: "text" },
          { key: "text", label: "Text", type: "textarea" },
          { key: "linkLabel", label: "Link label", type: "text" },
          linkField("link"),
        ],
      },
      ...f.columns(3),
      { key: "cards", label: "Show as cards", type: "toggle", default: true },
      f.align("itemAlign", "left"),
      f.compact(),
    ],
    defaults: {
      heading: "Why brands choose us",
      items: [
        { icon: "TrendingUp", title: "Profitable growth", text: "We optimise for contribution margin, not vanity ROAS." },
        { icon: "Target", title: "Sharp targeting", text: "Audiences and creatives built around your winning angles." },
        { icon: "Zap", title: "Fast execution", text: "Weekly creative testing and transparent reporting." },
      ],
      columns: 3,
    },
    component: B.Features,
  },
  {
    type: "stats",
    label: "Stats / numbers",
    category: "Social proof",
    fields: [
      f.heading(),
      f.subheading(),
      {
        key: "items",
        label: "Numbers",
        type: "list",
        itemLabel: "label",
        fields: [
          { key: "value", label: "Value (e.g. 4.2x)", type: "text" },
          { key: "label", label: "Label", type: "text" },
        ],
      },
      { key: "columns", label: "Columns – desktop", type: "range", min: 1, max: 6 },
      f.compact(),
    ],
    defaults: { items: [{ value: "150+", label: "Brands scaled" }, { value: "₹40Cr+", label: "Ad spend managed" }, { value: "3.8x", label: "Average ROAS" }, { value: "11+", label: "Years experience" }], columns: 4 },
    component: B.Stats,
  },
  {
    type: "logo-strip",
    label: "Logo strip",
    category: "Social proof",
    fields: [
      { key: "heading", label: "Title", type: "text" },
      {
        key: "logos",
        label: "Logos",
        type: "list",
        itemLabel: "alt",
        fields: [
          { key: "image", label: "Image", type: "image" },
          { key: "alt", label: "Alt text", type: "text" },
          linkField("link"),
        ],
      },
      { key: "marquee", label: "Scrolling marquee", type: "toggle", default: true },
      { key: "speed", label: "Marquee duration (seconds)", type: "range", min: 10, max: 90, default: 30 },
      { key: "grayscale", label: "Grayscale until hover", type: "toggle", default: true },
      { key: "compact", label: "Compact spacing", type: "toggle", default: true },
    ],
    defaults: {
      heading: "Trusted by D2C & e-commerce brands",
      logos: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ image: `/trustbybrands/${n}.png`, alt: "Brand logo" })),
      marquee: true,
      speed: 30,
    },
    component: B.LogoStrip,
  },
  {
    type: "testimonials",
    label: "Testimonials",
    category: "Social proof",
    fields: [
      f.heading(),
      f.subheading(),
      {
        key: "items",
        label: "Testimonials",
        type: "list",
        itemLabel: "name",
        fields: [
          { key: "quote", label: "Quote", type: "textarea" },
          { key: "name", label: "Name", type: "text" },
          { key: "role", label: "Role / brand", type: "text" },
          { key: "avatar", label: "Photo", type: "image" },
          { key: "rating", label: "Stars (0 = hide)", type: "range", min: 0, max: 5 },
        ],
      },
      { key: "columns", label: "Columns – desktop", type: "range", min: 1, max: 4 },
      f.compact(),
    ],
    defaults: {
      heading: "What founders say",
      items: [
        { quote: "Our ROAS went from 1.8 to 3.4 in two months.", name: "Founder", role: "D2C skincare brand", rating: 5 },
        { quote: "Finally an agency that talks about margin, not just ROAS.", name: "Co-founder", role: "Home décor brand", rating: 5 },
        { quote: "The new landing page doubled our conversion rate.", name: "Marketing head", role: "Fashion brand", rating: 5 },
      ],
      columns: 3,
    },
    component: B.Testimonials,
  },
  {
    type: "accordion",
    label: "FAQ / accordion",
    category: "Text",
    description: "Collapsible questions with rich-text answers.",
    fields: [
      f.heading(),
      f.subheading(),
      {
        key: "items",
        label: "Items",
        type: "list",
        itemLabel: "question",
        fields: [
          { key: "question", label: "Question", type: "text" },
          { key: "answer", label: "Answer", type: "richtext" },
        ],
      },
      { key: "firstOpen", label: "First item open", type: "toggle" },
      f.compact(),
    ],
    defaults: { heading: "Questions?", items: [{ question: "Your question", answer: "<p>Your answer.</p>" }] },
    component: B.Accordion,
  },
  {
    type: "product-grid",
    label: "Product grid",
    category: "Commerce",
    description: "Products from /admin as cards linking to their product page.",
    fields: [
      f.heading(),
      f.subheading(),
      { key: "source", label: "Show", type: "select", options: [{ label: "All products", value: "all" }, { label: "Products I pick", value: "selected" }] },
      { key: "productIds", label: "Products", type: "products", help: "Used when 'Products I pick' is selected. Order = display order." },
      { key: "limit", label: "Max products", type: "range", min: 1, max: 24 },
      ...f.columns(3),
      { key: "showPrice", label: "Show price", type: "toggle", default: true },
      { key: "showDescription", label: "Show description", type: "toggle", default: true },
      { key: "buttonLabel", label: "Card link label", type: "text" },
      { key: "freeLabel", label: "Label when price is 0", type: "text" },
      f.compact(),
    ],
    defaults: { heading: "Our services", source: "all", limit: 6, columns: 3, buttonLabel: "View details", freeLabel: "Custom quote" },
    component: B.ProductGrid,
  },
  {
    type: "pricing-table",
    label: "Pricing table",
    category: "Commerce",
    fields: [
      f.heading(),
      f.subheading(),
      {
        key: "plans",
        label: "Plans",
        type: "list",
        itemLabel: "name",
        fields: [
          { key: "name", label: "Name", type: "text" },
          { key: "description", label: "Short description", type: "text" },
          { key: "price", label: "Price", type: "text" },
          { key: "period", label: "Period (e.g. /month)", type: "text" },
          { key: "features", label: "Features (one per line)", type: "textarea" },
          { key: "buttonLabel", label: "Button label", type: "text" },
          linkField("buttonLink", "Button link"),
          { key: "highlighted", label: "Highlight this plan", type: "toggle" },
          { key: "badge", label: "Badge (e.g. Most popular)", type: "text" },
        ],
      },
      f.compact(),
    ],
    defaults: {
      heading: "Simple pricing",
      plans: [
        { name: "Starter", price: "₹15,000", period: "/month", features: "Meta Ads management\nWeekly reporting", buttonLabel: "Get started", buttonLink: "#audit" },
        { name: "Growth", price: "₹25,000", period: "/month", features: "Meta + Google Ads\nCreative strategy\nCRO support", buttonLabel: "Get started", buttonLink: "#audit", highlighted: true, badge: "Most popular" },
      ],
    },
    component: B.PricingTable,
  },
  {
    type: "cta-banner",
    label: "Call-to-action banner",
    category: "Text",
    fields: [
      f.heading(),
      { key: "text", label: "Text", type: "textarea" },
      { key: "buttonLabel", label: "Button label", type: "text" },
      linkField("buttonLink", "Button link"),
      f.buttonStyle("buttonStyle", "light"),
      { key: "secondaryLabel", label: "Second button label", type: "text" },
      linkField("secondaryLink", "Second button link"),
      { key: "bgColor", label: "Background color", type: "color" },
      { key: "image", label: "Background image", type: "image" },
      { key: "overlayOpacity", label: "Darken image %", type: "range", min: 0, max: 90 },
      { key: "textColor", label: "Text color", type: "color" },
      f.compact(),
    ],
    defaults: { heading: "Ready to scale profitably?", text: "Get a free audit of your ads, creatives and funnel.", buttonLabel: "Get my free audit", buttonLink: "#audit", overlayOpacity: 40 },
    component: B.CtaBanner,
  },
  {
    type: "countdown",
    label: "Countdown timer",
    category: "Commerce",
    description: "Great for sales and campaign landing pages.",
    fields: [
      f.heading(),
      { key: "endDate", label: "Ends at", type: "text", placeholder: "2026-12-31T23:59", help: "Format: YYYY-MM-DDTHH:MM (your local time)" },
      { key: "doneText", label: "Text after it ends", type: "text" },
      { key: "hideWhenDone", label: "Hide when finished", type: "toggle" },
      { key: "buttonLabel", label: "Button label", type: "text" },
      linkField("buttonLink", "Button link"),
    ],
    defaults: { heading: "Offer ends in", endDate: new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 16) },
    component: B.Countdown,
  },
  {
    type: "image",
    label: "Image",
    category: "Media",
    fields: [
      { key: "image", label: "Image", type: "image" },
      { key: "mobileImage", label: "Mobile image (optional)", type: "image" },
      { key: "alt", label: "Alt text", type: "text" },
      linkField("link"),
      { key: "caption", label: "Caption", type: "text" },
      { key: "fullWidth", label: "Full width (edge to edge)", type: "toggle" },
      { key: "rounded", label: "Rounded corners", type: "toggle", default: true },
      f.compact(),
    ],
    defaults: { image: "/banner.png", rounded: true },
    component: B.ImageBlock,
  },
  {
    type: "video",
    label: "Video",
    category: "Media",
    description: "Uploaded video, MP4 link, YouTube or Vimeo.",
    fields: [
      f.heading(),
      f.subheading(),
      { key: "url", label: "Video (upload, MP4 URL, YouTube or Vimeo link)", type: "video" },
      { key: "poster", label: "Cover image", type: "image" },
      { key: "ratio", label: "Shape", type: "select", options: [{ label: "Wide 16:9", value: "16/9" }, { label: "Square", value: "1/1" }, { label: "Vertical 9:16", value: "9/16" }, { label: "4:5", value: "4/5" }] },
      { key: "autoplay", label: "Autoplay (muted)", type: "toggle" },
      { key: "loop", label: "Loop", type: "toggle" },
      { key: "controls", label: "Show controls", type: "toggle", default: true },
      { key: "width", label: "Width", type: "select", options: [{ label: "Full container", value: "full" }, { label: "Narrow", value: "narrow" }] },
      f.compact(),
    ],
    defaults: { url: "/screen-recording.mp4", ratio: "16/9", controls: true },
    component: B.VideoBlock,
  },
  {
    type: "embed",
    label: "Embed (Calendly, map, form…)",
    category: "Media",
    fields: [
      f.heading(),
      f.subheading(),
      { key: "url", label: "Embed URL", type: "url" },
      { key: "height", label: "Height (px)", type: "range", min: 200, max: 1400, step: 10 },
      { key: "width", label: "Width", type: "select", options: [{ label: "Full container", value: "full" }, { label: "Narrow", value: "narrow" }] },
      f.compact(),
    ],
    defaults: { heading: "Book a call", url: "https://calendly.com/", height: 700 },
    component: B.EmbedBlock,
  },
  {
    type: "newsletter",
    label: "Newsletter signup",
    category: "Forms",
    description: "Email signup. Entries are saved to Supabase (see Submissions in the editor menu).",
    fields: [
      f.heading(),
      { key: "text", label: "Text", type: "textarea" },
      { key: "placeholder", label: "Email placeholder", type: "text" },
      { key: "buttonLabel", label: "Button label", type: "text" },
      { key: "collectName", label: "Also ask for name", type: "toggle" },
      { key: "successMessage", label: "Success message", type: "text" },
      { key: "formName", label: "Form name (for submissions)", type: "text" },
      f.compact(),
    ],
    defaults: { heading: "Get D2C growth tips", text: "One email a week. No spam.", buttonLabel: "Subscribe", formName: "newsletter" },
    component: B.Newsletter,
  },
  {
    type: "contact-form",
    label: "Contact form",
    category: "Forms",
    description: "Simple contact form. Entries are saved to Supabase.",
    fields: [
      f.heading(),
      f.subheading(),
      { key: "fieldName", label: "Name field", type: "toggle", default: true },
      { key: "fieldEmail", label: "Email field", type: "toggle", default: true },
      { key: "fieldPhone", label: "Phone field", type: "toggle", default: true },
      { key: "fieldCompany", label: "Company field", type: "toggle" },
      { key: "companyLabel", label: "Company field label", type: "text" },
      { key: "fieldMessage", label: "Message field", type: "toggle", default: true },
      { key: "messageLabel", label: "Message label", type: "text" },
      { key: "buttonLabel", label: "Button label", type: "text" },
      { key: "successMessage", label: "Success message", type: "text" },
      { key: "formName", label: "Form name (for submissions)", type: "text" },
      f.compact(),
    ],
    defaults: { heading: "Get in touch", buttonLabel: "Send message", formName: "contact", fieldName: true, fieldEmail: true, fieldPhone: true, fieldMessage: true },
    component: B.ContactForm,
  },
  {
    type: "contact-info",
    label: "Contact details + map",
    category: "Text",
    fields: [
      f.heading(),
      f.subheading(),
      { key: "address", label: "Address", type: "textarea" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "whatsapp", label: "WhatsApp number", type: "text" },
      { key: "hours", label: "Opening hours", type: "textarea" },
      { key: "mapUrl", label: "Google Maps embed URL", type: "url", help: "Google Maps → Share → Embed a map → copy the src link." },
      {
        key: "socials",
        label: "Social links",
        type: "list",
        itemLabel: "label",
        fields: [
          { key: "label", label: "Label", type: "text" },
          { key: "url", label: "URL", type: "url" },
        ],
      },
      f.compact(),
    ],
    defaults: { heading: "Contact us", email: "contact@hastagcreator.com", phone: "+91 80599 57479", whatsapp: "+91 80599 57479", address: "India" },
    component: B.ContactInfo,
  },
  {
    type: "spacer",
    label: "Spacer / divider",
    category: "Layout",
    fields: [
      { key: "height", label: "Height (px)", type: "range", min: 0, max: 300 },
      { key: "divider", label: "Show divider line", type: "toggle" },
      { key: "color", label: "Line color", type: "color" },
    ],
    defaults: { height: 48 },
    component: B.Spacer,
  },
  {
    type: "custom-html",
    label: "Custom HTML / code",
    category: "Advanced",
    description: "Paste any HTML (with <style> and <script>). Scripts run in isolation and errors can't break the page.",
    fields: [
      { key: "html", label: "HTML", type: "code", language: "html" },
      { key: "contained", label: "Keep inside page width", type: "toggle", default: true },
    ],
    defaults: { html: '<div style="padding:48px 0;text-align:center">\n  <h2 style="font-size:32px;font-weight:800">Custom HTML</h2>\n  <p>Edit me in the settings panel.</p>\n</div>', contained: true },
    component: B.CustomHtml,
  },
];

const byType = new Map(defs.map((d) => [d.type, d]));

export const getSectionType = (type: string) => byType.get(type);
export const allSectionTypes = () => defs;

let counter = 0;
export const newId = (prefix = "s") => `${prefix}-${Date.now().toString(36)}-${(counter++).toString(36)}${Math.random().toString(36).slice(2, 5)}`;

export function createSection(type: string, partial: Partial<SectionInstance> = {}): SectionInstance {
  const def = byType.get(type);
  return {
    id: partial.id || newId(type.slice(0, 6)),
    type,
    enabled: true,
    settings: def ? JSON.parse(JSON.stringify(def.defaults)) : {},
    style: {},
    advanced: {},
    overrides: {},
    ...partial,
  };
}

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import AuditCTA, { smoothScrollToElement } from "./AuditCTA";
import { track } from "@/lib/track";

// Existing brand logos (same assets as the Trusted Brands marquee)
const heroLogos = [1, 2, 3, 4, 5, 6].map((n) => `/trustbybrands/${n}.png`);

export interface HeroProps {
  badge?: string;
  headingLine1?: string;
  headingHighlight?: string;
  subheading?: string;
  qualification?: string;
  primaryLabel?: string;
  /** Empty = scroll to the audit form */
  primaryLink?: string;
  secondaryEnabled?: boolean;
  secondaryLabel?: string;
  /** "#results" scrolls to a section id, or any URL */
  secondaryLink?: string;
  logosEnabled?: boolean;
  logosTitle?: string;
  logos?: { image: string; alt?: string }[];
}

export const heroDefaults: Required<HeroProps> = {
  badge: "D2C & E-commerce Growth Partner",
  headingLine1: "Scale Your D2C Brand",
  headingHighlight: "Without Burning Money on Ads",
  subheading:
    "We help D2C brands grow profitably through Meta Ads, high-converting creatives, landing pages and conversion optimisation.",
  qualification: "Already selling online? Let us identify where your funnel is losing revenue.",
  primaryLabel: "Get My Free D2C Growth Audit",
  primaryLink: "",
  secondaryEnabled: true,
  secondaryLabel: "See Our Results",
  secondaryLink: "#results",
  logosEnabled: true,
  logosTitle: "Trusted by D2C & e-commerce brands",
  logos: heroLogos.map((image) => ({ image, alt: "Client brand logo" })),
};

const HeroSection = (props: HeroProps) => {
  const p = { ...heroDefaults, ...Object.fromEntries(Object.entries(props).filter(([, v]) => v !== undefined)) } as Required<HeroProps>;
  const go = (link: string) => {
    if (link.startsWith("#")) {
      const el = document.getElementById(link.slice(1));
      if (el) smoothScrollToElement(el);
    } else if (/^https?:/.test(link)) window.open(link, "_blank", "noopener");
    else window.location.assign(link);
  };
  const seeResults = () => {
    track("CTA_Click", { cta_location: "hero_secondary", cta_label: "see_our_results" });
    go(p.secondaryLink || "#results");
  };

  return (
    <section className="relative pt-32 pb-10 md:pt-44 md:pb-14 overflow-hidden bg-background">
      {/* Background Graphic Architecture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft Radial Center Glow */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] max-w-[100vw] h-[500px] rounded-[100%] bg-primary/10 blur-[100px] opacity-70"></div>
        {/* Subtle grid pattern over top */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="container-main relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

          {/* Floating Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: [0, -6, 0] }}
            transition={{
              opacity: { duration: 0.6, ease: "easeOut" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-6 md:mb-8 shadow-lg shadow-primary/5"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs md:text-sm font-bold text-primary tracking-wide">
              {p.badge}
            </span>
          </motion.div>

          {/* Core Headline – rendered immediately (no opacity delay) so it's readable on first paint */}
          <h1 className="text-[2.15rem] leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tighter md:leading-[1.03] mb-5 md:mb-6 drop-shadow-sm">
            {p.headingLine1} <br className="hidden md:block" />
            <span className="text-primary drop-shadow-sm">{p.headingHighlight}</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed mb-5"
          >
            {p.subheading}
          </motion.p>

          {/* Qualification line */}
          {p.qualification && <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="inline-flex items-start sm:items-center gap-2 bg-secondary/80 border border-border px-4 py-2.5 rounded-2xl sm:rounded-full shadow-sm text-sm md:text-base font-semibold text-foreground/90 mb-8 md:mb-10 text-left"
          >
            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-500 shrink-0 mt-0.5 sm:mt-0" />
            <span>{p.qualification}</span>
          </motion.div>}

          {/* CTA & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            {p.primaryLink ? (
              <button type="button" onClick={() => { track("CTA_Click", { cta_location: "hero" }); go(p.primaryLink); }} className="btn-synthetic min-h-[52px] uppercase tracking-wide w-full sm:w-auto">
                {p.primaryLabel}
              </button>
            ) : (
              <AuditCTA source="hero" label={p.primaryLabel} />
            )}
            {p.secondaryEnabled && <button
              type="button"
              onClick={seeResults}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-background border-2 border-border hover:border-foreground text-foreground px-8 py-4 md:py-5 rounded-full text-sm md:text-base font-bold uppercase tracking-wide shadow-sm hover:shadow-md transition-all duration-300 min-h-[52px]"
            >
              {p.secondaryLabel}
            </button>}
          </motion.div>

          {/* Compact trust / proof strip using the existing brand logos */}
          {p.logosEnabled && <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 md:mt-14 pt-8 border-t border-border/60 w-full"
          >
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-5">
              {p.logosTitle}
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-x-6 gap-y-4 items-center max-w-4xl mx-auto">
              {p.logos.map((logo, i) => (
                <div key={i} className="h-10 md:h-12 flex items-center justify-center">
                  <img
                    src={logo.image}
                    alt={logo.alt || "Client brand logo"}
                    loading="eager"
                    className="max-h-full w-auto max-w-[110px] object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition"
                  />
                </div>
              ))}
            </div>
          </motion.div>}

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { useState } from "react";
import { useAuditCTA } from "./AuditCTA";

/**
 * Prices are set in INR (the default currency, shown first).
 * USD is an approximate conversion at this rate – change it here if needed.
 */
const INR_PER_USD = 85;

type Cur = "INR" | "USD";
const fmt = (inr: number, cur: Cur) =>
  cur === "INR"
    ? `₹${inr.toLocaleString("en-IN")}`
    : `$${(Math.round(inr / INR_PER_USD / 5) * 5).toLocaleString("en-US")}`;

type Plan = {
  name: string;
  price: number;
  period?: string;
  features: (cur: Cur) => string[];
  badge?: string;
  cta: string;
};

const services: Plan[] = [
  {
    name: "UGC Video Production",
    price: 65000,
    features: (c) => [
      `10 Studio Quality UGC videos (${fmt(6500, c)}/video)`,
      `Home Quality option: 30 videos (${fmt(2600, c)}/video)`,
      "Designed for ad performance",
      "Conversion-driven creatives",
    ],
    cta: "Get Started",
  },
  {
    name: "Website Development",
    price: 19500,
    features: (c) => [
      "New website one-time setup fee",
      "Conversion-focused layout",
      "Speed & performance optimized",
      `Future changes / updates: ${fmt(9750, c)}`,
    ],
    cta: "Get Started",
  },
  {
    name: "Meta Ads Management",
    price: 42465,
    period: "/ PM",
    features: (c) => [
      `Ads only: ${fmt(42465, c)} / PM`,
      `Discounted to ${fmt(35271, c)} / PM with videos`,
      "Valid for up to 4 months",
      "After 4 months: 12% revenue share",
    ],
    cta: "Get Started",
  },
];

const combos: Plan[] = [
  {
    name: "Website + Meta + Videos",
    price: 107794,
    badge: "Most Popular",
    features: () => [
      "Full website setup & optimization",
      "Complete UGC video production",
      "Meta ads management setup",
      "Proven sales generation strategy",
      "Maximum discount applied",
    ],
    cta: "Get Full Combo",
  },
  {
    name: "Videos + Meta",
    price: 90244,
    badge: "Best Value",
    features: () => [
      "Complete UGC video production",
      "Meta ads management setup",
      "Perfect for existing websites",
      "Proven sales generation strategy",
      "Discounted Meta retainer",
    ],
    cta: "Get Growth Combo",
  },
];

const Card = ({ p, cur, onCta, highlight = false, i }: { p: Plan; cur: Cur; onCta: () => void; highlight?: boolean; i: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.08 }}
    className={`relative rounded-3xl p-7 md:p-8 flex flex-col ${
      highlight ? "bg-charcoal text-charcoal-foreground shadow-xl ring-2 ring-primary" : "bg-card shadow-card border border-border"
    }`}
  >
    {p.badge && (
      <span className="absolute -top-3 right-6 bg-primary text-primary-foreground text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
        {p.badge}
      </span>
    )}
    <h3 className={`text-sm font-black uppercase tracking-[0.12em] ${highlight ? "text-charcoal-foreground/80" : "text-muted-foreground"}`}>{p.name}</h3>
    <div className="mt-4 mb-6 flex items-end gap-1.5">
      <motion.span key={cur} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-display font-black tracking-tight">
        {fmt(p.price, cur)}
      </motion.span>
      {p.period && <span className={`text-sm mb-1 ${highlight ? "text-charcoal-foreground/60" : "text-muted-foreground"}`}>{p.period}</span>}
    </div>
    <ul className="space-y-3 mb-8 flex-1">
      {p.features(cur).map((f) => (
        <li key={f} className={`flex items-start gap-2.5 text-sm font-semibold ${highlight ? "text-charcoal-foreground/85" : "text-foreground/80"}`}>
          <Check size={16} className="text-primary mt-0.5 shrink-0" />
          {f}
        </li>
      ))}
    </ul>
    <button
      type="button"
      onClick={onCta}
      className={`w-full min-h-[52px] rounded-full font-bold text-sm md:text-base transition-all hover:-translate-y-0.5 ${
        highlight ? "bg-primary text-primary-foreground" : "bg-foreground text-background"
      }`}
    >
      {p.cta}
    </button>
  </motion.div>
);

const Pricing = () => {
  const [currency, setCurrency] = useState<Cur>("INR");
  const goToForm = useAuditCTA();

  return (
    <section id="pricing" className="section-padding">
      <div className="container-main">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="section-title mb-3">Transparent, Sales-Focused Pricing</h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto mb-5">
            No hidden fees. Your ad budget goes to ads — our fee is based on service scope.
          </p>

          {/* Currency toggle – INR is the default and comes first */}
          <div className="inline-flex items-center bg-secondary rounded-full p-1 border border-border">
            {(["INR", "USD"] as Cur[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-5 py-2 rounded-full text-xs md:text-sm font-bold transition-colors ${
                  currency === c ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {c === "INR" ? "INR (₹)" : "USD ($)"}
              </button>
            ))}
          </div>
          {currency === "USD" && <p className="text-[11px] text-muted-foreground mt-2">USD prices are approximate. Billing is in INR.</p>}
        </motion.div>

        {/* Individual services */}
        <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {services.map((p, i) => (
            <Card key={p.name} p={p} cur={currency} i={i} onCta={() => goToForm(`pricing_${p.name}`)} />
          ))}
        </div>

        {/* Exclusive bundle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto mt-12 md:mt-16 rounded-[2rem] p-[2px] bg-gradient-to-r from-primary via-blue-400 to-primary shadow-[0_30px_70px_-25px_rgba(0,51,255,0.45)]"
        >
          <div className="rounded-[calc(2rem-2px)] bg-card px-6 py-8 md:px-12 md:py-10 grid md:grid-cols-[1.3fr_1fr] gap-8 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-foreground text-background text-[11px] md:text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider mb-4">
                <Zap size={14} className="text-yellow-400 fill-yellow-400" /> Exclusive bundle
              </span>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight">Quick Scale Starter</h3>
              <p className="text-muted-foreground mt-2">Tailored setup to kickstart your store's conversions &amp; traffic.</p>
              <ul className="mt-6 space-y-3">
                {[
                  ["10 UGC Videos", "Home style"],
                  ["Meta Ads Management (Free)", ""],
                  ["Website Optimisation", "Custom updates configured with sales parameters"],
                ].map(([t, sub]) => (
                  <li key={t} className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} />
                    </span>
                    <span>
                      <span className="font-bold">{t}</span>
                      {sub && <span className="block text-sm text-muted-foreground">({sub})</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center md:border-l md:border-border md:pl-8">
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Investment &amp; duration</p>
              <motion.div key={currency} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-5xl md:text-6xl font-black tracking-tight">
                {fmt(64999, currency)}
              </motion.div>
              <p className="mt-1 text-lg font-semibold text-muted-foreground">One-time</p>
              <button
                type="button"
                onClick={() => goToForm("pricing_quick_scale_starter")}
                className="mt-6 w-full max-w-xs mx-auto min-h-[54px] rounded-full bg-primary text-primary-foreground font-bold shadow-synthetic hover:-translate-y-0.5 transition-all"
              >
                Claim the Starter Bundle
              </button>
            </div>
          </div>
        </motion.div>

        {/* Combo offers */}
        <div className="text-center mt-16 md:mt-20 mb-10">
          <h3 className="text-2xl md:text-4xl font-black tracking-tight">Combo Offers</h3>
          <p className="text-muted-foreground mt-2">Maximize your growth and save with our bundled packages.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {combos.map((p, i) => (
            <Card key={p.name} p={p} cur={currency} i={i} highlight={i === 0} onCta={() => goToForm(`pricing_${p.name}`)} />
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10 max-w-lg mx-auto">
          Not sure which plan fits? Fill the form and we'll recommend one after reviewing your brand.
        </p>
      </div>
    </section>
  );
};

export default Pricing;

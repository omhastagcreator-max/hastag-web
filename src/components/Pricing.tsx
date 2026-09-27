import { motion } from "framer-motion";
import { Check } from "lucide-react";
import AuditCTA from "./AuditCTA";
import { useState } from "react";

const plans = [
  {
    name: "Landing Page",
    stage: "Build",
    priceUSD: "$100",
    priceINR: "₹8,000",
    period: " onwards",
    desc: "High-converting single page tailored for your campaigns.",
    features: [
      "Landing page development",
      "CRO optimisation",
      "Funnel creation",
      "Content creation",
    ],
    bestFor: "Focused lead generation",
    popular: false,
  },
  {
    name: "Full E-com Store",
    stage: "Build",
    priceUSD: "$190",
    priceINR: "₹15,000",
    period: " onwards",
    desc: "End-to-end e-commerce development ready for sales.",
    features: [
      "Full e-com store development",
      "CRO optimisation",
      "Funnel creation",
      "Content creation",
    ],
    bestFor: "New retail brands",
    popular: false,
  },
  {
    name: "Meta Ads + Web",
    stage: "Grow · Monthly",
    priceUSD: "$250",
    priceINR: "₹20,000",
    period: "/mo",
    desc: "Consistent traffic via Meta ads with a dedicated website.",
    features: [
      "Meta ads management",
      "Website management",
      "CRO optimisation",
      "Funnel creation",
      "Content creation",
    ],
    bestFor: "Growing local & D2C brands",
    popular: true,
  },
  {
    name: "Omnichannel",
    stage: "Scale · Monthly",
    priceUSD: "$300",
    priceINR: "₹25,000",
    period: "/mo",
    desc: "Complete ad management across Meta & Google plus web.",
    features: [
      "Meta ads + Google ads",
      "Website management",
      "CRO optimisation",
      "Funnel creation",
      "Content creation",
    ],
    bestFor: "Aggressive scaling",
    popular: false,
  },
];

const Pricing = () => {
  const [currency, setCurrency] = useState<"USD" | "INR">("INR");

  return (
    <section id="pricing" className="section-padding">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title mb-3">Flexible Plans Built Around Your Growth Stage</h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto mb-5">
            No hidden fees. Your ad budget goes to ads — our fee is based on service scope.
          </p>

          {/* Currency Toggle */}
          <div className="inline-flex items-center bg-secondary rounded-full p-1 border border-border">
            <button
              onClick={() => setCurrency("INR")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                currency === "INR"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              INR (₹)
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                currency === "USD"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              USD ($)
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 max-w-7xl mx-auto">
          {plans.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-6 sm:p-7 ${
                p.popular
                  ? "bg-charcoal text-charcoal-foreground shadow-xl ring-2 ring-primary"
                  : "bg-card shadow-card border border-border"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              )}
              <span className={`inline-block text-[10px] font-black uppercase tracking-widest mb-2 ${p.popular ? "text-primary-foreground/70" : "text-primary"}`}>
                {p.stage}
              </span>
              <h3 className={`text-lg font-bold ${p.popular ? "text-charcoal-foreground" : ""}`}>{p.name}</h3>
              <p className={`text-xs mt-1 mb-4 ${p.popular ? "text-charcoal-foreground/60" : "text-muted-foreground"}`}>
                {p.desc}
              </p>
              <div className="mb-5">
                <motion.span
                  key={currency}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl lg:text-2xl xl:text-3xl font-display font-bold"
                >
                  {currency === "USD" ? p.priceUSD : p.priceINR}
                </motion.span>
                <span className={`text-sm ${p.popular ? "text-charcoal-foreground/50" : "text-muted-foreground"}`}>
                  {p.period}
                </span>
              </div>
              <p className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${p.popular ? "text-charcoal-foreground/60" : "text-foreground/60"}`}>What's included</p>
              <ul className="space-y-2.5 mb-5">
                {p.features.map((f, j) => (
                  <li
                    key={j}
                    className={`flex items-start gap-2 text-sm ${
                      p.popular ? "text-charcoal-foreground/80" : "text-muted-foreground"
                    }`}
                  >
                    <Check size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className={`text-[10px] uppercase tracking-wider ${p.popular ? "text-charcoal-foreground/40" : "text-muted-foreground/60"}`}>
                Best for: {p.bestFor}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10 md:mt-12">
          <p className="text-sm text-muted-foreground mb-5 max-w-lg mx-auto">
            Not sure which plan fits? We'll recommend one after reviewing your ads, website and funnel.
          </p>
          <div className="flex justify-center">
            <AuditCTA source="pricing" label="Get a Custom Growth Plan" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

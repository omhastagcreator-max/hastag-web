import { motion } from "framer-motion";
import { Clapperboard, MousePointerClick, LayoutTemplate, ShoppingCart, IndianRupee } from "lucide-react";
import AuditCTA from "./AuditCTA";

const funnel = [
  { icon: Clapperboard, label: "Creative" },
  { icon: MousePointerClick, label: "Traffic" },
  { icon: LayoutTemplate, label: "Landing Page" },
  { icon: ShoppingCart, label: "Conversion" },
  { icon: IndianRupee, label: "Revenue" },
];

/** "Your Ads May Not Be the Problem" – uses the existing Google/Meta Andromeda screenshot. */
const InfluencerMarketingGlimpse = () => {
  return (
    <section id="ads-problem" className="py-16 md:py-24 bg-secondary/40 border-y border-border/50 relative overflow-hidden">
      <div className="container-main relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center [&>*]:min-w-0">

          {/* Proof screenshot */}
          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="bg-card rounded-2xl overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] border border-border">
              <div className="bg-secondary/70 border-b border-border px-4 py-3 flex items-center gap-3">
                <div className="flex gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <span className="text-[11px] text-muted-foreground font-medium truncate">
                  google.com/search?q=meta+ads+new+update+as+per+andromeda
                </span>
              </div>
              <img
                src="/google-search-meta-andromeda.jpg"
                alt="Google AI Overview explaining that Meta's Andromeda update shifts ad delivery from audience-based targeting to creative-based targeting"
                loading="lazy"
                className="w-full h-auto"
              />
            </div>
            <figcaption className="text-xs text-muted-foreground mt-3 text-center">
              Meta's Andromeda update: your creative now does the targeting.
            </figcaption>
          </motion.figure>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="order-1 lg:order-2 flex flex-col gap-5"
          >
            <span className="section-eyebrow w-max">Before You Blame Meta</span>
            <h2 className="section-title text-foreground">
              Your Ads May Not Be <span className="text-primary whitespace-nowrap">the Problem.</span>
            </h2>
            <p className="section-lead max-w-xl">
              Poor creative, weak offers, low landing-page conversion and broken tracking can make a profitable product look unprofitable.
            </p>

            {/* Funnel stepper */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
              <ol className="relative grid grid-cols-5 gap-1" aria-label="Creative to revenue funnel">
                {/* connector line */}
                <span className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary" aria-hidden="true" />
                {funnel.map((step, i) => {
                  const last = i === funnel.length - 1;
                  return (
                    <li key={step.label} className="relative flex flex-col items-center text-center gap-2">
                      <span
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                          last
                            ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/30"
                            : "bg-card border-primary/30 text-primary"
                        }`}
                      >
                        <step.icon className="w-4 h-4" />
                      </span>
                      <span className={`text-[11px] sm:text-xs font-bold leading-tight ${last ? "text-primary" : "text-foreground"}`}>
                        {step.label}
                      </span>
                    </li>
                  );
                })}
              </ol>
              <p className="text-sm text-muted-foreground mt-4 pt-4 border-t border-border">
                A leak at any step shows up as "bad ROAS" in Ads Manager. We find which step is actually leaking.
              </p>
            </div>

            <div className="mt-1">
              <AuditCTA source="ads_problem" label="Show Me Where I'm Losing Sales" variant="dark" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InfluencerMarketingGlimpse;

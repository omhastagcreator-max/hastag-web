import { motion } from "framer-motion";
import { Search, Lightbulb, Wrench, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Discovery & Audit",
    time: "Week 1",
    copy: "Deep dive into your business, competitors, and current marketing. We identify quick wins and set clear goals from day one.",
    outcome: "Audit report + roadmap",
  },
  {
    icon: Lightbulb,
    step: "02",
    title: "Strategy & Planning",
    time: "Week 2",
    copy: "Build your campaign strategy — audience targeting, creative direction, CRO priorities, and platform mix tailored to your budget.",
    outcome: "Campaign brief + benchmarks",
  },
  {
    icon: Wrench,
    step: "03",
    title: "Build & Launch",
    time: "Weeks 3–4",
    copy: "Launch campaigns, build landing pages, set up analytics & tracking. We run A/B tests on creative, audiences, and copy.",
    outcome: "Live campaigns + daily reports",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Optimize & Scale",
    time: "Week 5+",
    copy: "Weekly optimization based on real data. Scale winners, pause underperformers, expand audiences. Continuous improvement.",
    outcome: "Weekly calls + rolling improvements",
  },
];

const Process = () => (
  <section className="section-padding bg-secondary">
    <div className="container-main max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl mb-3">Our Proven Process</h2>
        <p className="text-muted-foreground text-sm">A structured, repeatable methodology designed to deliver results.</p>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />

        <div className="space-y-6">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-5 items-start"
            >
              <div className="relative z-10 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <s.icon size={20} className="text-primary" />
              </div>
              <div className="bg-card rounded-2xl p-5 flex-1 shadow-card border border-border">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{s.step}</span>
                  <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{s.time}</span>
                </div>
                <h3 className="font-bold text-base mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">{s.copy}</p>
                <p className="text-xs text-muted-foreground/70">
                  <span className="font-semibold">Outcome:</span> {s.outcome}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Process;

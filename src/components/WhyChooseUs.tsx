import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Handshake, Briefcase, Zap, ShieldCheck, LineChart } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "ROAS Focused",
    desc: "We kill failing ads instantly. If it doesn't bring sales, we don't run it.",
    color: "text-green-500",
    bg: "bg-green-50 border-green-100",
    points: ["Performance Driven", "Data-Backed Scaling"]
  },
  {
    icon: Briefcase,
    title: "11 Years Elite",
    desc: "We've managed ₹2 Cr+ in ad revenue specifically in the D2C market.",
    color: "text-blue-500",
    bg: "bg-blue-50 border-blue-100",
    points: ["Proven Track Record", "Industry Experts"]
  },
  {
    icon: Handshake,
    title: "100% Transparent",
    desc: "No hidden fees. You see our exact formulas and profit margins live.",
    color: "text-purple-500",
    bg: "bg-purple-50 border-purple-100",
    points: ["Live Dashboards", "Direct Access"]
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30 relative" id="why-us">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" /> The Advantage
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-4">
            Why #Creator is Different
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-medium">
            We abandon the traditional agency model to operate directly as your internal growth team.
          </p>
        </div>

        {/* Note the grid-cols-2 for mobile as requested */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-card border border-border p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-card-hover transition-shadow flex flex-col items-start"
            >
              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 border shadow-sm ${feature.bg}`}>
                <feature.icon className={`w-6 h-6 md:w-8 md:h-8 ${feature.color}`} />
              </div>
              <h3 className="text-lg md:text-2xl font-black text-foreground mb-2 md:mb-3 leading-tight">{feature.title}</h3>
              <p className="text-muted-foreground text-xs md:text-[15px] leading-relaxed mb-4 md:mb-6 flex-grow">
                {feature.desc}
              </p>
              
              <ul className="mt-auto space-y-2 w-full">
                {feature.points.map((pt, i) => (
                  <li key={i} className="flex items-center gap-2 text-[11px] md:text-sm font-semibold text-foreground/80">
                    <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-primary shrink-0" /> <span className="truncate">{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

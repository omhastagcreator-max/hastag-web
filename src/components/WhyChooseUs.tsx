import { motion } from "framer-motion";
import { Zap, Workflow, Clapperboard, LineChart, ShoppingBag } from "lucide-react";

const features = [
  {
    icon: Workflow,
    title: "Full-Funnel Thinking",
    desc: "We don't optimise Ads in isolation. We look at the entire customer journey.",
    color: "text-green-500",
    bg: "bg-green-50 border-green-100",
  },
  {
    icon: Clapperboard,
    title: "Creative + Performance",
    desc: "Creative is treated as a growth lever, not just content.",
    color: "text-blue-500",
    bg: "bg-blue-50 border-blue-100",
  },
  {
    icon: LineChart,
    title: "Data-Led Optimisation",
    desc: "Every decision is connected to measurable business outcomes.",
    color: "text-purple-500",
    bg: "bg-purple-50 border-purple-100",
  },
  {
    icon: ShoppingBag,
    title: "Built for D2C",
    desc: "We understand the economics behind CAC, ROAS, AOV and conversion.",
    color: "text-orange-500",
    bg: "bg-orange-50 border-orange-100",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30 relative" id="why-us">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" /> The Advantage
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-4">
            Why #Creator is Different
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-medium">
            We operate like your internal growth team — accountable to revenue, not vanity metrics.
          </p>
        </div>

        {/* Note the grid-cols-2 for mobile as requested */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-card border border-border p-5 md:p-7 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-card-hover transition-shadow flex sm:flex-col items-start gap-4 sm:gap-0"
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-xl md:rounded-2xl flex items-center justify-center sm:mb-5 border shadow-sm ${feature.bg}`}>
                <feature.icon className={`w-6 h-6 md:w-8 md:h-8 ${feature.color}`} />
              </div>
              <div>
              <h3 className="text-lg md:text-xl font-black text-foreground mb-2 leading-tight uppercase tracking-wide">{feature.title}</h3>
              <p className="text-muted-foreground text-sm md:text-[15px] leading-relaxed">
                {feature.desc}
              </p>
              </div>
              
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

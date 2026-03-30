import { motion } from "framer-motion";
import { Shield, Layers, Eye, Zap } from "lucide-react";

const reasons = [
  {
    icon: Layers,
    title: "We don't just run ads",
    copy: "Most agencies focus only on Meta or Google metrics. We fix whatever is stopping your business from making money.",
  },
  {
    icon: Shield,
    title: "We don't chase ROAS",
    copy: "High ROAS on a dashboard doesn't always mean money in the bank. We optimize for actual profit margin.",
  },
  {
    icon: Eye,
    title: "We look at your full business",
    copy: "From the moment they see your ad to their third time buying from you, we optimize the entire customer journey.",
  },
  {
    icon: Zap,
    title: "We focus on what actually makes money",
    copy: "Conversion rates, average order value, and retention. These are the levers that turn a struggling brand into a profitable one.",
  },
];

const WhyChooseUs = () => (
  <section className="section-padding" id="why-us">
    <div className="container-main">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl mb-3">Why We're Not Like Other Agencies</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
          Most agencies run ads. We run ads AND fix your landing pages. Same team. No hand-offs. No excuses.
        </p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {reasons.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-card-hover transition-shadow group"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
              <r.icon size={22} className="text-primary" />
            </div>
            <h3 className="font-bold text-base mb-2">{r.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{r.copy}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;

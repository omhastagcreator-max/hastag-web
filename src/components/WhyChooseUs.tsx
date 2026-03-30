import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Handshake, Briefcase } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Hyper-Focus on ROAS",
    desc: "While others chase likes and impressions, we focus entirely on Return on Ad Spend. If an ad isn't generating qualified leads or sales, we kill it and iterate instantly.",
    color: "text-green-500",
    bg: "bg-green-50 border-green-100",
  },
  {
    icon: Briefcase,
    title: "11 Years of Elite Experience",
    desc: "We are not a typical agency learning on your dime. We have actively managed over ₹2 Cr+ in ad revenue, testing exactly what converts in the Indian D2C market.",
    color: "text-blue-500",
    bg: "bg-blue-50 border-blue-100",
  },
  {
    icon: Handshake,
    title: "100% Transparent Execution",
    desc: "No hidden fees, no opaque dashboards. We share a live tracker of every single metric. You see our exact formulas, margins, and the influencers we talk to.",
    color: "text-purple-500",
    bg: "bg-purple-50 border-purple-100",
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-secondary/30 relative" id="why-us">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">The Advantage</span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-6">
            Why #Creator is Different
          </h2>
          <p className="text-lg text-muted-foreground font-medium">
            We abandon the traditional agency model. We operate strictly as an extension of your own internal growth team.
          </p>
        </div>

        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-card border border-border p-10 rounded-3xl shadow-sm hover:shadow-card-hover transition-shadow flex flex-col items-start"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border shadow-sm ${feature.bg}`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-2xl font-black text-foreground mb-4">{feature.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                {feature.desc}
              </p>
              
              <ul className="mt-8 space-y-3 w-full">
                <li className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> Proven Methodology
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> Direct Communication
                </li>
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

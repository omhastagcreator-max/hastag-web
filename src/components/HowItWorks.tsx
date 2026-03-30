import { motion } from "framer-motion";
import { Search, PenTool, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "1. Free Ads Audit",
    desc: "We dive deep into your Meta and Google ad accounts to find exactly where you are bleeding money. No obligations.",
  },
  {
    icon: PenTool,
    title: "2. Custom Strategy",
    desc: "We design the fix. Not just new ad creatives, but we also redesign and optimize your landing pages so the traffic actually converts.",
  },
  {
    icon: Rocket,
    title: "3. Launch & Scale",
    desc: "We deploy the new funnel and aggressively scale what works, optimizing purely for your profit margin every single day.",
  },
];

const HowItWorks = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How We Work (No Fluff)</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A totally transparent, 3-step process designed to stop the guesswork and start scaling your revenue immediately.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative px-4">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-[2px] bg-border z-0" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="relative text-center z-10"
            >
              <div className="w-20 h-20 mx-auto bg-card border-4 border-background shadow-xl rounded-full flex items-center justify-center mb-6 group hover:scale-110 transition-transform">
                <step.icon className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed px-4">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a href="/#audit-form">
            <button className="bg-foreground text-background px-8 py-4 rounded-full text-base font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              Get Your Free Custom Strategy
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;

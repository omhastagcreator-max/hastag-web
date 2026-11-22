import { motion } from "framer-motion";
import { Search, Stethoscope, PenTool, Rocket, TrendingUp } from "lucide-react";
import AuditCTA from "./AuditCTA";

const steps = [
  { icon: Search, num: "01", title: "Audit", desc: "We analyse your Ads, Website, Offer, Tracking & Funnel." },
  { icon: Stethoscope, num: "02", title: "Diagnose", desc: "We identify exactly where you're losing money." },
  { icon: PenTool, num: "03", title: "Build", desc: "We create the campaigns, creatives, landing pages and systems needed." },
  { icon: Rocket, num: "04", title: "Launch", desc: "Everything goes live with proper tracking." },
  { icon: TrendingUp, num: "05", title: "Optimise", desc: "We continuously improve CAC, CVR and ROAS." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // 0.15-second delay between each card
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, y: 0,
    transition: {
      duration: 0.5
    }
  },
};

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden" id="process">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container-main max-w-7xl relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <span className="section-eyebrow mb-4">
             Execution
          </span>
          <h2 className="section-title text-foreground mb-4">
            How We Actually Work
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
            A transparent, 5-step process that starts with finding the leak — not spending more.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="bg-card border border-border/50 hover:border-primary/50 p-5 sm:p-6 lg:p-7 rounded-3xl shadow-sm hover:shadow-2xl transition-all flex flex-row sm:flex-col items-start sm:items-center gap-4 sm:gap-0 text-left sm:text-center group relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              
              <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 bg-primary/10 group-hover:bg-primary border border-primary/20 group-hover:border-primary rounded-2xl flex items-center justify-center sm:mb-5 transition-colors duration-300">
                <step.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary group-hover:text-white transition-colors duration-300" />
              </div>

              <div>
                <span className="block text-xs font-black text-primary tracking-widest mb-1">{step.num}</span>
                <h3 className="text-lg sm:text-xl font-black text-foreground mb-1.5 sm:mb-3 uppercase tracking-wide">{step.title}</h3>
                <p className="text-muted-foreground text-sm font-medium leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="flex justify-center">
            <AuditCTA source="how_we_work" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;

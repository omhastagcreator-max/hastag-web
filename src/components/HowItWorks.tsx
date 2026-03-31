import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { Search, PenTool, Rocket, PhoneCall } from "lucide-react";

const steps = [
  {
    icon: PhoneCall,
    title: "0. 45-Min Growth Counseling",
    desc: "Before onboarding, we mandate a rigorous session discussing exactly 'How, When & Whom to sell' to validate if we can actually scale you.",
  },
  {
    icon: Search,
    title: "1. The Forensic Audit",
    desc: "We analyze your past ad accounts, competitor footprint, and website checkout drops to find immediate revenue leaks.",
  },
  {
    icon: PenTool,
    title: "2. Creation & Funnel Fixing",
    desc: "Before we spend a single rupee on ads, we deploy high-converting landing pages and craft UGC content explicitly designed to sell.",
  },
  {
    icon: Rocket,
    title: "3. Precision Scaling",
    desc: "We launch, test aggressively, and scale winning campaigns across Meta, Google, and Influencer networks using machine learning.",
  },
];

const HowItWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section className="py-24 bg-background relative" id="process">
      <div className="container-main max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Execution</span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 tracking-tight">
            How We Actually Work
          </h2>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
            A totally transparent, 3-step process designed to stop the guesswork and start scaling your revenue immediately.
          </p>
        </div>

        <div className="relative" ref={containerRef}>
          {/* Vertical Line Background */}
          <div className="absolute left-[39px] md:left-[calc(50%-2px)] top-0 bottom-0 w-1 bg-border/50 rounded-full hidden md:block" />
          
          {/* Animated Scroll Fill Line */}
          <motion.div 
            style={{ scaleY: scrollYProgress, originY: 0 }}
            className="absolute left-[39px] md:left-[calc(50%-2px)] top-0 bottom-0 w-1 bg-primary rounded-full hidden md:block z-0" 
          />

          <div className="space-y-12 md:space-y-24 perspective-1000">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-16 relative transform-style-3d ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Center Node (Desktop) */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  viewport={{ once: true }}
                  className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-20 h-20 bg-background border-4 border-primary rounded-full items-center justify-center z-10 shadow-[0_0_20px_rgba(216,0,166,0.3)]" 
                  style={{ top: "calc(50% - 40px)"}}
                >
                  <step.icon className="w-8 h-8 text-primary" />
                </motion.div>

                {/* Content Card */}
                <motion.div 
                   whileHover={{ rotateY: index % 2 === 1 ? -5 : 5, scale: 1.02, z: 20 }}
                   className={`w-full md:w-[45%] bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-card-hover transition-shadow relative z-0`}
                >
                  <div className="md:hidden w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black text-foreground mb-4">{step.title}</h3>
                  <p className="text-muted-foreground text-[15px] leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
                
                {/* Empty Space for layout */}
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <a href="/#audit-form">
            <button className="btn-synthetic mx-auto">
              Get Started Now
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;

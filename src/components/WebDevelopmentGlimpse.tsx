import { motion } from "framer-motion";
import { ArrowUpRight, Code2, LineChart, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: Zap, label: "Lightning Fast Loading" },
  { icon: ShieldCheck, label: "Instant Brand Trust" },
  { icon: Code2, label: "Beautiful UI/UX" },
  { icon: LineChart, label: "CRO Optimized Funnels" },
];

const WebDevelopmentGlimpse = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative gradient patches */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-[500px] bg-gradient-to-bl from-blue-500/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full md:w-1/2 h-[500px] bg-gradient-to-tr from-blue-500/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      
      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <span className="inline-block bg-blue-500/10 text-blue-500 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest w-max">
              Website Development
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight tracking-tight">
              A 5th Grader Can Build a Website.<br/>
              We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Conversion Machines.</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              If your website cannot win the customer's trust and force a quick checkout, you are literally burning your ad budget. We design websites structured purely for buying psychology, fast loading speeds, and absolute trust.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/50 dark:bg-black/20 backdrop-blur-md border border-border/50 p-3 rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="font-bold text-sm text-foreground">{feature.label}</span>
                </div>
              ))}
            </div>

            <Link to="/web-development" className="mt-8 w-fit">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-foreground text-background px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 group border border-border/50"
              >
                See the difference
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Graphical Abstract Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative lg:h-[600px] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-[500px] bg-card border border-border rounded-3xl shadow-2xl relative overflow-hidden z-10 flex flex-col pt-4">
               {/* Browser Top Bar Mock */}
               <div className="px-5 pb-4 border-b border-border flex items-center gap-3">
                  <div className="flex gap-1.5 flex-shrink-0">
                     <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                     <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                     <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                  </div>
                  <div className="flex-1 bg-muted/50 rounded-md h-6 border border-border/50 flex flex-col justify-center px-4">
                     <span className="text-[10px] text-muted-foreground truncate font-mono">https://your-brand-soaring.com</span>
                  </div>
               </div>
               
               {/* Body Abstract */}
               <div className="p-6 flex flex-col gap-6 relative bg-gradient-to-b from-background to-muted/20">
                  <div className="flex items-start justify-between">
                     <div className="flex flex-col gap-2 w-1/2">
                        <div className="h-4 bg-muted-foreground/20 rounded w-16"></div>
                        <div className="h-10 bg-foreground/10 rounded-md w-full mt-2"></div>
                        <div className="h-4 bg-muted-foreground/10 rounded w-3/4"></div>
                     </div>
                     <div className="w-20 h-20 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <Code2 className="w-8 h-8 text-blue-500/50" />
                     </div>
                  </div>

                  <div className="h-px w-full bg-border/80"></div>

                  <div className="space-y-3">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-green-500/10 flex items-center justify-center">
                           <LineChart className="w-4 h-4 text-green-500" />
                        </div>
                        <div className="h-4 bg-foreground/20 rounded w-full"></div>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                           <ShieldCheck className="w-4 h-4 text-primary" />
                        </div>
                        <div className="h-4 bg-foreground/20 rounded w-4/5"></div>
                     </div>
                  </div>
                  
                  {/* Floating Action Button */}
                  <div className="absolute right-6 bottom-6 w-12 h-12 bg-blue-500 rounded-full shadow-xl flex items-center justify-center animate-bounce shadow-blue-500/30">
                     <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
               </div>
            </div>
            
            {/* Background shapes */}
            <div className="absolute top-[20%] -left-[5%] w-64 h-64 bg-primary/20 rounded-full blur-[80px] z-0"></div>
            <div className="absolute bottom-[20%] -right-[5%] w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] z-0"></div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default WebDevelopmentGlimpse;

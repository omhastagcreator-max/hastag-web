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
            <div className="w-full max-w-[500px] aspect-square relative z-10">
               {/* Main Dashboard Glass Panel */}
               <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute inset-0 bg-card/80 backdrop-blur-2xl border border-border/50 rounded-3xl shadow-2xl p-6 flex flex-col gap-6"
               >
                 <div className="flex justify-between items-center pb-4 border-b border-border/50">
                    <div className="flex flex-col">
                       <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase mb-1">Live Store Analytics</span>
                       <span className="text-2xl font-black text-foreground flex items-center gap-2">
                         ₹14,02,490 <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-md">+24.5%</span>
                       </span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center relative">
                       <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-ping"></div>
                       <LineChart className="w-5 h-5 text-primary relative z-10" />
                    </div>
                 </div>

                 {/* Middle Metric Rows */}
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background/50 p-4 rounded-2xl border border-border/50 flex flex-col gap-1">
                       <span className="text-xs text-muted-foreground font-bold">Conversion Rate</span>
                       <span className="text-xl font-black text-blue-500">4.82%</span>
                    </div>
                    <div className="bg-background/50 p-4 rounded-2xl border border-border/50 flex flex-col gap-1">
                       <span className="text-xs text-muted-foreground font-bold">Cart Abandonment</span>
                       <span className="text-xl font-black text-green-500">-12.4%</span>
                    </div>
                 </div>

                 {/* Bottom Chart Mock */}
                 <div className="flex-1 bg-background/50 border border-border/50 rounded-2xl p-4 flex items-end gap-2 overflow-hidden justify-between">
                    {[30, 45, 25, 60, 40, 80, 50, 95].map((height, i) => (
                       <motion.div 
                         key={i} 
                         initial={{ height: "0%" }}
                         whileInView={{ height: `${height}%` }}
                         transition={{ duration: 1, delay: i * 0.1 }}
                         className={`w-full rounded-t-sm ${i === 7 ? 'bg-primary' : 'bg-primary/20'}`}
                       ></motion.div>
                    ))}
                 </div>
               </motion.div>

               {/* Floating Overlay Element 1: Fast Loading */}
               <motion.div 
                 animate={{ y: [0, 15, 0], x: [0, 5, 0] }}
                 transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 className="absolute -right-4 sm:-right-8 top-12 bg-card border border-border rounded-2xl shadow-2xl p-4 flex items-center gap-4 z-20"
               >
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div className="flex flex-col pr-4">
                    <span className="text-xs font-black text-foreground">0.8s Load Time</span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest hidden sm:block">A+ Performance</span>
                  </div>
               </motion.div>

               {/* Floating Overlay Element 2: Secure Checkout */}
               <motion.div 
                 animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                 className="absolute -left-4 sm:-left-10 bottom-12 bg-card border border-border rounded-2xl shadow-2xl p-4 flex items-center gap-4 z-20"
               >
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-green-500" />
                  </div>
                  <div className="flex flex-col pr-4">
                    <span className="text-xs font-black text-foreground">Zero Drop-offs</span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest hidden sm:block">Frictionless Checkout</span>
                  </div>
               </motion.div>
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

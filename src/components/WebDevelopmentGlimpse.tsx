import { motion } from "framer-motion";
import { ArrowDown, LineChart, ShieldCheck, Zap } from "lucide-react";
import AuditCTA from "./AuditCTA";

const websiteFlow = ["Traffic", "Offer", "Landing Page", "Trust", "Conversion", "Revenue"];

const WebDevelopmentGlimpse = () => {
  return (
    <section id="website" className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Decorative gradient patches */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-[500px] bg-gradient-to-bl from-blue-500/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full md:w-1/2 h-[500px] bg-gradient-to-tr from-blue-500/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      
      <div className="container-main relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center [&>*]:min-w-0">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <span className="inline-block bg-blue-500/10 text-blue-500 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest w-max">
              Website Development
            </span>
            <h2 className="section-title text-foreground">
              Anyone Can Build a Website.<br className="hidden sm:block" />{" "}
              We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Websites That Sell.</span>
            </h2>
            <p className="section-lead">
              Your website isn't decoration. It is where your paid traffic becomes revenue.
            </p>

            {/* Traffic → Revenue flow (vertical, as a funnel) */}
            <ol className="flex flex-col items-start gap-1.5 mt-2" aria-label="Website conversion flow">
              {websiteFlow.map((step, i) => (
                <li key={step} className="flex flex-col items-start gap-1.5">
                  <span
                    className={`px-4 py-2 rounded-xl text-sm font-bold border ${
                      i === websiteFlow.length - 1
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-transparent shadow-lg shadow-blue-500/20"
                        : "bg-white/60 dark:bg-black/20 backdrop-blur-md border-border/60 text-foreground shadow-sm"
                    }`}
                    style={{ marginLeft: `${i * 14}px` }}
                  >
                    {step}
                  </span>
                  {i < websiteFlow.length - 1 && (
                    <ArrowDown className="w-4 h-4 text-blue-500" style={{ marginLeft: `${i * 14 + 16}px` }} aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>

            <div className="mt-4">
              <AuditCTA source="website_section" label="Get My Website Audited" variant="dark" />
            </div>
          </motion.div>

          {/* Graphical Abstract Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative lg:h-[600px] hidden lg:flex items-center justify-center p-4"
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
                       <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase mb-1">Store Analytics · Illustrative</span>
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

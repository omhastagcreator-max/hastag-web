import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Presentation, Users, Target } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: Target, label: "Laser-focused Audience Targeting" },
  { icon: TrendingUp, label: "Data-Driven Scaling Strategies" },
  { icon: Users, label: "High-Converting Creatives" },
  { icon: Presentation, label: "Advanced Funnel Optimization" },
];

const PerformanceMarketingGlimpse = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative gradient patches */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-[500px] bg-gradient-to-bl from-primary/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full md:w-1/2 h-[500px] bg-gradient-to-tr from-primary/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      
      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest w-max">
              Performance Marketing
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight tracking-tight">
              We Don't Just Run Ads.<br/>
              We <span className="text-primary">Scale Brands.</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Stop bleeding money on generic campaigns that don't convert. We engineer complete marketing funnels designed for pure ROAS and aggressive scaling. We build the exact system that multi-million dollar brands use to dominate their markets.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/50 dark:bg-black/20 backdrop-blur-md border border-border/50 p-3 rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-bold text-sm text-foreground">{feature.label}</span>
                </div>
              ))}
            </div>

            <Link to="/services/performance-marketing" className="mt-8 w-fit">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-foreground text-background px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 group border border-border/50"
              >
                Know the secret in detail
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative lg:h-[600px] flex items-center justify-center p-4"
          >
            {/* Visual Glassmorphism Representation */}
            <div className="w-full max-w-[500px] aspect-[4/5] bg-white/20 dark:bg-white/5 backdrop-blur-3xl border border-white/50 dark:border-white/10 rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col p-8 z-10 transition-transform duration-500 hover:scale-105">
                <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                    <TrendingUp className="w-48 h-48 text-primary" />
                </div>
                
                <h3 className="text-2xl font-black mb-8 relative z-10 text-foreground">Campaign Trajectory</h3>
                
                <div className="flex-1 flex items-end gap-2 relative z-10 pb-4">
                    {[30, 45, 60, 50, 75, 90, 100].map((height, i) => (
                        <motion.div 
                            key={i}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${height}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-t from-primary/80 to-primary rounded-t-lg flex-1"
                        />
                    ))}
                </div>
                
                <div className="pt-6 border-t border-border/50 relative z-10 flex justify-between items-center">
                    <div>
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Total Revenue</p>
                        <p className="text-2xl font-black text-foreground">₹2.4M+</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Avg. ROAS</p>
                        <p className="text-2xl font-black text-green-500">4.8x</p>
                    </div>
                </div>
            </div>
            
            {/* Decorative background shapes for depth */}
            <div className="absolute top-[10%] -left-[10%] w-64 h-64 bg-blue-500/20 rounded-full blur-3xl z-0"></div>
            <div className="absolute bottom-[10%] -right-[10%] w-64 h-64 bg-purple-500/20 rounded-full blur-3xl z-0"></div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default PerformanceMarketingGlimpse;

import { motion } from "framer-motion";
import { TrendingUp, ShoppingBag, ArrowRight, Zap, Target } from "lucide-react";

const DashboardResultsSection = () => {
  return (
    <section id="dashboard-results" className="section-padding overflow-hidden bg-background relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Real Time Results
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            See What Scaling <br className="hidden md:block" /> Looks Like
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            We don't do meaningless metrics. We do profit margins, conversion mapping, and viral attention that actually translates to pure revenue.
          </p>
        </motion.div>

        {/* Epic Main Screen Recording View */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative max-w-5xl mx-auto mb-20"
        >
          {/* Glassmorphism Glow Behind */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-blue-600/30 blur-3xl opacity-50 rounded-[40px] -z-10"></div>
          
          <div className="bg-card p-3 md:p-5 rounded-[2rem] border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
            <div className="aspect-video bg-[#0a0a0a] rounded-[1.2rem] overflow-hidden relative group border border-white/5">
              <video 
                className="w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="/screen-recording.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </motion.div>

        {/* Modern feature breakdown instead of specific screenshots */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border/50 hover:border-border p-8 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
              <TrendingUp className="text-blue-500 w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-foreground mb-3">Hyper-Scale Growth</h3>
            <p className="text-muted-foreground leading-relaxed">
              We engineer funnels that drop CPAs dramatically while scaling spend vertically across Meta and Google ecosystems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border/50 hover:border-border p-8 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors">
              <ShoppingBag className="text-green-500 w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-foreground mb-3">E-Commerce Mastery</h3>
            <p className="text-muted-foreground leading-relaxed">
              From CRO optimizations to AOV boosting strategies, your Shopify/WooCommerce store becomes a revenue-printing machine.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border/50 hover:border-border p-8 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors">
              <Target className="text-orange-500 w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-foreground mb-3">Laser Targeting</h3>
            <p className="text-muted-foreground leading-relaxed">
              Precision-driven audience creation utilizing predictive modeling and UGC content loops to acquire your dream buyers.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <a href="https://calendly.com/domsco-tech/30min?month=2026-03" target="_blank" rel="noreferrer" className="inline-block group">
            <button className="bg-primary text-primary-foreground px-10 py-5 rounded-full text-lg font-bold shadow-[0_10px_40px_-10px_rgba(37,99,235,0.6)] group-hover:shadow-[0_20px_50px_-10px_rgba(37,99,235,0.7)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 mx-auto">
              Schedule a Call 
              <span className="bg-white/20 p-1.5 rounded-full"><ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/></span>
            </button>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default DashboardResultsSection;

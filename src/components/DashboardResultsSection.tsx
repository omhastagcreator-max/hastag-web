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
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-duration-700"
                autoPlay 
                loop 
                muted 
                playsInline
                poster="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2400&ixlib=rb-4.0.3"
              >
                <source src="https://cdn.pixabay.com/video/2021/08/04/83861-584749216_large.mp4" type="video/mp4" />
              </video>
              
              {/* Fake UI Overlay for authenticity */}
              <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-black/80 to-transparent pointer-events-none"></div>
              
              <div className="absolute top-4 right-4 bg-red-500/90 backdrop-blur-md text-white text-[10px] md:text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                Live Dashboard
              </div>
              
              <div className="absolute bottom-6 left-6 text-white text-left pointer-events-none drop-shadow-lg">
                <h3 className="text-2xl md:text-4xl font-extrabold mb-1 tracking-tight">₹4.2M+</h3>
                <p className="text-sm md:text-base font-medium text-white/80 uppercase tracking-widest">Revenue Generated Last 30 Days</p>
              </div>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/80 backdrop-blur-xl group-hover:bg-primary group-hover:scale-110 transition-all duration-300 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.6)] border border-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10 md:w-12 md:h-12 ml-2"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
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
          <a href="/#audit-form" className="inline-block group">
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

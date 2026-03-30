import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const StarterPlanCTA = () => {
  return (
    <section className="py-16 bg-primary/5 border-t border-b border-primary/10 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container-main relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card/80 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-border shadow-xl relative overflow-hidden"
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite]" />

          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            New: For Beginners
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Ready to stop guessing and start scaling?
          </h2>
          
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Stop guessing with your ad budget. Book a <span className="font-semibold text-foreground">Free 30-Min Ads Audit</span> and let us find exactly where you are bleeding money. No pitch. No obligations.
          </p>
          
          <a href="/#audit-form">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary text-white text-lg font-bold rounded-full shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:shadow-[0_0_30px_rgba(var(--primary),0.6)] transition-all flex items-center justify-center gap-2 mx-auto"
            >
              Book Your Free Ads Audit <ArrowRight className="w-5 h-5" />
            </motion.button>
          </a>
          
          <p className="text-xs text-muted-foreground mt-4">One-time payment. Zero long-term retainers.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default StarterPlanCTA;

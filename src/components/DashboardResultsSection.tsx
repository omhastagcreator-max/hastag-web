import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { TrendingUp, ShoppingBag, ArrowRight, Zap, Target, Search, X } from "lucide-react";
import { useRef, useState } from "react";
import { useBooking } from "./BookingProvider";

const DashboardResultsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const lidRotateX = useTransform(scrollYProgress, [0, 0.8], [-90, 0]);
  const [isZoomed, setIsZoomed] = useState(false);

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

        {/* Epic Main Screen Recording View (Laptop Mockup) */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative max-w-5xl mx-auto mb-24"
          style={{ perspective: "1500px" }}
        >
          {/* Glassmorphism Glow Behind */}
          <div className="absolute -inset-10 bg-gradient-to-r from-[#FF3E00]/30 to-[#D800A6]/30 blur-3xl opacity-60 rounded-full -z-10"></div>
          
          {/* Laptop Screen Frame (Lid) */}
          <motion.div 
             className="relative rounded-t-3xl border-[12px] md:border-[20px] border-[#18181b] bg-[#09090b] shadow-2xl p-0.5 md:p-1 overflow-hidden"
             style={{
               rotateX: lidRotateX,
               transformOrigin: "bottom center",
               transformStyle: "preserve-3d"
             }}
          >
             {/* Webcam dot */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-[#18181b] rounded-b-xl flex justify-center items-center z-20">
                <div className="w-1.5 h-1.5 bg-blue-900/60 rounded-full"></div>
             </div>
             {/* Screen Content */}
             <div 
               className={`relative bg-[#0a0a0a] overflow-hidden group transition-all duration-300 z-50 ${isZoomed ? "fixed inset-4 md:inset-10 z-[100] md:rounded-2xl rounded-xl shadow-[0_0_100px_rgba(0,0,0,0.8)] flex items-center justify-center bg-black/95 backdrop-blur-2xl border border-white/20" : "aspect-video rounded-t-xl cursor-pointer"}`}
               onClick={() => !isZoomed && setIsZoomed(true)}
             >
               {isZoomed && (
                 <button 
                   onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
                   className="absolute top-4 right-4 z-[110] bg-white/10 hover:bg-white/20 p-2.5 rounded-full backdrop-blur-md text-white transition-colors"
                 >
                   <X className="w-6 h-6" />
                 </button>
               )}
               {!isZoomed && (
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 md:hidden pointer-events-none">
                   <div className="bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-full flex items-center gap-2 text-white text-sm font-bold border border-white/20 shadow-xl">
                     <Search className="w-4 h-4" /> Tap to Zoom Video
                   </div>
                 </div>
               )}
               <video 
                 className={`object-cover ${isZoomed ? "w-auto h-auto max-h-[85vh] max-w-[95vw] rounded-lg shadow-2xl" : "w-full h-full"}`}
                 autoPlay 
                 loop 
                 muted 
                 playsInline
               >
                 <source src="/screen-recording.mp4" type="video/mp4" />
               </video>
             </div>
             {/* Macbook logo text (subtle) */}
             <div className="absolute bottom-0 inset-x-0 h-[12px] flex justify-center items-center text-[7px] font-bold text-white/20 tracking-widest hidden md:flex uppercase pointer-events-none">
                 MacBook Pro
             </div>
          </motion.div>
          
          {/* Laptop Base (Keyboard Deck + Lip) */}
          <div className="relative w-[114%] -ml-[7%] h-3 md:h-5 bg-gradient-to-b from-[#e4e4e7] to-[#a1a1aa] rounded-b-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex justify-center items-start border-t border-white/40">
             {/* Trackpad indentation line */}
             <div className="w-1/6 h-1 md:h-2 bg-[#d4d4d8] shadow-inner rounded-b-md"></div>
          </div>
        </motion.div>

        {/* Modern feature breakdown instead of specific screenshots */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border/50 hover:border-border p-5 md:p-8 rounded-2xl md:rounded-3xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group"
          >
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-blue-500/20 transition-colors">
              <TrendingUp className="text-blue-500 w-5 h-5 md:w-8 md:h-8" />
            </div>
            <h3 className="text-sm md:text-xl font-extrabold text-foreground mb-2 md:mb-3">Hyper-Scale Growth</h3>
            <p className="text-[11px] md:text-base text-muted-foreground leading-relaxed">
              We engineer funnels that drop CPAs dramatically while scaling spend vertically.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border/50 hover:border-border p-5 md:p-8 rounded-2xl md:rounded-3xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group"
          >
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-green-500/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-green-500/20 transition-colors">
              <ShoppingBag className="text-green-500 w-5 h-5 md:w-8 md:h-8" />
            </div>
            <h3 className="text-sm md:text-xl font-extrabold text-foreground mb-2 md:mb-3">E-Commerce Mastery</h3>
            <p className="text-[11px] md:text-base text-muted-foreground leading-relaxed">
              Your Shopify/WooCommerce store becomes a revenue-printing machine with high AOV.
            </p>
          </motion.div>

          {/* Third block takes 2 columns on mobile to balance the grid, then 1 column on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-2 md:col-span-1 bg-card border border-border/50 hover:border-border p-5 md:p-8 rounded-2xl md:rounded-3xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group"
          >
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-orange-500/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-orange-500/20 transition-colors">
              <Target className="text-orange-500 w-5 h-5 md:w-8 md:h-8" />
            </div>
            <h3 className="text-sm md:text-xl font-extrabold text-foreground mb-2 md:mb-3">Laser Targeting</h3>
            <p className="text-[11px] md:text-base text-muted-foreground leading-relaxed">
              Precision-driven audience creation utilizing predictive modeling and UGC content loops.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <button 
            onClick={openBooking}
            className="inline-flex items-center gap-4 bg-primary text-primary-foreground px-10 py-5 rounded-full text-lg font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:-translate-y-1 transition-all group"
          >
            Schedule a Strategy Call 
            <span className="bg-white/20 p-1.5 rounded-full"><ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/></span>
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default DashboardResultsSection;

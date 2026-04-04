import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, TrendingUp, Presentation, Users, Target, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { Link } from "react-router-dom";

const metaImages = ["/meta-r1.jpg", "/meta-r2.jpg", "/meta-r3.jpg", "/meta-r4.jpg"];

const features = [
  { icon: Target, label: "Laser-focused Audience Targeting" },
  { icon: TrendingUp, label: "Data-Driven Scaling Strategies" },
  { icon: Users, label: "High-Converting Creatives" },
  { icon: Presentation, label: "Advanced Funnel Optimization" },
];

const PerformanceMarketingGlimpse = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const next = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setCurrentIndex((prev) => (prev + 1) % metaImages.length);
  }
  const prev = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setCurrentIndex((prev) => (prev - 1 + metaImages.length) % metaImages.length);
  }

  return (
    <>
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
            {/* Real Meta Screenshots Carousel */}
            <div className="w-full max-w-[500px] bg-white/20 dark:bg-white/5 backdrop-blur-3xl border border-white/50 dark:border-white/10 rounded-[2rem] shadow-2xl relative overflow-hidden z-10 transition-transform duration-500 hover:scale-[1.02] group">
                <div className="bg-white/50 border-b border-white px-4 py-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="flex gap-1.5 flex-shrink-0">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                        </div>
                        <span className="text-[10px] md:text-xs text-muted-foreground font-medium truncate">adsmanager.facebook.com</span>
                    </div>
                    <span className="text-[9px] md:text-[10px] font-bold text-primary px-2.5 py-1 bg-primary/10 rounded-full whitespace-nowrap">
                        Live Meta Ads
                    </span>
                </div>
                
                <div 
                    className="relative aspect-[1/1] sm:aspect-[4/5] w-full bg-muted/20 overflow-hidden flex items-center justify-center cursor-pointer group/image"
                    onClick={() => setLightboxImage(metaImages[currentIndex])}
                >
                    <AnimatePresence mode="wait">
                        <motion.img 
                            key={currentIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            src={metaImages[currentIndex]}
                            alt={`Real Meta Ads Result ${currentIndex + 1}`}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>
                    
                    <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity transform translate-y-4 group-hover/image:translate-y-0">
                            <Maximize2 className="w-5 h-5" />
                        </div>
                    </div>
                    
                    {/* Arrows */}
                    <div className="absolute inset-y-0 left-0 flex items-center pl-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <button onClick={prev} className="w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-black/80 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <button onClick={next} className="w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-black/80 transition-colors"><ChevronRight className="w-5 h-5" /></button>
                    </div>
                    {/* Mobile sticky arrows */}
                    <div className="absolute inset-y-0 left-0 w-12 flex items-center justify-center md:hidden z-20" onClick={prev}>
                        <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20"><ChevronLeft className="w-4 h-4 text-white" /></div>
                    </div>
                    <div className="absolute inset-y-0 right-0 w-12 flex items-center justify-center md:hidden z-20" onClick={next}>
                        <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20"><ChevronRight className="w-4 h-4 text-white" /></div>
                    </div>
                </div>
                
                {/* Dots */}
                <div className="py-4 bg-secondary/30 flex items-center justify-center gap-2 border-t border-border">
                    {metaImages.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 rounded-full transition-all ${
                                currentIndex === index ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/50"
                            }`}
                        />
                    ))}
                </div>
            </div>
            
            {/* Decorative background shapes for depth */}
            <div className="absolute top-[10%] -left-[10%] w-64 h-64 bg-blue-500/20 rounded-full blur-3xl z-0"></div>
            <div className="absolute bottom-[10%] -right-[10%] w-64 h-64 bg-purple-500/20 rounded-full blur-3xl z-0"></div>
          </motion.div>
          
        </div>
      </div>
    </section>

    {/* Lightbox Modal */}
    <AnimatePresence>
        {lightboxImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
              onClick={() => setLightboxImage(null)}
            >
                <button 
                  className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
                  onClick={(e) => { e.stopPropagation(); setLightboxImage(null); }}
                >
                    <X className="w-6 h-6" />
                </button>

                <motion.img 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  src={lightboxImage} 
                  alt="Full Resolution Proof"
                  className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  onContextMenu={(e) => e.preventDefault()}
                  onClick={(e) => e.stopPropagation()}
                />
            </motion.div>
        )}
    </AnimatePresence>
    </>
  );
};

export default PerformanceMarketingGlimpse;

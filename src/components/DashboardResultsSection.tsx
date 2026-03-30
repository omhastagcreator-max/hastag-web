import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, ShoppingBag, ArrowRight, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

const metaImages = ["/meta-r1.jpg", "/meta-r2.jpg", "/meta-r3.jpg", "/meta-r4.jpg"];
const shopifyImages = ["/shopify-r1.jpg", "/shopify-r2.jpg", "/shopify-r3.jpg", "/shopify-r4.jpg"];

// Shared Lightbox Image Carousel Component
const ImageCarousel = ({ images, type, url, onImageClick }: { images: string[], type: string, url: string, onImageClick: (src: string) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }
  
  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-xl relative group">
      <div className="bg-secondary/50 border-b border-border px-4 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex gap-1.5 flex-shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
          </div>
          <span className="text-xs text-muted-foreground font-medium truncate bg-background px-3 py-0.5 rounded-md border border-border">{url}</span>
        </div>
      </div>
      
      {/* Carousel Screen */}
      <div 
        className="relative aspect-[4/3] w-full bg-muted/30 overflow-hidden flex items-center justify-center cursor-pointer group/image"
        onClick={() => onImageClick(images[currentIndex])}
      >
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            src={images[currentIndex]} 
            alt={`${type} Screenshot ${currentIndex + 1}`} 
            className="absolute inset-0 w-full h-full object-cover group-hover/image:scale-[1.02] transition-transform duration-700" 
            onContextMenu={(e) => e.preventDefault()}
          />
        </AnimatePresence>
        
        {/* Fullscreen Overlay Hint */}
        <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors flex items-center justify-center">
            <div className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity transform translate-y-4 group-hover/image:translate-y-0 shadow-lg">
                <Maximize2 className="w-5 h-5" />
            </div>
        </div>
        
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={prev}
            className="w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-black/80 transition-colors shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={next}
            className="w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-black/80 transition-colors shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="absolute inset-y-0 left-0 w-12 flex items-center justify-center md:hidden" onClick={prev}>
          <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"><ChevronLeft className="w-4 h-4 text-white" /></div>
        </div>
        <div className="absolute inset-y-0 right-0 w-12 flex items-center justify-center md:hidden" onClick={next}>
           <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"><ChevronRight className="w-4 h-4 text-white" /></div>
        </div>
      </div>
      
      {/* Dots */}
      <div className="py-3 bg-secondary/30 flex items-center justify-center gap-1.5 border-t border-border relative z-20 pointer-events-none">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              currentIndex === index ? "w-5 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};


const DashboardResultsSection = () => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <>
        <section id="dashboard-results" className="section-padding overflow-hidden bg-background">
        <div className="container-main">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
            >
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
                Real Proof. Real Dashboards.
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">What Changed After Working With Us</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                More profit per order. Better conversion rate. Stable growth (not random spikes).
            </p>
            </motion.div>

            <div className="mb-16 max-w-4xl mx-auto bg-card p-2 sm:p-4 rounded-3xl border border-border shadow-2xl">
              <div className="aspect-video bg-black rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10">
                <video 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  poster="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3"
                >
                  <source src="https://cdn.pixabay.com/video/2021/08/04/83861-584749216_large.mp4" type="video/mp4" />
                </video>
                <div className="absolute top-4 right-4 bg-red-600 animate-pulse text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-2 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  Live Dashboard
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/90 hover:bg-primary transition-colors rounded-full flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8 sm:w-10 sm:h-10 ml-2"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start max-w-7xl mx-auto">
            {/* Column 1: Meta Ads Dashboard */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col space-y-6"
            >
                <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0 border border-blue-100 shadow-sm">
                    <TrendingUp className="text-blue-600 w-7 h-7" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-foreground">Lower Cost Per Acquisition</h3>
                    <p className="text-muted-foreground text-sm flex items-center gap-1.5 mt-1 font-medium">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse border border-green-600"></span>
                    CPA dropped by 42%
                    </p>
                </div>
                </div>
                
                <ImageCarousel 
                    images={metaImages} 
                    type="Meta Ads Manager" 
                    url="adsmanager.facebook.com" 
                    onImageClick={setLightboxImage}
                  />

                <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-2">The Result</h4>
                <p className="text-blue-800/80 text-sm leading-relaxed">
                    Profit increased significantly as we fixed the core foundation of their business, lowering CPAs and focusing purely on the metrics that matter.
                </p>
                </div>
            </motion.div>

            {/* Column 2: Shopify Dashboard */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex flex-col space-y-6"
            >
                <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0 border border-green-100 shadow-sm">
                    <ShoppingBag className="text-green-600 w-7 h-7" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-foreground">Consistent Revenue Growth</h3>
                    <p className="text-muted-foreground text-sm flex items-center gap-1.5 mt-1 font-medium">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse border border-green-600"></span>
                    Revenue lifted by 185%
                    </p>
                </div>
                </div>
                
                <ImageCarousel 
                    images={shopifyImages} 
                    type="Shopify Analytics" 
                    url="admin.shopify.com" 
                    onImageClick={setLightboxImage}
                  />

                <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100">
                <h4 className="font-semibold text-green-900 mb-2">The Result</h4>
                <p className="text-green-800/80 text-sm leading-relaxed">
                    Profit increased systematically. Better landing pages combined with smarter ad strategy translated directly into higher margins.
                </p>
                </div>
            </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16 text-center"
            >
            <a href="/#audit-form" className="inline-block">
                <button className="bg-foreground text-background px-8 py-4 rounded-full text-base font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 mx-auto">
                Want These Results for Your Brand? Let's Talk <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                </button>
            </a>
            </motion.div>

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

export default DashboardResultsSection;

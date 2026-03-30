import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Target, Activity, CheckCircle2, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

const metaImages = ["/meta-r1.jpg", "/meta-r2.jpg", "/meta-r3.jpg", "/meta-r4.jpg"];
const shopifyImages = ["/shopify-r1.jpg", "/shopify-r2.jpg", "/shopify-r3.jpg", "/shopify-r4.jpg"];

// Sub-component for an independent Image Carousel
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
    <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm relative group hover:shadow-md transition-all">
      <div className="bg-secondary/50 border-b border-border px-4 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex gap-1.5 flex-shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
          </div>
          <span className="text-[10px] md:text-xs text-muted-foreground font-medium truncate">{url}</span>
        </div>
        <span className="text-[9px] md:text-[10px] font-bold text-primary px-2.5 py-1 bg-primary/10 rounded-full whitespace-nowrap">
          {type}
        </span>
      </div>
      
      {/* Carousel Screen */}
      <div 
        className="relative aspect-[16/9] w-full bg-muted/20 overflow-hidden flex items-center justify-center cursor-pointer group/image"
        onClick={() => onImageClick(images[currentIndex])}
      >
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            src={images[currentIndex]} 
            alt={`${type} Screenshot ${currentIndex + 1}`} 
            className="absolute inset-0 w-full h-full object-cover" 
            onContextMenu={(e) => e.preventDefault()}
          />
        </AnimatePresence>
        
        {/* Fullscreen Overlay Hint */}
        <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors flex items-center justify-center">
            <div className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity transform translate-y-4 group-hover/image:translate-y-0">
                <Maximize2 className="w-5 h-5" />
            </div>
        </div>
        
        {/* Overlay Arrows */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={prev}
            className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-black/80 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={next}
            className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-black/80 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        {/* Persistent mobile arrows */}
        <div className="absolute inset-y-0 left-0 w-12 flex items-center justify-center md:hidden" onClick={prev}>
          <div className="w-6 h-6 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"><ChevronLeft className="w-3 h-3 text-white" /></div>
        </div>
        <div className="absolute inset-y-0 right-0 w-12 flex items-center justify-center md:hidden" onClick={next}>
           <div className="w-6 h-6 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"><ChevronRight className="w-3 h-3 text-white" /></div>
        </div>
      </div>
      
      {/* Dots */}
      <div className="py-3 bg-secondary/30 flex items-center justify-center gap-1.5 border-t border-border">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              currentIndex === index ? "w-4 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};


const CaseStudySnapshot = () => {
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <>
      <section className="py-16 md:py-24 bg-muted/10 border-y border-border relative overflow-hidden" id="case-studies">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-full md:w-[60vw] h-[80vh] bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="container-main relative z-10 flex flex-col gap-16">
            
            {/* Top Text Section (Full Width, Centered) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                Real Results. Verifiable Proof.
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
                How We Scaled a D2C Brand
              </h2>
              <p className="text-muted-foreground text-base md:text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
                Anyone can make a nice website. We actually deliver results. Here is the exact breakdown of how we transformed a struggling ad account into a profit machine.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-10 text-left">
                <div className="flex gap-4 p-5 rounded-2xl bg-card border border-border shadow-sm">
                  <Target className="text-primary w-6 h-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-foreground">The Problem</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Bleeding budget on generic creatives and a landing page that wasn't converting traffic into buyers.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 p-5 rounded-2xl bg-card border border-border shadow-sm">
                  <Activity className="text-primary w-6 h-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-foreground">The Fix (Ads + Dev)</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">We completely rebuilt the funnel. New ad creatives aimed at high-intent buyers, paired with a drastically faster, conversion-optimized landing page.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom Stats Carousels (Side-by-side on desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Meta Carousel Block */}
              <div className="relative">
                <ImageCarousel 
                  images={metaImages} 
                  type="Meta Ads Manager" 
                  url="adsmanager.facebook.com" 
                  onImageClick={setLightboxImage}
                />
              </div>

              {/* Shopify Carousel Block */}
              <div className="relative">
                <ImageCarousel 
                  images={shopifyImages} 
                  type="Shopify Analytics" 
                  url="admin.shopify.com" 
                  onImageClick={setLightboxImage}
                />
              </div>
            </motion.div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-secondary/50 border border-border p-6 rounded-2xl shadow-sm mt-4">
                <div className="flex items-start gap-4 flex-1">
                    <CheckCircle2 className="text-primary w-6 h-6 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm md:text-base text-foreground leading-relaxed font-medium italic">
                            "Scaling has finally become predictable. The HastagCreator team actually cares about our profit margin, not just their ad spend cut."
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">— Founder, E-Commerce Brand</p>
                    </div>
                </div>
                
                <a href="/#audit-form">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full md:w-auto bg-primary hover:bg-primary-deep text-white px-8 py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all whitespace-nowrap"
                    >
                        Get The Same Audit They Got <ArrowUpRight className="w-4 h-4" />
                    </motion.button>
                </a>
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
                    onClick={(e) => e.stopPropagation()} // Prevent click on image from closing
                  />
              </motion.div>
          )}
      </AnimatePresence>
    </>
  );
};

export default CaseStudySnapshot;

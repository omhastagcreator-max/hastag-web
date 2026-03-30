import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

const screenshots = Array.from({ length: 13 }, (_, i) => `/whatsappss/whatsapp-${i + 1}.png`);

const WhatsAppTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scrolling logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screenshots.length);
    }, 3500); // 3.5 seconds per slide
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-background border-y border-border/40 relative overflow-hidden" id="raw-proof">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text & Context */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto lg:mx-0">
              <MessageCircle className="w-7 h-7 text-green-500" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-foreground leading-tight">
              Raw WhatsApp Proof. <br className="hidden lg:block"/> No Editing.
            </h2>
            <p className="text-lg text-muted-foreground font-medium mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              We don't rely purely on staged text reviews. Here are raw screenshots directly from D2C founders 
              reacting to our ROAS mapping and their explosive sales growth in real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
              <a href="https://calendly.com/domsco-tech/30min?month=2026-03" target="_blank" rel="noreferrer">
                <button className="bg-foreground text-background px-8 py-4 rounded-full text-sm font-bold shadow-lg hover:-translate-y-1 transition-transform">
                  Scale Your Revenue
                </button>
              </a>
            </div>
          </div>

          {/* Right Column: Screenshot Slider */}
          <div className="order-1 lg:order-2 flex flex-col items-center">
            <div className="relative w-full max-w-[400px] aspect-[9/16] bg-black rounded-3xl border-8 border-card shadow-2xl overflow-hidden mb-8">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={screenshots[currentIndex]}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]"
                  alt={`Proof ${currentIndex + 1}`}
                />
              </AnimatePresence>
            </div>

            {/* Slick Dots */}
            <div className="flex flex-wrap justify-center gap-2 max-w-[300px]">
              {screenshots.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentIndex 
                      ? "w-8 h-2.5 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
                      : "w-2.5 h-2.5 bg-border hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhatsAppTestimonials;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, Clapperboard, Megaphone, LayoutTemplate, MousePointerClick, Repeat } from "lucide-react";
import AuditCTA from "./AuditCTA";

const growthSystem = [
  { icon: Clapperboard, label: "Creative" },
  { icon: Megaphone, label: "Ads" },
  { icon: LayoutTemplate, label: "Landing Page" },
  { icon: MousePointerClick, label: "Conversion" },
  { icon: Repeat, label: "Retention" },
];

const proofImages = [
  { src: "/meta-r1.jpg", label: "Meta Ads Manager" },
  { src: "/meta-r2.jpg", label: "Meta Ads Manager" },
  { src: "/meta-r3.jpg", label: "Meta Ads Manager" },
  { src: "/meta-r4.jpg", label: "Meta Ads Manager" },
  { src: "/whatsappss/whatsapp-1.png", label: "Client WhatsApp" },
  { src: "/whatsappss/whatsapp-2.png", label: "Client WhatsApp" },
  { src: "/whatsappss/whatsapp-3.png", label: "Client WhatsApp" },
  { src: "/whatsappss/whatsapp-4.png", label: "Client WhatsApp" },
  { src: "/shopify-r1.jpg", label: "Shopify Prepaid Orders" },
  { src: "/shopify-r2.jpg", label: "Shopify Prepaid Orders" },
  { src: "/shopify-r3.jpg", label: "Shopify Prepaid Orders" },
  { src: "/shopify-r4.jpg", label: "Shopify Prepaid Orders" },
];

const PerformanceMarketingGlimpse = () => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <>
    <section id="performance" className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Decorative gradient patches */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-[500px] bg-gradient-to-bl from-primary/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full md:w-1/2 h-[500px] bg-gradient-to-tr from-primary/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      
      <div className="container-main relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center [&>*]:min-w-0">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-5 md:gap-6"
          >
            <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest w-max">
              The Real Problem
            </span>
            <h2 className="text-[2rem] leading-[1.1] md:text-5xl lg:text-6xl font-black text-foreground md:leading-tight tracking-tight">
              More Ad Spend Won't Fix a <span className="text-primary">Broken Funnel.</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              If your offer, creatives, landing page or conversion system isn't working, increasing your ad budget only increases the amount you lose.
            </p>

            <div className="bg-card border border-primary/20 rounded-3xl p-5 md:p-8 shadow-sm mt-2">
              <p className="font-black text-foreground text-lg md:text-xl mb-5">
                We fix the entire growth system — not just the Ads Manager.
              </p>
              <ol className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {growthSystem.map((item, i) => (
                  <li
                    key={item.label}
                    className={`flex sm:flex-col items-center gap-2 sm:gap-2 bg-primary/5 border border-primary/15 rounded-2xl px-3 sm:px-1.5 py-3 sm:py-4 text-left sm:text-center ${i === growthSystem.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}
                  >
                    <span className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </span>
                    <span className="text-sm sm:text-xs xl:text-sm font-bold text-foreground leading-tight">{item.label}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-2">
              <AuditCTA source="broken_funnel" label="Get My Free Growth Audit" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center p-4 overflow-hidden"
          >
            {/* Auto-scrolling proof strip: Meta results -> WhatsApp appreciations -> Shopify prepaid results, looped 3x */}
            <div className="relative w-full max-w-[560px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <div className="flex animate-marquee items-stretch gap-5 whitespace-nowrap">
                {[...proofImages, ...proofImages, ...proofImages].map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setLightboxImage(item.src)}
                    className="shrink-0 h-[280px] md:h-[360px] bg-white/20 dark:bg-white/5 backdrop-blur-3xl border border-white/50 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden cursor-pointer group flex flex-col"
                  >
                    <div className="bg-white/50 border-b border-white px-4 py-2.5 flex items-center justify-between gap-2 shrink-0">
                      <div className="flex gap-1 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      </div>
                      <span className="text-[9px] md:text-[10px] font-bold text-primary px-2.5 py-1 bg-primary/10 rounded-full whitespace-nowrap">
                        {item.label}
                      </span>
                    </div>
                    <div className="relative flex-1 bg-muted/20 flex items-center justify-center">
                      <img
                        src={item.src}
                        alt={item.label}
                        loading="lazy"
                        className="h-full w-auto object-contain"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
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

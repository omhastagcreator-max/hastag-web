import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Maximize2, X } from "lucide-react";
import { Link } from "react-router-dom";

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
    <section id="performance" className="py-24 bg-background relative overflow-hidden">
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
              We don't make money until<br/>
              you make <span className="text-primary">millions.</span>
            </h2>

            <div className="bg-card border border-primary/20 rounded-3xl p-6 md:p-8 shadow-sm mt-4">
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                Most agencies charge you a heavy fixed retainer just to test things — leaving you to take all the financial risk while they get paid regardless. We do the exact opposite.
              </p>
              <div className="space-y-4 mb-6">
                <div className="border-l-4 border-primary/40 pl-4">
                  <span className="text-xs font-black uppercase tracking-widest text-primary">Months 1–3 · The Growth Phase</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    Zero fixed fees. We only charge 18% of your ad spend to keep our media buyers fed and focused entirely on your ROAS. <em>(Truth? This barely covers our costs.)</em>
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <span className="text-xs font-black uppercase tracking-widest text-primary">Post-Break-Even · The Scale Phase</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    This is where we actually win. Once your brand hits break-even and starts printing profits, we take a 12% revenue share.
                  </p>
                </div>
              </div>
              <p className="font-bold text-foreground">
                If you don't win, we don't eat. Ready to align incentives? Let's talk.
              </p>
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
            className="relative flex items-center justify-center p-4 overflow-hidden"
          >
            {/* Auto-scrolling proof strip: Meta results -> WhatsApp appreciations -> Shopify prepaid results, looped 3x */}
            <div className="relative w-full max-w-[560px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <div className="flex animate-marquee items-stretch gap-5 whitespace-nowrap">
                {[...proofImages, ...proofImages, ...proofImages].map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setLightboxImage(item.src)}
                    className="shrink-0 h-[300px] md:h-[360px] bg-white/20 dark:bg-white/5 backdrop-blur-3xl border border-white/50 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden cursor-pointer group flex flex-col"
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

import { useEffect, useState } from "react";
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

// Existing proof screenshots from client accounts
const proofSets = {
  meta: {
    tab: "Meta Ads Manager",
    url: "adsmanager.facebook.com",
    images: ["/meta-r1.jpg", "/meta-r2.jpg", "/meta-r3.jpg", "/meta-r4.jpg"],
  },
  shopify: {
    tab: "Shopify Analytics",
    url: "admin.shopify.com/analytics",
    images: ["/shopify-r1.jpg", "/shopify-r2.jpg", "/shopify-r3.jpg", "/shopify-r4.jpg"],
  },
} as const;
type ProofKey = keyof typeof proofSets;

const PerformanceMarketingGlimpse = () => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [set, setSet] = useState<ProofKey>("meta");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = proofSets[set];

  // Gentle auto-advance through the screenshots; pauses on hover
  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => {
      setIndex((i) => {
        if (i + 1 < current.images.length) return i + 1;
        setSet((s) => (s === "meta" ? "shopify" : "meta"));
        return 0;
      });
    }, 4000);
    return () => window.clearInterval(t);
  }, [paused, current.images.length]);

  return (
    <>
      <section id="performance" className="py-16 md:py-24 bg-background relative overflow-hidden">
        <div className="absolute -top-40 right-0 w-[600px] max-w-full h-[500px] bg-primary/5 blur-3xl rounded-full pointer-events-none" />

        <div className="container-main relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center [&>*]:min-w-0">

            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-5"
            >
              <span className="section-eyebrow w-max">The Real Problem</span>
              <h2 className="section-title text-foreground">
                More Ad Spend Won't Fix a <span className="text-primary">Broken Funnel.</span>
              </h2>
              <p className="section-lead max-w-xl">
                If your offer, creatives, landing page or conversion system isn't working, increasing your ad budget only increases the amount you lose.
              </p>

              <div className="bg-card border border-border rounded-2xl p-5 md:p-6 shadow-card mt-1">
                <p className="font-bold text-foreground text-base md:text-lg mb-4">
                  We fix the entire growth system — not just the Ads Manager.
                </p>
                <ol className="grid grid-cols-5 gap-2">
                  {growthSystem.map((item, i) => (
                    <li key={item.label} className="flex flex-col items-center text-center gap-2">
                      <span className="relative w-11 h-11 md:w-12 md:h-12 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-primary" />
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-[9px] font-black text-primary-foreground flex items-center justify-center">
                          {i + 1}
                        </span>
                      </span>
                      <span className="text-[11px] sm:text-xs font-bold text-foreground leading-tight">{item.label}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-2">
                <AuditCTA source="broken_funnel" label="Get My Free Growth Audit" />
              </div>
            </motion.div>

            {/* Proof panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="bg-card border border-border rounded-2xl shadow-[0_30px_80px_-30px_rgba(0,51,255,0.35)] overflow-hidden">
                {/* Window chrome + tabs */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-secondary/60">
                  <div className="flex gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <span className="text-[11px] text-muted-foreground font-medium truncate">{current.url}</span>
                </div>
                <div className="flex gap-1 p-1.5 bg-secondary/40 border-b border-border" role="tablist">
                  {(Object.keys(proofSets) as ProofKey[]).map((key) => (
                    <button
                      key={key}
                      role="tab"
                      aria-selected={set === key}
                      onClick={() => {
                        setSet(key);
                        setIndex(0);
                      }}
                      className={`flex-1 text-xs font-bold py-2 rounded-lg transition-colors ${
                        set === key ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {proofSets[key].tab}
                    </button>
                  ))}
                </div>

                {/* Main screenshot */}
                <button
                  type="button"
                  onClick={() => setLightboxImage(current.images[index])}
                  className="relative block w-full aspect-[4/3] bg-white group"
                  aria-label="Open screenshot full size"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={current.images[index]}
                      src={current.images[index]}
                      alt={`${current.tab} screenshot from a client account`}
                      loading="lazy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                  </AnimatePresence>
                  <span className="absolute bottom-3 right-3 bg-foreground/70 backdrop-blur text-background text-[11px] font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1.5 opacity-90 group-hover:opacity-100">
                    <Maximize2 className="w-3.5 h-3.5" /> View full size
                  </span>
                </button>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-2 p-3 border-t border-border bg-secondary/30">
                  {current.images.map((src, i) => (
                    <button
                      key={src}
                      onClick={() => setIndex(i)}
                      aria-label={`Show screenshot ${i + 1}`}
                      className={`aspect-[4/3] rounded-md overflow-hidden border-2 bg-white transition ${
                        i === index ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={src} alt="" loading="lazy" className="w-full h-full object-cover object-top" />
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-3">
                Screenshots from client ad accounts and stores.              </p>
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
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImage(null);
              }}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={lightboxImage}
              alt="Full resolution proof"
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

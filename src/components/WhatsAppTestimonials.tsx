import { motion } from "framer-motion";

const screenshots = Array.from({ length: 13 }, (_, i) => `/whatsappss/whatsapp-${i + 1}.png`);

const WhatsAppTestimonials = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="raw-proof">
      <div className="container-main text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-foreground">
          Raw Proof. No Editing.
        </h2>
        <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
          We don't just rely on text reviews. Here are raw WhatsApp screenshots directly from D2C founders reacting to their ROAS and explosive sales.
        </p>
      </div>

      <div className="relative flex flex-col gap-6 overflow-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

        {/* Row 1 (Items 1-7) */}
        <div className="flex animate-marquee gap-6 whitespace-nowrap px-4 py-2 shrink-0 min-w-full z-0 group-hover:[animation-play-state:paused] hover:[animation-play-state:paused]">
          {[...screenshots.slice(0, 7), ...screenshots.slice(0, 7)].map((src, idx) => (
            <div
              key={idx}
              className="w-[280px] shrink-0 rounded-2xl border border-border shadow-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-card"
            >
              <img src={src} alt="WhatsApp Revenue Proof" className="w-full h-[400px] object-contain bg-muted/20" />
            </div>
          ))}
        </div>

        {/* Row 2 (Items 8-13) - Reverse direction visually by using reverse marquee */}
        <div className="flex animate-marquee gap-6 whitespace-nowrap px-4 py-2 shrink-0 min-w-full z-0 group-hover:[animation-play-state:paused] hover:[animation-play-state:paused]" style={{ animationDirection: 'reverse' }}>
          {[...screenshots.slice(7), ...screenshots.slice(7), ...screenshots.slice(7)].map((src, idx) => (
            <div
              key={idx}
              className="w-[280px] shrink-0 rounded-2xl border border-border shadow-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-card"
            >
              <img src={src} alt="WhatsApp Revenue Proof" className="w-full h-[400px] object-contain bg-muted/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatsAppTestimonials;

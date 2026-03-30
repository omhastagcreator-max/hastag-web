import { motion } from "framer-motion";

const partnerLogos = [
  "/Official Partners/amazon.png",
  "/Official Partners/apple.png",
  "/Official Partners/gokwik.png",
  "/Official Partners/google.png",
  "/Official Partners/meta.png",
  "/Official Partners/razorpay.png",
  "/Official Partners/sony.png"
];

const OfficialPartners = () => {
  return (
    <section className="py-12 bg-secondary/30 border-y border-border/40 overflow-hidden">
      <div className="container-main text-center mb-8">
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
          Official Growth Partners & Platforms
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-secondary/30 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-secondary/30 to-transparent z-10"></div>

        <div className="flex animate-marquee items-center justify-around gap-16 whitespace-nowrap min-w-full z-0 group-hover:[animation-play-state:paused]">
          {[...partnerLogos, ...partnerLogos, ...partnerLogos].map((src, index) => (
            <div key={index} className="w-[100px] md:w-[130px] shrink-0 opacity-50 hover:opacity-100 transition-opacity flex items-center justify-center grayscale hover:grayscale-0">
              <img src={src} alt="Official Partner" className="w-full h-auto object-contain max-h-16" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfficialPartners;

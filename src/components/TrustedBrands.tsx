import { motion } from "framer-motion";

const brandLogos = [
  "/trustbybrands/1.png",
  "/trustbybrands/2.png",
  "/trustbybrands/3.png",
  "/trustbybrands/4.png",
  "/trustbybrands/5.png",
  "/trustbybrands/6.png",
  "/trustbybrands/7.png",
  "/trustbybrands/8.png",
  "/trustbybrands/9.png",
  "/trustbybrands/10.png",
  "/trustbybrands/11.png",
  "/trustbybrands/12.png",
];

const TrustedBrands = () => {
  return (
    <section className="py-12 bg-background border-b border-border/40 overflow-hidden" id="trusted-brands">
      <div className="container-main text-center mb-8">
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
          Trusted by 511+ D2C Brands & Industry Leaders
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative flex overflow-x-hidden group">
        {/* Soft gradient masks for smooth fade in/out */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10"></div>

        <div className="flex animate-marquee items-center gap-12 whitespace-nowrap min-w-full z-0">
          
          {/* Repeat array twice for smooth infinite scroll */}
          {[...brandLogos, ...brandLogos].map((src, index) => (
            <div key={index} className="w-[120px] md:w-[150px] shrink-0 flex items-center justify-center">
              <img src={src} alt="Trusted Brand" className="w-full h-auto object-contain" />
            </div>
          ))}

          {/* Highlighted ZeeTV/Ideabaaz Box */}
          <div className="w-[300px] shrink-0 bg-primary/5 border border-primary/20 rounded-2xl p-4 flex flex-col items-center justify-center mx-12">
            <span className="text-[10px] font-black text-primary uppercase tracking-wider mb-2">Featured Mega-Scale Partner</span>
            <div className="flex items-center gap-4">
              <img src="/Official Partners/zeetv.png" alt="ZeeTV" className="h-8 object-contain" />
              <img src="/Official Partners/ideabaaz.png" alt="Ideabaaz" className="h-8 object-contain" />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;

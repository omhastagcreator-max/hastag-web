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

const FeaturedPartnerBox = () => (
  <div className="w-[300px] shrink-0 bg-primary/5 border border-primary/20 rounded-2xl p-4 flex flex-col items-center justify-center mx-6">
    <span className="text-[10px] font-black text-primary uppercase tracking-wider mb-2">Featured Mega-Scale Partner</span>
    <div className="flex items-center gap-4">
      <img src="/Official Partners/zeetv.png" alt="ZeeTV" className="h-8 object-contain" />
      <img src="/Official Partners/ideabaaz.png" alt="Ideabaaz" className="h-8 object-contain" />
    </div>
  </div>
);

const GrowthPartnersBox = () => (
  <div className="w-[300px] shrink-0 bg-primary/5 border border-primary/20 rounded-2xl p-4 flex flex-col items-center justify-center mx-6">
    <span className="text-[10px] font-black text-primary uppercase tracking-wider mb-2">Official Growth Partners</span>
    <div className="flex items-center justify-center gap-3 flex-wrap max-w-[260px]">
      <img src="/Official Partners/meta.png" alt="Meta" className="h-6 object-contain" />
      <img src="/Official Partners/google.png" alt="Google" className="h-6 object-contain" />
      <img src="/Official Partners/amazon.png" alt="Amazon" className="h-6 object-contain" />
      <img src="/Official Partners/apple.png" alt="Apple" className="h-6 object-contain" />
      <img src="/Official Partners/razorpay.png" alt="Razorpay" className="h-6 object-contain" />
      <img src="/Official Partners/sony.png" alt="Sony" className="h-6 object-contain" />
      <img src="/Official Partners/gokwik.png" alt="Gokwik" className="h-6 object-contain" />
    </div>
  </div>
);

const TrustedBrands = () => {
  return (
    <section className="pt-6 pb-12 bg-background border-b border-border/40 overflow-hidden" id="trusted-brands">
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

          {/* Repeat array twice for smooth infinite scroll. A known-name partner box is
              interspersed every 4 logos so a recognizable name surfaces often, not just once.
              The two featured boxes alternate so both the mega-scale partner and the
              official growth/ad-platform logos (Meta, Google, etc.) show up beside the
              regular brand logos. */}
          {[...brandLogos, ...brandLogos].flatMap((src, index) => {
            const nodes = [
              <div key={index} className="w-[120px] md:w-[150px] shrink-0 flex items-center justify-center">
                <img src={src} alt="Trusted Brand" className="w-full h-auto object-contain" />
              </div>,
            ];
            if ((index + 1) % 4 === 0) {
              const isEven = Math.floor(index / 4) % 2 === 0;
              nodes.push(
                isEven ? (
                  <FeaturedPartnerBox key={`featured-${index}`} />
                ) : (
                  <GrowthPartnersBox key={`growth-${index}`} />
                )
              );
            }
            return nodes;
          })}

        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;

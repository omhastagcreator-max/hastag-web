import { motion } from "framer-motion";
import { Users, Star, Trophy, Globe, TrendingUp, CheckCircle2, Linkedin } from "lucide-react";
import AuditCTA from "./AuditCTA";

// Numbers already published on the site. Every figure has a clear label.
// ("All top singers/comedians/podcasters" and the duplicated "511+ celebrities" were removed.)
const growthNumbers = [
  { icon: TrendingUp, value: "₹11.5 Cr+", label: "Sales generated" },
  { icon: CheckCircle2, value: "511+", label: "Brands scaled" },
  { icon: Linkedin, value: "2,366+", label: "LinkedIn recommendations" },
];

const creatorNumbers = [
  { icon: Globe, value: "25 Cr", label: "Followers across 240+ pages" },
  { icon: Users, value: "20,000+", label: "Influencers across India" },
  { icon: Trophy, value: "75", label: "IPL players" },
];

const Stat = ({ icon: Icon, value, label }: { icon: typeof Globe; value: string; label: string }) => (
  <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2 md:gap-3.5 px-2 py-4 md:p-6">
    <span className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
      <Icon className="w-5 h-5 text-white" />
    </span>
    <div className="min-w-0">
      <div className="text-xl sm:text-2xl md:text-3xl font-black leading-none tracking-tight">{value}</div>
      <div className="text-[11px] sm:text-xs md:text-sm font-semibold text-white/75 mt-1.5 leading-snug">{label}</div>
    </div>
  </div>
);

const NetworkStats = () => {
  return (
    <section id="experience" className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1/3 -right-1/4 w-[60%] h-[80%] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-1/3 -left-1/4 w-[60%] h-[80%] rounded-full bg-black/15 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_40%,transparent_100%)]" />
      </div>

      <div className="container-main relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-14"
        >
          <span className="inline-flex items-center bg-white/15 text-white text-[11px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-[0.14em] border border-white/20 mb-5">
            The Team Behind Your Growth
          </span>
          <h2 className="section-title text-white">11+ Years of Combined Growth Experience</h2>
          <p className="text-base md:text-lg text-white/80 mt-4">
            Performance marketing, creative and a creator network built for D2C brands.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch [&>*]:min-w-0">
          {/* Numbers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md overflow-hidden">
              <p className="px-4 md:px-6 pt-4 md:pt-5 text-center md:text-left text-[10px] md:text-[11px] font-black uppercase tracking-[0.14em] text-white/70">Growth results</p>
              <div className="grid grid-cols-3 divide-x divide-white/15">
                {growthNumbers.map((n) => (
                  <Stat key={n.label} {...n} />
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-black/15 border border-white/10 backdrop-blur-md overflow-hidden">
              <p className="px-4 md:px-6 pt-4 md:pt-5 text-center md:text-left text-[10px] md:text-[11px] font-black uppercase tracking-[0.14em] text-white/70">
                Creator network for UGC &amp; influencer creatives
              </p>
              <div className="grid grid-cols-3 divide-x divide-white/10">
                {creatorNumbers.map((n) => (
                  <Stat key={n.label} {...n} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Google ranking proof */}
          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 bg-white text-foreground rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] flex flex-col"
          >
            <div className="bg-secondary/80 border-b border-border px-4 py-3 flex items-center gap-3">
              <div className="flex gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <span className="text-[11px] text-muted-foreground font-medium truncate">
                google.com/search?q=influencer+marketing+agency+in+mumbai
              </span>
            </div>
            <div className="flex-1 bg-white flex items-center">
              <img
                src="/google-ranking-mumbai.jpg"
                alt="Hastag Creator ranked #1 on Google for 'influencer marketing agency in Mumbai'"
                loading="lazy"
                className="w-full h-auto"
              />
            </div>
            <figcaption className="flex items-center justify-between gap-3 px-5 py-4 border-t border-border">
              <div>
                <p className="text-sm font-black">#1 on Google in Mumbai</p>
                <p className="text-xs text-muted-foreground">"Influencer marketing agency in Mumbai"</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold">5.0 (36)</span>
              </div>
            </figcaption>
          </motion.figure>
        </div>

        <div className="flex justify-center mt-10 md:mt-14">
          <AuditCTA source="experience_numbers" variant="light" />
        </div>
      </div>
    </section>
  );
};

export default NetworkStats;

import { motion } from "framer-motion";
import { Users, Star, Trophy, Globe, TrendingUp, CheckCircle2, Linkedin } from "lucide-react";
import AuditCTA from "./AuditCTA";

// Growth numbers already published on the site (previously in the hero strip)
const growthNumbers = [
  { icon: TrendingUp, value: "₹11.5 Cr+", label: "Sales Generated" },
  { icon: CheckCircle2, value: "511+", label: "Brands Scaled" },
  { icon: Linkedin, value: "2,366+", label: "LinkedIn Recommendations" },
];

// Creator network used for UGC & influencer creatives. Entries without a
// countable number ("All top singers" etc.) and the duplicated "511+ celebrities"
// figure were removed – every number here has a clear label.
const networkData = [
  { icon: Users, label: "Social Media Influencers", value: "20,000+", desc: "From all over India" },
  { icon: Trophy, label: "IPL Players", value: "75", desc: "Sports icons" },
];

const NetworkStats = () => {
  return (
    <section id="experience" className="py-16 md:py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Decorative */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-black/10 blur-3xl"></div>
      </div>

      <div className="container-main relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-10 lg:gap-16 items-start mb-12 md:mb-16 [&>*]:min-w-0">
          {/* Left: real Google ranking proof - kept at its natural aspect ratio so no text in the screenshot gets cropped away */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 w-full max-w-sm lg:max-w-none mx-auto"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <div className="bg-secondary/80 border-b border-border px-4 py-2.5 flex items-center gap-2">
                <div className="flex gap-1.5 flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
                <span className="text-[10px] text-muted-foreground font-medium truncate">google.com/search?q=influencer+marketing+agency+in+mumbai</span>
              </div>
              <img
                src="/google-ranking-mumbai.jpg"
                alt="Hastag Creator ranked #1 on Google for 'influencer marketing agency in Mumbai'"
                loading="lazy"
                className="w-full h-auto object-cover"
              />
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-t border-border bg-white text-foreground">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3 h-3 fill-current" />)}
                </div>
                <span className="text-xs font-bold">5.0 (36)</span>
                <span className="text-xs text-muted-foreground">&middot; #1 in Mumbai</span>
              </div>
            </div>
          </motion.div>

          {/* Right: heading content + follower banner, stacked in the same 70% column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 flex flex-col gap-8 md:gap-10"
          >
            <div className="text-center lg:text-left max-w-4xl">
              <span className="inline-block bg-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest backdrop-blur-sm shadow-sm border border-white/10">
                The Team Behind Your Growth
              </span>
              <h2 className="text-[2rem] leading-[1.1] md:text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-md">
                11+ Years of Combined Growth Experience
              </h2>

              {/* Verified growth numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                {growthNumbers.map((n) => (
                  <div key={n.label} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-5 flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2 text-left">
                    <n.icon className="w-6 h-6 text-white/80 shrink-0" />
                    <div>
                      <div className="text-2xl md:text-3xl font-black leading-none">{n.value}</div>
                      <div className="text-xs md:text-sm font-bold uppercase tracking-wider text-white/80 mt-1">{n.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlight Banner for Meme Pages - now part of the right column instead of a full-width block below */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center gap-3">
              <Globe className="w-10 h-10 text-white/80 mb-1" />
              <h3 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
                25 Crore Followers
              </h3>
              <span className="text-xs font-bold uppercase tracking-widest text-white/70">Creator network for UGC &amp; influencer creatives</span>
              <p className="text-base md:text-lg text-white/80 font-medium">
                Across our vast social, MEME, and fan page network spanning <strong className="text-white">240+ elite pages</strong>.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Grid for other Stats */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto mb-12 md:mb-16">
          {networkData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/20 backdrop-blur-md border border-white/10 p-3 md:p-6 rounded-2xl flex flex-col items-center text-center hover:bg-black/30 transition-colors"
            >
              <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white/70 mb-3 md:mb-4" />
              <h4 className="text-xl md:text-3xl font-black mb-1">{item.value}</h4>
              <p className="text-[10px] md:text-sm font-bold text-white mb-1 uppercase tracking-wider">{item.label}</p>
              <p className="text-xs text-white/60">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex justify-center">
            <AuditCTA source="experience_numbers" variant="light" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default NetworkStats;

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, Star, Trophy, Globe, Mic, Smile, Radio } from "lucide-react";

// Two-column layout: Google ranking proof on the left, experience + creator network on the right.
// Every text here can also be changed in the website editor by clicking it.
const network = [
  { icon: Users, value: "20,000+", label: "Social media influencers", sub: "From all over India" },
  { icon: Star, value: "511+", label: "Celebrities", sub: "Top tier talent" },
  { icon: Trophy, value: "75", label: "IPL players", sub: "Sports icons" },
  { icon: Mic, value: "All", label: "Top singers", sub: "Music industry leaders" },
  { icon: Smile, value: "All", label: "Top comedians", sub: "Viral entertainers" },
  { icon: Radio, value: "All", label: "Top podcasters", sub: "Voice of the youth" },
];

const NetworkStats = () => {
  return (
    <section id="experience" className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1/3 -right-1/4 w-[60%] h-[80%] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-1/3 -left-1/4 w-[60%] h-[80%] rounded-full bg-black/15 blur-3xl" />
      </div>

      <div className="container-main relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start [&>*]:min-w-0">
          {/* LEFT: Google ranking proof */}
          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 lg:sticky lg:top-28 bg-white text-foreground rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]"
          >
            <div className="bg-secondary/80 border-b border-border px-4 py-3 flex items-center gap-3">
              <div className="flex gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <span className="text-[11px] text-muted-foreground font-medium truncate">google.com/search?q=influencer+marketing+agency+in+mumbai</span>
            </div>
            <img
              src="/google-ranking-mumbai.jpg"
              alt="Hastag Creator ranked #1 on Google for 'influencer marketing agency in Mumbai'"
              loading="lazy"
              className="w-full h-auto"
            />
            <figcaption className="flex items-center gap-2 px-5 py-4 border-t border-border">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-bold">5.0 (36)</span>
              <span className="text-sm text-muted-foreground">· #1 in Mumbai</span>
            </figcaption>
          </motion.figure>

          {/* RIGHT: experience + network */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <span className="inline-flex items-center bg-white/15 text-white text-[11px] md:text-xs font-black px-4 py-2 rounded-full uppercase tracking-[0.16em] border border-white/20 mb-5">
              Get started with #Creator now
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.05]">11 Years of Experience</h2>
            <p className="text-lg md:text-xl italic text-white/85 mt-4">Our existing entire network is:</p>

            <div className="mt-7 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md px-6 py-7 md:py-8 text-center">
              <Globe className="w-9 h-9 mx-auto text-white" strokeWidth={1.5} />
              <div className="mt-3 text-3xl md:text-4xl font-black tracking-tight">25 Crore Followers</div>
              <p className="mt-2 text-sm md:text-base text-white/85">
                Across our vast social, MEME, and fan page network spanning <b className="text-white">240+ elite pages</b>.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {network.map((n) => (
                <div key={n.label} className="rounded-2xl bg-black/15 border border-white/10 px-3 py-5 md:py-6 text-center">
                  <n.icon className="w-7 h-7 mx-auto text-white/90" strokeWidth={1.5} />
                  <div className="mt-3 text-2xl md:text-3xl font-black leading-none">{n.value}</div>
                  <div className="mt-2 text-[11px] md:text-xs font-black uppercase tracking-[0.12em]">{n.label}</div>
                  <div className="mt-1 text-[11px] md:text-xs text-white/70">{n.sub}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center lg:justify-start">
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center bg-white text-primary px-8 md:px-10 py-4 md:py-5 rounded-full text-sm md:text-base font-black uppercase tracking-[0.14em] shadow-[0_10px_40px_-5px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform"
              >
                Check our portfolio (results)
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NetworkStats;

import { motion } from "framer-motion";
import { Users, Star, Trophy, Mic, Smile, Radio, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const networkData = [
  { icon: Users, label: "Social Media Influencers", value: "20,000+", desc: "From all over India" },
  { icon: Star, label: "Celebrities", value: "511+", desc: "Top tier talent" },
  { icon: Trophy, label: "IPL Players", value: "75", desc: "Sports icons" },
  { icon: Mic, label: "Top Singers", value: "All", desc: "Music industry leaders" },
  { icon: Smile, label: "Top Comedians", value: "All", desc: "Viral entertainers" },
  { icon: Radio, label: "Top Podcasters", value: "All", desc: "Voice of the youth" },
];

const NetworkStats = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Decorative */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-black/10 blur-3xl"></div>
      </div>

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-[3fr_7fr] gap-10 lg:gap-16 items-center mb-16">
          {/* Left: real Google ranking proof - kept at its natural aspect ratio so no text in the screenshot gets cropped away */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-sm lg:max-w-none mx-auto"
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
            className="flex flex-col gap-10"
          >
            <div className="text-center lg:text-left max-w-4xl">
              <span className="inline-block bg-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest backdrop-blur-sm shadow-sm border border-white/10">
                Get Started With #Creator Now
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-md">
                11 Years of Experience
              </h2>
              <p className="text-xl md:text-2xl text-white/90 font-medium italic mb-2">
                Our Existing entire network is:
              </p>
            </div>

            {/* Highlight Banner for Meme Pages - now part of the right column instead of a full-width block below */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center gap-3">
              <Globe className="w-10 h-10 text-white/80 mb-1" />
              <h3 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
                25 Crore Followers
              </h3>
              <p className="text-base md:text-lg text-white/80 font-medium">
                Across our vast social, MEME, and fan page network spanning <strong className="text-white">240+ elite pages</strong>.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Grid for other Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto mb-16">
          {networkData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/20 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-black/30 transition-colors"
            >
              <item.icon className="w-8 h-8 text-white/70 mb-4" />
              <h4 className="text-2xl md:text-3xl font-black mb-1">{item.value}</h4>
              <p className="text-sm font-bold text-white mb-1 uppercase tracking-wider">{item.label}</p>
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
          <Link to="/portfolio" className="inline-block">
            <button className="bg-white text-primary px-10 py-5 rounded-full text-lg font-bold shadow-[0_10px_40px_-5px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto uppercase tracking-widest border-2 border-transparent hover:border-primary/20">
              Check our Portfolio (Results)
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default NetworkStats;

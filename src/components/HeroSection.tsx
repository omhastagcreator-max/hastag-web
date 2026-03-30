import { motion } from "framer-motion";
import { ArrowRight, Star, TrendingUp, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
      {/* Background Graphic Architecture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft Radial Center Glow */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-[100%] bg-primary/10 blur-[100px] opacity-70"></div>
        {/* Subtle dot pattern over top (using pure css text basically or an svg) */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="container-main relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          
          {/* Floating Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-8"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-bold text-primary tracking-wide">
              Future of AI Marketing
            </span>
          </motion.div>

          {/* Core Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-8xl font-black text-foreground tracking-tight leading-[1.1] mb-6"
          >
            Marketing Asi Karo <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">ki Brand Banjaye.</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-xl md:text-3xl font-black text-foreground uppercase tracking-widest mb-6 border border-border/50 bg-foreground/5 py-2 px-6 rounded-full inline-block"
          >
            Dhanda ROAS Pay Nahi, ROI Pay Challta Hain
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-2xl text-muted-foreground font-medium max-w-3xl mb-12"
          >
            We deploy precision-engineered Meta Ads, Google Ads, and world-class creator networks to scale your D2C brand with surgical exactness.
          </motion.p>

          {/* CTA & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a href="https://calendly.com/" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto group relative flex items-center justify-center gap-3 bg-foreground text-background px-10 py-5 rounded-full text-lg font-bold shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.4)] transition-all duration-300">
                Schedule a Call
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </a>
            
            <Link to="/portfolio" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-background border-2 border-border hover:border-foreground text-foreground px-10 py-5 rounded-full text-lg font-bold shadow-sm hover:shadow-md transition-all duration-300">
                Check our Portfolio
              </button>
            </Link>
          </motion.div>

        {/* Social Proof Strip below CTA */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 pt-10 border-t border-border/60 w-full"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                <img src="https://api.dicebear.com/7.x/initials/svg?seed=A" className="w-10 h-10 rounded-full border-2 border-background shadow-sm" alt="U" />
                <img src="https://api.dicebear.com/7.x/initials/svg?seed=B" className="w-10 h-10 rounded-full border-2 border-background shadow-sm" alt="U" />
                <img src="https://api.dicebear.com/7.x/initials/svg?seed=C" className="w-10 h-10 rounded-full border-2 border-background shadow-sm" alt="U" />
                <div className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground shadow-sm">+2k</div>
              </div>
              <div className="text-left flex flex-col">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-sm font-semibold text-foreground">1,782+ Reviews</span>
              </div>
            </div>

            <div className="w-px h-10 bg-border hidden sm:block"></div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary p-2.5 rounded-full">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-left flex flex-col">
                <span className="text-xl font-black text-foreground">11.5Cr+</span>
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Sales Generated</span>
              </div>
            </div>

            <div className="w-px h-10 bg-border hidden lg:block"></div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary p-2.5 rounded-full">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-left flex flex-col">
                <span className="text-xl font-black text-foreground">511+</span>
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Brands Scaled</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

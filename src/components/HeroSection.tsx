import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight, Star, StarHalf } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-[70vh] lg:min-h-[85vh] flex items-center px-4 sm:px-6 lg:px-8 py-10 md:py-20 pt-32 md:pt-36">
      <div className="container-main grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
        {/* Left 60% */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-3"
        >
          <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider">
            Welcome to the Future of AI Marketing
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.1] mb-5 font-extrabold">
            Marketing Asi Karo ki <span className="text-primary">Brand Banjaye</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg mb-6 max-w-xl font-medium">
            We Understand Sales Tricks. Marketing | Branding | Sales. The complete guide to build your brand and dominate your market.
          </p>

          {/* Trust Badges */}
          <div className="mb-6 flex flex-wrap gap-3 items-center">
            <a href="https://share.google/5lOHRfK7veGba5vBe" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium bg-secondary/50 border border-border px-3 py-1.5 rounded-full hover:border-[#FBBC05]/50 transition-colors">
              <div className="flex text-[#FBBC05]">
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <StarHalf size={16} className="fill-current" />
              </div>
              <span>4.5 Google Rating</span>
            </a>
            <div className="inline-flex items-center gap-2 text-sm font-medium bg-secondary/50 border border-border px-3 py-1.5 rounded-full">
               <span>💰 ₹2Cr+ Ad Spend Managed</span>
            </div>
          </div>

          {/* Value props */}
          <ul className="space-y-2.5 mb-8">
            {[
              "End-to-end Solutions: Funnel Creation, CRO & Ad Management",
              "Bespoke Landing Pages & Elite E-Commerce Stores",
              "Results-focused omnichannel approach across Meta & Google",
            ].map((prop, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <span>{prop}</span>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a href="/#audit-form">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-base font-bold shadow-[0_10px_30px_-10px_rgba(37,99,235,0.6)] flex items-center justify-center gap-2 w-full sm:w-auto text-center"
              >
                Schedule a Call <ArrowRight size={18} />
              </motion.button>
            </a>
            <a href="/services">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-card border border-border hover:border-primary text-foreground hover:text-primary px-8 py-4 rounded-full text-base font-bold transition-all shadow-sm w-full sm:w-auto text-center flex items-center justify-center"
              >
                Explore Services
              </motion.button>
            </a>
          </div>
          <div className="mt-6 text-sm text-muted-foreground flex items-center gap-1.5">
             🚀 Looking for a trial run? <Link to="/starter-plan" className="text-primary font-semibold hover:underline inline-flex items-center gap-1">View our ₹1,999 Starter Plan <ArrowRight size={14} /></Link>
          </div>
        </motion.div>

        {/* Right 40% — Service highlights */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-2 hidden lg:block"
        >
          <div className="bg-card rounded-2xl shadow-card-hover p-6 border border-border space-y-4">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">How We Do It</p>
            {[
              { title: "Bring the right people", desc: "Ads that target buyers, not just clicks" },
              { title: "Make them buy", desc: "Websites fixed for maximum conversion" },
              { title: "Increase order value", desc: "Offers that make people spend more" },
              { title: "Bring them back", desc: "Retention systems for loyal customers" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-secondary border border-border"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile service cards */}
        <div className="lg:hidden grid grid-cols-2 gap-3">
          {[
            { label: "Bring the right people", icon: "🤝" },
            { label: "Make them buy", icon: "🛒" },
            { label: "Increase order value", icon: "📈" },
            { label: "Bring them back", icon: "🔁" },
          ].map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl p-3 text-center shadow-card border border-border"
            >
              <p className="text-lg mb-1">{s.icon}</p>
              <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

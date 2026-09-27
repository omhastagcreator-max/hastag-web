import { motion } from "framer-motion";
import { Clapperboard, MousePointerClick, Laptop, CreditCard, TrendingUp, Plus, Equal } from "lucide-react";

// Same cards, icons and colours as before – reframed as the scaling equation.
const cards = [
  {
    icon: Clapperboard,
    title: "Better Creative",
    description: "Your creative is your 1st salesman — and it's the one most brands ignore.",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100 dark:bg-blue-500/20",
  },
  {
    icon: MousePointerClick,
    title: "Better Targeting",
    description: "Meta & Google Ads are your 2nd salesman: the right creative in front of the right buyer.",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-100 dark:bg-orange-500/20",
  },
  {
    icon: Laptop,
    title: "Better Landing Pages",
    description: "Anyone can build a website. We build pages engineered to sell.",
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-100 dark:bg-indigo-500/20",
  },
  {
    icon: CreditCard,
    title: "Better Conversion",
    description: "Easy payment methods and a frictionless checkout so buyers who want it can actually pay.",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100 dark:bg-blue-600/20",
  },
];

const MarketingBreakdown = () => {
  return (
    <section id="scaling" className="py-16 md:py-24 bg-background overflow-hidden relative">
      <div className="container-main max-w-[1400px]">
        <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-4 border border-primary/20">
            The Truth About Scaling
          </span>
          <h2 className="text-[2rem] leading-[1.1] md:text-5xl font-black text-foreground mb-4 tracking-tight">
            Scaling Isn't About Spending More.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-medium">
            It's about making every additional rupee of ad spend work harder.
          </p>
        </div>

        {/* Equation: Creative + Targeting + Landing Pages + Conversion = Profitable Scaling */}
        <div className="flex flex-col lg:flex-row items-stretch gap-2 lg:gap-3">
          {cards.map((card, index) => (
            <div key={card.title} className="contents">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#f8f9fc] dark:bg-muted/30 border border-border/50 rounded-2xl p-5 lg:p-6 flex lg:flex-col items-start gap-4 lg:gap-0 flex-1 hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center lg:mb-5 shrink-0 shadow-sm border border-black/5 dark:border-white/5 ${card.iconBg}`}>
                  <card.icon className={`w-6 h-6 lg:w-7 lg:h-7 ${card.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-[17px] leading-snug font-black text-foreground mb-1.5 lg:mb-3 tracking-tight">{card.title}</h3>
                  <p className="text-[14px] text-muted-foreground font-medium leading-relaxed">{card.description}</p>
                </div>
              </motion.div>
              <div className="flex items-center justify-center shrink-0 py-0.5 lg:py-0" aria-hidden="true">
                {index < cards.length - 1 ? (
                  <Plus className="w-6 h-6 text-primary" strokeWidth={3} />
                ) : (
                  <Equal className="w-7 h-7 text-primary" strokeWidth={3} />
                )}
              </div>
            </div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="bg-primary text-primary-foreground rounded-2xl p-6 flex lg:flex-col items-center lg:items-start justify-center gap-4 lg:gap-0 flex-1 shadow-2xl shadow-primary/30"
          >
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/15 flex items-center justify-center lg:mb-5 shrink-0">
              <TrendingUp className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
            </div>
            <h3 className="text-xl lg:text-2xl font-black leading-tight">Profitable Scaling</h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MarketingBreakdown;

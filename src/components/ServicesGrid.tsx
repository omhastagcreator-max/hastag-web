import { motion } from "framer-motion";
import { Layers, MousePointerClick, Zap, MessageSquare, Video, Mic } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: MousePointerClick,
    title: "D2C-Performance Marketing (Meta Ads)",
    desc: "Surgical, ROAS-driven Meta & Instagram scaling. We treat your budget like our own.",
    price: "₹ 45,750/PM",
    span: "col-span-1 md:col-span-2 lg:col-span-2",
    color: "bg-blue-50 border-blue-100 text-blue-700",
  },
  {
    icon: Zap,
    title: "Google Ads Marketing",
    desc: "Capture high-intent traffic instantly and dominate the top of search.",
    price: "₹ 32,000/PM",
    span: "col-span-1 md:col-span-1 lg:col-span-1",
    color: "bg-green-50 border-green-100 text-green-700",
  },
  {
    icon: Layers,
    title: "Website Development",
    desc: "Lightning-fast, strictly CRO-optimized Shopify and custom-built E-com stores.",
    price: "Custom",
    span: "col-span-1 md:col-span-1 lg:col-span-1",
    color: "bg-purple-50 border-purple-100 text-purple-700",
  },
  {
    icon: MessageSquare,
    title: "Influencer Marketing",
    desc: "Deploy our 20,000+ influencer network. End-to-end execution.",
    price: "Custom",
    span: "col-span-1 md:col-span-2 lg:col-span-2",
    color: "bg-orange-50 border-orange-100 text-orange-700",
  },
  {
    icon: Video,
    title: "UGC Video Creation",
    desc: "Top-converting, raw TikTok & Reel style content specifically engineered to sell.",
    price: "₹ 6,000",
    span: "col-span-1 md:col-span-2 lg:col-span-2",
    color: "bg-rose-50 border-rose-100 text-rose-700",
  },
  {
    icon: Mic,
    title: "Podcast Branding",
    desc: "In-video brand placements with top-tier podcasters.",
    price: "Custom",
    color: "bg-indigo-50 border-indigo-100 text-indigo-700",
  },
];

const ServicesGrid = () => {
  return (
    <section className="py-24 bg-secondary/50 relative overflow-hidden" id="services">
      <div className="container-main">
        <div className="max-w-3xl mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Our Arsenal</span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 tracking-tight">
            Comprehensive Growth Infrastructure.
          </h2>
          <p className="text-lg text-muted-foreground font-medium">
            We don't offer generic templates. We offer weaponized services engineered to solve exact D2C pain points.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`group flex flex-col bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-card-hover transition-all duration-300 relative overflow-hidden`}
            >
              <div className="flex-1 z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-sm ${service.color}`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 leading-tight tracking-tight">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-6">
                  {service.desc}
                </p>
              </div>

              <div className="z-10 mt-auto flex flex-col gap-3">
                <div className="mb-2">
                  <span className="bg-background border border-border px-3 py-1 rounded-full text-xs font-black shadow-sm tracking-wide">
                    {service.price}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-primary/10 hover:bg-primary text-primary hover:text-white py-2 rounded-lg text-xs font-bold transition-colors border border-primary/20 hover:border-primary">
                    Buy Now
                  </button>
                  <a href="https://calendly.com/domsco-tech/30min?month=2026-03" target="_blank" rel="noreferrer" className="block w-full">
                    <button className="w-full bg-foreground hover:bg-foreground/90 text-background py-2 rounded-lg text-xs font-bold transition-colors">
                      Schedule
                    </button>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;

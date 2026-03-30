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
    desc: "In-video brand placements with India's absolute top-tier podcasters.",
    price: "Custom",
    span: "col-span-1 md:col-span-1 lg:col-span-1",
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

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 auto-rows-[280px]">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`group relative flex flex-col justify-between bg-card rounded-3xl p-8 border border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${service.span}`}
            >
              {/* Decorative Subtle Background */}
              <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-[60px] opacity-40 transition-opacity group-hover:opacity-70 ${service.color.split(' ')[0]}`}></div>

              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${service.color}`}>
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-3 leading-tight tracking-tight">
                  {service.title}
                </h3>
                <p className="text-muted-foreground font-medium text-[15px] leading-relaxed max-w-sm">
                  {service.desc}
                </p>
              </div>

              <div className="relative z-10 mt-8 flex items-center justify-between">
                <span className="bg-background border border-border px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
                  {service.price}
                </span>
                <a href="/#audit-form" className="text-primary font-bold hover:underline flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 transform duration-300">
                  Schedule Call &rarr;
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;

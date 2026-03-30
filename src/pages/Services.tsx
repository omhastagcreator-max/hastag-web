import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Facebook, Search, BarChart3, Layout, Globe, ShoppingBag, Check } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Facebook, title: "Meta Ads Management", desc: "We create and manage high-performing Facebook & Instagram ad campaigns that drive real revenue.",
    includes: ["Campaign strategy & setup", "Ad creative direction", "Audience research & targeting", "A/B testing & optimization", "Weekly performance reports"],
  },
  {
    icon: Search, title: "Google Ads Management", desc: "Search, Display, Shopping & YouTube ads managed by certified specialists to maximize your ROI.",
    includes: ["Keyword research & planning", "Ad copy & extensions", "Bid strategy optimization", "Negative keyword management", "Conversion tracking setup"],
  },
  {
    icon: BarChart3, title: "Conversion Rate Optimization", desc: "We analyze your funnel and fix what's broken so more visitors turn into customers.",
    includes: ["Funnel analysis & audit", "Heatmap & session recording review", "A/B & multivariate testing", "Landing page optimization", "Checkout flow improvements"],
  },
  {
    icon: Layout, title: "Landing Page Design", desc: "High-converting landing pages designed to capture leads and drive sales from your ad traffic.",
    includes: ["Custom design & copy", "Mobile-first responsive", "Fast loading optimization", "Form & CTA optimization", "Analytics integration"],
  },
  {
    icon: Globe, title: "Web Design & WordPress", desc: "Full custom websites built on WordPress that look stunning and convert visitors into customers.",
    includes: ["Custom theme development", "SEO-optimized structure", "Speed & performance tuning", "Content management training", "Ongoing maintenance"],
  },
  {
    icon: ShoppingBag, title: "Shopify Development", desc: "eCommerce stores built on Shopify that are designed to sell more and scale faster.",
    includes: ["Store setup & configuration", "Custom theme design", "Product page optimization", "Payment & shipping setup", "App integrations"],
  },
];

const steps = [
  { step: "01", title: "Free Audit", desc: "We analyze your current marketing and identify opportunities." },
  { step: "02", title: "Research", desc: "Deep dive into your market, competitors, and audience." },
  { step: "03", title: "Launch", desc: "We build and launch your campaigns with precision." },
  { step: "04", title: "Scale", desc: "We optimize, scale what works, and grow your revenue." },
];

const pricing = [
  { name: "Landing Page", price: "₹8,000", period: " onwards", features: ["Landing page development", "CRO optimisation", "Funnel creation", "Content creation"], popular: false },
  { name: "E-com Store", price: "₹15,000", period: " onwards", features: ["Full e-com store development", "CRO optimisation", "Funnel creation", "Content creation"], popular: false },
  { name: "Meta Ads + Web", price: "₹20,000", period: "/mo", features: ["Meta ads management", "Website management", "CRO optimisation", "Funnel creation", "Content creation"], popular: true },
  { name: "Omnichannel", price: "₹25,000", period: "/mo", features: ["Meta ads + Google ads", "Website management", "CRO optimisation", "Funnel creation", "Content creation"], popular: false },
];

const Services = () => (
  <>
    <Navbar />
    <main className="pt-16">
      {/* Hero */}
      <section className="section-padding bg-secondary">
        <div className="container-main text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary text-xs font-semibold uppercase tracking-wider">Top Performance Marketing Agency</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl mt-4 mb-6">Digital Marketing Services</motion.h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">End-to-end performance marketing solutions to help your business attract, convert, and retain customers at scale using elite Meta & Google Ads strategies.</p>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="section-padding">
        <div className="container-main space-y-20">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <s.icon className="text-primary mb-4" size={36} />
                <h2 className="text-2xl md:text-3xl mb-4">{s.title}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">{s.desc}</p>
                <ul className="space-y-2">
                  {s.includes.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <Check size={16} className="text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`bg-secondary rounded-2xl p-12 flex items-center justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <s.icon size={120} className="text-primary/20" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-secondary">
        <div className="container-main">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl text-center mb-12">Our Process</motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <span className="text-5xl font-display font-bold text-primary/20">{s.step}</span>
                <h3 className="text-lg mt-2 mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding">
        <div className="container-main">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl text-center mb-4">Transparent Pricing</motion.h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">Simple, honest pricing. No hidden fees. No long-term contracts.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto xl:px-4">
            {pricing.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-8 ${p.popular ? "bg-charcoal text-charcoal-foreground shadow-xl scale-105" : "bg-card shadow-card border border-border"}`}
              >
                {p.popular && <span className="text-xs font-semibold text-primary uppercase tracking-wider">Most Popular</span>}
                <h3 className={`text-xl mt-2 ${p.popular ? "text-charcoal-foreground" : ""}`}>{p.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-3xl xl:text-4xl font-display font-bold">{p.price}</span>
                  <span className={`text-sm ${p.popular ? "text-charcoal-foreground/60" : "text-muted-foreground"}`}>{p.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f, j) => (
                    <li key={j} className={`flex items-center gap-2 text-sm ${p.popular ? "text-charcoal-foreground/80" : "text-muted-foreground"}`}>
                      <Check size={14} className="text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/#audit-form">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full py-3 rounded-full text-sm font-semibold ${p.popular ? "bg-gradient-to-r from-primary to-[hsl(0,100%,63%)] text-primary-foreground" : "border border-border hover:border-primary hover:text-primary transition-colors"}`}
                  >
                    Get Started
                  </motion.button>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Services;

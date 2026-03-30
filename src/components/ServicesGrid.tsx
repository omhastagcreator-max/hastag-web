import { motion } from "framer-motion";
import { Facebook, Search, BarChart3, Layout, Globe, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Search,
    title: "Meta & Google Ads",
    desc: "Bleeding money on ads with no ROAS? We rebuild your entire campaign structure — creatives, audiences, funnel — to make every rupee work harder.",
    deliverables: ["Targeting high-intent buyers", "Stopping wasteful ad spend"],
    useCase: "The Engine",
    color: "border-l-primary",
    popular: true,
  },
  {
    icon: Layout,
    title: "Landing Page Optimization",
    desc: "Traffic bouncing instead of buying? We fix your landing page speed, layout, and copy so your hard-earned clicks actually convert.",
    deliverables: ["Conversion rate optimization", "Frictionless checkout"],
    useCase: "The Foundation",
    color: "border-l-[hsl(210,80%,50%)]",
    popular: true,
  },
  {
    icon: ShoppingBag,
    title: "Offer & AOV Strategy",
    desc: "Getting sales but no margins? We construct irresistible bundles, upsells, and pricing strategies so each buyer spends more money.",
    deliverables: ["Strategic bundling", "Smart upsell mapping"],
    useCase: "The Multiplier",
    color: "border-l-[hsl(145,60%,40%)]",
  },
  {
    icon: BarChart3,
    title: "Retention & Reactivation",
    desc: "Customers buying once and vanishing? We build remarketing and loyalty flows to ensure they keep returning to buy more.",
    deliverables: ["Email & SMS flows", "Loyalty loops"],
    useCase: "The Profit Center",
    color: "border-l-[hsl(35,90%,50%)]",
  },
];

const ServicesGrid = () => (
  <section className="section-padding bg-secondary">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl mb-3">We fix the 4 things that actually make you money:</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            No vanity metrics. Just a proven 4-step framework to maximize your return on investment.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -3, scale: 1.01 }}
            className={`relative bg-card rounded-2xl p-6 shadow-card border-l-4 ${s.color} hover:shadow-card-hover transition-all group cursor-pointer`}
          >
            {s.popular && (
              <span className="absolute top-4 right-4 bg-primary/10 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </span>
            )}
            <s.icon className="text-primary mb-3 group-hover:scale-110 transition-transform" size={26} />
            <h3 className="text-base font-bold mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{s.desc}</p>
            <ul className="space-y-1.5 mb-3">
              {s.deliverables.map((d, j) => (
                <li key={j} className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
            <p className="text-[10px] text-muted-foreground/70 uppercase tracking-wider mb-3">{s.useCase}</p>
            <Link
              to="/services"
              className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1"
            >
              Learn more →
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
      >
        <a href="/#audit-form">
          <button className="bg-primary text-white border-2 border-primary hover:bg-transparent hover:text-primary px-8 py-4 rounded-full text-base font-bold shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center mx-auto">
            Let's Fix Your Growth Pillars
          </button>
        </a>
      </motion.div>
    </div>
  </section>
);

export default ServicesGrid;

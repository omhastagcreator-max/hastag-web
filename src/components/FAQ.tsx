import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "How is your pricing structured?",
    a: "Fixed monthly retainer based on service scope and ad spend management. No percentage of spend, no hidden costs. We offer Starter (₹50,000/$3K), Growth (₹1,50,000/$7K), and custom Enterprise plans.",
  },
  {
    q: "What results can I realistically expect?",
    a: "Results depend on your product, market, and starting point. We focus on measurable KPIs from day one — ROAS, CPA, conversion rates. We set clear benchmarks in Week 1 and track progress weekly with full transparency.",
  },
  {
    q: "How long does it take to see results?",
    a: "Quick wins (audience refinement, creative optimization) appear within 2-4 weeks. Meaningful improvements in ROAS and CPA typically show by week 8-12 as we gather enough data to optimize effectively.",
  },
  {
    q: "Do you guarantee results?",
    a: "We guarantee effort, transparency, and a structured process. We can't guarantee specific numbers (anyone who does is lying), but we commit to data-driven optimization and weekly reporting so you always know where things stand.",
  },
  {
    q: "Do you work with businesses outside India?",
    a: "Yes. We're India-based but work with clients globally. We understand regional nuances in targeting, creative, and compliance across markets.",
  },
  {
    q: "What platforms do you advertise on?",
    a: "We specialize in Meta (Facebook & Instagram) and Google (Search, Display, YouTube, Shopping). We can also manage LinkedIn ads for B2B use cases.",
  },
  {
    q: "Why not percentage of ad spend?",
    a: "Percentage-based pricing creates a conflict of interest — the agency earns more by spending more, not by performing better. Our fixed retainer aligns us with your goal: maximum ROI, not maximum spend.",
  },
  {
    q: "What if I want to pause?",
    a: "No long-term contracts required. We work on a month-to-month basis. You stay because of results, not lock-ins.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-padding bg-secondary">
      <div className="container-main max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl text-center mb-10"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="space-y-2.5">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="bg-card rounded-xl shadow-card overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-sm pr-4">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-muted-foreground transition-transform flex-shrink-0 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

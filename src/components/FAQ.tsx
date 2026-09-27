import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

// Answers are based only on what the site already states (services, pricing cards,
// timelines, markets). No guarantees are made.
const faqs = [
  {
    q: "Who do you work with?",
    a: "D2C and e-commerce brands that are already selling online and want to grow revenue profitably — improve ROAS, scale Meta Ads, lift conversion rate or fix their funnel. If you're earlier than that, we can also build your landing page or e-com store first.",
  },
  {
    q: "How much should I be spending on Ads?",
    a: "There's no single right number — it depends on your margins, AOV and how well your funnel converts today. That's exactly what the free audit looks at: whether your funnel is ready for more budget, or whether fixing creative, landing page or conversion first will make every rupee work harder. Your ad budget is separate from our fee and goes to the ad platforms.",
  },
  {
    q: "Do you manage Meta Ads?",
    a: "Yes. Meta (Facebook & Instagram) Ads is our core channel. Our Omnichannel plan adds Google Ads (Search, Display, YouTube, Shopping).",
  },
  {
    q: "Do you create ad creatives?",
    a: "Yes. Content creation is included in our plans, and we build UGC and influencer creatives around your winning angles using our creator network.",
  },
  {
    q: "Can you improve our website/landing page?",
    a: "Yes. We build and optimise landing pages and full e-commerce stores (including Shopify) with CRO built in — speed, trust, offer clarity and a frictionless checkout.",
  },
  {
    q: "How do you measure performance?",
    a: "Against business outcomes, not vanity metrics — ROAS, CAC/CPA, conversion rate and AOV. We set clear benchmarks in the first week and track progress weekly with full transparency.",
  },
  {
    q: "How long does it take to see improvements?",
    a: "Quick wins (audience refinement, creative optimisation) typically appear within 2–4 weeks. Meaningful improvements in ROAS and CPA usually show by week 8–12, once there's enough data to optimise. Results depend on your product, market and starting point, so we don't promise specific numbers.",
  },
  {
    q: "What does your engagement cost?",
    a: "The audit is free. Plans start at ₹8,000 for a landing page and ₹15,000 for a full e-com store; ongoing Meta Ads + website management is ₹20,000/month, and Meta + Google (Omnichannel) is ₹25,000/month (see the plans above). Ad spend is separate. We'll recommend the right scope after the audit.",
  },
  {
    q: "Do you work with brands outside India?",
    a: "Yes. We're India-based but work with clients globally and understand regional differences in targeting, creative and compliance.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding bg-secondary">
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
                className="w-full flex items-center justify-between p-5 text-left min-h-[56px]"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-sm md:text-base pr-4">{faq.q}</span>
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

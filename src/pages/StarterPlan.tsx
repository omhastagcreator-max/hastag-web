import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Star, StarHalf, CheckCircle2, ArrowRight, XCircle, ShieldCheck, Building2, FileText } from "lucide-react";
import CaseStudySnapshot from "@/components/CaseStudySnapshot";
import GoogleReviews from "@/components/GoogleReviews";

declare const fbq: any;

const StarterPlan = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentLink = "https://payments.cashfree.com/forms/hastagcreator-growth-starter-plan-99";
  const whatsappLink = "https://wa.me/919450010826?text=Hi!%20I%20have%20a%20doubt%20about%20the%20Starter%20Plan.";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 lg:pt-32">
        {/* 1. HERO SECTION */}
        <section className="section-padding bg-gradient-to-b from-primary/5 to-background text-center relative overflow-hidden">
          <div className="container-main max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs tracking-wider uppercase font-semibold mb-6">
                For New D2C Brands & Store Owners
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1]">
                Running Ads But Not Getting Sales? Let's Fix Your Foundation.
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto font-medium">
                30-day setup, launch, audit + roadmap. <span className="text-foreground font-bold">₹1,999.</span>
              </p>
              
              <div className="bg-primary/10 border border-primary/20 text-foreground px-4 py-3 md:px-6 md:py-3 rounded-2xl md:rounded-full inline-flex flex-col sm:flex-row items-center font-semibold text-sm md:text-base mb-8 shadow-sm">
                Secure your spot with ₹1,999. If your brand doesn't qualify after our manual review, we refund you 100% immediately. No questions asked.
              </div>

              <div className="mb-10">
                <a href="https://share.google/5lOHRfK7veGba5vBe" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium bg-secondary/80 border border-border px-4 py-2 rounded-full hover:border-[#FBBC05]/50 transition-colors">
                  <div className="flex text-[#FBBC05]">
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <StarHalf size={16} className="fill-current" />
                  </div>
                  <span>4.5 Google Rating</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. PAIN AMPLIFICATION */}
        <section className="pb-16 bg-background">
          <div className="container-main max-w-4xl">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                "Ads are working, but margins are dead low.",
                "Website traffic bounces instead of buying.",
                "Customers buy once and never come back."
              ].map((text, i) => (
                <div key={i} className="flex flex-col gap-3 p-6 bg-card rounded-2xl border border-border hover:shadow-md transition-shadow text-center items-center">
                  <XCircle className="w-8 h-8 text-primary/70" />
                  <p className="text-lg text-foreground font-semibold">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. WHAT YOU GET (DELIVERABLES) */}
        <section className="section-padding bg-card border-y border-border">
          <div className="container-main max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What You Get in 30 Days</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "Flawless Tracking Setup", desc: "Pixel installation, standard events setup, conversions API check, and campaign structure build — done correctly so your data is clean from day one." },
                { title: "High-Intent Campaign Launch", desc: "We build and launch a campaign targeting people who actually buy, not just click." },
                { title: "30-Point CRO Audit & Optimization", desc: "We don't just run ads—we fix the leaks. We meticulously audit your website against 30 proven conversion pillars, and we actively implement immediate layout & copy fixes so your traffic actually converts into revenue." },
                { title: "30-Day Scaling Roadmap", desc: "A clear, actionable document detailing exactly what to do next to scale past your current plateau." }
              ].map((item, i) => (
                <div key={i} className="bg-background p-5 md:p-8 rounded-2xl border border-border hover:border-primary/50 transition-all shadow-sm">
                  <CheckCircle2 className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg md:text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. MARKET VALUE ANCHOR TABLE & CTA */}
        <section className="section-padding bg-background">
          <div className="container-main max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-8">The Real Market Value vs. Our Offer</h2>
            
            <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-lg mb-10">
              <div className="divide-y divide-border">
                <div className="grid grid-cols-2 p-3 sm:p-5 bg-muted/50">
                  <div className="font-semibold text-xs sm:text-sm uppercase text-muted-foreground">Service</div>
                  <div className="font-semibold text-xs sm:text-sm uppercase text-right text-muted-foreground">Market Rate</div>
                </div>
                {[
                  { label: "Pixel & API Setup by a Freelancer", price: "₹2,000 – ₹5,000" },
                  { label: "Initial Campaign Launch (Agency)", price: "₹10,000 – ₹20,000" },
                  { label: "30-Point CRO Optimization & Fixes", price: "₹5,000 – ₹15,000" },
                  { label: "30-Day Scaling Roadmap", price: "₹3,000 – ₹8,000" },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-2 p-3 sm:p-5 items-center">
                    <div className="font-medium text-sm sm:text-base">{row.label}</div>
                    <div className="text-right text-sm sm:text-base text-muted-foreground">{row.price}</div>
                  </div>
                ))}
                <div className="grid grid-cols-2 p-4 sm:p-5 bg-red-50/50">
                  <div className="font-bold text-base sm:text-lg text-red-800">Total Market Value</div>
                  <div className="font-bold text-base sm:text-lg text-right text-red-800 line-through">₹20,000+</div>
                </div>
                <div className="grid grid-cols-2 p-4 sm:p-6 bg-primary/10 border-t-2 border-primary">
                  <div className="font-extrabold text-xl sm:text-2xl text-primary">HastagCreator Starter Plan</div>
                  <div className="font-extrabold text-2xl sm:text-3xl text-right text-primary">₹1,999</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <a
                href={paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (typeof fbq !== "undefined") {
                    fbq('track', 'InitiateCheckout');
                  }
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-6 py-4 md:px-10 md:py-5 bg-primary text-white text-base md:text-xl font-bold rounded-2xl md:rounded-full shadow-xl hover:shadow-primary/50 transition-all inline-flex items-center justify-center gap-2 mb-6"
                >
                  <span className="truncate">Apply for the Starter Plan — ₹1,999</span> <ArrowRight className="w-5 h-5 flex-shrink-0" />
                </motion.button>
              </a>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-muted-foreground mb-8">
                <span className="flex items-center gap-1 bg-secondary/30 px-3 py-1.5 rounded-md"><ShieldCheck className="w-4 h-4 text-green-600"/> Secured by Cashfree</span>
                <span className="flex items-center gap-1 bg-secondary/30 px-3 py-1.5 rounded-md"><Building2 className="w-4 h-4 text-primary"/> MSME Registered</span>
                <span className="flex items-center gap-1 bg-secondary/30 px-3 py-1.5 rounded-md"><FileText className="w-4 h-4 text-primary"/> GSTIN Verified</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. HOW IT WORKS (THE PROCESS) */}
        <section className="section-padding bg-muted/30 border-y border-border">
          <div className="container-main max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How The Application Works</h2>
            <div className="grid sm:grid-cols-4 gap-6 relative">
              <div className="hidden sm:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-border z-0"></div>
              
              {[
                { step: "1", title: "Apply & Pay", desc: "Submit ₹1,999 to secure your spot. We only take 5 fresh brands per month." },
                { step: "2", title: "Manual Review", desc: "If we don't think we can help you scale, we refund you immediately. No questions asked." },
                { step: "3", title: "Setup & Audit", desc: "We gain access, audit your site, and build your initial campaign infrastructure." },
                { step: "4", title: "Go Live", desc: " campaigns go live. You receive your 30-day scaling roadmap." }
              ].map((item, i) => (
                <div key={i} className="relative z-10 bg-card p-6 rounded-2xl border border-border shadow-md text-center">
                  <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 border-4 border-background shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="font-bold mb-3 text-lg">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. PROOF & AUTHORITY */}
        <CaseStudySnapshot />
        <GoogleReviews />

        {/* 7. QUALIFICATION (IS THIS FOR YOU?) */}
        <section className="section-padding bg-background">
          <div className="container-main max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Is This Right For You?</h2>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-card p-8 xl:p-10 rounded-3xl border border-border shadow-sm relative overflow-hidden group hover:border-primary/30 transition-colors">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <CheckCircle2 className="text-primary text-xl" /> PERFECT FOR:
                </h3>
                <ul className="space-y-4">
                  {[
                    "New D2C brands taking their first step in paid ads",
                    "Store owners testing the waters before committing to ₹20k+ retainers",
                    "Founders whose initial ad attempts failed to bring sales",
                    "Brands spending less than ₹60,000/month on ads"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-foreground font-medium items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card p-8 xl:p-10 rounded-3xl border border-border shadow-sm relative overflow-hidden group hover:border-primary/30 transition-colors">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <XCircle className="text-muted-foreground text-xl" /> NOT FOR:
                </h3>
                <ul className="space-y-4">
                  {[
                    "Established brands expecting full daily campaign management",
                    "Founders who expect a 10x guaranteed ROAS overnight",
                    "Brands already spending lakhs per month",
                    "People who aren't willing to fix their website based on our audit"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-foreground font-medium items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2.5 flex-shrink-0"></div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 8. FAQ */}
        <section className="section-padding bg-muted/30 border-t border-border">
          <div className="container-main max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { 
                  q: "Why start with the ₹1,999 Foundation Plan instead of a full retainer?", 
                  a: "We believe in earning our keep. Before asking for a monthly retainer, we prove our worth by fixing your core funnel, running a high-intent campaign, and delivering a clear roadmap. It's a low-risk way for you to experience exactly what we bring to the table." 
                },
                { 
                  q: "Will this guarantee sales?", 
                  a: "No honest marketer can guarantee sales. We guarantee your pixel is correctly firing, campaigns are structured properly, and you'll know exactly why visitors aren't buying." 
                },
                {
                  q: "What happens after 30 days?",
                  a: "You can upgrade to our advanced plan or walk away with your newly built foundation and roadmap. No calls, no pressure, no surprise invoices."
                },
                { 
                  q: "What if my application gets rejected?", 
                  a: "If we don't believe we can genuinely help you based on your product/site, we'll refund you immediately and point you toward free resources that will help instead." 
                }
              ].map((faq, i) => (
                <div key={i} className="bg-card p-5 md:p-6 rounded-2xl border border-border shadow-sm">
                  <h3 className="font-bold text-base md:text-lg mb-2">{faq.q}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. FINAL CTA */}
        <div className="bg-gradient-to-br from-primary/10 to-background border-t border-primary/20 pb-24">
          <div className="py-20 text-center container-main">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Stop guessing. Build your foundation.</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-xl">
              Secure your spot today for ₹1,999.
            </p>
            <a
              href={paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof fbq !== "undefined") {
                  fbq('track', 'InitiateCheckout');
                }
              }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 py-4 md:px-10 md:py-5 bg-primary text-white text-base md:text-xl font-bold rounded-2xl md:rounded-full shadow-xl hover:shadow-primary/50 transition-all inline-flex items-center justify-center gap-2 mb-8"
              >
                Apply Now <ArrowRight className="w-5 h-5 flex-shrink-0" />
              </motion.button>
            </a>

            <div className="flex justify-center mt-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/50 text-foreground border border-border text-base font-semibold rounded-full hover:bg-secondary transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#25D366" stroke="none">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Questions? Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      {/* Sticky Bottom CTA Banner for Mobile & Desktop */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] z-[100] flex justify-center items-center">
        <div className="container-main max-w-4xl flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="font-bold text-lg">Starter Growth Plan</p>
            <p className="text-sm text-muted-foreground">₹1,999 One-time. No commitment.</p>
          </div>
          <a href={paymentLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 py-3 bg-primary text-white font-bold rounded-full shadow-lg hover:shadow-primary/50 transition-all text-sm sm:text-base flex items-center justify-center gap-2"
            >
              Apply For The Plan <ArrowRight className="w-4 h-4" />
            </motion.button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StarterPlan;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesGrid from "@/components/ServicesGrid";
import { useEffect } from "react";
import { ArrowRight, Code2, LineChart, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function WebDevelopment() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "CRO-Optimized Website Development | HastagCreator";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
       metaDesc.setAttribute("content", "A 5th grader can build a website. We build conversion machines. Get high-velocity, CRO-optimized E-Commerce and Landing Pages engineered to sell.");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col pt-20 bg-background">
      <Navbar />
      
      <main className="flex-1 overflow-hidden">
        {/* Deep Psychological Hero Section */}
        <div className="relative pt-20 pb-24 md:pt-32 md:pb-32 border-b border-border/50">
           <div className="absolute inset-0 bg-secondary/20 pointer-events-none"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
           
           <div className="container-main px-4 relative z-10 max-w-5xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-8 border border-primary/20">
                 <Code2 className="w-4 h-4" /> Destination Engineering
              </span>
              
              <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-black tracking-tighter mb-8 leading-[1.05] text-foreground">
                 A 5th grader can build a website. <br className="hidden md:block" />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">We build Conversion Systems.</span>
              </h1>
              
              <p className="text-lg md:text-2xl text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed mb-12">
                 Driving traffic is only <strong className="text-foreground">50% of the battle.</strong> If your website isn't engineered around consumer psychology, heatmaps, and frictionless checkouts, you are violently burning your ad budget.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <a href="https://calendly.com/domsco-tech/30min?month=2026-03" target="_blank" rel="noreferrer">
                   <button className="w-full sm:w-auto bg-foreground text-background px-8 py-5 rounded-full text-lg font-bold shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                     Get a Free UX Audit <ArrowRight className="w-5 h-5" />
                   </button>
                 </a>
              </div>
           </div>
        </div>

        {/* The Logic Section */}
        <div className="py-24 bg-background">
           <div className="container-main px-4 max-w-6xl">
              <div className="grid md:grid-cols-3 gap-8">
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card p-8 rounded-3xl border border-border">
                    <div className="w-14 h-14 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                       <LineChart className="w-8 h-8 rotate-180" />
                    </div>
                    <h3 className="text-2xl font-black mb-3">The Bounce Rate Trap</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">Cheap websites load in 4 seconds. By second 3, 53% of mobile users have already left. We engineer sub-second load times.</p>
                 </motion.div>
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-card p-8 rounded-3xl border border-border">
                    <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
                       <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black mb-3">Trust Anchoring</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">Lack of social proof and poor payment architecture kills carts. We build subconscious trust from the exact second they land.</p>
                 </motion.div>
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-card p-8 rounded-3xl border border-border">
                    <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                       <Code2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black mb-3">Conversion UI/UX</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">We don't pick pretty colors. We map user journeys using exact heatmaps to guide the mouse directly to the 'Buy Now' button.</p>
                 </motion.div>
              </div>
           </div>
        </div>

        {/* Attached Services via dynamic Prop */}
        <ServicesGrid 
           filterKeyword="web" 
           title="Our Development Packages" 
           subtitle="From high-velocity single landing pages to complete Shopify E-Commerce overhauls." 
        />

      </main>
      <Footer />
    </div>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesGrid from "@/components/ServicesGrid";
import { useEffect } from "react";
import { ArrowRight, Target, Activity, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function PerformanceMarketing() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Performance Marketing & ROAS Scaling | HastagCreator";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
       metaDesc.setAttribute("content", "Data-driven scaling, not vanity metrics. We are ruthless ROAS engineers deploying Meta Ads, Google Ads, and predictive modeling for D2C brands.");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col pt-20 bg-background">
      <Navbar />
      
      <main className="flex-1 overflow-hidden">
        {/* Deep Psychological Hero Section */}
        <div className="relative pt-20 pb-24 md:pt-32 md:pb-32 border-b border-border/50">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.1),transparent_50%)] pointer-events-none"></div>
           
           <div className="container-main px-4 relative z-10 max-w-5xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-8 border border-primary/20">
                 <Target className="w-4 h-4" /> Data-Driven Scaling
              </span>
              
              <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-black tracking-tighter mb-8 leading-[1.05] text-foreground">
                 Stop paying for followers. <br className="hidden md:block" />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Start paying for Revenue.</span>
              </h1>
              
              <p className="text-lg md:text-2xl text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed mb-12">
                 We are not a traditional marketing agency. We do not care about "vanity metrics" or "brand awareness" if it doesn't print cash. We are ruthless ROAS engineers deploying mathematical precision across <strong className="text-foreground">Meta & Google.</strong>
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <a href="https://calendly.com/domsco-tech/30min?month=2026-03" target="_blank" rel="noreferrer">
                   <button className="w-full sm:w-auto bg-foreground text-background px-8 py-5 rounded-full text-lg font-bold shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                     Get a Free Ad Account Audit <ArrowRight className="w-5 h-5" />
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
                       <Zap className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black mb-3">Aggressive Testing</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">We launch 50+ creative angles a month. The winners get scaled violently. The losers are killed in 24 hours to protect your capital.</p>
                 </motion.div>
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-card p-8 rounded-3xl border border-border">
                    <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
                       <Target className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black mb-3">Platform AI Mastery</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">We feed Meta and Google's machine learning algorithms exactly the conversion data they need to hunt down your highest LTV buyers.</p>
                 </motion.div>
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-card p-8 rounded-3xl border border-border">
                    <div className="w-14 h-14 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center mb-6">
                       <Activity className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black mb-3">Profit-Margin Tracking</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">We track everything back to contribution margin. If an ad campaign isn't mathematically profitable post-COGS, it's irrelevant.</p>
                 </motion.div>
              </div>
           </div>
        </div>

        {/* Attached Services via dynamic Prop */}
        <ServicesGrid 
           filterKeyword="ad" 
           title="Our Performance Infrastructure" 
           subtitle="Surgical Media Buying capabilities across the world's most profitable networks." 
        />

      </main>
      <Footer />
    </div>
  );
}

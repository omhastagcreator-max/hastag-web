import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesGrid from "@/components/ServicesGrid";
import CaseStudySnapshot from "@/components/CaseStudySnapshot";
import NetworkStats from "@/components/NetworkStats";
import { useEffect } from "react";
import { ArrowRight, Target, Activity, Zap, TrendingUp, RefreshCw, Crosshair, Coins, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";
import { useBooking } from "@/components/BookingProvider";

export default function PerformanceMarketing() {
  const { openBooking } = useBooking();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Performance Marketing & ROAS Scaling | HastagCreator";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
       metaDesc.setAttribute("content", "Data-driven scaling. We act as ruthless ROAS engineers deploying Meta & Google Ads for D2C brands.");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col pt-20 bg-background">
      <Navbar />
      
      <main className="flex-1 overflow-hidden">
        {/* Deep Psychological Hero Section */}
        <div className="relative pt-20 pb-20 md:pt-32 md:pb-24 border-b border-border/50">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.1),transparent_50%)] pointer-events-none"></div>
           
           <div className="container-main px-4 relative z-10 max-w-5xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-8 border border-primary/20">
                 <Target className="w-4 h-4" /> Revenue Over Reach
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] font-black tracking-tighter mb-6 leading-[1.05] text-foreground">
                 Stop paying for likes. <br className="hidden md:block" />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Scale your Revenue.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed mb-10">
                 We hate vanity metrics. We only operate on net-profit mathematical formulas across <strong className="text-foreground">Meta & Google.</strong>
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <button 
                   onClick={openBooking}
                   className="w-full sm:w-auto bg-foreground text-background px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                 >
                   Free Ad Audit <ArrowRight className="w-5 h-5" />
                 </button>
              </div>
           </div>
        </div>

        {/* Action-Oriented Logic Section */}
        <div className="py-20 bg-background border-b border-border/50">
           <div className="container-main px-4 max-w-6xl">
              <div className="grid md:grid-cols-3 gap-6">
                 <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-card p-6 rounded-3xl border border-border flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-4">
                       <Zap className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-black mb-2">Test Fast. Kill Fast.</h3>
                    <p className="text-sm text-muted-foreground font-medium">Launch 50+ ads. Kill losers in 24 hours. Scale the winners.</p>
                 </motion.div>
                 
                 <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-card p-6 rounded-3xl border border-border flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mb-4">
                       <BrainCircuit className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-black mb-2">AI Tracking</h3>
                    <p className="text-sm text-muted-foreground font-medium">Feed deep pixel data to Meta. Algorithm hunts high-paying buyers.</p>
                 </motion.div>
                 
                 <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-card p-6 rounded-3xl border border-border flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-4">
                       <Coins className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-black mb-2">Net Margin First</h3>
                    <p className="text-sm text-muted-foreground font-medium">Zero spend without calculating your actual bank profit margins.</p>
                 </motion.div>
              </div>
           </div>
        </div>

        {/* The Simple Economics View */}
        <div className="py-20 bg-secondary/20">
           <div className="container-main px-4 max-w-4xl text-center flex flex-col items-center">
              <span className="text-emerald-500 font-black tracking-widest uppercase text-xs mb-4">Unit Economics</span>
              <h2 className="text-3xl md:text-5xl font-black mb-10 tracking-tight">The Winning Formula</h2>
              
              <div className="w-full bg-card p-6 md:p-10 rounded-3xl border border-border/50 shadow-2xl flex flex-col gap-6">
                 <div className="flex items-center justify-between border-b border-border/50 pb-4">
                    <div className="flex items-center gap-3">
                      <Crosshair className="w-5 h-5 text-red-400" />
                      <span className="text-muted-foreground font-bold">Standard Agency</span>
                    </div>
                    <span className="text-red-400 font-black">"Likes & Views"</span>
                 </div>
                 
                 <div className="flex items-center justify-between border-b border-border/50 pb-4">
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-emerald-400" />
                      <span className="text-foreground font-bold">HastagCreator Focus</span>
                    </div>
                    <span className="text-emerald-500 font-black text-xl">Profit</span>
                 </div>
                 
                 <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 mt-2">
                    <p className="text-xs font-black mb-3 text-primary uppercase tracking-widest">Our Math:</p>
                    <p className="text-lg md:text-2xl font-black tracking-tight text-foreground">
                       (LTV + AOV) &gt; (Ad Cost + Product Cost)
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Real Results/Proof - Injecting CaseStudySnapshot */}
        <div className="border-y border-border/50 bg-background py-10">
           <h2 className="text-center text-3xl font-black mb-4">Our Real Results</h2>
           <CaseStudySnapshot />
        </div>

        {/* Injecting Network Stats inside Performance Context */}
        <NetworkStats />

        {/* Attached Services via dynamic Prop */}
        <ServicesGrid 
           filterKeyword="ad" 
           title="Media Buying Network" 
           subtitle="Scale globally across premium ad placements." 
        />

      </main>
      <Footer />
    </div>
  );
}

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
                 Vanity metrics bhool jao. <br className="hidden md:block" />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Hum asli dhandhe ki baat karte hain.</span>
              </h1>
              
              <p className="text-lg md:text-2xl text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed mb-12">
                 Hum koi normal "marketing agency" nahi hain. Humein "brand awareness" ya "likes" se koi farq nahi padta agar woh aapke bank account mein paise na laayein. Hum purely math pe khelte hain aur sirf <strong className="text-foreground">Meta & Google</strong> pe ROAS scale karte hain.
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
                    <h3 className="text-2xl font-black mb-3">Roz Nayi Testing</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">Hum mahine ke 50 se zyada ads test karte hain. Jo chalte hain, unpe paisa badhate hain. Jo fail hote hain, unhe 24 ghante mein band kar dete hain taaki aapka paisa bache.</p>
                 </motion.div>
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-card p-8 rounded-3xl border border-border">
                    <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
                       <Target className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black mb-3">AI Ki Taqat</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">Hum Meta aur Google ko strictly wahi data bhejte hain jo dikhata hai ki actual sales banne ka pattern kya hai, taaki woh aur buyers automatically dhoondh lein.</p>
                 </motion.div>
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-card p-8 rounded-3xl border border-border">
                    <div className="w-14 h-14 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center mb-6">
                       <Activity className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black mb-3">Sirf Profit Pe Nazar</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">Paisa lagaane se pehle hum saara margin calculate karte hain. Agar ad net-profitable nahi hone wali, toh usko lauch hi nahi karte.</p>
                 </motion.div>
              </div>
           </div>
        </div>

        {/* The Economics vs Marketing Module */}
        <div className="py-24 bg-secondary/20 border-y border-border/50">
           <div className="container-main px-4 max-w-5xl">
              <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                 <div className="w-full md:w-1/2">
                    <span className="text-emerald-500 font-bold tracking-widest uppercase text-sm mb-4 block">Asli Business Math</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">CPA giraao, Repeat Sales badhao. Yahi game hai.</h2>
                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                       Agar koi agency aapko "Likes" aur "Reach" ki report dikha rahi hai, toh turant unhe chhod do. Hum sirf do numbers dekhte hain: Customer laane ka kharcha (CAC) aur Lifetime usne kitna diya (LTV).
                    </p>
                    <p className="text-muted-foreground text-lg font-medium leading-relaxed">
                       Ek naya gaahak lane ki cost se zyada badi cheez ye hai ki wo gaahak wapis aake khareedega ya nahi. Hum pura equation set karte hain.
                    </p>
                 </div>
                 <div className="w-full md:w-1/2 relative">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full"></div>
                    <div className="bg-card p-8 rounded-3xl border border-border/50 shadow-2xl relative z-10 flex flex-col gap-6">
                       <div className="flex items-center justify-between border-b border-border/50 pb-4">
                          <span className="text-muted-foreground font-bold">Bachon Wali Agencies</span>
                          <span className="text-red-400 font-black">"Sasti Clicks Lao"</span>
                       </div>
                       <div className="flex items-center justify-between border-b border-border/50 pb-4">
                          <span className="text-muted-foreground font-bold">HastagCreator Ki Soch</span>
                          <span className="text-emerald-400 font-black">"Maximum Net Profit (Paisa)"</span>
                       </div>
                       <div className="bg-primary/5 p-4 rounded-xl border border-primary/20">
                          <p className="text-sm font-medium mb-2 text-primary">Crorepati Formula (Asli Game):</p>
                          <p className="text-xl font-black tracking-tight">(Order Value * Wapis Aana) &gt; (Ad Kharcha + Product Kharcha)</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* The AI Feedback Loop Section */}
        <div className="py-24 bg-background">
           <div className="container-main px-4 max-w-5xl text-center">
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Facebook ko Sikhana</span>
              <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Hum Facebook ke algorithm ko chalate hain, wo humein nahi.</h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-16 leading-relaxed">
                 Hum aankh band karke ad nahi chalate. Hum 'tuka' nahi maarte. Hume pata hai aapka best, mehenga samaan khareedne wala customer kaisa dikhta hai, aur hum Facebook ko wohi exact data bhejte hain taaki woh aise hi logon ko dhoondhe.
              </p>

              <div className="grid md:grid-cols-3 gap-6 text-left">
                 <div className="bg-card border border-border/50 p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
                    <h4 className="text-xl font-bold mb-2">1. The "Signal"</h4>
                    <p className="text-sm text-muted-foreground relative z-10">iOS updates ki wajah se platform track nahi kar pata, isliye hum technically data directly seedha piche se (server-side) bhejte hain.</p>
                 </div>
                 <div className="bg-card border border-border/50 p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
                    <h4 className="text-xl font-bold mb-2">2. Pattern Pakadna</h4>
                    <p className="text-sm text-muted-foreground relative z-10">Meta ka system samajh jata hai ki kin logon ne aapki site se actually "Buy Now" kiya hai, na ki sirf dekhne aaye hain.</p>
                 </div>
                 <div className="bg-card border border-border/50 p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
                    <h4 className="text-xl font-bold mb-2">3. Aggressive Scaling</h4>
                    <p className="text-sm text-muted-foreground relative z-10">Jaise hi Facebook ko recipe samajh aa jaati hai, hum budget heavily badhate hain aur sales ko scale karte hain.</p>
                 </div>
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

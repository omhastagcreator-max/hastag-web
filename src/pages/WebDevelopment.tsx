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
                 Ek 5th class ka bacha bhi <br className="hidden md:block" /> website bana sakta hai. <br className="hidden md:block" />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Hum Conversion Machines banate hain.</span>
              </h1>
              
              <p className="text-lg md:text-2xl text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed mb-12">
                 Ads chala ke traffic laana toh sirf <strong className="text-foreground">aadha game hai.</strong> Agar aapki website customer ka bharosa nahi jeet sakti aur unse turant payment nahi nikalva sakti, toh aap literally apna ad budget jalaa rahe ho.
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
                    <h3 className="text-2xl font-black mb-3">Slow Speed = No Sales</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">Agar 3 second mein website load nahi hui, toh customer back daba ke nikal jayega. Hum itni fast websites banate hain ki customer ko sochne ka mauka hi na mile.</p>
                 </motion.div>
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-card p-8 rounded-3xl border border-border">
                    <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
                       <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black mb-3">Trust (Bharosa)</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">Customer sasta nahi, "safe" dhundta hai. Hum pehle second se usko feel karate hain ki aap ek proper brand ho. Reviews, badging, aur security - sab perfect.</p>
                 </motion.div>
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-card p-8 rounded-3xl border border-border">
                    <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                       <Code2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black mb-3">"Buy Now" UI/UX</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">Hum sirf sundar colors nahi chunte. Hum website aisi design karte hain ki customer ki ungli automatically 'Buy Now' button par chali jaye.</p>
                 </motion.div>
              </div>
           </div>
        </div>

        {/* The Leaky Bucket Presentation Slide */}
        <div className="py-24 bg-secondary/20 border-y border-border/50">
           <div className="container-main px-4 max-w-5xl">
              <div className="flex flex-col md:flex-row items-center gap-16">
                 <div className="w-full md:w-1/2">
                    <span className="text-red-500 font-bold tracking-widest uppercase text-sm mb-4 block">Ek Kadvi Sachai (A Bitter Truth)</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Aapki problem traffic nahi hai. Aapki problem ek "Leak" karti hui balti hai.</h2>
                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                       Zyadatar founders Meta Ads pe lakhon rupe kharach karte hain aise logon ko lane ke liye, jo ek sasti bani hui website se bina khareede wapis chale jaate hain. Aap apna mehanga traffic ek tooti hui balti mein daal rahe ho.
                    </p>
                    <p className="text-muted-foreground text-lg font-medium leading-relaxed">
                       Agar aapki website ka Conversion Rate (CVR) 1.2% hai, toh aap ads ka paisa waste kar rahe ho. Hum pehle balti ka har ek leak theek karte hain!
                    </p>
                 </div>
                 <div className="w-full md:w-1/2 relative">
                    <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full"></div>
                    <div className="bg-card p-8 rounded-3xl border border-border/50 shadow-2xl relative z-10">
                       <h3 className="text-xl font-bold mb-6 text-center border-b border-border/50 pb-4">Real Dhanda Math (CRO ki taqat)</h3>
                       <div className="space-y-4 font-mono text-sm">
                          <div className="flex justify-between items-center text-red-400">
                             <span>Kharcha (₹100k Ad Spend)</span>
                             <span>10,000 Visitors aaye</span>
                          </div>
                          <div className="flex justify-between items-center text-muted-foreground">
                             <span>Normal Agency ki Website (1.2%)</span>
                             <span>Sirf 120 Sales</span>
                          </div>
                          <div className="h-px bg-border my-2"></div>
                          <div className="flex justify-between items-center text-emerald-400 font-bold text-base">
                             <span>HastagCreator ki Website (3.5%)</span>
                             <span>Seedhi 350 Sales</span>
                          </div>
                          <div className="mt-6 text-center text-muted-foreground text-xs italic">
                             *Ad spend bilkul same hai. Magar website sahi hote hi revenue seedha 3 guna zyada!*
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* The Contrast Table */}
        <div className="py-24 bg-background">
           <div className="container-main px-4 max-w-5xl">
              <div className="text-center mb-16">
                 <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">"Sasta" vs "HastagCreator"</h2>
                 <p className="text-muted-foreground text-lg">Kyun saste freelancers aakhri mein aapka lakho ka nuksaan karate hain.</p>
              </div>

              <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr>
                          <th className="p-6 border-b border-border/50 text-muted-foreground font-bold w-1/3 text-xl">The Difference</th>
                          <th className="p-6 border-b border-border/50 bg-red-500/5 text-red-500 font-black w-1/3 text-center rounded-tl-2xl">Generic Bacha / Freelancer</th>
                          <th className="p-6 border-b border-border/50 bg-primary/10 text-primary font-black w-1/3 text-center rounded-tr-2xl">HastagCreator System</th>
                       </tr>
                    </thead>
                    <tbody className="font-medium">
                       <tr>
                          <td className="p-6 border-b border-border/50">Website Loading Speed</td>
                          <td className="p-6 border-b border-border/50 bg-red-500/5 text-center text-muted-foreground">Website dhire load hoti hai. Aadha traffic gayab.</td>
                          <td className="p-6 border-b border-border/50 bg-primary/5 text-center font-bold text-foreground">Aankh jhapakte hi khulti hai. 1 second se bhi fast.</td>
                       </tr>
                       <tr>
                          <td className="p-6 border-b border-border/50">Design Ka Logic</td>
                          <td className="p-6 border-b border-border/50 bg-red-500/5 text-center text-muted-foreground">"Bhaiya jo sundar lagta hai waisa bana diya."</td>
                          <td className="p-6 border-b border-border/50 bg-primary/5 text-center font-bold text-foreground">Log kahan click kar rahe hain, is psychology pe design based hoti hai.</td>
                       </tr>
                       <tr>
                          <td className="p-6 border-b border-border/50">Checkout Payment Step</td>
                          <td className="p-6 border-b border-border/50 bg-red-500/5 text-center text-muted-foreground">Har cheez bharne mein lamba time. Adhe log cart chhod dete hain.</td>
                          <td className="p-6 border-b border-border/50 bg-primary/5 text-center font-bold text-foreground">Smooth, 1-page checkout jisse log bina soche turant pay karein.</td>
                       </tr>
                       <tr>
                          <td className="p-6 border-b border-border/50">Order Value (AOV) Makkhan</td>
                          <td className="p-6 border-b border-border/50 bg-red-500/5 text-center text-muted-foreground">Kuch nai. Jo customer ne kharida wahi de diya.</td>
                          <td className="p-6 border-b border-border/50 bg-primary/10 text-center font-black text-primary rounded-br-2xl text-[15px]">Cart ke neeche aur payment ke baad bhi upsells dikhate hain, taaki customer zyada ₹ de.</td>
                       </tr>
                    </tbody>
                 </table>
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

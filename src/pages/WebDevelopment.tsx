import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesGrid from "@/components/ServicesGrid";
import { useEffect } from "react";
import { ArrowRight, Code2, LineChart, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useBooking } from "@/components/BookingProvider";

export default function WebDevelopment() {
  const { openBooking } = useBooking();
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
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">We build Conversion Machines.</span>
              </h1>
              
              <p className="text-lg md:text-2xl text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed mb-12">
                 Getting ad traffic is only <strong className="text-foreground">half the game.</strong> If your website cannot win the customer's trust and force a quick checkout, you are literally burning your ad budget.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button 
                    onClick={openBooking}
                    className="w-full sm:w-auto bg-foreground text-background px-8 py-5 rounded-full text-lg font-bold shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                  >
                    Get a Free UX Audit <ArrowRight className="w-5 h-5" />
                  </button>
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
                    <p className="text-muted-foreground font-medium leading-relaxed">If it doesn't load in 3 seconds, the customer is gone. We engineer websites so fast that the customer doesn't even get time to second-guess.</p>
                 </motion.div>
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-card p-8 rounded-3xl border border-border">
                    <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
                       <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black mb-3">Instant Trust (Bharosa)</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">Customers don't want cheap, they want "safe". We make them feel you are a premium brand from second one. Reviews, badges, security - everything perfect.</p>
                 </motion.div>
                 <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-card p-8 rounded-3xl border border-border">
                    <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                       <Code2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black mb-3">"Buy Now" Psychology</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">We don't just pick pretty colors. We design the flow so the customer's finger automatically moves to the 'Buy Now' button without any friction.</p>
                 </motion.div>
              </div>
           </div>
        </div>

        {/* The Leaky Bucket Presentation Slide */}
        <div className="py-24 bg-secondary/20 border-y border-border/50">
           <div className="container-main px-4 max-w-5xl">
              <div className="flex flex-col md:flex-row items-center gap-16">
                 <div className="w-full md:w-1/2">
                    <span className="text-red-500 font-bold tracking-widest uppercase text-sm mb-4 block">The Real Challenge</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Traffic without Conversion is an incomplete system.</h2>
                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                       Many founders invest heavily in Meta Ads to drive traffic to a standard website. The visitors arrive, but they often leave without completing the purchase. This results in highly expensive drops in the funnel.
                    </p>
                    <p className="text-muted-foreground text-lg font-medium leading-relaxed">
                       If your Conversion Rate is stuck below 2%, increasing ad spend is inefficient. We optimize the core user experience first, because that's the *asli game*.
                    </p>
                 </div>
                 <div className="w-full md:w-1/2 relative">
                    <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full"></div>
                    <div className="bg-card p-8 rounded-3xl border border-border/50 shadow-2xl relative z-10">
                       <h3 className="text-xl font-bold mb-6 text-center border-b border-border/50 pb-4">The Math (CRO Power)</h3>
                       <div className="space-y-4 font-mono text-sm">
                          <div className="flex justify-between items-center text-red-400">
                             <span>Ad Spend (₹100k)</span>
                             <span>10,000 Visitors</span>
                          </div>
                          <div className="flex justify-between items-center text-muted-foreground">
                             <span>Normal Agency Website (1.2%)</span>
                             <span>120 Sales</span>
                          </div>
                          <div className="h-px bg-border my-2"></div>
                          <div className="flex justify-between items-center text-emerald-400 font-bold text-base">
                             <span>HastagCreator Website (3.5%)</span>
                             <span>350 Sales</span>
                          </div>
                          <div className="mt-6 text-center text-muted-foreground text-xs italic">
                             *Exact same ad spend. But the revenue jumps 3x just by fixing the website flow!*
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
                 <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Other Agencies vs HastagCreator</h2>
                 <p className="text-muted-foreground text-lg">See how an optimized infrastructure and CRO directly impacts your bottom line.</p>
              </div>

              <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                       <tr>
                          <th className="p-6 border-b border-border/50 text-muted-foreground font-bold w-[30%] text-xl">The Difference</th>
                          <th className="p-6 border-b border-border/50 bg-red-500/5 text-red-500 font-black w-[35%] text-center rounded-tl-2xl">What Other Agencies Do</th>
                          <th className="p-6 border-b border-border/50 bg-primary/10 text-primary font-black w-[35%] text-center rounded-tr-2xl">What We Do (CRO Focus)</th>
                       </tr>
                    </thead>
                    <tbody className="font-medium">
                       <tr>
                          <td className="p-6 border-b border-border/50">Website Speed</td>
                          <td className="p-6 border-b border-border/50 bg-red-500/5 text-center text-muted-foreground">Standard loading times. Pages take 4-5 seconds to render.</td>
                          <td className="p-6 border-b border-border/50 bg-primary/5 text-center font-bold text-foreground">Sub-second load times engineered to prevent traffic bounce.</td>
                       </tr>
                       <tr>
                          <td className="p-6 border-b border-border/50">User Navigation & Flow</td>
                          <td className="p-6 border-b border-border/50 bg-red-500/5 text-center text-muted-foreground">Confusing layouts requiring multiple clicks to find products.</td>
                          <td className="p-6 border-b border-border/50 bg-primary/5 text-center font-bold text-foreground">Frictionless, direct-to-checkout paths guided by heatmap data.</td>
                       </tr>
                       <tr>
                          <td className="p-6 border-b border-border/50">Call To Action (CTA)</td>
                          <td className="p-6 border-b border-border/50 bg-red-500/5 text-center text-muted-foreground">Generic "Buy Now" at the bottom of the page.</td>
                          <td className="p-6 border-b border-border/50 bg-primary/5 text-center font-bold text-foreground">Sticky CTAs with micro-copy strategically placed to neutralize buying anxiety.</td>
                       </tr>
                       <tr>
                          <td className="p-6 border-b border-border/50">Trust & Psychology</td>
                          <td className="p-6 border-b border-border/50 bg-red-500/5 text-center text-muted-foreground">Relying purely on aesthetics without trust markers.</td>
                          <td className="p-6 border-b border-border/50 bg-primary/5 text-center font-bold text-foreground">Strategic placement of reviews, guarantees, and security badges directly at high-friction points.</td>
                       </tr>
                       <tr>
                          <td className="p-6 border-b border-border/50">Checkout Friction</td>
                          <td className="p-6 border-b border-border/50 bg-red-500/5 text-center text-muted-foreground">Long, multi-stage forms that cause cart abandonment.</td>
                          <td className="p-6 border-b border-border/50 bg-primary/10 text-center font-black text-primary rounded-br-2xl text-[15px]">1-Page, guest-friendly checkout maximizing Average Order Value (AOV).</td>
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

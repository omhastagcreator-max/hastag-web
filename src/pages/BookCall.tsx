import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ShieldCheck, Video, CalendarDays, CheckCircle2, TrendingUp, Users, Smartphone, Layout, AlertCircle } from "lucide-react";
import { useRazorpay } from "react-razorpay";
import { supabase } from "@/lib/supabase";

type Goal = "PerformanceAds" | "InfluencerMarketing" | "UGCVideos" | "WebDevCRO" | "";

const BOTTLENECKS = {
  "PerformanceAds": [
    "High Customer Acquisition Cost (CAC)",
    "Low Return on Ad Spend (ROAS)",
    "Ads perform well for a week, then die",
    "Running out of Good Ad Creatives"
  ],
  "InfluencerMarketing": [
    "Can't find reliable creators",
    "Influencers charge too much, deliver no sales",
    "Campaigns take too much time to manage",
    "No tracking or ROI from influencers"
  ],
  "UGCVideos": [
    "We don't have good content to run on Meta Ads",
    "Our creatives get high CPMs and no clicks",
    "Hard to get native-looking TikTok/Reels style videos",
    "Creators ghost us or deliver poor quality"
  ],
  "WebDevCRO": [
    "Website is extremely slow and losing traffic",
    "High Add-to-Cart but low Purchases",
    "Confusing checkout or navigation",
    "Brand looks untrustworthy/cheap online"
  ]
};

export default function BookCall() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    goal: "" as Goal,
    painPoint: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { Razorpay } = useRazorpay();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Book a Counseling Session | HastagCreator";
  }, []);

  const handleNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (step === 1 && !form.goal) return;
    if (step === 2 && !form.painPoint) return;
    if (step === 3 && (!form.name || !form.email || !form.phone)) return;
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handlePaymentAndSubmit = async () => {
    setIsSubmitting(true);

    try {
      // 1. Send form details via Web3Forms
      if (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY) {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
            from_name: "HastagCreator Strategy Session",
            subject: `🚀 New Strategy Booking: ${form.name}`,
            name: form.name,
            email: form.email,
            phone: form.phone,
            message: `
New Counseling Session Request

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}

Primary Goal Focus:
${form.goal}

Biggest Bottleneck (Pain Point):
${form.painPoint}
            `
          })
        });
      }

      // 2. Trigger Razorpay Payment
      const config = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_YourKeyGoesHere",
        amount: "9900", // ₹99 in paise
        currency: "INR",
        name: "HastagCreator",
        description: "Strategy & Counseling Session",
        handler: async function (response: any) {
           try {
              await supabase.from('orders').insert({
                 product_name: "Counseling Session",
                 amount: 99,
                 payment_id: response.razorpay_payment_id
              });
           } catch (e) {
             console.error("Order logging failed", e);
           }
           
           // Exactly redirect to calendly upon success
           window.location.href = "https://calendly.com/domsco-tech/30min?month=2026-03";
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#2563EB" }, 
      };

      const rzpInstance = new Razorpay(config as any);
      
      rzpInstance.on('payment.failed', function () {
        alert("Payment failed. Please try again to complete your booking.");
        setIsSubmitting(false);
      });

      rzpInstance.open();

    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong while processing your request. Please try again.");
    } finally {
      setTimeout(() => setIsSubmitting(false), 2000); 
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-20 bg-background">
      <Navbar />
      
      <main className="flex-1 py-12 md:py-24">
        <div className="container-main max-w-6xl flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
           
           {/* Left side: Sales copy & Value Prop */}
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             className="w-full lg:w-1/2 flex flex-col gap-6"
           >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-2 w-max border border-primary/20">
                 <Video className="w-4 h-4" /> 1-on-1 Growth Counseling
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] text-foreground">
                 Stop guessing. <br/> Let's map your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Scale Plan.</span>
              </h1>
              
              <p className="text-lg text-muted-foreground font-medium leading-relaxed mb-6">
                 We mandate a rigorous session discussing exactly "How, When & Whom to sell" to validate if we can actually scale your brand. This ₹99 filtration fee ensures only serious brand owners apply.
              </p>
              
              <div className="space-y-4">
                 <div className="flex items-start gap-4">
                    <div className="bg-green-500/10 p-3 rounded-2xl flex-shrink-0 mt-1">
                       <CalendarDays className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                       <h3 className="font-bold text-foreground text-lg">Direct Calendar Access</h3>
                       <p className="text-muted-foreground text-sm font-medium leading-relaxed">Skip the queue. Instantly book a slot with our growth consultants directly after checkout.</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-2xl flex-shrink-0 mt-1">
                       <ShieldCheck className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                       <h3 className="font-bold text-foreground text-lg">Strategic Audit</h3>
                       <p className="text-muted-foreground text-sm font-medium leading-relaxed">We review your answers here to prepare effectively. The session is strictly data-driven.</p>
                    </div>
                 </div>
              </div>
           </motion.div>

           {/* Right side: Multi-step Questionnaire & Payment */}
           <motion.div 
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             className="w-full lg:w-1/2 relative min-h-[500px]"
           >
              <div className="bg-card border border-border/50 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden h-full flex flex-col">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
                 
                 <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className="flex flex-col">
                      <h2 className="text-2xl font-black text-foreground tracking-tight">
                         {step === 1 && "Step 1: Core Focus"}
                         {step === 2 && "Step 2: Biggest Hurdle"}
                         {step === 3 && "Step 3: Details"}
                         {step === 4 && "Final Step: Payment"}
                      </h2>
                      <p className="text-muted-foreground text-sm font-medium mt-1">
                         {step === 1 && "What are you trying to achieve?"}
                         {step === 2 && "Where are you currently stuck?"}
                         {step === 3 && "Basic information to reach you."}
                         {step === 4 && "Confirm & securely reserve your slot."}
                      </p>
                    </div>
                    <div className="text-2xl font-black text-muted-foreground/30">{step}/4</div>
                 </div>
                 
                 <div className="flex-1 relative z-10">
                   <AnimatePresence mode="wait">
                      
                      {/* STEP 1: Goal Options (Previously Step 2) */}
                      {step === 1 && (
                        <motion.div 
                          key="step1"
                          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                          className="flex flex-col h-full space-y-3"
                        >
                           <div className="grid grid-cols-2 gap-3">
                             {[
                               { id: "PerformanceAds", label: "Performance Ads", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500/10" },
                               { id: "InfluencerMarketing", label: "Influencer Push", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
                               { id: "UGCVideos", label: "UGC Videos", icon: Smartphone, color: "text-pink-500", bg: "bg-pink-500/10" },
                               { id: "WebDevCRO", label: "Website / CRO", icon: Layout, color: "text-orange-500", bg: "bg-orange-500/10" }
                             ].map(option => {
                               const Icon = option.icon;
                               return (
                                 <button
                                   key={option.id}
                                   onClick={() => setForm({...form, goal: option.id as Goal})}
                                   className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all gap-4 ${form.goal === option.id ? 'border-primary bg-primary/5 shadow-md shadow-primary/10 scale-[1.02]' : 'border-border/50 bg-background hover:border-primary/30 hover:bg-secondary/50'}`}
                                 >
                                   <div className={`w-14 h-14 rounded-full flex items-center justify-center ${option.bg}`}>
                                     <Icon className={`w-7 h-7 ${option.color}`} />
                                   </div>
                                   <span className="font-extrabold text-foreground text-sm text-center">{option.label}</span>
                                 </button>
                               )
                             })}
                           </div>
                           
                           <div className="flex gap-3 pt-6 mt-auto">
                              <button onClick={() => handleNext()} disabled={!form.goal} className="w-full bg-primary text-primary-foreground font-black py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50">
                                Next Step <ArrowRight className="w-4 h-4" />
                              </button>
                           </div>
                        </motion.div>
                      )}

                      {/* STEP 2: Dynamic Pain Points (Previously Step 3) */}
                      {step === 2 && (
                        <motion.div 
                          key="step2"
                          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                          className="flex flex-col h-full space-y-3"
                        >
                           <div className="space-y-3">
                             {form.goal && BOTTLENECKS[form.goal].map((pain, idx) => (
                               <button
                                 key={pain}
                                 onClick={() => setForm({...form, painPoint: pain})}
                                 className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${form.painPoint === pain ? 'border-primary bg-primary/5 shadow-md shadow-primary/5 translate-x-1' : 'border-border/50 bg-background hover:border-primary/30 hover:bg-secondary/50'}`}
                               >
                                 <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${form.painPoint === pain ? 'bg-primary text-white' : 'bg-red-500/10 text-red-500'}`}>
                                   <AlertCircle className="w-5 h-5" />
                                 </div>
                                 <span className="font-bold text-foreground text-sm md:text-base flex-1">{pain}</span>
                                 {form.painPoint === pain && <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />}
                               </button>
                             ))}
                           </div>
                           
                           <div className="flex gap-3 pt-6 mt-auto">
                              <button onClick={handleBack} className="px-5 py-4 rounded-xl border border-border text-foreground hover:bg-secondary font-bold flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4" /> Back
                              </button>
                              <button onClick={() => handleNext()} disabled={!form.painPoint} className="flex-1 bg-primary text-primary-foreground font-black py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50">
                                Continue <ArrowRight className="w-4 h-4" />
                              </button>
                           </div>
                        </motion.div>
                      )}

                      {/* STEP 3: Details (Previously Step 1) */}
                      {step === 3 && (
                        <motion.form 
                          key="step3"
                          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                          onSubmit={handleNext}
                          className="space-y-5"
                        >
                          <div className="space-y-4">
                             <div className="space-y-1.5">
                                <label className="text-xs font-bold text-foreground uppercase tracking-wider">Name</label>
                                <input 
                                  required type="text"
                                  value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                                  className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none"
                                  placeholder="John Doe"
                                />
                             </div>
                             <div className="space-y-1.5">
                                <label className="text-xs font-bold text-foreground uppercase tracking-wider">Phone</label>
                                <input 
                                  required type="tel"
                                  value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                                  className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none"
                                  placeholder="+91 9999999999"
                                />
                             </div>
                             <div className="space-y-1.5">
                                <label className="text-xs font-bold text-foreground uppercase tracking-wider">Email Address</label>
                                <input 
                                  required type="email"
                                  value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                                  className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none"
                                  placeholder="founder@brand.com"
                                />
                             </div>
                          </div>
                          
                          <div className="flex gap-3 pt-6 mt-auto">
                              <button type="button" onClick={handleBack} className="px-5 py-4 rounded-xl border border-border text-foreground hover:bg-secondary font-bold flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4" /> Back
                              </button>
                              <button type="submit" className="flex-1 bg-primary text-primary-foreground font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg disabled:opacity-50">
                                View Summary <ArrowRight className="w-4 h-4" />
                              </button>
                           </div>
                        </motion.form>
                      )}

                      {/* STEP 4: Final Summary & Payment */}
                      {step === 4 && (
                        <motion.div 
                          key="step4"
                          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                          className="flex flex-col h-full"
                        >
                           <div className="bg-muted/30 border border-border rounded-2xl p-5 space-y-4 mb-6">
                              <div className="flex justify-between items-center border-b border-border/50 pb-3">
                                 <span className="text-muted-foreground text-sm font-bold">Consultation Fee</span>
                                 <span className="text-xl font-black text-foreground">₹99</span>
                              </div>
                              <div className="space-y-1">
                                 <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Your Goal Focus</p>
                                 <p className="text-sm font-semibold text-foreground">{form.goal}</p>
                              </div>
                              <div className="space-y-1">
                                 <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Identified Bottleneck</p>
                                 <p className="text-sm font-semibold text-foreground">{form.painPoint}</p>
                              </div>
                           </div>

                           <div className="flex gap-3 mt-auto">
                              <button onClick={handleBack} className="px-5 py-4 rounded-xl border border-border text-foreground hover:bg-secondary font-bold flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4" /> Edit
                              </button>
                              <button 
                                onClick={handlePaymentAndSubmit}
                                disabled={isSubmitting}
                                className="flex-1 bg-foreground text-background hover:bg-foreground/90 transition-all font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl hover:-translate-y-1"
                              >
                                {isSubmitting ? "Processing..." : "Pay ₹99 & Book Calendar"}
                                {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                              </button>
                           </div>
                        </motion.div>
                      )}

                   </AnimatePresence>
                 </div>

                 {step === 4 && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}} className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground font-medium">
                        <ShieldCheck className="w-4 h-4 text-green-500" /> Secure Payments processed via Razorpay
                    </motion.div>
                 )}
              </div>
           </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

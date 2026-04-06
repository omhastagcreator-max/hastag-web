import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useBooking } from "./BookingProvider";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ShieldCheck, Video, CalendarDays, CheckCircle2, TrendingUp, Users, Smartphone, Layout, AlertCircle, Activity, Flame, Clock, TrendingDown, Map, Wrench, Search, Handshake, X } from "lucide-react";
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

const EXPERIENCES = [
  { id: "internally", label: "Tried it internally, no results", icon: Activity, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: "agency", label: "Worked with an agency, got burned", icon: Flame, color: "text-red-500", bg: "bg-red-500/10" },
  { id: "notime", label: "No time/knowledge to do it right", icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10" },
  { id: "ceiling", label: "We have a team, but hit a ceiling", icon: TrendingDown, color: "text-purple-500", bg: "bg-purple-500/10" }
];

const EXPECTATIONS = [
  { id: "roadmap", label: "A step-by-step scaling roadmap", icon: Map, color: "text-green-500", bg: "bg-green-500/10" },
  { id: "audit", label: "Audit and fix our broken funnel", icon: Wrench, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { id: "ready", label: "Find out if our brand is ready", icon: Search, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  { id: "partner", label: "Looking for an agency partner", icon: Handshake, color: "text-pink-500", bg: "bg-pink-500/10" }
];

export default function BookingModal() {
  const { isOpen, closeBooking } = useBooking();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    goal: "" as Goal,
    painPoint: "",
    pastExperience: "",
    expectation: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const { Razorpay } = useRazorpay();
  const calendlyRef = useRef<HTMLDivElement>(null);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setForm({
          name: "",
          email: "",
          phone: "",
          goal: "" as Goal,
          painPoint: "",
          pastExperience: "",
          expectation: ""
        });
        setIsPaid(false);
      }, 300);
    }
  }, [isOpen]);

  const handleNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (step === 1 && !form.goal) return;
    if (step === 2 && !form.painPoint) return;
    if (step === 3 && !form.pastExperience) return;
    if (step === 4 && !form.expectation) return;
    if (step === 5 && (!form.name || !form.email || !form.phone)) return;
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
            subject: `🚀 Strategy Booking & Audit: ${form.name}`,
            name: form.name,
            email: form.email,
            phone: form.phone,
            message: `
New Strategy Session Request

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}

[1] Primary Goal Focus:
${form.goal}

[2] Biggest Bottleneck:
${form.painPoint}

[3] Why hasn't it been solved?:
${form.pastExperience}

[4] Expectation from Counseling:
${form.expectation}
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
           
           setIsPaid(true);
           setStep(7); // Final scheduling step
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
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeBooking()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-border/50 shadow-2xl rounded-[2rem] sm:max-h-[90vh]">
        <div className="flex flex-col lg:flex-row h-full">
          
          {/* Left Panel: Info (Hidden on success/paid step to give room for calendar) */}
          {!isPaid && (
            <div className="hidden lg:flex lg:w-2/5 bg-primary/5 p-8 flex-col justify-between relative overflow-hidden shrink-0 border-r border-border/50">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-transparent"></div>
              
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase border border-primary/20">
                  <Video className="w-4 h-4" /> 1-on-1 Growth Session
                </div>
                
                <h3 className="text-3xl font-black tracking-tighter leading-tight text-foreground">
                  Let's map your <br/><span className="text-primary italic font-serif opacity-80">scale plan.</span>
                </h3>
                
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  We mandate this session to validate "How & When" to scale your brand profitably.
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                    <span className="text-xs font-bold">Instantly book your slot</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-blue-500" />
                    </div>
                    <span className="text-xs font-bold">Secure ₹99 filtration fee</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-8 border-t border-border/50">
                <div className="flex items-center gap-3">
                   <div className="flex -space-x-2">
                     {[1,2,3].map(i => (
                       <div key={i} className="w-8 h-8 rounded-full bg-border border-2 border-card overflow-hidden">
                         <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Founder" className="w-full h-full object-cover" />
                       </div>
                     ))}
                   </div>
                   <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Joined by 500+ D2C Founders</p>
                </div>
              </div>
            </div>
          )}

          {/* Right Panel: Form / Calendar */}
          <div className={`flex-1 flex flex-col ${isPaid ? 'w-full' : 'p-6 md:p-10'}`}>
            
            {!isPaid && (
              <div className="flex items-center justify-between mb-8 relative z-10 shrink-0">
                <div className="flex flex-col">
                  <h2 className="text-xl font-black text-foreground tracking-tight">
                     {step === 1 && "Core Focus"}
                     {step === 2 && "Biggest Hurdle"}
                     {step === 3 && "Past Experience"}
                     {step === 4 && "Real Expectation"}
                     {step === 5 && "Your Details"}
                     {step === 6 && "Secure Slot"}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-1">
                      {[1,2,3,4,5,6].map(i => (
                        <div key={i} className={`h-1 rounded-full transition-all ${i <= step ? 'w-4 bg-primary' : 'w-2 bg-border'}`}></div>
                      ))}
                    </div>
                    <span className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-widest">{step}/6</span>
                  </div>
                </div>
                <button onClick={closeBooking} className="lg:hidden p-2 hover:bg-secondary rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
            )}

            <div className={`flex-1 relative z-10 min-h-[400px] flex flex-col justify-center`}>
               <AnimatePresence mode="wait">
                  
                  {/* STEP 1: Goal Options */}
                  {step === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col gap-3"
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
                               className={`flex flex-col items-center justify-center p-4 py-6 rounded-2xl border-2 transition-all gap-3 ${form.goal === option.id ? 'border-primary bg-primary/5 shadow-md shadow-primary/5 scale-[1.02]' : 'border-border/50 bg-background hover:border-primary/30 hover:bg-secondary/50'}`}
                             >
                               <div className={`w-12 h-12 rounded-full flex items-center justify-center ${option.bg}`}>
                                 <Icon className={`w-6 h-6 ${option.color}`} />
                               </div>
                               <span className="font-extrabold text-foreground text-[13px] text-center">{option.label}</span>
                             </button>
                           )
                         })}
                       </div>
                       
                       <div className="flex gap-3 pt-6 mt-4">
                          <button onClick={() => handleNext()} disabled={!form.goal} className="w-full bg-primary text-primary-foreground font-black py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-primary/20">
                            Next Step <ArrowRight className="w-4 h-4" />
                          </button>
                       </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Dynamic Pain Points */}
                  {step === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col gap-3"
                    >
                       <div className="space-y-3">
                         {form.goal && BOTTLENECKS[form.goal].map((pain) => (
                           <button
                             key={pain}
                             onClick={() => setForm({...form, painPoint: pain})}
                             className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${form.painPoint === pain ? 'border-primary bg-primary/5 shadow-md shadow-primary/5 translate-x-1' : 'border-border/50 bg-background hover:border-primary/30 hover:bg-secondary/50'}`}
                           >
                             <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${form.painPoint === pain ? 'bg-primary text-white' : 'bg-red-500/10 text-red-500'}`}>
                               <AlertCircle className="w-4 h-4" />
                             </div>
                             <span className="font-bold text-foreground text-sm flex-1">{pain}</span>
                             {form.painPoint === pain && <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />}
                           </button>
                         ))}
                       </div>
                       
                       <div className="flex gap-3 pt-6 mt-4">
                          <button onClick={handleBack} className="px-5 py-4 rounded-xl border border-border text-foreground hover:bg-secondary font-bold flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleNext()} disabled={!form.painPoint} className="flex-1 bg-primary text-primary-foreground font-black py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-primary/20">
                            Continue <ArrowRight className="w-4 h-4" />
                          </button>
                       </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Past Experience */}
                  {step === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col gap-3"
                    >
                       <div className="grid grid-cols-2 gap-3">
                         {EXPERIENCES.map(option => {
                           const Icon = option.icon;
                           return (
                             <button
                               key={option.id}
                               onClick={() => setForm({...form, pastExperience: option.label})}
                               className={`flex flex-col items-center justify-center p-4 py-6 rounded-2xl border-2 transition-all gap-4 ${form.pastExperience === option.label ? 'border-primary bg-primary/5 shadow-md shadow-primary/10 scale-[1.02]' : 'border-border/50 bg-background hover:border-primary/30 hover:bg-secondary/50'}`}
                             >
                               <div className={`w-12 h-12 rounded-full flex items-center justify-center ${option.bg}`}>
                                 <Icon className={`w-6 h-6 ${option.color}`} />
                               </div>
                               <span className="font-extrabold text-foreground text-xs text-center leading-tight">{option.label}</span>
                             </button>
                           )
                         })}
                       </div>
                       
                       <div className="flex gap-3 pt-6 mt-4">
                          <button onClick={handleBack} className="px-5 py-4 rounded-xl border border-border text-foreground hover:bg-secondary font-bold flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleNext()} disabled={!form.pastExperience} className="flex-1 bg-primary text-primary-foreground font-black py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50">
                            Continue <ArrowRight className="w-4 h-4" />
                          </button>
                       </div>
                    </motion.div>
                  )}

                  {/* STEP 4: Expectation */}
                  {step === 4 && (
                    <motion.div 
                      key="step4"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col gap-3"
                    >
                       <div className="grid grid-cols-2 gap-3">
                         {EXPECTATIONS.map(option => {
                           const Icon = option.icon;
                           return (
                             <button
                               key={option.id}
                               onClick={() => setForm({...form, expectation: option.label})}
                               className={`flex flex-col items-center justify-center p-4 py-6 rounded-2xl border-2 transition-all gap-4 ${form.expectation === option.label ? 'border-primary bg-primary/5 shadow-md shadow-primary/10 scale-[1.02]' : 'border-border/50 bg-background hover:border-primary/30 hover:bg-secondary/50'}`}
                             >
                               <div className={`w-12 h-12 rounded-full flex items-center justify-center ${option.bg}`}>
                                 <Icon className={`w-6 h-6 ${option.color}`} />
                               </div>
                               <span className="font-extrabold text-foreground text-xs text-center leading-tight">{option.label}</span>
                             </button>
                           )
                         })}
                       </div>
                       
                       <div className="flex gap-3 pt-6 mt-4">
                          <button onClick={handleBack} className="px-5 py-4 rounded-xl border border-border text-foreground hover:bg-secondary font-bold flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleNext()} disabled={!form.expectation} className="flex-1 bg-primary text-primary-foreground font-black py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50">
                            Continue <ArrowRight className="w-4 h-4" />
                          </button>
                       </div>
                    </motion.div>
                  )}

                  {/* STEP 5: Details */}
                  {step === 5 && (
                    <motion.form 
                      key="step5"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                      onSubmit={handleNext}
                      className="space-y-4"
                    >
                      <div className="space-y-3">
                         <div className="space-y-1">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Name</label>
                            <input 
                              required type="text"
                              value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                              className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                              placeholder="Full Name"
                            />
                         </div>
                         <div className="space-y-1">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Phone Number</label>
                            <input 
                              required type="tel"
                              value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                              className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                              placeholder="+91"
                            />
                         </div>
                         <div className="space-y-1">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em]">Work Email</label>
                            <input 
                              required type="email"
                              value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                              className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                              placeholder="email@company.com"
                            />
                         </div>
                      </div>
                      
                      <div className="flex gap-3 pt-6 mt-4">
                          <button type="button" onClick={handleBack} className="px-5 py-4 rounded-xl border border-border text-foreground hover:bg-secondary font-bold flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                          </button>
                          <button type="submit" className="flex-1 bg-primary text-primary-foreground font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                            Confirm Details <ArrowRight className="w-4 h-4" />
                          </button>
                       </div>
                    </motion.form>
                  )}

                  {/* STEP 6: Overview & Payment */}
                  {step === 6 && (
                    <motion.div 
                      key="step6"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col"
                    >
                       <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20 mb-6 space-y-4">
                          <div className="flex justify-between items-center pb-3 border-b border-white/10">
                             <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Pricing</span>
                             <span className="text-2xl font-black text-foreground">₹99 <span className="text-[10px] font-medium text-muted-foreground line-through ml-2">₹1999</span></span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                               <p className="text-[10px] text-muted-foreground uppercase font-black">Focus</p>
                               <p className="text-xs font-bold text-primary">{form.goal}</p>
                            </div>
                            <div className="space-y-1">
                               <p className="text-[10px] text-muted-foreground uppercase font-black">Expectation</p>
                               <p className="text-xs font-bold text-foreground leading-tight">{form.expectation}</p>
                            </div>
                          </div>
                       </div>

                       <div className="flex gap-3 mt-4">
                          <button onClick={handleBack} className="px-5 py-4 rounded-xl border border-border text-foreground hover:bg-secondary font-bold flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={handlePaymentAndSubmit}
                            disabled={isSubmitting}
                            className="flex-1 bg-foreground text-background font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50"
                          >
                            {isSubmitting ? "Initiating..." : "Pay ₹99 & Schedule"}
                            {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                          </button>
                       </div>
                       
                       <p className="mt-6 text-center text-[10px] text-muted-foreground font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                         <ShieldCheck className="w-4 h-4 text-primary" /> Verified Razorpay Payment gateway
                       </p>
                    </motion.div>
                  )}

                  {/* STEP 7: Calendly Embed (Full Screen in Modal) */}
                  {step === 7 && (
                    <motion.div 
                      key="calendly"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full h-full min-h-[600px] flex flex-col"
                    >
                      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-background/50 backdrop-blur-md sticky top-0 z-20">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-foreground">Success! Payment Received.</h4>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-mono">Select your timezone and pick a slot below</p>
                          </div>
                        </div>
                        <button onClick={closeBooking} className="p-2 hover:bg-secondary rounded-full transition-colors">
                          <X size={20} />
                        </button>
                      </div>
                      
                      <div 
                        className="calendly-inline-widget flex-1" 
                        data-url="https://calendly.com/domsco-tech/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=2563eb"
                        style={{ minWidth: '100%', height: '600px' }}
                      />
                    </motion.div>
                  )}

               </AnimatePresence>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

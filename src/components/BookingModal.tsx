import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useBooking } from "./BookingProvider";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ShieldCheck, Video, CheckCircle2, TrendingUp, Users, Smartphone, Layout, AlertCircle, Activity, Flame, Clock, TrendingDown, gap, Map, Search, Handshake, X, Link } from "lucide-react";
import { useRazorpay } from "react-razorpay";
import { supabase } from "@/lib/supabase";

const BOTTLENECKS = [
  "High Customer Acquisition Cost (CAC)",
  "Low Return on Ad Spend (ROAS)",
  "Running out of Good Ad Creatives",
  "Can't find reliable creators",
  "Website is extremely slow and losing traffic",
  "Confusing checkout or navigation"
];

const EXPERIENCES = [
  { id: "internally", label: "Tried it internally, no results", icon: Activity, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: "agency", label: "Worked with an agency, got burned", icon: Flame, color: "text-red-500", bg: "bg-red-500/10" },
  { id: "notime", label: "No time/knowledge to do it right", icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10" },
  { id: "ceiling", label: "We have a team, but hit a ceiling", icon: TrendingDown, color: "text-purple-500", bg: "bg-purple-500/10" }
];

export default function BookingModal() {
  const { isOpen, closeBooking } = useBooking();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    goals: [] as string[],
    painPoints: [] as string[],
    pastExperiences: [] as string[],
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const { Razorpay } = useRazorpay();

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setForm({
          name: "",
          email: "",
          phone: "",
          goals: [],
          painPoints: [],
          pastExperiences: []
        });
        setIsPaid(false);
      }, 300);
    }
  }, [isOpen]);

  const toggleArrayItem = (field: "goals" | "painPoints" | "pastExperiences", value: string) => {
    setForm(prev => {
      const current = prev[field];
      if (current.includes(value)) {
         return { ...prev, [field]: current.filter(v => v !== value) };
      } else {
         return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const handleNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (step === 1 && form.goals.length === 0) return;
    if (step === 2 && form.painPoints.length === 0) return;
    if (step === 3 && form.pastExperiences.length === 0) return;
    if (step === 4 && (!form.name || !form.email || !form.phone)) return;
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handlePaymentAndSubmit = async () => {
    setIsSubmitting(true);

    try {
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

[1] Primary Goals:
${form.goals.join(", ")}

[2] Biggest Bottlenecks:
${form.painPoints.join(", ")}

[3] History & Experience:
${form.pastExperiences.join(", ")}
            `
          })
        });
      }

      // Razorpay Payment
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
        },
        prefill: { name: form.name, email: form.email, contact: form.phone },
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
      alert("Something went wrong while processing your request.");
    } finally {
      setTimeout(() => setIsSubmitting(false), 2000); 
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeBooking()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-border/50 shadow-2xl rounded-[2rem] sm:max-h-[90vh]">
        <div className="flex flex-col lg:flex-row h-full">
          
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
                  Select all that apply to help us understand your specific challenges before the call.
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
            </div>
          )}

          <div className={`flex-1 flex flex-col ${isPaid ? 'w-full' : 'p-6 md:p-10'}`}>
            
            {!isPaid && (
              <div className="flex items-center justify-between mb-8 relative z-10 shrink-0">
                <div className="flex flex-col">
                  <h2 className="text-xl font-black text-foreground tracking-tight">
                     {step === 1 && "Select Your Goals"}
                     {step === 2 && "Select Current Bottlenecks"}
                     {step === 3 && "Past Experience"}
                     {step === 4 && "Your Details"}
                     {step === 5 && "Confirm & Secure Slot"}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className={`h-1 rounded-full transition-all ${i <= step ? 'w-4 bg-primary' : 'w-2 bg-border'}`}></div>
                      ))}
                    </div>
                    <span className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-widest">{step}/5</span>
                  </div>
                </div>
                <button onClick={closeBooking} className="lg:hidden p-2 hover:bg-secondary rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
            )}

            <div className={`flex-1 relative z-10 min-h-[400px] flex flex-col justify-center`}>
               <AnimatePresence mode="wait">
                  
                  {/* STEP 1: Multi-Select Goals */}
                  {!isPaid && step === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col gap-3"
                    >
                       <p className="text-xs text-muted-foreground mb-2 italic">Select all that apply</p>
                       <div className="grid grid-cols-2 gap-3">
                         {[
                           { id: "PerformanceAds", label: "Performance Ads", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500/10" },
                           { id: "InfluencerMarketing", label: "Influencer Push", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
                           { id: "UGCVideos", label: "UGC Videos", icon: Smartphone, color: "text-pink-500", bg: "bg-pink-500/10" },
                           { id: "WebDevCRO", label: "Website / CRO", icon: Layout, color: "text-orange-500", bg: "bg-orange-500/10" }
                         ].map(option => {
                           const isSelected = form.goals.includes(option.id);
                           const Icon = option.icon;
                           return (
                             <button
                               key={option.id}
                               onClick={() => toggleArrayItem("goals", option.id)}
                               className={`flex flex-col items-center justify-center p-4 py-6 rounded-2xl border-2 transition-all gap-3 relative ${isSelected ? 'border-primary bg-primary/5 shadow-md scale-[1.02]' : 'border-border/50 bg-background hover:border-primary/30'}`}
                             >
                               {isSelected && <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-0.5"><CheckCircle2 className="w-3 h-3" /></div>}
                               <div className={`w-12 h-12 rounded-full flex items-center justify-center ${option.bg}`}>
                                 <Icon className={`w-6 h-6 ${option.color}`} />
                               </div>
                               <span className="font-extrabold text-foreground text-[13px] text-center">{option.label}</span>
                             </button>
                           )
                         })}
                       </div>
                       
                       <div className="flex gap-3 pt-6 mt-4">
                          <button onClick={() => handleNext()} disabled={form.goals.length === 0} className="w-full bg-primary text-primary-foreground font-black py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-primary/20">
                            Next Step <ArrowRight className="w-4 h-4" />
                          </button>
                       </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Multi-Select Pain Points */}
                  {!isPaid && step === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col gap-3"
                    >
                       <p className="text-xs text-muted-foreground mb-2 italic">Select your biggest bottlenecks</p>
                       <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                         {BOTTLENECKS.map((pain) => {
                           const isSelected = form.painPoints.includes(pain);
                           return (
                             <button
                               key={pain}
                               onClick={() => toggleArrayItem("painPoints", pain)}
                               className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${isSelected ? 'border-primary bg-primary/5 shadow-md shadow-primary/5' : 'border-border/50 bg-background hover:border-primary/30'}`}
                             >
                               <div className={`w-6 h-6 shrink-0 border-2 rounded ${isSelected ? 'bg-primary border-primary flex items-center justify-center text-white' : 'border-border'}`}>
                                 {isSelected && <CheckCircle2 className="w-4 h-4" />}
                               </div>
                               <span className="font-bold text-foreground text-sm flex-1">{pain}</span>
                             </button>
                           )
                         })}
                       </div>
                       
                       <div className="flex gap-3 pt-6 mt-4">
                          <button onClick={handleBack} className="px-5 py-4 rounded-xl border border-border text-foreground hover:bg-secondary font-bold flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleNext()} disabled={form.painPoints.length === 0} className="flex-1 bg-primary text-primary-foreground font-black py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50">
                            Continue <ArrowRight className="w-4 h-4" />
                          </button>
                       </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Multi-Select Past Experience */}
                  {!isPaid && step === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col gap-3"
                    >
                       <p className="text-xs text-muted-foreground mb-2 italic">What has been your track record so far?</p>
                       <div className="grid grid-cols-2 gap-3">
                         {EXPERIENCES.map(option => {
                           const isSelected = form.pastExperiences.includes(option.label);
                           const Icon = option.icon;
                           return (
                             <button
                               key={option.id}
                               onClick={() => toggleArrayItem("pastExperiences", option.label)}
                               className={`flex flex-col items-center justify-center p-4 py-6 rounded-2xl border-2 transition-all gap-4 relative ${isSelected ? 'border-primary bg-primary/5 shadow-md scale-[1.02]' : 'border-border/50 bg-background hover:border-primary/30'}`}
                             >
                               {isSelected && <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-0.5"><CheckCircle2 className="w-3 h-3" /></div>}
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
                          <button onClick={() => handleNext()} disabled={form.pastExperiences.length === 0} className="flex-1 bg-primary text-primary-foreground font-black py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50">
                            Continue <ArrowRight className="w-4 h-4" />
                          </button>
                       </div>
                    </motion.div>
                  )}

                  {/* STEP 4: Details */}
                  {!isPaid && step === 4 && (
                    <motion.form 
                      key="step4"
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

                  {/* STEP 5: Overview & Payment */}
                  {!isPaid && step === 5 && (
                    <motion.div 
                      key="step5"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col"
                    >
                       <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20 mb-6 space-y-4">
                          <div className="flex justify-between items-center pb-3 border-b border-primary/10">
                             <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Filtration Fee</span>
                             <span className="text-2xl font-black text-foreground">₹99 <span className="text-[10px] font-medium text-muted-foreground line-through ml-2">₹1999</span></span>
                          </div>
                          
                          <div className="space-y-2">
                             <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Selected Goals</p>
                             <div className="flex flex-wrap gap-1.5">
                               {form.goals.map(g => <span key={g} className="text-[10px] bg-background border border-border px-2 py-1 rounded-md">{g}</span>)}
                             </div>
                          </div>
                          <div className="space-y-2 pt-2">
                             <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Bottlenecks to solve</p>
                             <ul className="text-xs font-medium text-foreground leading-tight space-y-1 list-disc pl-4">
                               {form.painPoints.map((p, i) => <li key={i}>{p}</li>)}
                             </ul>
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
                            {isSubmitting ? "Initiating..." : "Pay ₹99 to Unlock Schedule"}
                            {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                          </button>
                       </div>
                       
                       <p className="mt-6 text-center text-[10px] text-muted-foreground font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                         <ShieldCheck className="w-4 h-4 text-primary" /> Verified Razorpay Payment gateway
                       </p>
                    </motion.div>
                  )}

                  {/* SUCCESS: Calendly Embed */}
                  {isPaid && (
                    <motion.div 
                      key="calendly"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full h-full min-h-[600px] flex flex-col pt-10 px-4 pb-6 relative"
                    >
                      <button onClick={closeBooking} className="absolute top-4 right-4 p-2 hover:bg-secondary rounded-full transition-colors z-30 shadow-md border border-border bg-background">
                         <X size={20} />
                      </button>

                      <div className="flex flex-col items-center justify-center mb-6 text-center z-20 shrink-0">
                         <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                           <CheckCircle2 className="w-8 h-8 text-green-500 animate-pulse" />
                         </div>
                         <h4 className="text-2xl font-black text-foreground">Success! Payment Received.</h4>
                         <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest border border-border/50 bg-secondary/50 px-4 py-2 rounded-full mt-3">Select your timezone and pick a slot below</p>
                      </div>
                      
                      <div 
                        className="calendly-inline-widget flex-1 w-full bg-card/50 rounded-2xl overflow-hidden shadow-2xl border border-border border-t-0" 
                        data-url="https://calendly.com/domsco-tech/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=2563eb"
                        style={{ minWidth: '100%', height: '100%', minHeight: '600px' }}
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

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Video, CalendarDays } from "lucide-react";
import { useRazorpay } from "react-razorpay";
import { supabase } from "@/lib/supabase";

export default function BookCall() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    painPoint: "",
    goal: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { Razorpay } = useRazorpay();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Book a Counseling Session | HastagCreator";
  }, []);

  const handlePaymentAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
            subject: `🚀 New Strategy Session Booking: ${form.name}`,
            name: form.name,
            email: form.email,
            phone: form.phone,
            message: `
New Counseling Session Request

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}

Main Pain Point:
${form.painPoint}

What they want to achieve:
${form.goal}
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
           // Optionally log order to supabase
           try {
              await supabase.from('orders').insert({
                 product_name: "Counseling Session",
                 amount: 99,
                 payment_id: response.razorpay_payment_id
              });
           } catch (e) {
             console.error("Order logging failed", e);
           }
           
           // Redirect to calendly finally
           window.location.href = "https://calendly.com/domsco-tech/30min?month=2026-03";
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#2563EB" }, // Primary blue
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
      // Don't set submitting to false immediately if the razorpay window is opening
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

           {/* Right side: Questionnaire & Payment */}
           <motion.div 
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             className="w-full lg:w-1/2"
           >
              <div className="bg-card border border-border/50 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
                 
                 <h2 className="text-2xl font-black mb-2 text-foreground tracking-tight">Step 1: Application</h2>
                 <p className="text-muted-foreground text-sm font-medium mb-8">Tell us about your brand so we come prepared.</p>
                 
                 <form onSubmit={handlePaymentAndSubmit} className="space-y-5 relative z-10">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-foreground uppercase tracking-wider">Name</label>
                          <input 
                            required
                            type="text"
                            value={form.name}
                            onChange={e => setForm({...form, name: e.target.value})}
                            className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none"
                            placeholder="John Doe"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-foreground uppercase tracking-wider">Phone</label>
                          <input 
                            required
                            type="tel"
                            value={form.phone}
                            onChange={e => setForm({...form, phone: e.target.value})}
                            className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none"
                            placeholder="+91 9999999999"
                          />
                       </div>
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-foreground uppercase tracking-wider">Email Address</label>
                       <input 
                         required
                         type="email"
                         value={form.email}
                         onChange={e => setForm({...form, email: e.target.value})}
                         className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none"
                         placeholder="founder@brand.com"
                       />
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-bold text-foreground uppercase tracking-wider flex justify-between">
                          What is your main pain point?
                       </label>
                       <textarea 
                         required
                         value={form.painPoint}
                         onChange={e => setForm({...form, painPoint: e.target.value})}
                         className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none resize-none h-24"
                         placeholder="E.g. Ads are not converting, CAC is too high, scaling issues..."
                       />
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-bold text-foreground uppercase tracking-wider">What do you want to achieve with us?</label>
                       <textarea 
                         required
                         value={form.goal}
                         onChange={e => setForm({...form, goal: e.target.value})}
                         className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none resize-none h-24"
                         placeholder="E.g. I want to build a better checkout flow, hit 5x ROAS..."
                       />
                    </div>
                    
                    <div className="pt-2">
                       <button 
                         type="submit" 
                         disabled={isSubmitting}
                         className="w-full bg-foreground text-background hover:bg-foreground/90 transition-all font-black text-sm md:text-base py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl hover:-translate-y-1"
                       >
                         {isSubmitting ? "Processing..." : "Continue to Pay ₹99 & Book Slot"}
                         {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                       </button>
                    </div>
                 </form>

                 <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground font-medium">
                    <ShieldCheck className="w-4 h-4 text-green-500" /> Secure Payments processed via Razorpay
                 </div>
              </div>
           </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

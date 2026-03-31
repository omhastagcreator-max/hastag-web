import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { ArrowRight, Globe2, Heart, Award, Cpu, Send } from "lucide-react";
import { motion } from "framer-motion";

const openRoles = [
  { id: 1, title: "Senior Performance Marketer", type: "Full-Time", location: "Remote (India)", dept: "Media Buying" },
  { id: 2, title: "CRO / Frontend Developer", type: "Full-Time", location: "Remote (Global)", dept: "Engineering" },
  { id: 3, title: "UGC Video Editor", type: "Contract", location: "Remote", dept: "Creative" },
  { id: 4, title: "D2C Brand Strategist", type: "Full-Time", location: "Mumbai / Hybrid", dept: "Strategy" },
];

export default function Careers() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Careers | Join HastagCreator (MNC Culture)";
  }, []);

  return (
    <div className="min-h-screen flex flex-col pt-20 bg-background">
      <Navbar />
      
      <main className="flex-1 overflow-hidden">
        {/* Core Hero Section */}
        <div className="relative pt-20 pb-24 md:pt-32 md:pb-32 border-b border-border/50">
           <div className="container-main px-4 relative z-10 max-w-5xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-8 border border-primary/20">
                 We are scaling aggressively.
              </span>
              
              <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-black tracking-tighter mb-8 leading-[1.05] text-foreground">
                 Do the best work of your <br className="hidden md:block" />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">Professional Life.</span>
              </h1>
              
              <p className="text-lg md:text-2xl text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed mb-12">
                 At HastagCreator, your growth trajectory is entirely in your hands. We foster a culture of rapid learning, aggressive skill acquisition, and relentless opportunity for those who deliver results.
              </p>

              <div className="flex justify-center gap-4">
                 <a href="#open-roles">
                   <button className="bg-foreground text-background px-8 py-5 rounded-full text-lg font-bold shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                     View Open Roles <ArrowRight className="w-5 h-5" />
                   </button>
                 </a>
              </div>
           </div>
        </div>

        {/* Growth & Learning Ecosystem */}
        <div className="py-24 bg-secondary/30">
           <div className="container-main px-4 max-w-6xl">
              <div className="text-center mb-16">
                 <h2 className="text-3xl md:text-5xl font-black mb-4">Growth & Learning Ecosystem.</h2>
                 <p className="text-muted-foreground text-lg">We invest heavily into your professional development. We don't want employees; we want masters of their craft.</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <div className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-sm relative group hover:shadow-card-hover transition-all">
                    <Globe2 className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold mb-2">Mastery & Mentorship</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">Work directly alongside senior strategists who manage 8-figure ad spends. We accelerate your learning curve through daily immersion in high-stakes campaigns.</p>
                 </div>
                 <div className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-sm relative group hover:shadow-card-hover transition-all">
                    <Award className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold mb-2">Aggressive Skilling</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">We don't do busywork. You will be put on the frontlines of complex projects designed to force rapid professional development and elite technical problem-solving.</p>
                 </div>
                 <div className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-sm relative group hover:shadow-card-hover transition-all">
                    <Heart className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold mb-2">Merit-Based Path</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">Your professional trajectory is purely determined by your performance. We fast-track those who continuously upskill and demonstrate a hunger for executing.</p>
                 </div>
                 <div className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-sm relative group hover:shadow-card-hover transition-all">
                    <Cpu className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold mb-2">Cutting-Edge Stack</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">Access exclusive, proprietary frameworks and the absolute cutting-edge tools defining modern performance marketing. Stay miles ahead of industry standards.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Open Roles & Application Portal */}
        <div id="open-roles" className="py-24 bg-background">
           <div className="container-main px-4 max-w-5xl">
              <div className="text-center mb-16">
                 <h2 className="text-3xl md:text-5xl font-black mb-4">Current Openings.</h2>
                 <p className="text-muted-foreground text-lg">Don't see a fit? Apply anyway. We always hire world-class talent regardless of open specs.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                 
                 {/* Roles List */}
                 <div className="space-y-4">
                    {openRoles.map((role) => (
                       <div 
                         key={role.id} 
                         onClick={() => setSelectedRole(role.title)}
                         className={`p-6 rounded-2xl border transition-all cursor-pointer ${selectedRole === role.title ? 'bg-primary/5 border-primary shadow-md' : 'bg-card border-border hover:border-foreground/30'}`}
                       >
                          <div className="flex justify-between items-start mb-2">
                             <h3 className="font-bold text-lg text-foreground">{role.title}</h3>
                             <span className="bg-secondary text-foreground text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{role.dept}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
                             <span>{role.type}</span>
                             <span className="w-1 h-1 bg-border rounded-full"></span>
                             <span>{role.location}</span>
                          </div>
                       </div>
                    ))}
                 </div>

                 {/* Application Form Component */}
                 <div className="bg-card p-8 md:p-10 rounded-3xl border border-border shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-primary to-blue-500"></div>
                    <h3 className="text-2xl font-black mb-2">Apply Now</h3>
                    <p className="text-sm text-muted-foreground mb-8">
                       {selectedRole ? `Applying for: ${selectedRole}` : "Select a role on the left, or submit a general application."}
                    </p>

                    <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Application Sent to HR Team!"); setSelectedRole(null); }}>
                       <div className="grid grid-cols-2 gap-4">
                          <input required type="text" placeholder="First Name" className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-sm font-medium" />
                          <input required type="text" placeholder="Last Name" className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-sm font-medium" />
                       </div>
                       <input required type="email" placeholder="Email Address" className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-sm font-medium" />
                       <input required type="url" placeholder="LinkedIn Profile URL" className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-sm font-medium" />
                       <input type="url" placeholder="Portfolio / Case Studies URL (Highly Recommended)" className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-sm font-medium" />
                       <textarea required rows={4} placeholder="Why should we hire you? What is your biggest quantifiable win?" className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-sm font-medium resize-none"></textarea>
                       
                       <button type="submit" className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-lg transition-all">
                          Submit Application <Send className="w-4 h-4 ml-1" />
                       </button>
                    </form>
                 </div>

              </div>
           </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}

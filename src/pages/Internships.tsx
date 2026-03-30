import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { CheckCircle, ExternalLink, ShieldCheck, Briefcase, TrendingUp, Users, HelpCircle } from "lucide-react";

const Internships = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-secondary/30">
        
        {/* Trust Header / Hero */}
        <section className="section-padding bg-gradient-to-b from-primary/10 via-primary/5 to-transparent border-b border-primary/10">
          <div className="container-main text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-800 font-semibold text-sm mb-6 shadow-sm border border-green-200">
              <ShieldCheck size={16} /> Verified Placement Partner
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-charcoal">
              Exclusive for Freshers: <br/> Secure Your First Career
            </motion.h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              We are a premier HR consulting firm dedicated to bridging the gap between freshers and reputed companies. We place college students and recent graduates based on raw skills, potential, and resume strength.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              <div className="flex items-center gap-2 text-charcoal flex-col">
                <span className="text-3xl font-black text-primary">50+</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Hiring Partners</span>
              </div>
              <div className="w-px h-12 bg-border hidden sm:block"></div>
              <div className="flex items-center gap-2 text-charcoal flex-col">
                <span className="text-3xl font-black text-primary">Resume</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Based Matching</span>
              </div>
              <div className="w-px h-12 bg-border hidden sm:block"></div>
              <div className="flex items-center gap-2 text-charcoal flex-col">
                <span className="text-3xl font-black text-primary">100%</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Verified Roles</span>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works (Transparency) */}
        <section className="section-padding py-16 bg-white">
          <div className="container-main">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How Our Process Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Complete transparency from day one. Here is exactly what happens after you register with us.</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Apply & Register", desc: "Fill out our secure Google Form with your resume and pay a nominal processing fee.", icon: Users },
                { step: "02", title: "Profile Screening", desc: "Our HR experts manually review your skills, resume, and career goals.", icon: CheckCircle },
                { step: "03", title: "Interview Prep", desc: "We guide you through industry expectations and prepare you for technical rounds.", icon: TrendingUp },
                { step: "04", title: "Placement", desc: "Get matched with our reputed partner network for paid internships or full-time roles.", icon: Briefcase },
              ].map((s, i) => (
                <div key={i} className="bg-secondary/50 p-6 rounded-2xl border border-border relative overflow-hidden group hover:border-primary/50 transition-colors">
                  <div className="absolute -right-4 -top-4 text-8xl font-black text-black/[0.03] group-hover:text-primary/[0.05] transition-colors">{s.step}</div>
                  <s.icon className="text-primary mb-4" size={32} />
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Student Testimonials (Authenticity) */}
        <section className="section-padding bg-white border-y border-border">
          <div className="container-main text-center">
            <h2 className="text-3xl font-bold mb-4">Recent Success Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-12">Don't just take our word for it. Hear from candidates who trusted our process and kickstarted their careers through our exact screening method.</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Rahul S.", role: "Placed as Business Analyst", text: "I was highly skeptical about the ₹199 processing fee. But their resume screening process is incredibly thorough. I received two interview calls and got placed in a reputed firm within 3 weeks!" },
                { name: "Priya M.", role: "Placed as HR Executive", text: "Their team didn't just forward my resume to companies; they actively helped me understand my weak points and prepared me specifically for the technical rounds. Highly genuine." },
                { name: "Amit K.", role: "Secured Paid Internship", text: "Getting a paid internship was extremely hard until I registered. The complete transparency and constant communication throughout the matching process is what makes them trustworthy." }
              ].map((t, i) => (
                <div key={i} className="bg-secondary/20 p-8 rounded-2xl border border-border text-left relative hover:shadow-md transition-shadow">
                  <div className="text-[#FFD700] mb-4 text-xl tracking-widest">
                    ★★★★★
                  </div>
                  <p className="text-sm italic text-muted-foreground leading-relaxed mb-6">"{t.text}"</p>
                  <div className="border-t border-border pt-4">
                    <h4 className="font-bold text-charcoal">{t.name}</h4>
                    <p className="text-xs text-primary font-semibold mt-0.5">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Value & Registration */}
        <section className="section-padding py-16 bg-slate-50">
          <div className="container-main max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              {/* Left Column: Transparency FAQ */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold mb-8">Why Candidates Trust Us</h2>
                <div className="space-y-6">
                  
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-border">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="text-primary mt-0.5 shrink-0" size={20} />
                      <div>
                        <h4 className="font-bold text-charcoal mb-1">Why is there a ₹199 processing fee?</h4>
                        <p className="text-sm text-muted-foreground">To maintain the high quality of our talent pool for our partner companies, the nominal fee ensures we only process serious candidates. It directly covers the administrative costs of our manual resume screening and profile curation.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl shadow-sm border border-border">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="text-primary mt-0.5 shrink-0" size={20} />
                      <div>
                        <h4 className="font-bold text-charcoal mb-1">Do I need prior experience?</h4>
                        <p className="text-sm text-muted-foreground">Absolutely not. This entire program is specifically designed for <b>freshers</b>, college students, and recent graduates with zero practical experience.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl shadow-sm border border-border">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="text-primary mt-0.5 shrink-0" size={20} />
                      <div>
                        <h4 className="font-bold text-charcoal mb-1">Are the companies verified?</h4>
                        <p className="text-sm text-muted-foreground">Yes. We strictly partner with registered, reputed organizations ranging from funded startups to established enterprises across India, ensuring your career starts in a safe, professional environment.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl shadow-sm border border-border">
                    <div className="flex items-start gap-3">
                      <Briefcase className="text-primary mt-0.5 shrink-0" size={20} />
                      <div>
                        <h4 className="font-bold text-charcoal mb-1">What kind of roles do you offer?</h4>
                        <p className="text-sm text-muted-foreground">As a general HR consultancy, we match candidates across IT, Marketing, Operations, HR, and Sales. If your resume has the potential, we will find the right desk for you to sit at.</p>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>

              {/* Right Column: Registration Card */}
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-primary/10 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-[hsl(0,100%,70%)]"></div>
                  
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                      <ShieldCheck size={24} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Official Registration</h3>
                    <p className="text-muted-foreground text-sm">Fill out the secure Google Form to begin your placement journey.</p>
                  </div>
                  
                  <div className="bg-slate-50 p-5 rounded-2xl mb-8 border border-slate-200 text-center">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">One-Time Processing Fee</div>
                    <div className="text-4xl font-black text-charcoal mb-1">₹199</div>
                    <p className="text-[11px] text-slate-400 font-medium">100% Secure & Transparent Process</p>
                  </div>

                  <a 
                    href="https://forms.gle/nDBDaEfnMe16mXHY6" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex justify-center items-center gap-2 w-full bg-charcoal text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:bg-black transition-all group"
                  >
                    Proceed to Registration <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>

                  <p className="text-center text-xs text-muted-foreground mt-5 flex items-center justify-center gap-1.5">
                    <ShieldCheck size={14} className="text-green-600" /> Information is kept strictly confidential.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Internships;

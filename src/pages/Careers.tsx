import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Rocket, BookOpen, DollarSign, Globe, MapPin } from "lucide-react";
import { useState } from "react";

const values = [
  { icon: Rocket, title: "Real Responsibility", desc: "No busy work. You'll own campaigns and strategy from day one." },
  { icon: BookOpen, title: "Constant Learning", desc: "Weekly workshops, ad platform certifications, and mentorship." },
  { icon: DollarSign, title: "Competitive Pay", desc: "Market-rate salaries plus performance bonuses tied to client results." },
  { icon: Globe, title: "Global Campaigns", desc: "Work on campaigns across 20+ countries and diverse industries." },
];

const roles = [
  { title: "Paid Ads Specialist", type: "Full-Time", desc: "Manage Meta & Google Ads campaigns for our global client portfolio." },
  { title: "Content Strategist", type: "Full-Time", desc: "Create ad copy, landing page content, and marketing collateral." },
  { title: "Web Designer", type: "Contract", desc: "Design high-converting landing pages and websites for clients." },
  { title: "Digital Marketing Intern", type: "Internship", desc: "Learn performance marketing hands-on with real campaigns and budgets." },
];

const Careers = () => {
  const [form, setForm] = useState({ name: "", email: "", role: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="section-padding bg-secondary">
          <div className="container-main text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl mb-4">Build Your Career at HastagCreator</motion.h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Join a fast-growing global team of marketers, designers, and strategists who are passionate about driving real results.</p>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding">
          <div className="container-main">
            <h2 className="text-3xl text-center mb-12">Why Work With Us</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-6 shadow-card border-l-4 border-transparent hover:border-primary transition-all">
                  <v.icon className="text-primary mb-4" size={28} />
                  <h3 className="text-lg mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Roles */}
        <section className="section-padding bg-secondary">
          <div className="container-main">
            <h2 className="text-3xl text-center mb-12">Open Positions</h2>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {roles.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-6 shadow-card">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg">{r.title}</h3>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">{r.type}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{r.desc}</p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin size={12} /> Remote / Global
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Internship Banner */}
        <section className="section-padding pt-0 bg-secondary">
          <div className="container-main">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl p-8 sm:p-12 border border-primary/20 text-center max-w-4xl mx-auto shadow-sm">
              <h2 className="text-3xl font-bold mb-4">Looking for an Internship or Placement?</h2>
              <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
                We act as a trusted HR consultancy, placing talented students and professionals in reputed companies based on their unique skills and resume.
              </p>
              <a href="/careers/internships" className="inline-block bg-primary text-primary-foreground py-3 px-8 rounded-full font-semibold hover:scale-105 transition-transform shadow-md">
                View Opportunities & Register
              </a>
            </motion.div>
          </div>
        </section>

        {/* Application Form */}
        <section className="section-padding">
          <div className="container-main max-w-2xl">
            <h2 className="text-3xl text-center mb-10">Apply Now</h2>
            {submitted ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-card rounded-2xl p-12 shadow-card text-center">
                <h3 className="text-2xl text-primary mb-2">Application Received! 🎉</h3>
                <p className="text-muted-foreground">We'll review your application and get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="bg-card rounded-2xl p-8 shadow-card space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <input required placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  <input required type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option value="">Position Applying For</option>
                  {roles.map((r) => <option key={r.title}>{r.title}</option>)}
                </select>
                <textarea placeholder="Tell us about yourself..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-gradient-to-r from-primary to-[hsl(0,100%,63%)] text-primary-foreground py-4 rounded-full font-semibold shadow-lg">
                  Submit Application
                </motion.button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Careers;

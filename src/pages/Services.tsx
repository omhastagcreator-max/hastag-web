import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesGrid from "@/components/ServicesGrid";
import { useEffect } from "react";

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "D2C Scaling Services & High-Converting Infrastructure | HastagCreator";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
       metaDesc.setAttribute("content", "Explore our performance-driven D2C growth services. From meta ad scaling and AI-engineered UGC scripts to high-conversion Web Development.");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Navbar />
      <main className="flex-1">
        <div className="bg-muted/30 border-b border-border/50 py-16 md:py-24">
           <div className="container-main max-w-4xl text-center px-4">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-6 inline-block">Direct-Response Engineering</span>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Execution Engines That Print Revenue.</h1>
              <p className="text-muted-foreground font-medium text-lg">We don't sell 'deliverables.' We sell customer acquisition systems. Browse our performance-first capabilities engineered strictly for D2C scaling.</p>
           </div>
        </div>

        <ServicesGrid />

        <div className="container-main px-4 pb-24 text-center">
           <div className="bg-primary/5 border border-primary/20 rounded-3xl p-12 max-w-4xl mx-auto shadow-sm">
              <h2 className="text-3xl font-black mb-4">Ready to violently scale your ROAS?</h2>
              <p className="text-muted-foreground mb-8">Stop paying for vanity metrics. Get a free performance audit today.</p>
              <a href="/contact" className="inline-block bg-primary text-primary-foreground font-black px-8 py-4 rounded-xl shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">Book Your Growth Strategy Call</a>
           </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

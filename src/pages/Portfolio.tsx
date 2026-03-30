import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardResultsSection from "@/components/DashboardResultsSection";
import CaseStudySnapshot from "@/components/CaseStudySnapshot";
import WhatsAppTestimonials from "@/components/WhatsAppTestimonials";
import { motion } from "framer-motion";

const Portfolio = () => {
  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="container-main relative z-10 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-primary">
                Our Proven Results
              </h1>
              <p className="text-xl text-muted-foreground font-medium">
                We don't just talk. We deliver immense scaling for D2C brands. Here is the undeniable proof.
              </p>
            </motion.div>
          </div>
        </section>

        <DashboardResultsSection />
        <CaseStudySnapshot />
        <WhatsAppTestimonials />
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;

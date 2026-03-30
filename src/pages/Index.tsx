import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import LeadForm from "@/components/LeadForm";
import FAQ from "@/components/FAQ";
import GoogleReviews from "@/components/GoogleReviews";
import DashboardResultsSection from "@/components/DashboardResultsSection";
import NetworkStats from "@/components/NetworkStats";
import CaseStudySnapshot from "@/components/CaseStudySnapshot";
import HowItWorks from "@/components/HowItWorks";
import FounderSection from "@/components/FounderSection";
import Testimonial from "@/components/Testimonial";
import WhatsAppTestimonials from "@/components/WhatsAppTestimonials";
import TrustedBrands from "@/components/TrustedBrands";
import OfficialPartners from "@/components/OfficialPartners";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <TrustedBrands />
      <CaseStudySnapshot />
      <HowItWorks />
      
      {/* Dynamic Banner Section */}
      <section className="py-12 bg-background border-y border-border/40">
        <div className="container-main">
          <img src="/banner.png" alt="HashtagCreator Scale Banner" className="w-full h-auto rounded-3xl shadow-2xl border border-border/50 object-cover" />
        </div>
      </section>

      <ServicesGrid />
      <DashboardResultsSection />
      <NetworkStats />
      <WhatsAppTestimonials />
      <WhyChooseUs />
      <GoogleReviews />
      <Testimonial />
      <Process />
      
      {/* Products CTA Replacing Pricing */}
      <section className="py-24 bg-primary/5 relative">
        <div className="container-main text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-foreground">
            Explore Our Premium Arsenal
          </h2>
          <p className="text-lg text-muted-foreground font-medium mb-10 max-w-2xl mx-auto">
            Instead of standard pricing tiers, we offer proprietary D2C data packs, influencer lists, and advanced scaling audits right in our shop.
          </p>
          <Link to="/products">
            <button className="bg-foreground text-background px-10 py-5 rounded-full text-lg font-bold shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center mx-auto gap-3">
              View All Products <ArrowRight className="w-5 h-5"/>
            </button>
          </Link>
        </div>
      </section>

      <LeadForm />
      <FAQ />
      <OfficialPartners />
    </main>
    <Footer />
  </>
);

export default Index;

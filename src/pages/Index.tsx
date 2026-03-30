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
      <Process />

      <LeadForm />
      <FAQ />
      <OfficialPartners />
    </main>
    <Footer />
  </>
);

export default Index;

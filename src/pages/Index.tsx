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
import StarterPlanCTA from "@/components/StarterPlanCTA";
import CaseStudySnapshot from "@/components/CaseStudySnapshot";
import HowItWorks from "@/components/HowItWorks";
import FounderSection from "@/components/FounderSection";
import Testimonial from "@/components/Testimonial";
import WhatsAppTestimonials from "@/components/WhatsAppTestimonials";

const Index = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <CaseStudySnapshot />
      <HowItWorks />
      <ServicesGrid />
      <DashboardResultsSection />
      <WhatsAppTestimonials />
      <WhyChooseUs />
      <GoogleReviews />
      <Testimonial />
      <StarterPlanCTA />
      <Process />
      <Pricing />
      <LeadForm />
      <FAQ />
    </main>
    <Footer />
  </>
);

export default Index;

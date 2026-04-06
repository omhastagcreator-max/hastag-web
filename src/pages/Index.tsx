import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
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
import PerformanceMarketingGlimpse from "@/components/PerformanceMarketingGlimpse";
import InfluencerMarketingGlimpse from "@/components/InfluencerMarketingGlimpse";
import WebDevelopmentGlimpse from "@/components/WebDevelopmentGlimpse";
import MarketingBreakdown from "@/components/MarketingBreakdown";
import HowItWorks from "@/components/HowItWorks";
import FounderSection from "@/components/FounderSection";
import Testimonial from "@/components/Testimonial";
import WhatsAppTestimonials from "@/components/WhatsAppTestimonials";
import TrustedBrands from "@/components/TrustedBrands";
import OfficialPartners from "@/components/OfficialPartners";
import ScarcityBanner from "@/components/ScarcityBanner";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  useEffect(() => {
    // Other effects if necessary, or empty out
  }, []);

  return (
    <>
      <Navbar />
      <ScarcityBanner />
    <main>
      <HeroSection />
      <TrustedBrands />
      <CaseStudySnapshot />
      <PerformanceMarketingGlimpse />
      <InfluencerMarketingGlimpse />
      <HowItWorks />
      
      <WebDevelopmentGlimpse />
      <DashboardResultsSection />
      <NetworkStats />
      <WhatsAppTestimonials />
      <WhyChooseUs />
      <GoogleReviews />
      <Testimonial />

      <LeadForm />
      <FAQ />
      <OfficialPartners />
    </main>
      <Footer />
    </>
  );
};

export default Index;

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
import OfficialPartners from "@/components/OfficialPartners";
import PerformanceMarketingGlimpse from "@/components/PerformanceMarketingGlimpse";
import InfluencerMarketingGlimpse from "@/components/InfluencerMarketingGlimpse";
import WebDevelopmentGlimpse from "@/components/WebDevelopmentGlimpse";
import MarketingBreakdown from "@/components/MarketingBreakdown";
import HowItWorks from "@/components/HowItWorks";
import WhatsAppTestimonials from "@/components/WhatsAppTestimonials";
import TrustedBrands from "@/components/TrustedBrands";
import ScarcityBanner from "@/components/ScarcityBanner";
import FounderSection from "@/components/FounderSection";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  useEffect(() => {
    // Other effects if necessary, or empty out
  }, []);

  return (
    <>
      <Navbar />
    <main>
      <HeroSection />
      <TrustedBrands />
      <CaseStudySnapshot />
      <PerformanceMarketingGlimpse />
      <InfluencerMarketingGlimpse />
      <NetworkStats />
      <HowItWorks />
      
      <WebDevelopmentGlimpse />
      <MarketingBreakdown />
      <DashboardResultsSection />
      <WhatsAppTestimonials />
      <WhyChooseUs />
      <GoogleReviews />

      <Process />
      <Pricing />
      <OfficialPartners />

      <LeadForm />
      <FAQ />
    </main>
      <Footer />
    </>
  );
};

export default Index;

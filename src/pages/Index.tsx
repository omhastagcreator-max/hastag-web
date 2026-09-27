import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { smoothScrollToElement } from "@/components/AuditCTA";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import LeadForm from "@/components/LeadForm";
import TrustedBrands from "@/components/TrustedBrands";
import PerformanceMarketingGlimpse from "@/components/PerformanceMarketingGlimpse";
import InfluencerMarketingGlimpse from "@/components/InfluencerMarketingGlimpse";
import NetworkStats from "@/components/NetworkStats";
import HowItWorks from "@/components/HowItWorks";
import WebDevelopmentGlimpse from "@/components/WebDevelopmentGlimpse";
import MarketingBreakdown from "@/components/MarketingBreakdown";
import WhatsAppTestimonials from "@/components/WhatsAppTestimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import DashboardResultsSection from "@/components/DashboardResultsSection";
import GoogleReviews from "@/components/GoogleReviews";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import FAQ from "@/components/FAQ";

/**
 * Homepage = D2C lead-generation funnel.
 * Every primary CTA scrolls to the lead form directly below the hero (#audit-form).
 */
const Index = () => {
  const { hash } = useLocation();

  // Arriving from another page via /#audit-form (or any in-page anchor)
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const t = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) smoothScrollToElement(el);
    }, 400);
    return () => window.clearTimeout(t);
  }, [hash]);

  return (
    <>
      {/* 1. Navbar */}
      <Navbar />
      <main>
        {/* 2. Hero + primary CTA */}
        <HeroSection />

        {/* 3. Lead form */}
        <section className="px-0 pb-12 md:pb-20 bg-background">
          <div className="container-main max-w-3xl">
            <LeadForm id="audit-form" location="after_hero" />
          </div>
        </section>

        {/* 4. Brand logos / trust */}
        <TrustedBrands />

        {/* 5. Problem / funnel explanation */}
        <PerformanceMarketingGlimpse />

        {/* 6. Ads problem */}
        <InfluencerMarketingGlimpse />

        {/* 7. Experience + verified numbers */}
        <NetworkStats />

        {/* 8. How we work */}
        <HowItWorks />

        {/* 9. Website / conversion */}
        <WebDevelopmentGlimpse />

        {/* 10. Scaling */}
        <MarketingBreakdown />

        {/* 11. Real WhatsApp proof */}
        <WhatsAppTestimonials />

        {/* 12. Why we're different */}
        <WhyChooseUs />

        {/* 13. Case studies / results */}
        <DashboardResultsSection />

        {/* 14. Testimonials */}
        <GoogleReviews />

        {/* 15. Pricing */}
        <Pricing />

        {/* 16. Final CTA + lead form */}
        <FinalCTA />

        {/* 17. FAQ */}
        <FAQ />
      </main>
      {/* 18. WhatsApp support + 19. Footer */}
      <Footer />
    </>
  );
};

export default Index;

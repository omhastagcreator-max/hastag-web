import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";
import Portfolio from "./pages/Portfolio.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import Admin from "./pages/Admin.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import Terms from "./pages/Terms.tsx";
import Services from "./pages/Services.tsx";
import InfluencerUGC from "./pages/InfluencerUGC.tsx";
import WebDevelopment from "./pages/WebDevelopment.tsx";
import PerformanceMarketing from "./pages/PerformanceMarketing.tsx";
import Careers from "./pages/Careers.tsx";
import BookCall from "./pages/BookCall.tsx";
import WhatsAppButton from "@/components/WhatsAppButton";
import CustomCursor from "@/components/CustomCursor";
import MobileBottomNav from "@/components/MobileBottomNav";
import MobileScarcityWidget from "@/components/MobileScarcityWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CustomCursor />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services" element={<Services />} />
          <Route path="/web-development" element={<WebDevelopment />} />
          <Route path="/performance-marketing" element={<PerformanceMarketing />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/influencer-ugc" element={<InfluencerUGC />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/book-call" element={<BookCall />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppButton />
        <div className="fixed top-1/2 -translate-y-1/2 right-2 z-40 w-[200px] md:hidden pointer-events-auto shadow-2xl rounded-xl">
          <MobileScarcityWidget />
        </div>
        <MobileBottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

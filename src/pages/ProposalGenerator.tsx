import React, { useState, useEffect } from "react";
import ProposalForm from "@/components/proposal/ProposalForm";
import ProposalPreview from "@/components/proposal/ProposalPreview";
import { ProposalData } from "@/templates/ProposalTemplate";
import { Button } from "@/components/ui/button";

const defaultData: ProposalData = {
  clientName: "DEBMALYA",
  clientPhone: "",
  clientEmail: "debmalya@example.com",
  projectOverview: "This project involves designing a modern and user-friendly Landing page for Debmalya to enhance his online presence and improve user engagement",
  pagesOverview: [
    "1.Home Page: Hero banner, featured work, CTA (Book a Session).",
    "2.AboutMe: Personal story, achievements, experience.",
    "3.Services & Pricing: Packages with pricing, client testimonials.",
    "4.Contact: Contact form, WhatsApp chat, email/phone/social links."
  ],
  pagesNote: "*Each page: WhatsApp popup for inquiries.\n*Testimonial on Home and Contact Page\n\nNote: Certain sections will feature animations for better user experience.",
  paymentCost: "₹8000/-",
  paymentSchedule: [
    "25%-Advance",
    "25%- After final revision",
    "50%- At the time of going live"
  ],
  contactInfo: "+91 9450010826",
  references: [
    { title: "Reference 1.", url: "#" },
    { title: "Reference 2.", url: "#" }
  ],
  addedValue: [
    "Hosting – (Fast & Secure)",
    "Domain – 1 Year **FREE** (yournamephotography.com or similar)",
    "SEO – 1 Months **FREE** (to help your website rank for industry keywords)",
    "Lifetime Support"
  ],
  timeline: [
    "Design & Development: 3-7 days",
    "SEO Kickstart: Immediately after launch"
  ],
  notes: [
    "The client is responsible for providing all necessary details, photos/graphics, vision, goals, and timely feedback during the development process.",
    "Delays in providing any of these items may affect the project timeline, and we cannot be held responsible for resulting delays."
  ]
};

const ProposalGenerator = () => {
  const [data, setData] = useState<ProposalData>(() => {
    const saved = localStorage.getItem("proposalData");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultData;
      }
    }
    return defaultData;
  });

  useEffect(() => {
    localStorage.setItem("proposalData", JSON.stringify(data));
  }, [data]);

  const resetForm = () => {
    if (window.confirm("Are you sure you want to reset to default?")) {
      setData(defaultData);
      localStorage.removeItem("proposalData");
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      <header className="flex justify-between items-center p-4 border-b bg-white shrink-0">
        <h1 className="text-xl font-bold">Proposal Generator</h1>
        <Button variant="outline" onClick={resetForm}>Reset to Default</Button>
      </header>
      
      <main className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Form */}
        <section className="h-full overflow-y-auto border-r p-6 bg-white">
          <ProposalForm data={data} onChange={setData} />
        </section>

        {/* Right Side: Live Preview */}
        <section className="h-full overflow-y-auto bg-gray-100 p-6 flex items-start justify-center">
          <ProposalPreview data={data} />
        </section>
      </main>
    </div>
  );
};

export default ProposalGenerator;

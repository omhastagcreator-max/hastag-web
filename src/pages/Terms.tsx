import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Scale } from "lucide-react";
import { useEffect } from "react";

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Navbar />
      <main className="flex-1">
        <div className="bg-muted/30 border-b border-border/50 py-16 md:py-24">
           <div className="container-main max-w-4xl text-center px-4">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-6 inline-block">Legal Compliance</span>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Terms & Conditions <Scale className="inline-block w-10 h-10 md:w-12 md:h-12 text-primary" /></h1>
              <p className="text-muted-foreground font-medium text-lg">Strict guidelines and legal requirements enforcing the mutual boundaries for all agency and performance marketing services.</p>
           </div>
        </div>

        <div className="container-main max-w-4xl px-4 py-16 md:py-24">
           <div className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none font-medium leading-relaxed">
              
              <h2 className="text-2xl font-black text-foreground mt-12 mb-4">Acceptance of Terms</h2>
              <p>By using the Website, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you should not use the Website.</p>
              
              <h2 className="text-2xl font-black text-foreground mt-12 mb-4">Intellectual Property</h2>
              <p>All content on the Website, including but not limited to text, graphics, logos, images, audio clips, video clips, data compilations, and software, is the property of the Company or its content suppliers and is protected by copyright, trademark, and other intellectual property laws. You may not use, reproduce, distribute, modify, or create derivative works of any content on the Website without the prior written consent of the Company.</p>

              <h2 className="text-2xl font-black text-foreground mt-12 mb-4">1. MSME Registration & Legal Standing</h2>
              <p>Hastag Creator is a registered Micro Enterprise under the Micro, Small and Medium Enterprises Development Act, 2006 (MSMED Act), recognized by the Government of Maharashtra. As per this Act:</p>
              <ul>
                 <li>All clients (domestic or international) are legally bound to make payments within 45 days of invoice issuance.</li>
                 <li>Any delay beyond this period shall attract compound interest at three times the RBI’s notified bank rate, as per Section 16 of the MSMED Act.</li>
                 <li>Disputes related to delayed payments shall be resolved through the Micro and Small Enterprises Facilitation Council (MSEFC), Maharashtra, whose decisions are enforceable as civil court decrees.</li>
              </ul>

              <h2 className="text-2xl font-black text-foreground mt-12 mb-4">2. Non-Refundable Service Policy (Indian Contract Act, 1872)</h2>
              <p>By engaging with Hastag Creator, the client agrees to the following:</p>
              <ul>
                 <li>All advance payments are strictly non-refundable once the project has commenced or resources have been allocated.</li>
                 <li>Consultancy services, once initiated (including strategic planning, campaign setup, or advisory calls), are deemed delivered and are non-refundable, regardless of campaign performance or client satisfaction.</li>
                 <li>These terms are enforceable under the Indian Contract Act, 1872, and are binding upon all parties.</li>
              </ul>

              <h2 className="text-2xl font-black text-foreground mt-12 mb-4">3. Digital Agreements & Communication Validity</h2>
              <p>All contracts, approvals, and communications via email, WhatsApp, or digital signature are legally valid under the Information Technology Act, 2000. Clients acknowledge that digital acceptance (via email or e-signature) constitutes full legal consent to the terms of service.</p>

              <h2 className="text-2xl font-black text-foreground mt-12 mb-4">4. Jurisdiction & Dispute Resolution</h2>
              <p>All disputes, claims, or legal proceedings shall be subject to the exclusive jurisdiction of the courts in Maharashtra, India. Clients, including those based outside India, waive any right to initiate legal action in foreign jurisdictions. In case of any dispute, the matter shall first be referred to the MSE Facilitation Council, Maharashtra, as per Section 18 of the MSMED Act, which overrides any arbitration or foreign dispute clause.</p>

              <h2 className="text-2xl font-black text-foreground mt-12 mb-4">5. International Client Compliance</h2>
              <p>All international clients agree that Indian laws shall govern the contract. No foreign court or arbitration body shall have jurisdiction over disputes with Hastag Creator. Any attempt to initiate legal action outside India shall be considered a breach of contract and subject to counter-litigation in India.</p>

              <h2 className="text-2xl font-black text-foreground mt-12 mb-4">6. Service Delivery & Client Responsibility</h2>
              <p>Clients are responsible for providing timely approvals, creative assets, and feedback. Delays or dissatisfaction arising from client-side inaction or miscommunication shall not be grounds for refund or legal claim. Hastag Creator shall not be held liable for third-party platform issues (e.g., Meta Ads, Google Ads policy changes or account suspensions).</p>

              <h2 className="text-2xl font-black text-foreground mt-12 mb-4">7. Force Majeure</h2>
              <p>Hastag Creator shall not be liable for any failure or delay in service delivery due to events beyond its control, including but not limited to natural disasters, government restrictions, platform outages, or cyberattacks.</p>

              <h2 className="text-2xl font-black text-foreground mt-12 mb-4">8. Right to Refuse Service and Account Termination</h2>
              <p>Hastag Creator reserves the absolute right, at its sole discretion, to refuse service to any individual, business, or entity, whether domestic or international, without the obligation to provide a reason, especially in cases involving non-compliance with our Terms & Conditions, unethical behavior, or misalignment with our business values.</p>

              <h2 className="text-2xl font-black text-foreground mt-12 mb-4">Refund Policy Overview</h2>
              <p>At Hashtag Creator, we are committed to delivering high-quality influencer and digital marketing services. Please carefully review our policy regarding refunds, service expectations, and continuity of service:</p>
              <ol className="list-decimal pl-6 space-y-2">
                 <li><strong>No Refund Policy:</strong> We do not offer refunds for any of our services under any circumstances. This includes monetary refunds, credits, or any other form of compensation.</li>
                 <li><strong>Service Commitment:</strong> We pledge to execute all contracted services with the utmost professionalism, expertise, and diligence.</li>
                 <li><strong>Issue Resolution:</strong> In the event of any concerns or dissatisfaction, we encourage clients to contact our support team promptly. While we cannot provide refunds, we will work to offer valuable solutions and alternatives within the scope of the contracted services.</li>
                 <li><strong>Estimated ROAS:</strong> Any Return on Ad Spend (ROAS) figures or results provided in proposals, calls, emails, or any other form of communication are estimates based on our experience. These estimates are not guarantees of performance.</li>
                 <li><strong>No Guaranteed Results:</strong> We do not guarantee specific outcomes or results. Even platforms like Facebook do not provide guarantees on ROAS or performance metrics.</li>
                 <li><strong>Performance Factors:</strong> Multiple factors influence campaign performance, many of which are beyond our control. We strive to optimize campaigns based on our expertise and industry best practices.</li>
                 <li><strong>Ad Spend Responsibility:</strong> Clients are solely responsible for their ad spend. If a client runs out of funds for ad spend or is unable to continue services for any reason, they will not be eligible for any retention offers, refunds, or compensation.</li>
              </ol>

              <p className="mt-8 text-sm text-muted-foreground border-l-4 border-primary pl-4">Disclaimer: The Website and its content are provided on an "as is" and "as available" basis, without warranties of any kind. Validated under the MSME Development Act, 2006. Last updated 1st January 2025.</p>

           </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck } from "lucide-react";
import { useEffect } from "react";

export default function PrivacyPolicy() {
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
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Privacy Policy <ShieldCheck className="inline-block w-10 h-10 md:w-12 md:h-12 text-primary" /></h1>
              <p className="text-muted-foreground font-medium text-lg">Detailed information on how HastagCreator globally processes, protects, and evaluates your personal business data.</p>
           </div>
        </div>

        <div className="container-main max-w-4xl px-4 py-16 md:py-24">
           <div className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none font-medium leading-relaxed">
              
              <h2 className="text-2xl font-black text-foreground mt-12 mb-4">Information We Collect</h2>
              <p><strong>Personal Information:</strong> We may collect personal information such as your name, email address, phone number, and mailing address when you sign up for our services or communicate with us.</p>
              <p><strong>Payment Information:</strong> We may collect payment information, such as credit card numbers, when you make a payment for our services.</p>
              <p><strong>Marketing Information:</strong> We may collect marketing information such as your social media handle, number of followers, and engagement rates when you sign up for our influencer marketing services. We may use your marketing information to match you with brands and campaigns that fit your profile and interests, connect you with brands for sponsored content opportunities, measure the performance of campaigns you participate in.</p>
              <p><strong>Usage Information:</strong> We may collect usage information such as your IP address, browser type, and device type when you access our website or use our services. We may use your usage information to monitor and analyze website usage, detect and prevent fraud and other security incidents.</p>

              <h2 className="text-2xl font-black text-foreground mt-12 mb-4">How we use your Information</h2>
              <p>We may use your personal information to, provide our services to you, process your payments, communicate with you about our services, improve our services and user experience. We may share your personal information with third-party service providers who help us provide our services. These service providers are contractually obligated to keep your information confidential and secure. We may share your marketing information with brands who are interested in working with you. We only share information that is necessary for them to evaluate your fit for their campaign. We may also share your information in response to legal processes, such as a court order or subpoena.</p>

              <h2 className="text-2xl font-black text-foreground mt-12 mb-4">Your Choices</h2>
              <p>You may opt out of receiving marketing communications from us by clicking the "unsubscribe" link in our emails. You may also update or correct your personal information by contacting us at contact@hastagcreator.com.</p>

              <h2 className="text-2xl font-black text-foreground mt-12 mb-4">Data Security</h2>
              <p>We take reasonable measures to protect your personal information from unauthorized access, use, and disclosure. We use industry-standard security technologies, such as firewalls and SSL encryption, to protect your data.</p>

              <h2 className="text-2xl font-black text-foreground mt-12 mb-4">Changes to Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time. We will post the updated policy on our website, and the changes will be effective immediately.</p>

              <h2 className="text-2xl font-black text-foreground mt-12 mb-4">Contact Us</h2>
              <p>If you have any questions or concerns about this Privacy Policy, please contact us at <strong>contact@hastagcreator.com</strong></p>
              <p className="mt-8 text-sm text-muted-foreground border-l-4 border-primary pl-4">Welcome to our Sales-Oriented Influencer Marketing Company! Our Journey started in 2014.</p>

           </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

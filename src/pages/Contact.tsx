import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import { motion } from "framer-motion";
import { Mail, MessageCircle, MapPin } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email Us", value: "hello@hastagcreator.com" },
  { icon: MessageCircle, label: "WhatsApp / Phone", value: "+91 9450010826" },
  { icon: MapPin, label: "Location", value: "Greater Noida, UP" },
];

const Contact = () => (
  <>
    <Navbar />
    <main className="pt-16">
      <section className="section-padding">
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl mb-4">Let's Grow Your Business Together</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">Get in touch for a free marketing audit. No commitments, no pressure — just actionable insights.</p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-8">
              {contactInfo.map((c, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <c.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{c.label}</p>
                    <p className="text-muted-foreground text-sm">{c.value}</p>
                  </div>
                </div>
              ))}
              <div className="bg-secondary rounded-2xl p-6 mt-8">
                <h3 className="text-lg mb-2">Why Choose HastagCreator?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Transparent reporting & communication</li>
                  <li>✓ No long-term contracts required</li>
                  <li>✓ Dedicated account manager</li>
                  <li>✓ Results within 30 days or we work free</li>
                </ul>
              </div>
            </motion.div>

            {/* Form */}
            <div className="lg:col-span-3">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Contact;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";

const ThankYou = () => {

  useEffect(() => {
    // Fire Purchase event when page loads
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq('track', 'Purchase', {
        value: 1999,
        currency: 'INR'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center pt-24 pb-16 section-padding">
        <div className="container-main max-w-2xl">

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="bg-card rounded-3xl p-10 md:p-14 shadow-card-hover text-center border border-border"
          >

            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Thank You! 🎉
            </h1>
            
            <p className="text-lg md:text-xl text-foreground font-medium mb-4">
              Your payment has been successfully received.
            </p>
            
            <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
              Our team is reviewing your details. We will contact you within 
              <strong> 24 hours </strong> to start your growth plan.
            </p>
            
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-primary/50 transition-all"
              >
                Return to Homepage
              </motion.button>
            </Link>

          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;

import { useState, useEffect } from "react";
// ADMIN NOTE: To sync automatically with your old WooCommerce site without exporting CSVs,
// simply point a Node script or edge function to: `https://your-old-site.com/wp-json/wc/v3/products`
// and save the JSON response to `public/products.json`, or fetch it directly here by replacing
// `fetch("/products.csv")` with your WP REST API URL (assuming CORS allows it).

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Papa from "papaparse";
import { useRazorpay } from "react-razorpay";
import { ShoppingCart, CalendarRange } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { Razorpay } = useRazorpay();

  useEffect(() => {
    // Attempt to load CSV. If it doesn't exist, handle gracefully
    fetch("/products.csv")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No products.csv found");
        }
        return response.text();
      })
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsed = results.data.map((row: any, i) => ({
              id: row.id || `prod-${i}`,
              name: row.name || "Unknown Product",
              description: row.description || "Incredible digital asset.",
              price: parseFloat(row.price) || 999,
              image: row.image || "/placeholder.svg",
            }));
            setProducts(parsed);
            setLoading(false);
          },
        });
      })
      .catch((err) => {
        console.warn("Could not load products:", err);
        // Fallback or empty state
        setLoading(false);
      });
  }, []);

  const handleCheckout = (product: Product) => {
    // Mock Razorpay integration without real key.
    // Replace the key with actual Razorpay Key ID from user
    const options = {
      key: "rzp_test_YourKeyGoesHere", // Replace this dynamically if via env
      amount: (product.price * 100).toString(), // Razorpay expects paise
      currency: "INR",
      name: "HastagCreator",
      description: `Purchase of ${product.name}`,
      handler: function (response: any) {
        alert("Payment Successful! Mock Ref: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Acme Corp",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#2563EB", // Matches primary var
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Navbar />
      
      <main className="flex-1 pb-24">
        {/* Header */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="container-main relative z-10 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-sm">
                Premium Resources & Audits
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-medium">
                Unlock our exclusive sales frameworks, audit checklists, and proprietary tools that generated over 11+ Crores in sales.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Shop Grid */}
        <section className="container-main">
          {loading ? (
            <div className="text-center py-20 text-muted-foreground animate-pulse">
              Loading Catalog...
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-2xl border border-border shadow-sm">
              <h3 className="text-2xl font-bold mb-2">Catalog Empty</h3>
              <p className="text-muted-foreground">Upload a products.csv to the public folder to see products here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {products.map((p, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden shadow-card group hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="aspect-[4/3] bg-muted/50 overflow-hidden relative">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 bg-background text-foreground font-black px-3 py-1.5 rounded-full text-sm shadow-md border border-border">
                      ₹{p.price.toLocaleString("en-IN")}
                    </div>
                  </div>
                  <div className="p-4 md:p-6 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-sm md:text-xl font-bold mb-2 line-clamp-1">{p.name}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 mt-auto">
                      <button 
                        onClick={() => handleCheckout(p)}
                        className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm font-bold flex justify-center items-center gap-2 transition-colors border border-primary/20 hover:border-primary"
                      >
                        <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 shrink-0" /> Buy Now
                      </button>
                      <a href="https://calendly.com/domsco-tech/30min?month=2026-03" target="_blank" rel="noreferrer" className="w-full block">
                        <button className="w-full bg-foreground hover:bg-foreground/90 text-background px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm font-bold flex justify-center items-center gap-2 transition-colors">
                          <CalendarRange className="w-3 h-3 md:w-4 md:h-4 shrink-0" /> Schedule Call
                        </button>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Products;

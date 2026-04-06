import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { useRazorpay } from "react-razorpay";

import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, CalendarRange, Check, ShieldCheck, Zap } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const { Razorpay } = useRazorpay();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    // 1. Try Supabase Postgres first
    try {
      if (id?.includes("-")) { // Usually Supabase UUIDs contain dashes
        const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
        if (data && !error) {
           const mappedUrl = data.image_url || null;
           const galleryUrl = data.image_gallery || [];
           
           setProduct({
             id: data.id,
             title: data.title,
             description: (data.description || "").replace(/\\n/g, " ").replace(/\\r/g, " ").replace(/\n/g, " "),
             price: data.price || 0,
             image: mappedUrl,
             gallery: galleryUrl.length > 0 ? [mappedUrl, ...galleryUrl].filter(Boolean) : (mappedUrl ? [mappedUrl] : []),
           });
           
           if (mappedUrl) setActiveImage(mappedUrl);
           setLoading(false);
           return;
        }
      }
    } catch (e) {
      console.log("Supabase fetch failed", e);
    }
    setLoading(false);
  };

  const handleCheckout = () => {
    if (!product) return;
    
    if (product.price === 0) {
      window.location.href = "/book-call";
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_YourKeyGoesHere",
      amount: (product.price * 100).toString(),
      currency: "INR",
      name: "HastagCreator",
      description: `Purchase of ${product.title}`,
      handler: async function (response: any) {
         // Create Payment Log in Ledger
         try {
            await supabase.from('orders').insert({
               product_id: product.id.length > 20 ? product.id : null, // Handle CSV fake ids
               product_name: product.title,
               amount: product.price,
               payment_id: response.razorpay_payment_id
            });
         } catch (e) { console.error("Could not write order", e); }
         
         alert("Payment Successful! Order recorded.");
      },
      prefill: {
        name: "Valued Client",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: { color: "#2563EB" },
    };

    const rzp1 = new Razorpay(options as any);
    rzp1.open();
  };

  if (loading) {
     return (
        <div className="min-h-screen pt-24 text-center">
           <Navbar />
           <p className="mt-20 text-muted-foreground animate-pulse">Loading Product Data...</p>
        </div>
     );
  }

  if (!product) {
     return (
        <div className="min-h-screen pt-24 text-center flex flex-col items-center justify-center">
           <Navbar />
           <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
           <Link to="/"><button className="bg-primary text-white px-6 py-2 rounded-lg font-bold">Return Home</button></Link>
        </div>
     );
  }

  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Navbar />
      
      <main className="flex-1 py-12 md:py-20">
        <div className="container-main max-w-6xl">
           <Link to="/#services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm font-semibold transition-colors">
              <ArrowLeft size={16} /> Back to Services
           </Link>
           
           <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
              {/* Left Column: Media Gallery */}
              <div className="w-full lg:w-1/2 bg-muted/20 border-b lg:border-b-0 lg:border-r border-border p-6 md:p-8 flex flex-col">
                 <div className="flex-1 rounded-2xl overflow-hidden border border-border shadow-inner bg-background flex items-center justify-center min-h-[300px] md:min-h-[450px]">
                    {activeImage ? (
                       <img src={activeImage} alt={product.title} className="w-full h-full object-cover" />
                    ) : (
                       <div className="text-muted-foreground font-semibold flex flex-col items-center gap-4">
                          <Zap size={48} className="text-primary/20" />
                          <span>No Image Available</span>
                       </div>
                    )}
                 </div>
                 
                 {product.gallery && product.gallery.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto mt-6 pb-2 snap-x">
                       {product.gallery.map((img: string, i: number) => (
                          <div 
                             key={i} 
                             onClick={() => setActiveImage(img)}
                             className={`w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-xl overflow-hidden border-2 cursor-pointer transition-all snap-start ${activeImage === img ? "border-primary shadow-md scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}
                          >
                             <img src={img} alt={`Thumbnail ${i+1}`} className="w-full h-full object-cover" />
                          </div>
                       ))}
                    </div>
                 )}
              </div>
              
              {/* Right Column: Details & Checkout */}
              <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                 <div className="mb-2">
                   <span className="bg-primary/10 text-primary uppercase tracking-widest text-[10px] font-black px-3 py-1 rounded-full border border-primary/20">
                     Premium Service
                   </span>
                 </div>
                 
                 <h1 className="text-3xl md:text-5xl font-black text-foreground mb-6 leading-tight tracking-tight mt-4">
                    {product.title}
                 </h1>
                 
                 <div className="text-4xl font-display font-black text-foreground mb-8 flex items-end gap-2">
                    {product.price > 0 ? `₹${product.price.toLocaleString("en-IN")}` : "Custom Pricing"}
                    {product.price > 0 && <span className="text-base text-muted-foreground font-medium mb-1">/one-time</span>}
                 </div>
                 
                 <div 
                    className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-muted-foreground mb-10 whitespace-pre-wrap leading-relaxed font-medium"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                 />
                 
                 <div className="space-y-4 mb-10 bg-muted/30 p-6 rounded-2xl border border-border/50">
                    <div className="flex items-center gap-3 text-sm font-semibold text-foreground/80">
                       <ShieldCheck className="text-primary" size={20} /> Highly Secure Razorpay Gateway
                    </div>
                    <div className="flex items-center gap-3 text-sm font-semibold text-foreground/80">
                       <Check className="text-green-500" size={20} /> Priority Access & Execution
                    </div>
                 </div>
                 
                 <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <button onClick={handleCheckout} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-xl text-sm font-black shadow-xl shadow-primary/20 transition-all flex justify-center items-center gap-2 hover:-translate-y-1">
                       <ShoppingCart size={18} /> Purchase Direct
                    </button>
                    <a href="/book-call" className="flex-1">
                       <button className="w-full bg-foreground hover:bg-foreground/90 text-background py-4 rounded-xl text-sm font-black transition-all flex justify-center items-center gap-2 hover:-translate-y-1 border border-border shadow-lg">
                          <CalendarRange size={18} /> Schedule Consultation
                       </button>
                    </a>
                 </div>
              </div>
           </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

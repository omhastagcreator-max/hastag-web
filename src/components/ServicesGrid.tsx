import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Layers, MousePointerClick, Zap, MessageSquare, Video, Mic, LayoutGrid } from "lucide-react";

import { Link } from "react-router-dom";

import { supabase } from "@/lib/supabase";

const fallbackServices = [
  {
    id: "fallback-d2c",
    icon: MousePointerClick,
    title: "D2C-Performance Marketing (Meta Ads)",
    desc: "Surgical, ROAS-driven Meta & Instagram scaling. We treat your budget like our own.",
    price: 45750,
    color: "bg-blue-50 border-blue-100 text-blue-700",
  },
  {
    id: "fallback-google",
    icon: Zap,
    title: "Google Ads Marketing",
    desc: "Capture high-intent traffic instantly and dominate the top of search.",
    price: 32000,
    color: "bg-green-50 border-green-100 text-green-700",
  },
  {
    id: "fallback-web",
    icon: Layers,
    title: "Website Development",
    desc: "Lightning-fast, strictly CRO-optimized Shopify and custom-built E-com stores.",
    price: 0,
    color: "bg-purple-50 border-purple-100 text-purple-700",
  },
  {
    id: "fallback-influencer",
    icon: MessageSquare,
    title: "Influencer Marketing",
    desc: "Deploy our 20,000+ influencer network. End-to-end execution.",
    price: 0,
    color: "bg-orange-50 border-orange-100 text-orange-700",
  },
  {
    id: "fallback-ugc",
    icon: Video,
    title: "UGC Video Creation",
    desc: "Top-converting, raw TikTok & Reel style content. We have more than 200+ exclusive UGC Creators engineered to sell.",
    price: 6000,
    color: "bg-rose-50 border-rose-100 text-rose-700",
  },
  {
    id: "fallback-podcast",
    icon: Mic,
    title: "Podcast Branding",
    desc: "In-video brand placements with top-tier podcasters.",
    price: 0,
    color: "bg-indigo-50 border-indigo-100 text-indigo-700",
  },
];

const iconMap = [MousePointerClick, Zap, Layers, MessageSquare, Video, Mic, LayoutGrid];
const colorMap = [
  "bg-blue-50 border-blue-100 text-blue-700",
  "bg-green-50 border-green-100 text-green-700",
  "bg-purple-50 border-purple-100 text-purple-700",
  "bg-orange-50 border-orange-100 text-orange-700",
  "bg-rose-50 border-rose-100 text-rose-700",
  "bg-indigo-50 border-indigo-100 text-indigo-700",
];

type ServiceItem = {
  id: string;
  icon: any;
  title: string;
  desc: string;
  price: number;
  color: string;
  image?: string | null;
};

const ServicesGrid = ({ filterKeyword, title, subtitle }: { filterKeyword?: string, title?: string, subtitle?: string }) => {
  const [products, setProducts] = useState<ServiceItem[]>(fallbackServices);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
       // 1. Fetch real-time from Supabase Headless CMS
       const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
       
       if (!error && data && data.length > 0) {
          const parsed = data.map((row: any, i: number) => {
             let desc = row.description || "D2C Scaling infrastructure.";
             desc = desc.replace(/(<([^>]+)>)/gi, "").replace(/&nbsp;/g, " ").replace(/\\n/g, " ").replace(/\\r/g, " ").replace(/\n/g, " ").trim();
             if (desc.length > 115) desc = desc.substring(0, 115) + "...";
             
             return {
                id: row.id,
                icon: iconMap[i % iconMap.length],
                image: row.image_url || null,
                title: row.title || "Premium Service",
                desc,
                price: row.price || 0,
                color: colorMap[i % colorMap.length],
             };
          });
          
          let finalParsed = parsed;
          if (filterKeyword) {
             finalParsed = parsed.filter((s: ServiceItem) => 
               s.title.toLowerCase().includes(filterKeyword.toLowerCase()) || 
               s.desc.toLowerCase().includes(filterKeyword.toLowerCase())
             );
          }
          setProducts(finalParsed);
          return;
       }
    } catch (e) {
       console.log("Supabase fetch failed", e);
    }
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async (p: any) => {
    if (p.price === 0) {
      window.open("https://calendly.com/domsco-tech/30min?month=2026-03", "_blank");
      return;
    }

    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      alert("Razorpay SDK failed to load. Check your connection.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_YourKeyGoesHere",
      amount: (p.price * 100).toString(),
      currency: "INR",
      name: "HastagCreator",
      description: `Purchase of ${p.title}`,
      handler: function (response: any) {
        alert("Payment Successful! Mock Ref: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Acme Corp",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#2563EB",
      },
    };

    const rzp1 = new (window as any).Razorpay(options as any);
    rzp1.open();
  };

  return (
    <section className="py-24 bg-secondary/50 relative" id="services">
      <div className="container-main">
        <div className="max-w-3xl mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 tracking-tight">
            {title || "Comprehensive Growth Infrastructure."}
          </h2>
          <p className="text-lg text-muted-foreground font-medium">
            {subtitle || "We don't offer generic templates. We offer weaponized services engineered to solve exact D2C pain points."}
          </p>
        </div>

        <motion.div 
           variants={{
             hidden: { opacity: 0 },
             show: {
               opacity: 1,
               transition: { staggerChildren: 0.1 }
             }
           }}
           initial="hidden"
           whileInView="show"
           viewport={{ once: true, margin: "-100px" }}
           className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {products.map((service, index) => {
            const Icon = service.icon;
            return (
            <div key={index} className="perspective-1000 w-full h-full relative">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`w-full h-full group flex flex-col bg-white/70 backdrop-blur-2xl rounded-3xl p-6 border border-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,51,255,0.08)] transition-all duration-500 relative`}
              >
                <div className="flex-1 z-10">
                  {service.image ? (
                    <div className="w-full h-40 mb-5 rounded-xl overflow-hidden shadow-sm relative border border-white bg-white/50">
                      <img src={service.image} alt={service.title} loading="lazy" width="400" height="200" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-sm bg-white/80 border border-white text-primary`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-foreground mb-3 leading-tight tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>

                <div className="z-10 mt-auto flex flex-col gap-3">
                  <div className="mb-2">
                    <span className="bg-white/80 backdrop-blur-sm border border-white px-3 py-1 rounded-full text-xs font-black shadow-sm tracking-wide text-primary">
                      {service.price > 0 ? `₹ ${(service.price).toLocaleString("en-IN")}/PM` : "Custom"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link to={`/product/${service.id}`} className="block w-full">
                      <button className="w-full bg-white/50 hover:bg-white backdrop-blur-md text-foreground py-2 rounded-lg text-xs font-bold transition-colors border border-white hover:border-primary/20 hover:text-primary hover:shadow-sm">
                        View Details
                      </button>
                    </Link>
                    <button onClick={() => handleCheckout(service)} className="w-full bg-primary hover:bg-primary-hover text-white py-2 rounded-lg text-xs font-black transition-colors shadow-md">
                      Quick Buy
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )})}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;

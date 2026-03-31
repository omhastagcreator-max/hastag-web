import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

// Placeholder data for video assets
const salesVideos = [
  { id: 1, title: "Checkout Drop-off Hook", views: "1.2M", duration: "0:15" },
  { id: 2, title: "Pain-Point Agitator", views: "850K", duration: "0:22" },
  { id: 3, title: "Urgency Offer Pitch", views: "2.1M", duration: "0:18" },
  { id: 4, title: "Founder Story UGC", views: "500K", duration: "0:30" },
  { id: 5, title: "Unboxing Reaction", views: "1.5M", duration: "0:25" },
];

const brandVideos = [
  { id: 6, title: "Viral Aesthetic B-Roll", views: "3.2M", duration: "0:12" },
  { id: 7, title: "Lifestyle Integration", views: "900K", duration: "0:28" },
  { id: 8, title: "Behind The Scenes", views: "1.1M", duration: "0:35" },
  { id: 9, title: "Macro-Influencer Collab", views: "4.5M", duration: "0:45" },
  { id: 10, title: "Community Spotlight", views: "750K", duration: "0:20" },
];

const VideoCard = ({ video, src }: { video: { id: number, title: string, views: string, duration: string }, src: string }) => (
  <div className="shrink-0 w-[45vw] sm:w-[30vw] md:w-64 aspect-[9/16] bg-muted/30 rounded-2xl overflow-hidden relative group cursor-pointer border border-border/50 shadow-lg">
    {/* Live Autoplaying Video */}
    <video 
      src={src}
      autoPlay 
      muted 
      loop 
      playsInline 
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
    
    {/* Overlay Gradient for Text */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
    
    {/* Bottom Metadata */}
    <div className="absolute bottom-0 inset-x-0 p-3 md:p-4">
      <span className="bg-white/10 backdrop-blur-md text-white/90 text-[9px] md:text-[10px] font-bold px-2 py-1 rounded mb-2 inline-block">
        {video.duration}
      </span>
      <h3 className="text-white font-black text-xs md:text-sm leading-tight mb-1">{video.title}</h3>
      <p className="text-white/60 text-[10px] md:text-xs font-semibold">{video.views} Views</p>
    </div>
  </div>
);

export default function InfluencerUGC() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "High-Converting UGC & Influencer Ads | HastagCreator";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
       metaDesc.setAttribute("content", "Explore our gallery of purely sales-focused and brand-awareness UGC videos. Delivered in native 9:16 aspect ratio for maximum TikTok and Reel conversions.");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col pt-20 bg-background">
      <Navbar />
      
      <main className="flex-1 overflow-x-hidden">
        {/* Hero Section */}
        <div className="bg-muted/20 border-b border-border/50 pt-16 pb-12 md:pt-24 md:pb-20">
           <div className="container-main text-center px-4">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-6 inline-flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                 Asli Content Engine
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
                Scroll-Stopping <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">UGC Hooks.</span>
              </h1>
              <p className="text-muted-foreground font-medium text-lg md:text-xl max-w-2xl mx-auto">
                 We craft scroll-stopping video content engineered entirely for conversions. No useless dancing or generic trends. Just high-impact, purely sales-driven creatives that compel users to buy.
              </p>
           </div>
        </div>

        {/* Dancing vs Selling Module */}
        <div className="py-24 bg-background">
           <div className="container-main px-4 max-w-6xl">
              <div className="bg-card border border-border/50 rounded-3xl overflow-hidden shadow-2xl">
                 <div className="grid md:grid-cols-2">
                    <div className="p-10 md:p-16 bg-red-500/5 relative overflow-hidden">
                       <span className="text-red-500 font-black tracking-widest uppercase text-xs mb-4 block">The Problem</span>
                       <h3 className="text-3xl font-black mb-4">You are paying for Vanity Metrics.</h3>
                       <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                          Many brand campaigns struggle because they prioritize basic "reach" and "views" over targeted consumer action. 
                          A pretty reel on a trending audio may get you 1 lakh views, but without structure, it yields <strong className="text-foreground">zero sales.</strong> 
                          This results in an inefficient return on ad spend.
                       </p>
                    </div>
                    <div className="p-10 md:p-16 bg-emerald-500/5 relative overflow-hidden border-t md:border-t-0 md:border-l border-border/50">
                       <span className="text-emerald-500 font-black tracking-widest uppercase text-xs mb-4 block">The Solution</span>
                       <h3 className="text-3xl font-black mb-4">We engineer Sales Scripts.</h3>
                       <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                          Our network of creators execute actual direct-response sales scripts. 
                          We write exact <strong className="text-foreground">Scroll-Stopping Hooks</strong>, address the customer's exact pain point, and guide them directly to click "Buy Now" on your Meta Ads. *Paisa Vasool* marketing.
                       </p>
                    </div>
                 </div>
              </div>

              {/* Hook Anatomy */}
              <div className="mt-16 text-center max-w-4xl mx-auto">
                 <h3 className="text-2xl font-black mb-8">Anatomy of a Million-Dollar Ad:</h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                    <div className="bg-secondary/40 p-5 rounded-2xl border border-border">
                       <span className="text-primary font-black text-xs mb-1 block">0-3s</span>
                       <h4 className="font-bold text-[15px] mb-2">The Visual Hook</h4>
                       <p className="text-xs text-muted-foreground">Stop the thumb. A strong visual that doesn't let the user scroll past.</p>
                    </div>
                    <div className="bg-secondary/40 p-5 rounded-2xl border border-border">
                       <span className="text-primary font-black text-xs mb-1 block">3-8s</span>
                       <h4 className="font-bold text-[15px] mb-2">Pain Agitation</h4>
                       <p className="text-xs text-muted-foreground">Verbally hitting the exact problem the customer is facing.</p>
                    </div>
                    <div className="bg-secondary/40 p-5 rounded-2xl border border-border">
                       <span className="text-primary font-black text-xs mb-1 block">8-20s</span>
                       <h4 className="font-bold text-[15px] mb-2">The Mechanism</h4>
                       <p className="text-xs text-muted-foreground">Explaining why your product is the best and cheapest solution.</p>
                    </div>
                    <div className="bg-secondary/40 p-5 rounded-2xl border border-border bg-primary/5 border-primary/20">
                       <span className="text-primary font-black text-xs mb-1 block">20-25s</span>
                       <h4 className="font-bold text-[15px] mb-2">Direct Action (CTA)</h4>
                       <p className="text-xs text-muted-foreground">Clear instruction telling them to click the link below.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="py-16 md:py-24 space-y-20 bg-secondary/10 border-t border-border/50">
          
          {/* Category 1: Sales Focused */}
          <section>
            <div className="container-main px-4 mb-8 flex justify-between items-end">
              <div>
                <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-2">Direct Response (Sales Focused)</h2>
                <p className="text-muted-foreground font-medium text-sm md:text-base">Videos optimized purely for low-CPA conversions and ROAS scaling.</p>
              </div>
            </div>
            {/* The Infinite Marquee (Left to Right) */}
            <div className="w-full relative overflow-hidden flex" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
              <motion.div 
                className="flex gap-4 md:gap-5 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 30, repeat: Infinity }}
              >
                {[...salesVideos, ...salesVideos, ...salesVideos, ...salesVideos].map((video, idx) => (
                  <VideoCard key={`sales-${idx}`} video={video} src="https://videos.pexels.com/video-files/5305118/5305118-hd_720_1366_25fps.mp4" />
                ))}
              </motion.div>
            </div>
          </section>

          {/* Category 2: Brand Awareness */}
          <section>
            <div className="container-main px-4 mb-8 flex justify-between items-end">
              <div>
                <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-2">Brand Awareness & Trust</h2>
                <p className="text-muted-foreground font-medium text-sm md:text-base">Top-of-funnel storytelling to build viral organic reach and community trust.</p>
              </div>
            </div>
            {/* The Infinite Marquee (Right to Left / Reverse) */}
            <div className="w-full relative overflow-hidden flex" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
              <motion.div 
                className="flex gap-4 md:gap-5 w-max"
                animate={{ x: ["-50%", "0%"] }}
                transition={{ ease: "linear", duration: 35, repeat: Infinity }}
              >
                {[...brandVideos, ...brandVideos, ...brandVideos, ...brandVideos].map((video, idx) => (
                  <VideoCard key={`brand-${idx}`} video={video} src="https://videos.pexels.com/video-files/8099307/8099307-hd_720_1280_30fps.mp4" />
                ))}
              </motion.div>
            </div>
          </section>
          
        </div>
        
        {/* CTA Bottom */}
        <div className="container-main px-4 pb-24 text-center">
           <div className="bg-primary/5 border border-primary/20 rounded-3xl p-10 md:p-16 max-w-4xl mx-auto shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 relative z-10">Stop blending in.</h2>
              <p className="text-muted-foreground mb-10 text-lg relative z-10 max-w-xl mx-auto">Get custom, high-converting UGC engineered specifically for your brand's unique checkout funnel.</p>
              <a href="https://calendly.com/domsco-tech/30min?month=2026-03" target="_blank" rel="noreferrer" className="relative z-10 inline-block bg-primary text-primary-foreground font-black px-10 py-5 rounded-full shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all text-lg tracking-wide uppercase">
                Commission Videos
              </a>
           </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}

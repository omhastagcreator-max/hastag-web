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

const VideoCard = ({ video }: { video: { id: number, title: string, views: string, duration: string } }) => (
  <div className="shrink-0 w-[42vw] sm:w-[30vw] md:w-64 aspect-[9/16] bg-muted/30 rounded-2xl overflow-hidden relative group cursor-pointer border border-border/50 snap-center shadow-lg">
    {/* Placeholder Background (Simulates Video Poster) */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] group-hover:scale-105 transition-transform duration-500"></div>
    
    {/* Overlay Gradient for Text */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
    
    {/* Center Play Button */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-primary/90 group-hover:scale-110 transition-all duration-300">
        <Play className="w-5 h-5 md:w-6 md:h-6 text-white ml-1" fill="currentColor" />
      </div>
    </div>
    
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
                 Native Video Engine
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
                Scroll-Stopping <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">UGC Hooks.</span>
              </h1>
              <p className="text-muted-foreground font-medium text-lg md:text-xl max-w-2xl mx-auto">
                 We script, shoot, and edit 9:16 vertical videos explicitly designed around direct-response consumer psychology. No dancing. Just sales.
              </p>
           </div>
        </div>

        <div className="py-16 md:py-24 space-y-20">
          
          {/* Category 1: Sales Focused */}
          <section>
            <div className="container-main px-4 mb-8 flex justify-between items-end">
              <div>
                <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-2">Direct Response (Sales Focused)</h2>
                <p className="text-muted-foreground font-medium text-sm md:text-base">Videos optimized purely for low-CPA conversions and ROAS scaling.</p>
              </div>
            </div>
            {/* The Horizontal Carousel */}
            <div className="w-full relative">
              <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pl-4 md:pl-8 pr-8 gap-3 md:gap-5 pb-8">
                {salesVideos.map((video) => (
                  <VideoCard key={`sales-${video.id}`} video={video} />
                ))}
                {/* Padding element for right edge */}
                <div className="shrink-0 w-4 md:w-8"></div>
              </div>
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
            {/* The Horizontal Carousel */}
            <div className="w-full relative">
              <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pl-4 md:pl-8 pr-8 gap-3 md:gap-5 pb-8">
                {brandVideos.map((video) => (
                  <VideoCard key={`brand-${video.id}`} video={video} />
                ))}
                {/* Padding element for right edge */}
                <div className="shrink-0 w-4 md:w-8"></div>
              </div>
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

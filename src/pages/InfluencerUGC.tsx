import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, TrendingUp, Presentation, MonitorPlay, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useBooking } from "@/components/BookingProvider";

const fallbackVideos = [
  // Category 1: Sales Focused Video (sales)
  { id: 901, title: "Checkout Drop-off Hook", views: "1.2M", duration: "0:15", category: "sales", video_url: "https://videos.pexels.com/video-files/5305118/5305118-hd_720_1366_25fps.mp4" },
  { id: 902, title: "Pain-Point Agitator", views: "850K", duration: "0:22", category: "sales", video_url: "https://videos.pexels.com/video-files/5305118/5305118-hd_720_1366_25fps.mp4" },
  
  // Category 2: Influencer Sales Focused Video (influencer)
  { id: 903, title: "Influencer Direct Pitch", views: "2.1M", duration: "0:20", category: "influencer", video_url: "https://videos.pexels.com/video-files/8099307/8099307-hd_720_1280_30fps.mp4" },
  { id: 904, title: "Influencer Review", views: "3.2M", duration: "0:25", category: "influencer", video_url: "https://videos.pexels.com/video-files/8099307/8099307-hd_720_1280_30fps.mp4" },

  // Category 3: Brand Awareness (brand)
  { id: 905, title: "Brand Story Hook", views: "4.2M", duration: "0:12", category: "brand", video_url: "https://videos.pexels.com/video-files/5305118/5305118-hd_720_1366_25fps.mp4" },
  { id: 906, title: "Viral Aesthetic", views: "1.2M", duration: "0:18", category: "brand", video_url: "https://videos.pexels.com/video-files/5305118/5305118-hd_720_1366_25fps.mp4" },

  // Category 4: TVC Ad Video (tvc)
  { id: 907, title: "Premium Production", views: "10M+", duration: "0:30", category: "tvc", video_url: "https://videos.pexels.com/video-files/8099307/8099307-hd_720_1280_30fps.mp4" },
  { id: 908, title: "Storyline TVC", views: "5.5M", duration: "0:45", category: "tvc", video_url: "https://videos.pexels.com/video-files/8099307/8099307-hd_720_1280_30fps.mp4" },
];

const VideoCard = ({ video }: { video: any }) => {
  const isIg = video.video_url?.includes('instagram.com');
  const isYt = video.video_url?.includes('youtube.com') || video.video_url?.includes('youtu.be');

  let src = video.video_url || fallbackVideos[0].video_url;
  
  if (isIg) {
    src = `${video.video_url.split('?')[0].replace(/\/$/, '')}/embed/?autoplay=1&muted=1`;
  }

  const [muted, setMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleMute = () => {
    if (!isYt) return;
    setMuted(!muted);
    if (iframeRef.current && iframeRef.current.contentWindow) {
       iframeRef.current.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: muted ? 'unMute' : 'mute',
          args: []
       }), '*');
    }
  };

  if (isYt) {
    let ytId = "";
    try {
      const url = new URL(video.video_url);
      if (video.video_url.includes('youtube.com/shorts/')) {
         ytId = url.pathname.split('/shorts/')[1].split('?')[0];
      } else if (video.video_url.includes('youtu.be')) {
         ytId = url.pathname.slice(1).split('?')[0];
      } else {
         ytId = url.searchParams.get('v') || "";
      }
    } catch(e) {}
    src = `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytId}&playsinline=1&enablejsapi=1&modestbranding=1&rel=0`;
  }

  return (
    <div className="shrink-0 w-[45vw] sm:w-[30vw] md:w-[280px] aspect-[9/16] bg-muted/30 rounded-2xl overflow-hidden relative group cursor-pointer border border-border/50 shadow-lg" onClick={isYt ? toggleMute : undefined}>
      {/* Live Autoplaying Video or IG Embed */}
      {isYt ? (
         <div className="absolute inset-0 w-full h-[105%] flex items-center justify-center pointer-events-none">
            <iframe 
              ref={iframeRef}
              src={src}
              className="w-full h-full scale-[1.35] transform origin-center group-hover:scale-[1.4] transition-transform duration-500 pointer-events-auto"
              style={{ pointerEvents: 'none' }}
              frameBorder="0"
              scrolling="no"
              loading="lazy"
              allow="autoplay; encrypted-media"
              allowTransparency
            />
         </div>
      ) : isIg ? (
         <div className="absolute inset-0 w-full h-[105%] pointer-events-none">
            <iframe 
              src={src}
              className="w-full h-full scale-[1.02] transform origin-center group-hover:scale-[1.05] transition-transform duration-500"
              frameBorder="0"
              scrolling="no"
              loading="lazy"
              allow="autoplay; encrypted-media"
              allowTransparency
            />
         </div>
      ) : (
         <video 
           src={src}
           autoPlay 
           muted 
           loop 
           playsInline 
           className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
         />
      )}
      
      {/* Overlay Gradient for Text */}
      <div className={`absolute inset-0 bg-gradient-to-t ${!muted ? 'from-black/60' : 'from-black/90'} via-black/20 to-transparent pointer-events-none transition-colors duration-500`}></div>
      
      {/* Bottom Metadata */}
      <div className="absolute bottom-0 inset-x-0 p-4 md:p-5 pointer-events-none">
        <span className="bg-white/10 backdrop-blur-md text-white/90 text-[10px] md:text-xs font-bold px-2.5 py-1 rounded mb-2 inline-block">
          {video.duration}
        </span>
        <h3 className="text-white font-black text-sm md:text-base leading-tight mb-1">{video.title}</h3>
        <p className="text-white/60 text-[11px] md:text-xs font-semibold">{video.views} Views</p>
      </div>
    </div>
  );
};

export default function InfluencerUGC() {
  const [videos, setVideos] = useState<any[]>([]);
  const { openBooking } = useBooking();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "High-Converting UGC & Influencer Ads | HastagCreator";
    const fetchVideos = async () => {
      try {
        const { data } = await supabase.from('products').select('*').eq('icon_name', 'InfluencerVideo').order('created_at', { ascending: false });
        if (data && data.length > 0) {
          const parsed = data.map((v: any) => {
             const [cat, vws, dur] = v.description ? v.description.split('||') : ['sales', '1M', '0:15'];
             return {
                id: v.id,
                title: v.title,
                category: cat || 'sales',
                views: vws || '1M',
                duration: dur || '0:15',
                video_url: v.image_url
             };
          });
          setVideos(parsed);
        } else {
          setVideos(fallbackVideos);
        }
      } catch(e) {
        setVideos(fallbackVideos);
      }
    };
    fetchVideos();
  }, []);

  const salesVideosList = videos.filter(v => v.category === 'sales');
  const influencerVideosList = videos.filter(v => v.category === 'influencer');
  const brandVideosList = videos.filter(v => v.category === 'brand');
  const tvcVideosList = videos.filter(v => v.category === 'tvc');

  const getRepeatedArray = (arr: any[]) => {
    if (arr.length === 0) return [];
    const times = Math.max(2, Math.ceil(12 / arr.length));
    const evenTimes = times % 2 !== 0 ? times + 1 : times; 
    return Array(evenTimes).fill(arr).flat();
  };

  return (
    <div className="min-h-screen flex flex-col pt-20 bg-background">
      <Navbar />
      
      <main className="flex-1 overflow-x-hidden">
        {/* Simplified Hero Section */}
        <div className="bg-muted/20 border-b border-border/50 pt-16 pb-12 md:pt-24 md:pb-20">
           <div className="container-main text-center px-4">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-6 inline-flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                 Content That Sells
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
                Stop Dancing. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Start Selling.</span>
              </h1>
              <p className="text-muted-foreground font-medium text-lg max-w-2xl mx-auto">
                 We script and produce short-form video ads specifically engineered for Meta & Google conversions.
              </p>
           </div>
        </div>

        {/* Simplified Philosophy vs Mechanism */}
        <div className="py-20 bg-background">
           <div className="container-main px-4 max-w-5xl">
              <div className="bg-card border border-border/50 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
                 <div className="flex-1 p-10 flex flex-col items-center justify-center text-center bg-red-500/5">
                    <span className="text-red-500 font-black uppercase text-xs mb-3 block tracking-widest">Old Way</span>
                    <h3 className="text-2xl font-black mb-2">Trends & Views</h3>
                    <p className="text-sm text-muted-foreground">High reach, zero actual purchases.</p>
                 </div>
                 <div className="flex-1 p-10 flex flex-col items-center justify-center text-center bg-emerald-500/5 border-t md:border-t-0 md:border-l border-border/50">
                    <span className="text-emerald-500 font-black uppercase text-xs mb-3 block tracking-widest">Our Way</span>
                    <h3 className="text-2xl font-black mb-2">Sales Scripts</h3>
                    <p className="text-sm text-muted-foreground">Psychological hooks built to drive ROI.</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="py-16 md:py-24 space-y-20 bg-secondary/10 border-t border-border/50">
          
          {/* Category 1: Sales Focused Video */}
          <section>
            <div className="container-main px-4 mb-8 flex justify-between items-end">
              <div>
                <h2 className="text-2xl md:text-4xl font-black tracking-tight flex items-center gap-3">
                  <TrendingUp className="text-primary" /> Sales Focused Video
                </h2>
              </div>
            </div>
            <div className="w-full relative overflow-hidden flex" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
              <motion.div 
                className="flex gap-4 md:gap-5 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 30, repeat: Infinity }}
                style={{ willChange: "transform", transform: "translateZ(0)" }}
              >
                {getRepeatedArray(salesVideosList).map((video: any, idx) => (
                  <VideoCard key={`sales-${idx}`} video={video} />
                ))}
              </motion.div>
            </div>
          </section>

          {/* Category 2: Influencer Sales Focused Video */}
          <section>
            <div className="container-main px-4 mb-8 flex justify-between items-end">
              <div>
                <h2 className="text-2xl md:text-4xl font-black tracking-tight flex items-center gap-3">
                  <Users className="text-purple-500" /> Influencer Sales Focused Video
                </h2>
              </div>
            </div>
            <div className="w-full relative overflow-hidden flex" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
              <motion.div 
                className="flex gap-4 md:gap-5 w-max"
                animate={{ x: ["-50%", "0%"] }}
                transition={{ ease: "linear", duration: 35, repeat: Infinity }}
                style={{ willChange: "transform", transform: "translateZ(0)" }}
              >
                {getRepeatedArray(influencerVideosList).map((video: any, idx) => (
                  <VideoCard key={`influencer-${idx}`} video={video} />
                ))}
              </motion.div>
            </div>
          </section>

          {/* Category 3: Brand Awareness */}
          <section>
            <div className="container-main px-4 mb-8 flex justify-between items-end">
              <div>
                <h2 className="text-2xl md:text-4xl font-black tracking-tight flex items-center gap-3">
                  <Presentation className="text-blue-500" /> Brand Awareness
                </h2>
              </div>
            </div>
            <div className="w-full relative overflow-hidden flex" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
              <motion.div 
                className="flex gap-4 md:gap-5 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 40, repeat: Infinity }}
                style={{ willChange: "transform", transform: "translateZ(0)" }}
              >
                {getRepeatedArray(brandVideosList).map((video: any, idx) => (
                  <VideoCard key={`brand-${idx}`} video={video} />
                ))}
              </motion.div>
            </div>
          </section>

          {/* Category 4: TVC Ad Video */}
          <section>
            <div className="container-main px-4 mb-8 flex justify-between items-end">
              <div>
                <h2 className="text-2xl md:text-4xl font-black tracking-tight flex items-center gap-3">
                  <MonitorPlay className="text-orange-500" /> TVC Ad Video
                </h2>
              </div>
            </div>
            <div className="w-full relative overflow-hidden flex" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
              <motion.div 
                className="flex gap-4 md:gap-5 w-max"
                animate={{ x: ["-50%", "0%"] }}
                transition={{ ease: "linear", duration: 45, repeat: Infinity }}
                style={{ willChange: "transform", transform: "translateZ(0)" }}
              >
                {getRepeatedArray(tvcVideosList).map((video: any, idx) => (
                  <VideoCard key={`tvc-${idx}`} video={video} />
                ))}
              </motion.div>
            </div>
          </section>
          
        </div>
        
        {/* Simple CTA Bottom */}
        <div className="container-main px-4 pb-24 text-center mt-24">
           <div className="bg-card border border-border/50 rounded-3xl p-10 md:p-16 max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
              <h2 className="text-3xl md:text-5xl font-black mb-6">Need Winning Creatives?</h2>
              <p className="text-muted-foreground mb-10 text-lg">Talk to our scriptwriters and growth experts.</p>
              <button 
                onClick={openBooking}
                className="bg-primary text-primary-foreground font-black px-10 py-5 rounded-full shadow-xl hover:-translate-y-1 transition-all text-lg tracking-widest uppercase"
              >
                Book Strategy Call
              </button>
           </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}

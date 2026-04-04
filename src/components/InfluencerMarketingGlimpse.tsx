import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play, Maximize2, X, ChevronLeft, ChevronRight, Video, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

// Standard embedded influencer video URL, or paths to your assets
const sampleVideo = "https://www.youtube.com/embed/9bZkp7q19f0?autoplay=1&mute=1&loop=1&controls=0&playlist=9bZkp7q19f0";

const InfluencerMarketingGlimpse = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <section className="py-24 bg-muted/20 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[20%] left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container-main relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    
                    {/* Video / Carousel Side (Left on Desktop) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1 relative w-full aspect-[4/5] max-w-[400px] mx-auto"
                    >
                        {/* Glassmorphism Phone/Video frame */}
                        <div className="w-full h-full bg-white/30 dark:bg-black/40 backdrop-blur-3xl border-4 border-white/60 dark:border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative overflow-hidden group">
                            
                            {/* Inner Screen */}
                            <div className="absolute inset-2 rounded-[2rem] bg-black overflow-hidden cursor-pointer" onClick={() => setIsVideoOpen(true)}>
                                {/* Fallback image or video iframe */}
                                <iframe 
                                    src={sampleVideo}
                                    title="Influencer Marketing Example"
                                    className="w-full h-[120%] -mt-[10%] object-cover pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity"
                                    allow="accelerometer; autoplay; clipboar-write; encrypted-media; gyroscope; picture-in-picture"
                                />
                                
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>
                                
                                {/* Play Button Hint */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105">
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40">
                                        <Play className="w-6 h-6 text-white ml-1" />
                                    </div>
                                </div>
                                
                                {/* Bottom Info Overlay */}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h4 className="text-white font-bold text-lg leading-tight mb-1">Viral UGC Campaigns</h4>
                                    <p className="text-white/70 text-sm flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-green-400" /> 10M+ Reach
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Floating decorative tags */}
                        <div className="absolute -right-8 top-12 bg-white/80 dark:bg-black/60 backdrop-blur-md border border-border/50 px-4 py-3 rounded-2xl shadow-xl transform rotate-3 flex items-center gap-3">
                            <Video className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-xs font-bold text-foreground">Content Creation</p>
                                <p className="text-[10px] text-muted-foreground uppercase">Top Rated</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Text Content (Right on Desktop) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2 flex flex-col gap-6"
                    >
                        <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest w-max">
                            Influencer Marketing
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight tracking-tight">
                            Build Authentic <br/>
                            <span className="text-primary">Connections.</span>
                        </h2>
                        
                        <div className="space-y-4">
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Consumers don't trust ads, they trust people. Our influencer campaigns bypass ad fatigue by putting your brand in the hands of creators your audience already loves and trusts.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                We handle everything from talent scouting in our 20,000+ creator network to content strategy, brief creation, and purely performance-driven tracking. We make influencer marketing a predictable revenue channel, not just a PR stunt.
                            </p>
                        </div>
                        
                        <Link to="/services/influencer-marketing" className="mt-8 w-fit">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-primary hover:bg-primary-deep text-white px-8 py-4 rounded-full font-bold shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.4)] transition-all flex items-center gap-2 group"
                            >
                                Discover Influencer Strategies
                                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </motion.div>

                </div>
            </div>

            {/* Video Lightbox Modal */}
            <AnimatePresence>
                {isVideoOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                        onClick={() => setIsVideoOpen(false)}
                    >
                        <button 
                            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md z-50"
                            onClick={(e) => { e.stopPropagation(); setIsVideoOpen(false); }}
                        >
                            <X className="w-6 h-6" />
                        </button>
                        
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-lg aspect-[9/16] bg-black rounded-2xl overflow-hidden relative shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <iframe 
                                src="https://www.youtube.com/embed/9bZkp7q19f0?autoplay=1"
                                title="Influencer Video"
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default InfluencerMarketingGlimpse;

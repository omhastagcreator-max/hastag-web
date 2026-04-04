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
                    
                    {/* Video Arch Carousel Side (Left on Desktop) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1 relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] mt-8 lg:mt-0"
                    >
                        <div className="flex gap-4 animate-[marquee_20s_linear_infinite] w-max hover:[animation-play-state:paused] py-4">
                            {[
                                { title: "10M+ Views Formula", type: "Viral Secrets" },
                                { title: "How We Scaled an App", type: "Case Study" },
                                { title: "The Perfect Brief", type: "Creator Strategy" },
                                { title: "Tracking the Untrackable", type: "ROI" },
                                { title: "10M+ Views Formula", type: "Viral Secrets" },
                                { title: "How We Scaled an App", type: "Case Study" },
                                { title: "The Perfect Brief", type: "Creator Strategy" },
                                { title: "Tracking the Untrackable", type: "ROI" },
                            ].map((item, idx) => (
                                <div key={idx} className="w-[180px] md:w-[220px] aspect-[9/16] rounded-3xl bg-white/30 dark:bg-black/40 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-lg relative overflow-hidden group shrink-0 transform transition-transform hover:scale-105">
                                    <div className="absolute inset-1 rounded-[1.25rem] bg-black overflow-hidden cursor-pointer" onClick={() => setIsVideoOpen(true)}>
                                        <iframe 
                                            src={sampleVideo}
                                            title="Influencer Marketing Example"
                                            className="w-[150%] h-[150%] -top-[25%] -left-[25%] absolute object-cover pointer-events-none opacity-60 group-hover:opacity-90 transition-opacity blur-[2px] group-hover:blur-0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90"></div>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-xl">
                                                <Play className="w-5 h-5 text-white ml-1" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-5 left-4 right-4 text-left">
                                            <p className="text-primary text-[10px] font-bold uppercase tracking-wider mb-1">{item.type}</p>
                                            <p className="text-white font-extrabold text-sm leading-tight group-hover:text-primary-100 transition-colors">{item.title}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Text Content (Right on Desktop) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2 flex flex-col gap-6"
                    >
                        <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest w-max">
                            The Secret Backdoor
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight tracking-tight">
                            Ads are dying.<br/>
                            <span className="text-primary">Do this instead.</span>
                        </h2>
                        
                        <div className="space-y-4">
                            <p className="text-lg md:text-xl font-medium text-foreground leading-relaxed">
                                Why do some brands go incredibly viral while others bleed money trying to force ads down people's throats? 
                            </p>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                Consumers don't trust ads anymore. They scroll past them. They block them. We found a hidden backdoor into your customer's mind: <strong>The exact creators they already trust.</strong> 
                            </p>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                We've engineered a formula that turns 1 single influencer video into a predictable revenue machine. 
                            </p>
                        </div>
                        
                        <Link to="/services/influencer-marketing" className="mt-8 w-fit">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-foreground hover:bg-black/80 dark:bg-white dark:hover:bg-white/80 text-background px-8 py-4 rounded-full font-extrabold shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 group border border-border/50 text-base md:text-lg"
                            >
                                Reveal The Blueprint
                                <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const InfluencerMarketingGlimpse = () => {
    return (
        <section id="influencer" className="py-24 bg-muted/20 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[20%] left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container-main relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* Real Google AI Overview proof (Left on Desktop) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1 w-full flex items-center justify-center"
                    >
                        <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                            <div className="bg-secondary/80 border-b border-border px-4 py-2.5 flex items-center gap-2">
                                <div className="flex gap-1.5 flex-shrink-0">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                                </div>
                                <span className="text-[10px] text-muted-foreground font-medium truncate">google.com/search?q=meta+ads+new+update+as+per+andromeda</span>
                            </div>
                            <img
                                src="/google-search-meta-andromeda.jpg"
                                alt="Real Google AI Overview search result for 'meta ads new update as per andromeda' explaining the Meta Andromeda creative-based targeting shift"
                                className="w-full h-auto object-cover"
                            />
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

                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <Link to="/services/influencer-marketing" className="w-fit">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-foreground hover:bg-black/80 dark:bg-white dark:hover:bg-white/80 text-background px-8 py-4 rounded-full font-extrabold shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 group border border-border/50 text-base md:text-lg"
                                >
                                    Reveal The Blueprint
                                    <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </motion.button>
                            </Link>
                            <Link to="/portfolio" className="w-fit">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-extrabold shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 group border border-primary/50 text-base md:text-lg"
                                >
                                    Meta Ads Type of Creatives
                                    <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default InfluencerMarketingGlimpse;

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
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
                        <div className="w-full max-w-md bg-white dark:bg-black/40 border border-border/50 rounded-3xl shadow-2xl p-6 md:p-8">
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="w-5 h-5 text-blue-500 shrink-0" />
                                <span className="font-bold text-foreground text-sm">AI Overview</span>
                                <span className="text-[11px] text-muted-foreground ml-auto italic truncate">"meta ads new update as per andromeda"</span>
                            </div>
                            <p className="text-sm text-foreground/90 leading-relaxed mb-4">
                                The Meta Andromeda update <mark className="bg-blue-100 dark:bg-blue-500/30 text-foreground px-0.5 rounded-sm">completely shifts ad delivery from audience-based targeting to creative-based targeting</mark>. Meta's AI now evaluates the creative to predict audience matches.
                            </p>
                            <div className="bg-muted/50 rounded-xl p-4 border border-border/40">
                                <p className="text-[11px] font-black uppercase tracking-wider text-primary mb-1.5">Key Change</p>
                                <p className="text-sm text-foreground/80 leading-relaxed">
                                    <mark className="bg-blue-100 dark:bg-blue-500/30 text-foreground px-0.5 rounded-sm">Creative is the new targeting</mark> — the algorithm reads your ad images, videos, and copy to find users whose behavioral signals match your messaging. Interests and lookalikes take a back seat.
                                </p>
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-3 text-right">Real Google AI Overview result, quoted.</p>
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

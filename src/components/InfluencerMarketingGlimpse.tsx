import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AuditCTA from "./AuditCTA";

const funnel = ["Creative", "Traffic", "Landing Page", "Conversion", "Revenue"];

const InfluencerMarketingGlimpse = () => {
    return (
        <section id="ads-problem" className="py-16 md:py-24 bg-muted/20 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[20%] left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container-main relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-10 lg:gap-16 items-center [&>*]:min-w-0">

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
                                loading="lazy"
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
                        <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest w-max">
                            Before You Blame Meta
                        </span>
                        <h2 className="text-[2rem] leading-[1.1] md:text-5xl lg:text-6xl font-black text-foreground md:leading-tight tracking-tight">
                            Your Ads May Not Be <span className="text-primary">the Problem.</span>
                        </h2>

                        <p className="text-base md:text-xl font-medium text-muted-foreground leading-relaxed">
                            Poor creative, weak offers, low landing-page conversion and broken tracking can make a profitable product look unprofitable.
                        </p>

                        {/* Funnel chain */}
                        <ol className="flex flex-wrap items-center gap-2 md:gap-2.5" aria-label="Creative to revenue funnel">
                            {funnel.map((step, i) => (
                                <li key={step} className="flex items-center gap-2 md:gap-2.5">
                                    <span className={`px-3.5 py-2 rounded-full text-sm font-bold border ${i === funnel.length - 1 ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" : "bg-card text-foreground border-border shadow-sm"}`}>
                                        {step}
                                    </span>
                                    {i < funnel.length - 1 && <ArrowRight className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />}
                                </li>
                            ))}
                        </ol>
                        <p className="text-sm text-muted-foreground">
                            A leak at any step shows up as "bad ROAS" in Ads Manager. We find which step is actually leaking.
                        </p>

                        <div className="mt-2">
                            <AuditCTA source="ads_problem" label="Show Me Where I'm Losing Sales" variant="dark" />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default InfluencerMarketingGlimpse;

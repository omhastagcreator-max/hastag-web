import { motion } from "framer-motion";
import AuditCTA from "./AuditCTA";
import LeadForm from "./LeadForm";

export const FINAL_FORM_ID = "audit-form-final";

/** Closing conversion block: headline + the same lead form used after the hero. */
const FinalCTA = () => (
  <section id="get-audit" className="section-padding bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] max-w-[100vw] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
    <div className="container-main max-w-3xl relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8 md:mb-10"
      >
        <h2 className="text-[2rem] leading-[1.1] md:text-5xl font-black tracking-tight text-foreground mb-4">
          Ready to Find What's Blocking Your Growth?
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-7">
          Tell us about your brand. We'll identify the biggest opportunities across Ads, Creative, Website and Conversion.
        </p>
        <div className="flex justify-center">
          <AuditCTA source="final_cta" targetId={FINAL_FORM_ID} />
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          No obligation. No generic marketing pitch. Just a practical growth assessment.
        </p>
      </motion.div>

      <LeadForm id={FINAL_FORM_ID} location="final_cta" showHeading={false} />
    </div>
  </section>
);

export default FinalCTA;

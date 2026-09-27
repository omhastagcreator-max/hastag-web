import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { track, whatsappUrl } from "@/lib/track";

export const AD_SPEND_OPTIONS = ["Under ₹50K", "₹50K–₹1L", "₹1L–₹3L", "₹3L–₹5L", "₹5L+"];

export const GROWTH_PROBLEM_OPTIONS = [
  "Ads aren't profitable",
  "Can't scale",
  "Low website conversion",
  "Creatives aren't working",
  "Website needs improvement",
  "Not sure",
];

type FormState = {
  name: string;
  phone: string;
  brand: string;
  adSpend: string;
  problem: string;
};

const EMPTY: FormState = { name: "", phone: "", brand: "", adSpend: "", problem: "" };

interface LeadFormProps {
  /** DOM id used as the scroll target. The main form keeps "audit-form". */
  id?: string;
  /** Where the form sits on the page, sent with analytics events. */
  location?: string;
  /** Show the form's own heading. Turn off when a parent section already has one. */
  showHeading?: boolean;
  className?: string;
}

const inputClass =
  "w-full px-4 py-3.5 rounded-xl border border-input bg-background text-base md:text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-shadow";

const labelClass = "block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5";

const LeadForm = ({ id = "audit-form", location = "after_hero", showHeading = true, className = "" }: LeadFormProps) => {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [waLink, setWaLink] = useState("");
  const started = useRef(false);

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    track("Form_Start", { form_location: location });
  };

  const update = (key: keyof FormState, value: string) => {
    markStarted();
    if (key === "phone") setPhoneError("");
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const digits = form.phone.replace(/\D/g, "");
    const national = digits.length > 10 && digits.startsWith("91") ? digits.slice(2) : digits;
    if (national.length < 10 || digits.length > 13) {
      setPhoneError("Please enter a valid WhatsApp number.");
      return;
    }

    setIsSubmitting(true);

    const text = `Hi HastagCreator, I'd like a free D2C growth audit.
*Name:* ${form.name}
*WhatsApp:* ${form.phone}
*Brand / Website:* ${form.brand}
*Monthly Ad Spend:* ${form.adSpend}
*Biggest Growth Problem:* ${form.problem}`;
    const url = whatsappUrl(text);

    track("Form_Submit", {
      form_location: location,
      ad_spend: form.adSpend,
      growth_problem: form.problem,
    });

    // Existing email notification (Web3Forms). Fire-and-forget with keepalive so it
    // survives the WhatsApp tab opening and never blocks the lead.
    try {
      if (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY) {
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          keepalive: true,
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
            from_name: "HastagCreator Leads",
            subject: `🔥 NEW D2C AUDIT LEAD – ${form.brand} (${form.adSpend})`,
            name: form.name,
            phone: form.phone,
            brand_website: form.brand,
            monthly_ad_spend: form.adSpend,
            biggest_growth_problem: form.problem,
            form_location: location,
            message: `New free D2C growth audit request\n\nName: ${form.name}\nWhatsApp: ${form.phone}\nBrand / Website: ${form.brand}\nMonthly Ad Spend: ${form.adSpend}\nBiggest Growth Problem: ${form.problem}\nForm: ${location}`,
          }),
        }).catch((error) => console.warn("Web3Forms submission failed:", error));
      }
    } catch (error) {
      console.warn("Web3Forms submission failed:", error);
    }

    // Open WhatsApp inside the click so browsers don't treat it as a popup.
    // (No "noopener" feature string: it makes window.open return null, which would
    // look like a blocked popup. We detach the opener manually instead.)
    const win = window.open(url, "_blank");
    if (win) {
      try {
        win.opener = null;
      } catch {
        /* noop */
      }
    }
    setWaLink(url);
    setIsSubmitting(false);
    setSubmitted(true);
    if (!win) {
      // Popup blocked (common on in-app browsers) – fall back to same-tab navigation.
      window.location.href = url;
    }
  };

  if (submitted) {
    return (
      <div id={id} className={`scroll-mt-28 ${className}`}>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card rounded-2xl p-8 md:p-12 shadow-card border border-border text-center"
        >
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl md:text-3xl font-black mb-3 text-foreground">Request received 🎉</h3>
          <p className="text-muted-foreground mb-6">
            We'll review your brand and reach out on WhatsApp within 24 hours.
          </p>
          {waLink && (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("WhatsApp_Click", { cta_location: `${location}_thank_you` })}
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3.5 rounded-full shadow-lg"
            >
              WhatsApp didn't open? Tap here
              <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div id={id} className={`scroll-mt-28 rounded-2xl transition-shadow duration-500 ${className}`}>
      <form
        onSubmit={handleSubmit}
        onFocus={markStarted}
        className="bg-card rounded-2xl p-5 sm:p-8 shadow-card border border-border"
        aria-label="Free D2C growth audit request"
        noValidate={false}
      >
        {showHeading && (
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-foreground mb-2">
              Find What's Blocking Your Growth
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Get a free review of your Ads, Website, Offer &amp; Conversion Funnel.
            </p>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${id}-name`} className={labelClass}>Name</label>
            <input
              id={`${id}-name`}
              required
              name="name"
              autoComplete="name"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`${id}-phone`} className={labelClass}>WhatsApp Number</label>
            <input
              id={`${id}-phone`}
              required
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              aria-invalid={!!phoneError}
              aria-describedby={phoneError ? `${id}-phone-error` : undefined}
              className={`${inputClass} ${phoneError ? "border-red-500 focus:ring-red-500/30" : ""}`}
            />
            {phoneError && (
              <p id={`${id}-phone-error`} className="text-xs text-red-500 font-semibold mt-1.5">
                {phoneError}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${id}-brand`} className={labelClass}>Brand / Website</label>
            <input
              id={`${id}-brand`}
              required
              name="brand"
              autoComplete="url"
              placeholder="yourbrand.com or Instagram handle"
              value={form.brand}
              onChange={(e) => update("brand", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`${id}-spend`} className={labelClass}>Monthly Ad Spend</label>
            <select
              id={`${id}-spend`}
              required
              name="adSpend"
              value={form.adSpend}
              onChange={(e) => update("adSpend", e.target.value)}
              className={`${inputClass} ${form.adSpend ? "" : "text-muted-foreground/70"}`}
            >
              <option value="" disabled>Select range</option>
              {AD_SPEND_OPTIONS.map((o) => (
                <option key={o} value={o} className="text-foreground">{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={`${id}-problem`} className={labelClass}>Biggest Growth Problem</label>
            <select
              id={`${id}-problem`}
              required
              name="problem"
              value={form.problem}
              onChange={(e) => update("problem", e.target.value)}
              className={`${inputClass} ${form.problem ? "" : "text-muted-foreground/70"}`}
            >
              <option value="" disabled>Select one</option>
              {GROWTH_PROBLEM_OPTIONS.map((o) => (
                <option key={o} value={o} className="text-foreground">{o}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-synthetic w-full mt-6 min-h-[56px] uppercase tracking-wide disabled:opacity-70"
        >
          {isSubmitting ? <span className="animate-pulse">Sending…</span> : <>Get My Free Growth Audit <ArrowRight className="w-5 h-5" /></>}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mt-4 text-center">
          <Lock className="w-3.5 h-3.5 shrink-0" />
          Free. No obligation. We reply on WhatsApp within 24 hours.
        </p>
      </form>
    </div>
  );
};

export default LeadForm;

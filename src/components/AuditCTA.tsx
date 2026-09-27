import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { track } from "@/lib/track";

export const AUDIT_FORM_ID = "audit-form";
export const PRIMARY_CTA_LABEL = "Get My Free D2C Growth Audit";

/**
 * Smooth-scroll an element into view, honouring its CSS scroll-margin-top.
 * Uses its own rAF animation (re-measuring the target every frame) because native
 * smooth scrolling gets cancelled here when the navbar collapses on first scroll,
 * and lazy-loaded images can shift the target while scrolling.
 */
export function smoothScrollToElement(el: HTMLElement) {
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const offset = () => parseFloat(getComputedStyle(el).scrollMarginTop || "0") || 0;
  const targetY = () => Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset());

  if (reduce) {
    window.scrollTo(0, targetY());
    return;
  }

  const startY = window.scrollY;
  const distance = Math.abs(targetY() - startY);
  const duration = Math.min(1100, 450 + distance * 0.12);
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  let start: number | null = null;
  let cancelled = false;
  const cancel = () => {
    cancelled = true;
  };
  window.addEventListener("wheel", cancel, { passive: true, once: true });
  window.addEventListener("touchstart", cancel, { passive: true, once: true });

  const step = (now: number) => {
    if (cancelled) return;
    if (start === null) start = now;
    const t = Math.min(1, (now - start) / duration);
    const y = startY + (targetY() - startY) * ease(t);
    window.scrollTo(0, y);
    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
    }
  };
  requestAnimationFrame(step);
}

/** Smooth-scroll to the main lead form. Returns false if it isn't on this page. */
export function scrollToAuditForm(targetId: string = AUDIT_FORM_ID) {
  const el = document.getElementById(targetId);
  if (!el) return false;
  smoothScrollToElement(el);
  // Brief highlight so the visitor sees where they landed
  el.setAttribute("data-highlight", "true");
  window.setTimeout(() => el.removeAttribute("data-highlight"), 1800);
  return true;
}

export function useAuditCTA() {
  const location = useLocation();
  const navigate = useNavigate();

  return useCallback(
    (source: string, targetId: string = AUDIT_FORM_ID) => {
      track("CTA_Click", { cta_location: source, page_path: location.pathname });
      if (location.pathname === "/" && scrollToAuditForm(targetId)) return;
      navigate(`/#${AUDIT_FORM_ID}`);
    },
    [location.pathname, navigate]
  );
}

type Variant = "primary" | "dark" | "light";

const variantClass: Record<Variant, string> = {
  primary: "btn-synthetic",
  dark:
    "bg-foreground text-background px-8 md:px-10 py-4 md:py-5 rounded-full text-sm md:text-base font-bold shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3",
  light:
    "bg-white text-primary px-8 md:px-10 py-4 md:py-5 rounded-full text-sm md:text-base font-bold shadow-[0_10px_40px_-5px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3",
};

interface AuditCTAProps {
  source: string;
  label?: string;
  variant?: Variant;
  className?: string;
  targetId?: string;
}

/** The single primary conversion action used across the site. */
const AuditCTA = ({ source, label = PRIMARY_CTA_LABEL, variant = "primary", className = "", targetId }: AuditCTAProps) => {
  const goToAudit = useAuditCTA();
  return (
    <button
      type="button"
      onClick={() => goToAudit(source, targetId)}
      data-cta="audit"
      data-cta-location={source}
      className={`${variantClass[variant]} min-h-[52px] uppercase tracking-wide w-full sm:w-auto group ${className}`}
    >
      {label}
      <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
    </button>
  );
};

export default AuditCTA;

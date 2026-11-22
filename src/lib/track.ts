/**
 * Lightweight conversion tracking.
 *
 * Sits on top of the tags already loaded in index.html (GTM, gtag/GA4, Meta Pixel)
 * and never initialises or reconfigures them. Every call is guarded, so if a tag is
 * blocked or not loaded the site keeps working.
 *
 * Events: CTA_Click, Form_Start, Form_Submit, WhatsApp_Click
 */

export type TrackEvent = "CTA_Click" | "Form_Start" | "Form_Submit" | "WhatsApp_Click";

type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: TrackEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== ""));

  try {
    // GTM: custom event for triggers
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...clean });
  } catch {
    /* noop */
  }

  try {
    // GA4 (gtag configured in index.html)
    window.gtag?.("event", event, clean);
  } catch {
    /* noop */
  }

  try {
    // Meta Pixel custom event
    window.fbq?.("trackCustom", event, clean);
    // Standard Meta events so ad delivery can optimise on them
    if (event === "Form_Submit") window.fbq?.("track", "Lead", clean);
    if (event === "WhatsApp_Click") window.fbq?.("track", "Contact", clean);
  } catch {
    /* noop */
  }
}

export const WHATSAPP_NUMBER = "918059957479";

export function whatsappUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

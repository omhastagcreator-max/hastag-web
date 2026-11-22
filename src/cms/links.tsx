import { useNavigate } from "react-router-dom";
import { smoothScrollToElement, AUDIT_FORM_ID } from "@/components/AuditCTA";
import { track } from "@/lib/track";

/**
 * Follow a link set in the editor.
 *   "#some-id"       → smooth-scroll to that section on this page
 *   "#audit"          → scroll to the lead form (or go to the home page form)
 *   "/about"          → in-app navigation (no reload)
 *   "https://…"       → opens in a new tab (unless target is _self)
 *   "tel:", "mailto:" → browser default
 */
export function followLink(href: string, navigate: (to: string) => void, target?: string) {
  if (!href) return;
  if (href === "#audit" || href === "#" + AUDIT_FORM_ID) {
    const el = document.getElementById(AUDIT_FORM_ID);
    if (el) smoothScrollToElement(el);
    else navigate("/#" + AUDIT_FORM_ID);
    return;
  }
  if (href.startsWith("#")) {
    const el = document.getElementById(href.slice(1));
    if (el) smoothScrollToElement(el);
    return;
  }
  if (/^(tel:|mailto:|sms:)/.test(href)) {
    window.location.href = href;
    return;
  }
  if (/^https?:\/\//.test(href)) {
    if (target === "_self") window.location.href = href;
    else window.open(href, "_blank", "noopener,noreferrer");
    return;
  }
  if (target === "_blank") {
    window.open(href, "_blank", "noopener");
    return;
  }
  navigate(href);
  if (!href.includes("#")) window.scrollTo(0, 0);
}

export function useFollowLink() {
  const navigate = useNavigate();
  return (href: string, target?: string) => followLink(href, navigate, target);
}

interface CmsLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  trackLabel?: string;
}

/** An <a> that understands editor link formats (anchors, internal pages, external URLs). */
export function CmsLink({ href, trackLabel, onClick, target, children, ...rest }: CmsLinkProps) {
  const follow = useFollowLink();
  const external = /^https?:\/\//.test(href || "");
  return (
    <a
      href={href === "#audit" ? "#" + AUDIT_FORM_ID : href || undefined}
      target={target || (external ? "_blank" : undefined)}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || !href) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey) return; // let the browser open new tabs
        e.preventDefault();
        if (trackLabel) track("CTA_Click", { cta_location: trackLabel, cta_label: String(children ?? "") });
        follow(href, target || (external ? "_blank" : undefined));
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

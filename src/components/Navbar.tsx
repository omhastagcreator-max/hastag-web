import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuditCTA } from "./AuditCTA";
import { useChromeSuppressed } from "@/cms/ChromeContext";

type NavLink = {
  label: string;
  to: string;
  dropdown?: { label: string; to: string }[];
};

export const defaultNavLinks: NavLink[] = [
  { 
    label: "Website Development", 
    to: "/web-development"
  },
  { 
    label: "Performance Marketing", 
    to: "/performance-marketing"
  },
  { 
    label: "Influencer Marketing", 
    to: "/influencer-ugc"
  },
  { 
    label: "Careers", 
    to: "/careers"
  }
];

export interface NavbarProps {
  links?: NavLink[];
  logo?: string;
  logoAlt?: string;
  logoHeight?: number;
  topBarEnabled?: boolean;
  topBarText?: string;
  topBarMobileText?: string;
  ctaEnabled?: boolean;
  ctaLabel?: string;
  mobileCtaLabel?: string;
  /** Empty = scroll to the audit form (default behaviour) */
  ctaLink?: string;
}

export const navbarDefaults: Required<Omit<NavbarProps, "links">> & { links: NavLink[] } = {
  links: defaultNavLinks,
  logo: "/logo.png",
  logoAlt: "HastagCreator Logo",
  logoHeight: 40,
  topBarEnabled: true,
  topBarText: "HastagCreator · D2C Growth Partner · 11+ Years of Combined Growth Experience",
  topBarMobileText: "#Creator · D2C Growth Partner",
  ctaEnabled: true,
  ctaLabel: "Get Free Audit →",
  mobileCtaLabel: "Get My Free D2C Growth Audit →",
  ctaLink: "",
};

const isExternal = (to: string) => /^(https?:|mailto:|tel:|#)/.test(to) || to.startsWith("/#");

const NavbarInner = (props: NavbarProps) => {
  const p = { ...navbarDefaults, ...Object.fromEntries(Object.entries(props).filter(([, v]) => v !== undefined)) };
  const navLinks = (p.links || []).map((l) => ({ ...l, dropdown: l.dropdown && l.dropdown.length ? l.dropdown : undefined }));
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDesktopDropdown, setActiveDesktopDropdown] = useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const location = useLocation();
  const goToAudit = useAuditCTA();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onCta = (src: string) => {
    if (p.ctaLink) {
      if (/^https?:/.test(p.ctaLink)) window.open(p.ctaLink, "_blank", "noopener");
      else if (p.ctaLink.startsWith("/") && !p.ctaLink.includes("#")) navigate(p.ctaLink);
      else window.location.assign(p.ctaLink);
      return;
    }
    goToAudit(src);
  };

  const toggleMobileDropdown = (label: string) => {
    setActiveMobileDropdown(activeMobileDropdown === label ? null : label);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 shadow-card backdrop-blur-xl border-b border-border"
          : "bg-background/50 backdrop-blur-md border-b border-border/20"
      }`}
    >
      <AnimatePresence>
        {!scrolled && p.topBarEnabled && (
          <motion.div
            initial={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0, overflow: "hidden" }}
            transition={{ duration: 0.3 }}
          >
            {/* Trust badge bar */}
            <div className="bg-primary text-primary-foreground text-[10px] sm:text-xs py-1.5 text-center font-bold tracking-widest uppercase shadow-sm">
              <span className="hidden sm:inline">{p.topBarText}</span>
              <span className="sm:hidden">{p.topBarMobileText || p.topBarText}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-main flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center min-h-[48px] min-w-[48px]">
          <img src={p.logo} alt={p.logoAlt} width="160" height={p.logoHeight} style={p.logoHeight !== 40 ? { height: p.logoHeight } : undefined} className="h-10 w-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-transform hover:scale-105" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative py-8"
              onMouseEnter={() => link.dropdown && setActiveDesktopDropdown(link.label)}
              onMouseLeave={() => link.dropdown && setActiveDesktopDropdown(null)}
            >
              {isExternal(link.to) || link.to === "#" ? (
                <a
                  href={link.to === "#" ? undefined : link.to}
                  className="text-[13px] font-bold tracking-wide uppercase transition-colors hover:text-primary flex items-center gap-1 text-foreground/80"
                >
                  {link.label}
                  {link.dropdown && <ChevronDown size={14} className={`transition-transform duration-300 ${activeDesktopDropdown === link.label ? "rotate-180 text-primary" : ""}`} />}
                </a>
              ) : (
                <Link
                  to={link.to}
                  className={`text-[13px] font-bold tracking-wide uppercase transition-colors hover:text-primary flex items-center gap-1 ${
                    location.pathname === link.to ? "text-primary" : "text-foreground/80"
                  }`}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown size={14} className={`transition-transform duration-300 ${activeDesktopDropdown === link.label ? "rotate-180 text-primary" : ""}`} />}
                </Link>
              )}

              {link.dropdown && (
                <AnimatePresence>
                  {activeDesktopDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-[80px] left-0 w-64 bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-3 z-50"
                    >
                      {link.dropdown.map((sub, idx) => (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.03 }}
                          key={sub.to}
                        >
                          <Link
                            to={sub.to}
                            className="block px-4 py-2.5 text-sm font-semibold text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                          >
                            {sub.label}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
          {/* Primary CTA – same lead action as the rest of the site */}
          {p.ctaEnabled && <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCta("navbar")}
            className="bg-primary text-primary-foreground px-7 py-3 rounded-full text-xs uppercase tracking-widest font-extrabold ml-2"
          >
            {p.ctaLabel}
          </motion.button>}
        </div>

        {/* Mobile toggle */}
        <button 
          aria-label="Toggle Navigation Menu" 
          className="lg:hidden p-2 text-foreground min-w-[48px] min-h-[48px] flex items-center justify-center" 
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-2xl absolute w-full"
          >
            <div className="flex flex-col p-6 space-y-2 h-[80vh] overflow-y-auto pb-32">
              {navLinks.map((link) => (
                <div key={link.label} className="border-b border-border/30 last:border-0">
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleMobileDropdown(link.label)}
                        className={`w-full flex items-center justify-between text-lg font-bold py-4 ${
                          location.pathname === link.to ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {link.label}
                        <ChevronDown size={20} className={`transition-transform bg-secondary p-1 rounded-full ${activeMobileDropdown === link.label ? "rotate-180 bg-primary text-white" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {activeMobileDropdown === link.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pb-4 space-y-3 border-l-2 border-primary/20 ml-2">
                              {link.dropdown.map((sub) => (
                                <Link
                                  key={sub.to}
                                  to={sub.to}
                                  onClick={() => setOpen(false)}
                                  className="block text-base font-semibold text-muted-foreground hover:text-primary"
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : isExternal(link.to) ? (
                    <a
                      href={link.to}
                      onClick={() => setOpen(false)}
                      className="block text-lg font-bold py-4 text-foreground hover:text-primary"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={`block text-lg font-bold py-4 ${
                        location.pathname === link.to ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              {p.ctaEnabled && <div className="mt-8 pt-6 border-t border-border">
                <button 
                  onClick={() => { setOpen(false); onCta("navbar_mobile_menu"); }}
                  className="w-full bg-primary text-primary-foreground px-6 py-4 rounded-full text-base font-bold uppercase tracking-wide shadow-xl active:scale-95 transition-transform"
                >
                  {p.mobileCtaLabel || p.ctaLabel}
                </button>
              </div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/** Rendered by legacy pages; hidden when the CMS header group renders the navbar instead. */
const Navbar = (props: NavbarProps) => {
  const suppressed = useChromeSuppressed();
  if (suppressed) return null;
  return <NavbarInner {...props} />;
};

export default Navbar;

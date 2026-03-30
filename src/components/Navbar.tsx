import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type NavLink = {
  label: string;
  to: string;
  dropdown?: { label: string; to: string }[];
};

const navLinks: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Our Arsenal", to: "/#services" },
  { label: "Portfolio", to: "/portfolio" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDesktopDropdown, setActiveDesktopDropdown] = useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* Trust badge bar */}
      <div className="bg-primary text-primary-foreground text-[10px] sm:text-xs py-1.5 text-center font-bold tracking-widest uppercase shadow-sm">
        <span className="hidden sm:inline">HastagCreator · 11 Years of Experience · India's Largest Marketing Agency</span>
        <span className="sm:hidden">#Creator · India's Largest Marketing Agency</span>
      </div>

      <div className="container-main flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="HastagCreator Logo" className="h-10 w-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-transform hover:scale-105" />
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
              {link.to.startsWith("/#") || link.to === "#" ? (
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
          {/* Calendly CTA Hook */}
          <a href="https://calendly.com/domsco-tech/30min?month=2026-03" target="_blank" rel="noreferrer" className="hidden lg:block ml-2">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-foreground text-background px-7 py-3 rounded-full text-xs uppercase tracking-widest font-extrabold"
            >
              Schedule a Call
            </motion.button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2 text-foreground" onClick={() => setOpen(!open)}>
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
                  ) : link.to.startsWith("/#") ? (
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
              <div className="mt-8 pt-6 border-t border-border">
                <a href="https://calendly.com/domsco-tech/30min?month=2026-03" target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="block">
                  <button className="w-full bg-foreground text-background px-6 py-4 rounded-full text-base font-bold shadow-xl active:scale-95 transition-transform">
                    Schedule a Call
                  </button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

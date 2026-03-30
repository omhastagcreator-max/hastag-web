import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const serviceLinks = [
  { label: "Meta Ads", to: "/services#meta-ads" },
  { label: "Google Ads", to: "/services#google-ads" },
  { label: "CRO", to: "/services#cro" },
  { label: "Landing Pages", to: "/services#landing-pages" },
  { label: "Shopify", to: "/services#shopify" },
  { label: "WordPress", to: "/services#wordpress" },
  { label: "Analytics", to: "/services#analytics" },
];

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services", dropdown: serviceLinks },
  { label: "Starter Plan", to: "/starter-plan" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/#audit-form" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background shadow-card border-b border-border"
          : "bg-background/80 backdrop-blur-lg border-b border-border/50"
      }`}
    >
      {/* Trust badge bar */}
      <div className="bg-charcoal text-charcoal-foreground/80 text-[10px] sm:text-xs py-1.5 text-center font-medium tracking-wide">
        <span className="hidden sm:inline">Google Certified · Meta Certified · Full-Stack Performance Marketing</span>
        <span className="sm:hidden">Google & Meta Certified · Performance Marketing</span>
      </div>

      <div className="container-main flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/HastagLogo.png" alt="HastagCreator Logo" className="h-12 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <div
              key={link.to}
              className="relative"
              onMouseEnter={() => link.dropdown && setDropdownOpen(true)}
              onMouseLeave={() => link.dropdown && setDropdownOpen(false)}
            >
              {link.to.startsWith("/#") ? (
                <a
                  href={link.to}
                  className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 text-muted-foreground"
                >
                  {link.label}
                  {link.dropdown && <ChevronDown size={14} />}
                </a>
              ) : (
                <Link
                  to={link.to}
                  className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                    location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown size={14} />}
                </Link>
              )}

              {link.dropdown && (
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-52 bg-card rounded-xl shadow-card-hover border border-border p-2 z-50"
                    >
                      {link.dropdown.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
          <Link to="/#audit-form">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gradient-to-r from-primary to-primary-deep text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold shadow-md"
            >
              Get Free Audit
            </motion.button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="flex flex-col gap-1 p-5">
              {navLinks.map((link) => (
                <div key={link.to}>
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className={`w-full flex items-center justify-between text-base font-medium py-2 ${
                          location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {link.label}
                        <ChevronDown size={16} className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            className="overflow-hidden pl-4"
                          >
                            {link.dropdown.map((sub) => (
                              <Link
                                key={sub.to}
                                to={sub.to}
                                onClick={() => setOpen(false)}
                                className="block py-1.5 text-sm text-muted-foreground hover:text-primary"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : link.to.startsWith("/#") ? (
                    <a
                      href={link.to}
                      onClick={() => setOpen(false)}
                      className="block text-base font-medium py-2 text-muted-foreground hover:text-primary"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={`block text-base font-medium py-2 ${
                        location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <a href="/#audit-form" onClick={() => setOpen(false)} className="mt-2 block">
                <button className="w-full bg-gradient-to-r from-primary to-primary-deep text-primary-foreground px-5 py-3 rounded-full text-sm font-semibold">
                  Get Free Audit
                </button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

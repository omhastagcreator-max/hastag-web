import { Link } from "react-router-dom";

const Footer = () => (
  <>
    {/* SUPPORT CTA SECTION */}
    <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 sm:py-16 text-center border-t border-primary/10">
      <div className="container-main flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Instant Support?</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Have questions about our plans, pricing, or need help with a campaign? Our team is available on WhatsApp to assist you immediately.
        </p>
        <a 
          href="https://wa.me/919450010826?text=Hi%20HastagCreator,%20I%20need%20support!" 
          target="_blank" 
          rel="noreferrer"
          className="bg-[#25D366] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"/>
          </svg>
          Chat with Support
        </a>
      </div>
    </section>

    <footer className="bg-charcoal text-charcoal-foreground">
    <div className="container-main section-padding">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link to="/" className="inline-block mb-4">
            <img src="/HastagLogo.png" alt="HastagCreator Logo" className="h-12 w-auto bg-white/90 p-2 rounded" />
          </Link>
          <p className="text-sm text-charcoal-foreground/60 leading-relaxed">
            Leading India-based performance marketing agency. We deliver high ROI through Meta Ads, Google Ads, eCommerce store development, and CRO for global brands.
          </p>
          <p className="mt-3 text-xs text-charcoal-foreground/40 font-semibold uppercase tracking-wider">
            Registered Business
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display text-sm font-bold mb-4 uppercase tracking-wider text-charcoal-foreground/80">Services</h4>
          <ul className="space-y-2 text-sm text-charcoal-foreground/60">
            <li><Link to="/services" className="hover:text-primary transition-colors">Meta Ads Management</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Google Ads Management</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Conversion Rate Optimization</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Landing Page Design</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Shopify & Ecommerce</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">WordPress Development</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-display text-sm font-bold mb-4 uppercase tracking-wider text-charcoal-foreground/80">Company</h4>
          <ul className="space-y-2 text-sm text-charcoal-foreground/60">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
            <li><Link to="/starter-plan" className="hover:text-primary transition-colors font-semibold text-primary/90">Starter Plan</Link></li>
            <li><Link to="/#why-us" className="hover:text-primary transition-colors">About</Link></li>
            <li><a href="/#audit-form" className="hover:text-primary transition-colors">Contact</a></li>
            <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
          </ul>
        </div>

        {/* Contact & Legal */}
        <div>
          <h4 className="font-display text-sm font-bold mb-4 uppercase tracking-wider text-charcoal-foreground/80">Get In Touch</h4>
          <ul className="space-y-2.5 text-sm text-charcoal-foreground/60">
            <li className="flex items-start gap-2">
              <span className="font-semibold w-20 flex-shrink-0">Email:</span>
              <a href="mailto:hello@hastagcreator.com" className="hover:text-primary transition-colors word-break-all">hello@hastagcreator.com</a>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold w-20 flex-shrink-0">WhatsApp:</span>
              <a href="https://wa.me/919450010826" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">+91 9450010826</a>
            </li>

            <li className="flex items-start gap-2 pt-2 border-t border-charcoal-foreground/10 mt-2">
              <span className="font-semibold w-20 flex-shrink-0">Address:</span>
              <span>Plot 19, KP, Greater Noida, Uttar Pradesh</span>
            </li>
            <li className="flex items-start gap-2 pt-1">
              <span className="font-semibold w-20 flex-shrink-0">GSTIN:</span>
              <span className="uppercase tracking-wider font-mono text-xs mt-0.5">09AMVPU5948E1Z4</span>
            </li>
            <li className="flex items-center gap-4 pt-4 mt-2 border-t border-charcoal-foreground/10">
              <img src="/msme-logo.png" alt="MSME Registered" className="h-10 w-auto bg-white p-1 rounded-sm object-contain" />
              <img src="/digital-india-logo.png" alt="Digital India" className="h-10 w-auto bg-white p-1 rounded-sm object-contain" />
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-charcoal-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-foreground/40">
        <span>© {new Date().getFullYear()} HastagCreator · Performance Marketing Agency</span>
        <span>Google & Meta Certified</span>
      </div>
    </div>
    </footer>
  </>
);

export default Footer;

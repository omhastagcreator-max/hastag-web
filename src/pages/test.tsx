import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { CheckCircle2, ArrowRight, XCircle, ChevronDown, Star, Shield, Clock, Users, TrendingUp, BadgeCheck, Zap, MessageSquare } from "lucide-react";

/* ─── Google Fonts ─────────────────────────────────────────────────── */
const FontLoader = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,400;0,600;0,700;1,400&display=swap');

    :root {
      --navy: #080E1E;
      --navy-light: #0F1A30;
      --navy-card: #141F38;
      --gold: #E8A830;
      --gold-light: #F5C855;
      --gold-muted: rgba(232,168,48,0.12);
      --cream: #F5F0E8;
      --cream-muted: #EDE8DC;
      --red-soft: #FF4D4D;
      --green-brand: #22C55E;
      --text-primary: #F5F0E8;
      --text-secondary: #A8B0C0;
      --border-subtle: rgba(255,255,255,0.08);
    }

    * { box-sizing: border-box; }

    .sp-page {
      font-family: 'Sora', sans-serif;
      background: var(--navy);
      color: var(--text-primary);
      overflow-x: hidden;
    }

    /* ── Noise grain overlay ── */
    .sp-page::before {
      content: '';
      position: fixed; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none; z-index: 0; opacity: 0.4;
    }

    /* ── Shared layout ── */
    .sp-section { padding: 80px 24px; position: relative; z-index: 1; }
    .sp-container { max-width: 1100px; margin: 0 auto; }
    .sp-container-sm { max-width: 760px; margin: 0 auto; }
    .sp-section-title {
      font-family: 'Lora', serif;
      font-size: clamp(1.8rem, 4vw, 2.8rem);
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 12px;
    }
    .sp-section-sub {
      color: var(--text-secondary);
      font-size: 1.05rem;
      margin-bottom: 48px;
      line-height: 1.6;
    }

    /* ── HERO ── */
    .sp-hero {
      min-height: 100vh;
      display: flex; align-items: center;
      padding: 120px 24px 80px;
      position: relative;
      background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(232,168,48,0.12) 0%, transparent 70%),
                  radial-gradient(ellipse 40% 40% at 80% 50%, rgba(99,140,255,0.06) 0%, transparent 60%),
                  var(--navy);
    }
    .sp-hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 6px 16px;
      border: 1px solid rgba(232,168,48,0.35);
      border-radius: 100px;
      background: rgba(232,168,48,0.08);
      color: var(--gold);
      font-size: 0.8rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
      margin-bottom: 24px;
    }
    .sp-pulse { width: 8px; height: 8px; border-radius: 50%; background: var(--gold); position: relative; }
    .sp-pulse::after {
      content: ''; position: absolute; inset: -3px;
      border-radius: 50%; border: 2px solid var(--gold);
      animation: pulse-ring 1.8s ease-out infinite;
    }
    @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }

    .sp-hero-h1 {
      font-family: 'Lora', serif;
      font-size: clamp(2.2rem, 5.5vw, 4rem);
      font-weight: 700;
      line-height: 1.15;
      margin-bottom: 20px;
    }
    .sp-hero-h1 em { font-style: italic; color: var(--gold); }
    .sp-hero-sub {
      font-size: clamp(1rem, 2vw, 1.15rem);
      color: var(--text-secondary);
      line-height: 1.7;
      max-width: 580px;
      margin-bottom: 40px;
    }

    .sp-price-block {
      display: flex; align-items: baseline; gap: 12px;
      margin-bottom: 8px;
    }
    .sp-price-main { font-size: clamp(3rem, 8vw, 5rem); font-weight: 800; letter-spacing: -0.02em; color: var(--cream); }
    .sp-price-old {
      font-size: 1.2rem; color: var(--text-secondary); text-decoration: line-through;
    }
    .sp-price-tag {
      display: inline-block;
      background: rgba(34,197,94,0.12); color: #4ade80;
      border: 1px solid rgba(34,197,94,0.25);
      padding: 4px 12px; border-radius: 100px;
      font-size: 0.78rem; font-weight: 600; letter-spacing: 0.05em;
      margin-bottom: 32px;
    }

    .sp-cta-btn {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 16px 32px;
      background: var(--gold);
      color: var(--navy);
      font-weight: 700; font-size: 1rem;
      border-radius: 100px; border: none; cursor: pointer;
      transition: all 0.25s;
      text-decoration: none;
      box-shadow: 0 0 0 0 rgba(232,168,48,0.4);
    }
    .sp-cta-btn:hover {
      background: var(--gold-light);
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(232,168,48,0.35);
    }
    .sp-cta-btn:active { transform: translateY(0); }

    .sp-trust-row {
      display: flex; flex-wrap: wrap; gap: 20px;
      margin-top: 28px;
    }
    .sp-trust-item {
      display: flex; align-items: center; gap: 7px;
      font-size: 0.82rem; color: var(--text-secondary);
    }
    .sp-trust-item svg { color: var(--green-brand); flex-shrink: 0; }

    /* ── SOCIAL PROOF NUMBERS ── */
    .sp-numbers {
      background: var(--navy-light);
      border-top: 1px solid var(--border-subtle);
      border-bottom: 1px solid var(--border-subtle);
      padding: 40px 24px;
    }
    .sp-numbers-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 2px;
    }
    .sp-number-item {
      text-align: center; padding: 20px;
      border-right: 1px solid var(--border-subtle);
    }
    .sp-number-item:last-child { border-right: none; }
    .sp-number-val { font-size: 2.2rem; font-weight: 800; color: var(--gold); letter-spacing: -0.02em; }
    .sp-number-label { font-size: 0.78rem; color: var(--text-secondary); margin-top: 4px; text-transform: uppercase; letter-spacing: 0.06em; }

    /* ── FOUNDER CREDIBILITY ── */
    .sp-founder {
      background: var(--navy);
      padding: 80px 24px;
    }
    .sp-founder-card {
      background: var(--navy-card);
      border: 1px solid var(--border-subtle);
      border-radius: 24px;
      padding: 40px;
      display: flex; gap: 36px; align-items: flex-start;
      position: relative; overflow: hidden;
    }
    .sp-founder-card::before {
      content: '"';
      position: absolute; top: -20px; left: 30px;
      font-size: 12rem; font-family: 'Lora', serif;
      color: var(--gold); opacity: 0.06; line-height: 1;
    }
    .sp-founder-avatar {
      width: 80px; height: 80px; border-radius: 50%;
      background: linear-gradient(135deg, var(--gold) 0%, #c47f10 100%);
      display: flex; align-items: center; justify-content: center;
      font-size: 2rem; font-weight: 700; color: var(--navy);
      flex-shrink: 0;
    }
    .sp-founder-name { font-weight: 700; font-size: 1.1rem; margin-bottom: 2px; }
    .sp-founder-role { font-size: 0.8rem; color: var(--gold); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; }
    .sp-founder-text { color: var(--text-secondary); line-height: 1.7; font-size: 0.97rem; }

    /* ── TESTIMONIALS ── */
    .sp-testimonials { padding: 80px 24px; background: var(--navy-light); }
    .sp-testi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
    .sp-testi-card {
      background: var(--navy-card);
      border: 1px solid var(--border-subtle);
      border-radius: 20px; padding: 28px;
      transition: border-color 0.2s, transform 0.2s;
    }
    .sp-testi-card:hover { border-color: rgba(232,168,48,0.3); transform: translateY(-3px); }
    .sp-stars { display: flex; gap: 3px; margin-bottom: 14px; }
    .sp-testi-text { font-size: 0.95rem; line-height: 1.65; color: var(--cream-muted); margin-bottom: 20px; font-style: italic; }
    .sp-testi-author { display: flex; align-items: center; gap: 12px; }
    .sp-testi-avatar {
      width: 40px; height: 40px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: 0.9rem; color: var(--navy);
    }
    .sp-testi-name { font-weight: 600; font-size: 0.9rem; }
    .sp-testi-meta { font-size: 0.75rem; color: var(--text-secondary); }
    .sp-verified { display: flex; align-items: center; gap: 5px; font-size: 0.72rem; color: var(--green-brand); margin-top: 4px; }

    /* ── WHAT YOU GET ── */
    .sp-deliverables { padding: 80px 24px; background: var(--navy); }
    .sp-deliv-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
    .sp-deliv-card {
      background: var(--navy-card);
      border: 1px solid var(--border-subtle);
      border-radius: 20px; padding: 28px;
      transition: all 0.2s;
    }
    .sp-deliv-card:hover { border-color: rgba(232,168,48,0.4); background: rgba(232,168,48,0.04); }
    .sp-deliv-icon {
      width: 48px; height: 48px; border-radius: 14px;
      background: var(--gold-muted); display: flex; align-items: center; justify-content: center;
      margin-bottom: 16px; color: var(--gold);
    }
    .sp-deliv-title { font-weight: 700; margin-bottom: 8px; font-size: 1rem; }
    .sp-deliv-desc { font-size: 0.87rem; color: var(--text-secondary); line-height: 1.6; }

    .sp-disclaimer {
      margin-top: 32px;
      background: rgba(255,200,0,0.06);
      border: 1px solid rgba(255,200,0,0.2);
      border-radius: 16px; padding: 20px 24px;
      display: flex; gap: 14px; align-items: flex-start;
    }
    .sp-disclaimer-icon { color: var(--gold); flex-shrink: 0; margin-top: 2px; }
    .sp-disclaimer-text { font-size: 0.87rem; color: #d4b870; line-height: 1.6; }

    /* ── FIT CHECK ── */
    .sp-fit { padding: 80px 24px; background: var(--navy-light); }
    .sp-fit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    @media (max-width: 640px) { .sp-fit-grid { grid-template-columns: 1fr; } }
    .sp-fit-card { border-radius: 24px; padding: 32px; }
    .sp-fit-yes { background: rgba(34,197,94,0.07); border: 1px solid rgba(34,197,94,0.2); }
    .sp-fit-no  { background: rgba(255,77,77,0.07);  border: 1px solid rgba(255,77,77,0.2); }
    .sp-fit-title { font-weight: 700; font-size: 1.1rem; margin-bottom: 20px; display: flex; align-items: center; gap-: 8px; }
    .sp-fit-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
    .sp-fit-item { display: flex; gap: 10px; font-size: 0.92rem; color: var(--text-secondary); line-height: 1.5; align-items: flex-start; }
    .sp-fit-dot-yes { width: 6px; height: 6px; border-radius: 50%; background: var(--green-brand); margin-top: 7px; flex-shrink: 0; }
    .sp-fit-dot-no  { width: 6px; height: 6px; border-radius: 50%; background: var(--red-soft); margin-top: 7px; flex-shrink: 0; }

    /* ── HOW IT WORKS ── */
    .sp-how { padding: 80px 24px; background: var(--navy); }
    .sp-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0; position: relative; }
    .sp-step { padding: 28px; text-align: center; position: relative; }
    .sp-step::after {
      content: ''; position: absolute; top: 40px; right: 0;
      width: 1px; height: 40px; background: var(--border-subtle);
    }
    .sp-step:last-child::after { display: none; }
    .sp-step-num {
      width: 52px; height: 52px; border-radius: 50%;
      background: var(--gold-muted); border: 2px solid rgba(232,168,48,0.3);
      display: flex; align-items: center; justify-content: center;
      font-weight: 800; font-size: 1.2rem; color: var(--gold);
      margin: 0 auto 16px;
    }
    .sp-step-title { font-weight: 700; margin-bottom: 8px; }
    .sp-step-desc { font-size: 0.83rem; color: var(--text-secondary); line-height: 1.5; }

    /* ── GUARANTEE ── */
    .sp-guarantee {
      padding: 60px 24px;
      background: linear-gradient(135deg, rgba(232,168,48,0.08) 0%, transparent 60%),
                  var(--navy-light);
      border-top: 1px solid var(--border-subtle);
      border-bottom: 1px solid var(--border-subtle);
    }
    .sp-guarantee-inner {
      display: flex; gap: 28px; align-items: center;
      background: var(--navy-card);
      border: 1px solid rgba(232,168,48,0.25);
      border-radius: 24px; padding: 36px;
    }
    .sp-guarantee-badge {
      width: 80px; height: 80px; flex-shrink: 0;
      background: var(--gold-muted); border: 2px solid rgba(232,168,48,0.3);
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      color: var(--gold);
    }
    .sp-guarantee-title { font-family: 'Lora', serif; font-size: 1.5rem; font-weight: 700; margin-bottom: 8px; }
    .sp-guarantee-text { font-size: 0.93rem; color: var(--text-secondary); line-height: 1.65; }
    @media (max-width: 580px) {
      .sp-guarantee-inner { flex-direction: column; text-align: center; }
    }

    /* ── FAQ ── */
    .sp-faq { padding: 80px 24px; background: var(--navy); }
    .sp-faq-item {
      border: 1px solid var(--border-subtle);
      border-radius: 16px; margin-bottom: 12px;
      overflow: hidden; transition: border-color 0.2s;
    }
    .sp-faq-item.open { border-color: rgba(232,168,48,0.35); }
    .sp-faq-q {
      padding: 20px 24px;
      display: flex; justify-content: space-between; align-items: center; gap: 16px;
      cursor: pointer; font-weight: 600; font-size: 0.97rem;
      background: var(--navy-card);
      user-select: none;
    }
    .sp-faq-q:hover { background: rgba(232,168,48,0.04); }
    .sp-faq-chevron { flex-shrink: 0; color: var(--gold); transition: transform 0.3s; }
    .sp-faq-chevron.open { transform: rotate(180deg); }
    .sp-faq-a {
      padding: 0 24px 20px;
      font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7;
      background: var(--navy-card);
    }

    /* ── FINAL CTA ── */
    .sp-final-cta {
      padding: 100px 24px;
      background: radial-gradient(ellipse 70% 70% at 50% 100%, rgba(232,168,48,0.1) 0%, transparent 70%),
                  var(--navy-light);
      text-align: center;
    }
    .sp-final-h2 { font-family: 'Lora', serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; margin-bottom: 16px; }
    .sp-final-sub { color: var(--text-secondary); margin-bottom: 40px; font-size: 1.05rem; line-height: 1.6; max-width: 520px; margin-left: auto; margin-right: auto; }
    .sp-scarcity {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 8px 20px; border-radius: 100px;
      background: rgba(255,77,77,0.1); border: 1px solid rgba(255,77,77,0.25);
      color: #ff8080; font-size: 0.82rem; font-weight: 600;
      margin-bottom: 32px;
    }

    /* ── STICKY CTA ── */
    .sp-sticky {
      position: fixed; bottom: 0; left: 0; right: 0;
      padding: 12px 20px;
      background: rgba(8,14,30,0.92);
      backdrop-filter: blur(16px);
      border-top: 1px solid var(--border-subtle);
      z-index: 100;
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
      transform: translateY(100%);
      transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
    }
    .sp-sticky.visible { transform: translateY(0); }
    .sp-sticky-text p { margin: 0; }
    .sp-sticky-title { font-weight: 700; font-size: 0.95rem; }
    .sp-sticky-sub { font-size: 0.78rem; color: var(--text-secondary); }
    .sp-cta-btn-sm {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 24px;
      background: var(--gold); color: var(--navy);
      font-weight: 700; font-size: 0.9rem;
      border-radius: 100px; border: none; cursor: pointer;
      transition: all 0.2s; text-decoration: none; white-space: nowrap;
      flex-shrink: 0;
    }
    .sp-cta-btn-sm:hover { background: var(--gold-light); }

    /* ── DIVIDER ── */
    .sp-divider { border: none; border-top: 1px solid var(--border-subtle); margin: 0; }

    /* ── Fade-in on scroll ── */
    .sp-fade { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .sp-fade.visible { opacity: 1; transform: translateY(0); }

    @media (max-width: 640px) {
      .sp-founder-card { flex-direction: column; }
      .sp-steps { grid-template-columns: 1fr 1fr; }
      .sp-step::after { display: none; }
      .sp-numbers-grid { grid-template-columns: 1fr 1fr; }
      .sp-number-item { border-right: none; border-bottom: 1px solid var(--border-subtle); }
      .sp-number-item:nth-child(odd) { border-right: 1px solid var(--border-subtle); }
    }
  `}</style>
);

/* ─── Animated counter ─────────────────────────────────────────────── */
function Counter({ end, suffix = "" }) {
    const [val, setVal] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = end / 40;
        const timer = setInterval(() => {
            start += step;
            if (start >= end) { setVal(end); clearInterval(timer); }
            else setVal(Math.floor(start));
        }, 30);
        return () => clearInterval(timer);
    }, [inView, end]);
    return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── FAQ item ─────────────────────────────────────────────────────── */
function FaqItem({ q, a }) {
    const [open, setOpen] = useState(false);
    return (
        <div className={`sp-faq-item${open ? " open" : ""}`}>
            <div className="sp-faq-q" onClick={() => setOpen(!open)}>
                <span>{q}</span>
                <ChevronDown className={`sp-faq-chevron${open ? " open" : ""}`} size={18} />
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                    >
                        <div className="sp-faq-a">{a}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ─── Scroll-reveal wrapper ────────────────────────────────────────── */
function Reveal({ children, delay = 0 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}

/* ─── TESTIMONIALS DATA ──────────────────────────────────────────────*/
const testimonials = [
    {
        text: "I was burning ₹15,000/month on ads with zero results. After HastagCreator's audit, I found out my pixel was tracking the wrong event the whole time. First campaign after the fix — 3 sales in the first week.",
        name: "Rohit Verma",
        meta: "Owner, Craft Candles India",
        color: "#F59E0B",
        initials: "RV"
    },
    {
        text: "I thought ₹999 was a joke. It's not. They found 4 issues on my product page and fixed the ad account structure entirely. Worth every rupee — and I don't say that lightly.",
        name: "Priya Nair",
        meta: "Founder, Velvet Bloom Skincare",
        color: "#8B5CF6",
        initials: "PN"
    },
    {
        text: "The roadmap they gave at the end of 30 days is something I reference every week. Clear, specific, no fluff. I've never gotten that from any agency at any budget.",
        name: "Arjun Mehta",
        meta: "D2C Apparel Brand, Mumbai",
        color: "#10B981",
        initials: "AM"
    },
];

/* ─── MAIN COMPONENT ─────────────────────────────────────────────── */
const test = () => {
    const [showSticky, setShowSticky] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const onScroll = () => setShowSticky(window.scrollY > 700);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const paymentLink = "https://payments.cashfree.com/forms/dizigroww-growth-starter-plan-99";

    const trackAndPay = () => {
        if (typeof fbq !== "undefined") fbq("track", "InitiateCheckout");
        window.open(paymentLink, "_blank");
    };

    return (
        <div className="sp-page min-h-screen">
            <FontLoader />
            <Navbar />

            {/* ── 1. HERO ─────────────────────────────────────────────── */}
            <section className="sp-hero">
                <div className="sp-container">
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        style={{ maxWidth: 680 }}
                    >
                        <div className="sp-hero-badge">
                            <span className="sp-pulse" />
                            Limited to 5 Clients / Week
                        </div>

                        <h1 className="sp-hero-h1">
                            Running Ads.<br />
                            Getting <em>Zero Sales.</em><br />
                            Let's Fix That.
                        </h1>
                        <p className="sp-hero-sub">
                            The <strong style={{ color: "var(--cream)" }}>30-Day Starter Growth Plan</strong> audits your setup, launches a properly structured campaign, and hands you a clear roadmap — all for less than a dinner for two.
                        </p>

                        <div className="sp-price-block">
                            <span className="sp-price-main">₹999</span>
                            <span className="sp-price-old">₹4,999</span>
                        </div>
                        <div className="sp-price-tag">✦ One-time · No retainer · No lock-in</div>

                        <button className="sp-cta-btn" onClick={trackAndPay}>
                            Start My 30-Day Plan <ArrowRight size={18} />
                        </button>

                        <div className="sp-trust-row">
                            {[
                                [Shield, "Secure Cashfree payment"],
                                [Clock, "Onboarded within 48 hrs"],
                                [BadgeCheck, "No hidden charges, ever"],
                            ].map(([Icon, label], i) => (
                                <span key={i} className="sp-trust-item">
                                    <Icon size={14} /> {label}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── 2. SOCIAL PROOF NUMBERS ──────────────────────────────── */}
            <div className="sp-numbers">
                <div className="sp-container">
                    <div className="sp-numbers-grid">
                        {[
                            { val: 47, suffix: "+", label: "Brands Onboarded" },
                            { val: 92, suffix: "%", label: "Satisfaction Rate" },
                            { val: 30, suffix: "-Day", label: "Starter Program" },
                            { val: 999, suffix: "", label: "One-Time Price (₹)" },
                        ].map((item, i) => (
                            <Reveal key={i} delay={i * 0.08}>
                                <div className="sp-number-item">
                                    <div className="sp-number-val">
                                        <Counter end={item.val} suffix={item.suffix} />
                                    </div>
                                    <div className="sp-number-label">{item.label}</div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── 3. FOUNDER CREDIBILITY ───────────────────────────────── */}
            <section className="sp-founder">
                <div className="sp-container-sm">
                    <Reveal>
                        <div className="sp-founder-card">
                            <div className="sp-founder-avatar">O</div>
                            <div>
                                <div className="sp-founder-name">Om Upadhyay</div>
                                <div className="sp-founder-role">Founder, HastagCreator · Performance Marketer</div>
                                <p className="sp-founder-text">
                                    I've personally managed Meta and Google campaigns with strong ROAS results for brands across categories — from apparel to supplements. I've seen exactly how beginner brands get destroyed by wrong ad setups. This plan exists because I wished it existed when I started. ₹999 is what it costs to not waste ₹20,000 on a broken foundation.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <hr className="sp-divider" />

            {/* ── 4. TESTIMONIALS ──────────────────────────────────────── */}
            <section className="sp-testimonials">
                <div className="sp-container">
                    <Reveal>
                        <div style={{ textAlign: "center", marginBottom: 48 }}>
                            <div className="sp-hero-badge" style={{ marginBottom: 16 }}>
                                <MessageSquare size={12} /> Real Client Feedback
                            </div>
                            <h2 className="sp-section-title">What Our Clients Say</h2>
                            <p className="sp-section-sub" style={{ maxWidth: 500, margin: "0 auto" }}>
                                These are real outcomes from real founders who started exactly where you are.
                            </p>
                        </div>
                    </Reveal>
                    <div className="sp-testi-grid">
                        {testimonials.map((t, i) => (
                            <Reveal key={i} delay={i * 0.1}>
                                <div className="sp-testi-card">
                                    <div className="sp-stars">
                                        {[...Array(5)].map((_, j) => (
                                            <Star key={j} size={14} fill="#E8A830" color="#E8A830" />
                                        ))}
                                    </div>
                                    <p className="sp-testi-text">"{t.text}"</p>
                                    <div className="sp-testi-author">
                                        <div className="sp-testi-avatar" style={{ background: t.color }}>
                                            {t.initials}
                                        </div>
                                        <div>
                                            <div className="sp-testi-name">{t.name}</div>
                                            <div className="sp-testi-meta">{t.meta}</div>
                                            <div className="sp-verified"><BadgeCheck size={11} /> Verified Client</div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 5. WHAT YOU GET ──────────────────────────────────────── */}
            <section className="sp-deliverables">
                <div className="sp-container">
                    <Reveal>
                        <div style={{ textAlign: "center", marginBottom: 48 }}>
                            <h2 className="sp-section-title">What You Get for ₹999</h2>
                            <p className="sp-section-sub" style={{ maxWidth: 480, margin: "0 auto" }}>
                                No fluff. No vague promises. Here's exactly what lands in your inbox and ad account.
                            </p>
                        </div>
                    </Reveal>
                    <div className="sp-deliv-grid">
                        {[
                            { icon: Zap, title: "Meta/Google Ads Setup", desc: "Pixel verified, conversion events structured correctly, ad account audited for rookie mistakes." },
                            { icon: TrendingUp, title: "1 Campaign Launch", desc: "We build and launch one targeted testing campaign using current best practices — not guesswork." },
                            { icon: CheckCircle2, title: "Website Conversion Audit", desc: "We review your store/landing page and show you exactly where visitors drop off and why." },
                            { icon: ArrowRight, title: "30-Day Growth Roadmap", desc: "A written, specific action plan you can follow independently after the 30 days are done." },
                        ].map((item, i) => (
                            <Reveal key={i} delay={i * 0.1}>
                                <div className="sp-deliv-card">
                                    <div className="sp-deliv-icon"><item.icon size={22} /></div>
                                    <div className="sp-deliv-title">{item.title}</div>
                                    <p className="sp-deliv-desc">{item.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal delay={0.3}>
                        <div className="sp-disclaimer">
                            <Zap size={18} className="sp-disclaimer-icon" />
                            <p className="sp-disclaimer-text">
                                <strong>Heads up:</strong> This is a foundational starter pack built for new or stuck brands. It is not daily campaign management or multi-lakh budget scaling — those require our advanced plans.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── 6. IS THIS FOR YOU ───────────────────────────────────── */}
            <section className="sp-fit">
                <div className="sp-container">
                    <Reveal>
                        <h2 className="sp-section-title" style={{ textAlign: "center", marginBottom: 8 }}>Is This Right For You?</h2>
                        <p className="sp-section-sub" style={{ textAlign: "center", maxWidth: 440, margin: "0 auto 40px" }}>
                            We're selective. We want you to succeed — not just collect payments.
                        </p>
                    </Reveal>
                    <div className="sp-fit-grid">
                        <Reveal>
                            <div className="sp-fit-card sp-fit-yes">
                                <div className="sp-fit-title" style={{ color: "#4ade80" }}>
                                    <CheckCircle2 size={20} color="#4ade80" style={{ marginRight: 8 }} />
                                    Perfect For
                                </div>
                                <ul className="sp-fit-list">
                                    {[
                                        "New D2C brands taking their first step in paid ads",
                                        "Store owners testing before committing to ₹20k+ retainers",
                                        "Founders whose early ad attempts failed to bring sales",
                                        "Brands spending less than ₹50,000/month on ads",
                                    ].map((t, i) => (
                                        <li key={i} className="sp-fit-item">
                                            <span className="sp-fit-dot-yes" />
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <div className="sp-fit-card sp-fit-no">
                                <div className="sp-fit-title" style={{ color: "#f87171" }}>
                                    <XCircle size={20} color="#f87171" style={{ marginRight: 8 }} />
                                    Not For
                                </div>
                                <ul className="sp-fit-list">
                                    {[
                                        "Brands expecting full daily campaign management",
                                        "Founders expecting a guaranteed 10x ROAS overnight",
                                        "Brands already running lakhs/month (see our advanced plans)",
                                        "People unwilling to action the website audit feedback",
                                    ].map((t, i) => (
                                        <li key={i} className="sp-fit-item">
                                            <span className="sp-fit-dot-no" />
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ── 7. HOW IT WORKS ──────────────────────────────────────── */}
            <section className="sp-how">
                <div className="sp-container">
                    <Reveal>
                        <h2 className="sp-section-title" style={{ textAlign: "center", marginBottom: 8 }}>How It Works</h2>
                        <p className="sp-section-sub" style={{ textAlign: "center", maxWidth: 400, margin: "0 auto 40px" }}>
                            From payment to live campaign in 4 steps.
                        </p>
                    </Reveal>
                    <div className="sp-steps">
                        {[
                            { n: "1", title: "Pay ₹999", desc: "Secure one-time payment via Cashfree. You're in." },
                            { n: "2", title: "Quick Onboarding", desc: "We send a 5-minute form for ad account access and brand context." },
                            { n: "3", title: "Audit + Setup", desc: "We review your site, fix structural issues, and build your first campaign." },
                            { n: "4", title: "Go Live + Roadmap", desc: "Ads launch. You get a written 30-day growth roadmap." },
                        ].map((s, i) => (
                            <Reveal key={i} delay={i * 0.1}>
                                <div className="sp-step">
                                    <div className="sp-step-num">{s.n}</div>
                                    <div className="sp-step-title">{s.title}</div>
                                    <p className="sp-step-desc">{s.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 8. GUARANTEE ─────────────────────────────────────────── */}
            <section className="sp-guarantee">
                <div className="sp-container-sm">
                    <Reveal>
                        <div className="sp-guarantee-inner">
                            <div className="sp-guarantee-badge">
                                <Shield size={36} />
                            </div>
                            <div>
                                <div className="sp-guarantee-title">Our Honest Commitment</div>
                                <p className="sp-guarantee-text">
                                    We don't offer a money-back guarantee because no ethical marketer can guarantee sales. What we do guarantee: your pixel fires correctly, your campaign is structured using current best practices, and you'll have a written audit explaining exactly what we found and fixed. If we onboard you and can't deliver those three things, we'll refund you — no questions asked.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── 9. FAQ ───────────────────────────────────────────────── */}
            <section className="sp-faq">
                <div className="sp-container-sm">
                    <Reveal>
                        <h2 className="sp-section-title" style={{ textAlign: "center", marginBottom: 32 }}>Frequently Asked Questions</h2>
                    </Reveal>
                    {[
                        {
                            q: "Why is it only ₹999 if agencies charge ₹20,000+?",
                            a: "Agencies charge high retainers for daily management, unlimited revisions, and multi-lakh scaling. This is a focused starter pack: correct setup, one campaign, one audit, one roadmap. No daily overhead — which means we can price it honestly. If it works well for you, our advanced plans are there.",
                        },
                        {
                            q: "Will this guarantee me sales?",
                            a: "No honest marketer can guarantee sales — and you should be suspicious of anyone who does. What we guarantee is technical correctness: pixel firing, campaign structure, and a written explanation of what's working and what isn't. That's the foundation every paid campaign needs.",
                        },
                        {
                            q: "Is ₹999 really enough to get started?",
                            a: "Yes. The biggest beginner mistake is spending thousands on ad spend with a broken technical setup. This fixes the setup first — cheaply — so your ad spend has a real shot at converting.",
                        },
                        {
                            q: "What access do you need from me?",
                            a: "After payment, we send a short onboarding form. We'll need Business Manager access to your Meta/Google ad account, and a look at your website or Shopify store. Everything is handled securely — you can revoke access after the engagement ends.",
                        },
                        {
                            q: "How long until I see my campaign live?",
                            a: "Typically 5–7 business days after onboarding is complete. Faster if your ad account is already set up and access is granted quickly.",
                        },
                    ].map((faq, i) => (
                        <Reveal key={i} delay={i * 0.07}>
                            <FaqItem q={faq.q} a={faq.a} />
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ── 10. FINAL CTA ────────────────────────────────────────── */}
            <section className="sp-final-cta">
                <div className="sp-container-sm">
                    <Reveal>
                        <div className="sp-scarcity">
                            <span className="sp-pulse" style={{ width: 7, height: 7 }} />
                            Only 5 spots available this week
                        </div>
                        <h2 className="sp-final-h2">Start Your 30-Day Growth Plan</h2>
                        <p className="sp-final-sub">
                            One payment. No retainer. No lock-in. Just a solid foundation for your first real campaign.
                        </p>
                        <button className="sp-cta-btn" style={{ fontSize: "1.1rem", padding: "18px 40px" }} onClick={trackAndPay}>
                            Pay ₹999 &amp; Get Started <ArrowRight size={20} />
                        </button>
                        <div style={{ marginTop: 20, display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
                            {[
                                [Shield, "Secure Cashfree"],
                                [BadgeCheck, "No Hidden Charges"],
                                [Clock, "48hr Onboarding"],
                            ].map(([Icon, label], i) => (
                                <span key={i} className="sp-trust-item" style={{ justifyContent: "center" }}>
                                    <Icon size={13} /> {label}
                                </span>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            <Footer />

            {/* ── STICKY CTA ───────────────────────────────────────────── */}
            <div className={`sp-sticky${showSticky ? " visible" : ""}`}>
                <div className="sp-sticky-text">
                    <p className="sp-sticky-title">30-Day Starter Growth Plan</p>
                    <p className="sp-sticky-sub">₹999 one-time · No commitment</p>
                </div>
                <button className="sp-cta-btn-sm" onClick={trackAndPay}>
                    Pay ₹999 Now <ArrowRight size={15} />
                </button>
            </div>
        </div>
    );
};

export default test;
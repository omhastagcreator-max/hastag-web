import { useState, useEffect } from 'react';
import { Timer, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScarcityBanner = () => {
  const [spotsLeft, setSpotsLeft] = useState(5);
  const [timeLeft, setTimeLeft] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const calculateSpots = () => {
      const now = new Date();
      const dayOfMonth = now.getDate();
      
      // Starts at 5, decreases by 1 every 4 days.
      // Day 1-4: decrease 0 -> 5 spots
      // Day 5-8: decrease 1 -> 4 spots
      // ...
      const decrements = Math.floor((dayOfMonth - 1) / 4);
      const calculatedSpots = Math.max(1, 5 - decrements);
      
      setSpotsLeft(calculatedSpots);
    };

    calculateSpots();

    const interval = setInterval(() => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setHours(24, 0, 0, 0);
      const diff = tomorrow.getTime() - now.getTime();

      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-4 pointer-events-none"
      >
        <div className="container-main mx-auto pointer-events-auto max-w-4xl">
          <div className="bg-background/95 backdrop-blur-xl border border-red-500/30 shadow-[0_0_40px_-10px_rgba(239,68,68,0.3)] rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden">
            
            {/* Animated Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 animate-[shimmer_2s_infinite]"></div>

            <div className="flex items-center gap-3 relative z-10">
              <div className="bg-red-500/10 p-2.5 rounded-full hidden sm:block animate-pulse">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <div className="text-center sm:text-left pr-4">
                <p className="text-foreground font-semibold text-sm sm:text-base leading-tight">
                  We Can Not Onboard more than <span className="text-red-500 font-black tracking-tight text-lg sm:text-xl drop-shadow-sm">{spotsLeft}</span> more people This Month.
                </p>
                <p className="text-xs text-muted-foreground mt-1 font-medium tracking-wide uppercase">High demand. Secure your spot now.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 relative z-10 w-full sm:w-auto justify-center pl-0 sm:pl-4 sm:border-l border-border/50">
              <div className="flex flex-col items-center justify-center bg-card border border-border/50 px-4 py-2 rounded-xl shadow-inner min-w-[120px]">
                <div className="flex items-center gap-1.5 text-red-500 font-mono font-bold text-base sm:text-lg tracking-wider">
                  <Timer className="w-4 h-4 sm:w-5 sm:h-5 text-red-500/80 animate-pulse" />
                  <span>{timeLeft}</span>
                </div>
                <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold mt-0.5">Time Left Today</span>
              </div>
              
              <a href="https://calendly.com/domsco-tech/30min?month=2026-03" target="_blank" rel="noreferrer" className="hidden sm:block shrink-0">
                <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider shadow-lg shadow-red-500/20 transition-all hover:scale-105 active:scale-95 whitespace-nowrap">
                  Claim Spot
                </button>
              </a>
            </div>
            
            {/* Mobile CTA */}
            <a href="https://calendly.com/domsco-tech/30min?month=2026-03" target="_blank" rel="noreferrer" className="w-full sm:hidden relative z-10 mt-1">
              <button className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl text-sm font-black uppercase tracking-wider shadow-lg shadow-red-500/20 transition-colors">
                Claim Spot Now
              </button>
            </a>

            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 text-muted-foreground/50 hover:text-foreground transition-colors p-1.5 rounded-full hover:bg-secondary z-20"
              aria-label="Close banner"
            >
              <X className="w-4 h-4" />
            </button>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ScarcityBanner;

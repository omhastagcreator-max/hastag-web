import { useState, useEffect } from "react";
import { Timer, AlertCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileScarcityWidget({ onClick }: { onClick?: () => void }) {
  const [spotsLeft, setSpotsLeft] = useState(5);
  const [timeLeft, setTimeLeft] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const calculateSpots = () => {
      const now = new Date();
      const dayOfMonth = now.getDate();
      const decrements = Math.floor((dayOfMonth - 1) / 4);
      setSpotsLeft(Math.max(1, 5 - decrements));
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

      setTimeLeft(
        `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-background shadow-[0_10px_40px_-10px_rgba(239,68,68,0.3)] border-2 border-red-500/20 rounded-xl p-4 flex flex-col items-center text-center gap-3 relative overflow-hidden"
        >
          <button 
             onClick={(e) => { e.preventDefault(); setIsVisible(false); }}
             className="absolute top-2 right-2 p-1 text-muted-foreground/50 hover:text-foreground bg-secondary/50 hover:bg-secondary rounded-full transition-colors z-20"
             aria-label="Close widget"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute inset-0 bg-gradient-to-bl from-red-500/0 via-red-500/5 to-red-500/0 animate-[shimmer_2s_infinite]"></div>
          
          <div className="flex items-center gap-2 relative z-10 w-full justify-center pr-4">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <p className="text-foreground font-semibold text-xs leading-tight">
              Only <span className="text-red-500 font-black text-sm">{spotsLeft} spots</span> left this month!
            </p>
          </div>

          <div className="flex items-center justify-between bg-card border border-border/50 px-3 py-2 rounded-lg shadow-inner w-full relative z-10 mt-1">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Time Left Today</span>
            <div className="flex items-center gap-1.5 text-red-500 font-mono font-bold text-sm tracking-wider">
              <Timer className="w-3.5 h-3.5 text-red-500/80 animate-pulse" />
              <span>{timeLeft}</span>
            </div>
          </div>
          
          <a 
            href="/book-call" 
            onClick={(e) => {
              if (onClick) onClick();
              setIsVisible(false);
            }} 
            className="w-full relative z-10 mt-1"
          >
            <button className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider shadow-lg shadow-red-500/20 transition-all hover:scale-105 active:scale-95">
              Claim Spot Now
            </button>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

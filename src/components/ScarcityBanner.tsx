import { useState, useEffect } from 'react';
import { Timer, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from './BookingProvider';

const ScarcityBanner = ({ inNavbar = false }: { inNavbar?: boolean }) => {
  const { openBooking } = useBooking();
  const [spotsLeft, setSpotsLeft] = useState(5);
  const [timeLeft, setTimeLeft] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const calculateSpots = () => {
      const now = new Date();
      const dayOfMonth = now.getDate();
      
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
      {inNavbar ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full bg-red-500/10 border-b border-red-500/20 py-2 sm:py-2.5 px-4"
        >
          <div className="container-main flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-center sm:text-left">
            <div className="flex items-center justify-center gap-2 text-foreground font-semibold text-xs sm:text-sm">
               <AlertCircle className="w-4 h-4 text-red-500 animate-pulse hidden sm:block" />
               <p className="hidden sm:block text-red-500 uppercase text-[10px] tracking-widest font-bold">Important Update</p>
               <span>We Can Not Onboard more than <span className="text-red-500 font-black px-1 text-base">{spotsLeft}</span> more brands This Month.</span>
            </div>
            <div className="flex items-center gap-3 sm:border-l border-red-500/30 sm:pl-6">
              <div className="flex items-center gap-1.5 text-red-500 font-mono font-bold text-xs sm:text-sm bg-background border border-red-500/20 px-3 py-1 rounded-md shadow-sm">
                <Timer className="w-3.5 h-3.5 animate-pulse" />
                <span>{timeLeft} Left</span>
              </div>
              <button 
                onClick={openBooking}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-md shadow-red-500/20 transition-transform active:scale-95"
              >
                Claim Spot
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="fixed bottom-0 left-0 right-0 sm:bottom-auto sm:left-auto sm:top-[30%] sm:right-0 z-[49] p-2 sm:p-0 pointer-events-none hidden sm:block"
        >
          <div className="mx-auto sm:mx-0 pointer-events-auto w-full sm:w-[260px]">
            <div className="bg-background/95 backdrop-blur-xl border border-red-500/30 shadow-[0_0_40px_-10px_rgba(239,68,68,0.3)] rounded-2xl sm:rounded-l-2xl sm:rounded-r-none sm:border-r-0 p-3 sm:p-5 flex flex-row sm:flex-col items-center justify-between gap-2 sm:gap-4 relative overflow-hidden">
              
              <div className="absolute inset-0 bg-gradient-to-r sm:bg-gradient-to-b from-red-500/0 via-red-500/5 to-red-500/0 animate-[shimmer_2s_infinite]"></div>

              <div className="flex flex-row sm:flex-col items-center gap-2 sm:gap-3 relative z-10 flex-1 sm:flex-none">
                <div className="bg-red-500/10 p-2 sm:p-2.5 rounded-full hidden sm:flex animate-pulse">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                </div>
                <p className="hidden sm:block text-red-500 uppercase text-[10px] tracking-widest font-bold">Important Update</p>
                <div className="text-left sm:text-center pr-4 sm:pr-0">
                  <p className="text-foreground font-semibold text-xs sm:text-sm leading-tight">
                    We Can Not Onboard more than <br className="hidden sm:block" /><span className="text-red-500 font-black tracking-tight text-sm sm:text-xl drop-shadow-sm">{spotsLeft}</span><br className="hidden sm:block" /> more brands This Month.
                  </p>
                  {/* <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5 sm:mt-2 font-medium tracking-wide uppercase">High demand. Secure your spot now.</p> */}
                </div>
              </div>

              <div className="flex flex-col sm:flex-col items-center gap-1.5 sm:gap-3 relative z-10 shrink-0 sm:w-full sm:pt-3 sm:border-t border-border/50">
                <div className="flex flex-col items-center justify-center bg-card border border-border/50 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow-inner sm:w-full min-w-[70px] sm:min-w-0 pr-6 sm:pr-4">
                  <div className="flex items-center gap-1 sm:gap-1.5 text-red-500 font-mono font-bold text-xs sm:text-lg tracking-wider">
                    <Timer className="w-3 h-3 sm:w-4 sm:h-4 text-red-500/80 animate-pulse" />
                    <span>{timeLeft}</span>
                  </div>
                  <span className="text-[8px] sm:text-[9px] text-muted-foreground uppercase tracking-widest font-bold mt-0.5">Time Left</span>
                </div>
                
                <button 
                  onClick={openBooking}
                  className="w-full hidden sm:block bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl text-sm font-black uppercase tracking-wider shadow-lg shadow-red-500/20 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                  Claim Spot
                </button>
              </div>
              
              <button 
                onClick={openBooking}
                className="sm:hidden relative z-10 shrink-0 mr-4 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-lg shadow-red-500/20 transition-colors"
              >
                Claim Spot
              </button>

              <button 
                onClick={() => setIsVisible(false)}
                className="absolute top-1 sm:top-2 right-1 sm:right-2 text-muted-foreground/50 hover:text-foreground transition-colors p-1 rounded-full hover:bg-secondary z-20"
                aria-label="Close banner"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScarcityBanner;

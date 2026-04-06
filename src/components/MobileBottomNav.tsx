import { Link, useLocation } from "react-router-dom";
import { Home, Briefcase, PhoneCall } from "lucide-react";

export default function MobileBottomNav() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-safe pointer-events-none">
      <div className="mx-4 mb-4 flex items-center justify-around p-2 pointer-events-auto">
        <Link 
          to="/"
          className={`flex flex-col items-center justify-center w-16 h-12 rounded-full transition-all drop-shadow-md ${location.pathname === "/" ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground"}`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        
        <Link 
          to="/portfolio"
          className={`flex flex-col items-center justify-center w-16 h-12 rounded-full transition-all drop-shadow-md ${location.pathname === "/portfolio" ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground"}`}
        >
          <Briefcase className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold">Work</span>
        </Link>
        
        <Link 
          to="/book-call"
          className="flex flex-col items-center justify-center w-[120px] h-12 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 ml-2"
        >
          <PhoneCall className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Book Call</span>
        </Link>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { MessageCircleHeart } from "lucide-react";

const messages = [
  { text: "Hey team, the new ad creatives are killing it! Our ROAS is at 4.5x today. 🔥", time: "10:42 AM" },
  { text: "Thanks for fixing the pixel tracking! Finally seeing accurate data.", time: "11:15 AM" },
  { text: "Just checked the Shopify dashboard, we crossed ₹1L in daily sales! 🚀", time: "01:20 PM" },
  { text: "The landing page you guys built converts so much better than our old one.", time: "02:30 PM" },
  { text: "Can we increase the budget? The new campaign is highly profitable.", time: "03:45 PM" },
  { text: "You guys are wizards! The CAC dropped by 30% this week.", time: "04:10 PM" },
  { text: "Just reviewed the month-end report. Best month we've had all year. 🙌", time: "05:00 PM" },
  { text: "The email automations are bringing in crazy revenue on the backend.", time: "06:15 PM" },
  { text: "Love the speed of delivery on the new web design.", time: "07:30 PM" },
  { text: "Let's scale! The ROAS is holding strong.", time: "08:45 PM" }
];

const WhatsAppTestimonials = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-secondary/50 to-background overflow-hidden relative">
      <div className="container-main max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#25D366]/10 text-[#25D366] mb-4">
            <MessageCircleHeart className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Real Client Satisfaction
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            See what our clients are saying in our WhatsApp chat groups right now.
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused] gap-6 py-4">
            {[...messages, ...messages].map((msg, i) => (
              <div 
                key={i} 
                className="bg-card shadow-sm border border-border p-4 rounded-2xl rounded-tr-none min-w-[280px] max-w-[320px] relative shrink-0"
                style={{ backgroundImage: "url('https://i.pinimg.com/originals/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')", backgroundSize: 'cover', backgroundBlendMode: 'screen' }}
              >
                {/* Chat bubble tail */}
                <div className="absolute top-0 right-[-8px] w-4 h-4 bg-card border-r border-t border-border [clip-path:polygon(0_0,100%_0,0_100%)]"></div>
                
                <div className="bg-[#E1FFC7] dark:bg-[#005C4B] text-foreground p-3 rounded-xl rounded-tr-sm shadow-sm inline-block w-full border border-black/5 dark:border-white/5">
                  <p className="text-sm leading-relaxed mb-1">{msg.text}</p>
                  <div className="text-[10px] text-muted-foreground text-right flex items-center justify-end gap-1">
                    {msg.time}
                    <svg viewBox="0 0 16 15" width="16" height="15" className="fill-[#53bdeb]">
                      <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppTestimonials;

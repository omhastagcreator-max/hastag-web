import { motion } from "framer-motion";

const FounderSection = () => {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container-main max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 relative"
          >
            <div className="absolute inset-0 bg-primary rounded-2xl rotate-3"></div>
            {/* Restored businesswoman client asset with CLS protection */}
            <img 
              src="https://hastagcreator.com/wp-content/uploads/2023/12/businesswoman-working-laptop-scaled.jpg" 
              alt="Om Upadhyay Founder" 
              width="256"
              height="256"
              loading="lazy"
              className="w-full h-full object-cover rounded-2xl relative z-10 shadow-lg"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-2">Meet the Founder</h2>
            <h3 className="text-xl text-primary font-semibold mb-4">Om Upadhyay</h3>
            <p className="text-foreground text-lg mb-4 font-medium italic">
              "Managed over ₹2Cr+ in ad spend across Meta & Google."
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              I started HastagCreator after watching countless D2C founders burn their runway on agencies that optimized for clicks, not profit margins. My philosophy is simple: we treat your ad budget like our own money. 
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We don't do hand-offs. We don't hide behind jargon. We fix what's broken in your funnel and scale what works.
            </p>

            <a href="/#audit-form">
              <button className="bg-primary hover:bg-primary-deep text-white px-8 py-3.5 rounded-full text-base font-bold shadow-lg transition-all hover:scale-105 min-w-[48px] min-h-[48px]">
                Schedule a Call
              </button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;

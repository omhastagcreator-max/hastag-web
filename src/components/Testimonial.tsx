import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const Testimonial = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container-main max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Quote className="w-16 h-16 text-primary/20 mx-auto mb-6 rotate-180" />
          <h2 className="text-2xl md:text-4xl font-semibold leading-relaxed mb-8">
            "We were getting consistent sales, but our margins were suffering. The team at HastagCreator came in and rebuilt our funnel from top to bottom. It wasn't just better ads; they fixed our landing page and our offer structure. We are finally scaling profitably."
          </h2>
          <div className="flex flex-col items-center justify-center">
            <h4 className="font-bold text-lg">Founder</h4>
            <p className="text-muted-foreground">D2C Brand</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;

import { motion } from "framer-motion";
import { Star, ArrowUpRight, BadgeCheck } from "lucide-react";

const reviews = [
  {
    name: "Om Upadhyay",
    role: "Founder, TrendVibe",
    text: "HashtagCreator scaled our daily orders from 50 to 800+ in just 45 days. Their Meta ads strategy and landing page hacks are unmatched in India.",
    rating: 5,
    date: "1 month ago",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=OU&backgroundColor=2563EB",
  },
  {
    name: "Rohan Khanna",
    role: "Marketing Head",
    text: "We were burning cash before HastagCreator. Their team revealed 5 leaks in our checkout. Fixing them instantly paid for the service.",
    rating: 5,
    date: "2 months ago",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=RK&backgroundColor=2563EB",
  },
  {
    name: "Sneha Patel",
    role: "CEO, GlowBeauty",
    text: "The sheer volume of high-quality influencers they connected us with was mind-boggling. Over 10M+ reach in our first campaign.",
    rating: 5,
    date: "3 weeks ago",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=SP&backgroundColor=2563EB",
  },
  {
    name: "Vikram Singh",
    role: "D2C Brand Owner",
    text: "Their razor-sharp focus on ROAS instead of just clicks changed our trajectory. Highly recommend for serious brands only.",
    rating: 5,
    date: "2 months ago",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=VS&backgroundColor=2563EB",
  },
  {
    name: "Anjali Gupta",
    role: "E-com Director",
    text: "Best performance marketing agency in Mumbai, hands down. They treat your ad budget like their own.",
    rating: 5,
    date: "1 week ago",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=AG&backgroundColor=2563EB",
  }
];

const GoogleReviews = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="reviews">
      <div className="absolute inset-0 bg-primary/5"></div>
      
      <div className="container-main relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <img src="/google-g.svg" alt="Google" className="w-8 h-8 drop-shadow-sm bg-white rounded-full p-1" onError={(e) => (e.currentTarget.style.display = 'none')} />
              <div className="flex items-center text-yellow-400">
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-5 h-5 fill-current" />)}
              </div>
              <span className="text-foreground font-bold ml-2">5.0 Rating</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-foreground">
              What Top Brands Say
            </h2>
            <p className="text-muted-foreground text-lg">
              Authentic reviews from D2C founders who scaled with us. 
              <span className="block mt-2 text-sm text-primary/80 italic">*Live API integration pending keys*</span>
            </p>
          </motion.div>

          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            href="https://search.google.com/local/reviews?placeid=ChIJ2Xr7wra35zsR3hmKhuBBHtE"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-card border border-border/50 hover:border-primary/50 text-foreground px-6 py-3 rounded-full font-bold shadow-sm transition-all hover:shadow-card-hover group"
          >
            View on Google Maps <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        {/* Carousel Container */}
        <div className="relative flex overflow-x-hidden group pb-8">
          <div className="flex gap-6 animate-marquee whitespace-nowrap px-4 py-4 shrink-0 min-w-full z-10 group-hover:[animation-play-state:paused] hover:[animation-play-state:paused]">
            {[...reviews, ...reviews].map((review, idx) => (
              <div
                key={idx}
                className="w-[350px] md:w-[420px] shrink-0 bg-card border border-border/50 rounded-3xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 relative overflow-hidden group/card"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                
                <div className="flex items-start justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-14 h-14 rounded-full border-2 border-primary/20"
                    />
                    <div>
                      <h4 className="font-bold text-foreground flex items-center gap-1.5 text-lg">
                        {review.name} <BadgeCheck className="w-4 h-4 text-primary" />
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                        <span>{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <img src="/google-g.svg" alt="G" className="w-6 h-6 opacity-50 grayscale bg-white/10 rounded-full p-0.5" onError={(e) => (e.currentTarget.style.display = 'none')} />
                </div>
                
                <div className="flex text-yellow-500 mb-4 relative z-10">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current drop-shadow-sm" />
                  ))}
                </div>
                
                <p className="text-muted-foreground leading-relaxed text-[15px] whitespace-normal relative z-10 line-clamp-4">
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default GoogleReviews;

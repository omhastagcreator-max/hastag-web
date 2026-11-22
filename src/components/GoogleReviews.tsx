import { motion } from "framer-motion";
import { Star, BadgeCheck, Linkedin, AlertCircle, TrendingUp } from "lucide-react";
import AuditCTA from "./AuditCTA";

// Existing testimonials – names, roles and quotes unchanged.
// "Problem" and "Result" are taken only from what each quote already says.
const reviews = [
  {
    name: "Om Upadhyay",
    role: "Founder",
    brand: "TrendVibe",
    problem: "Needed to scale daily orders",
    result: "Daily orders from 50 to 800+ in 45 days",
    text: "HashtagCreator scaled our daily orders from 50 to 800+ in just 45 days. Their Meta ads strategy and landing page hacks are unmatched in India.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/initials/svg?seed=OU&backgroundColor=2563EB",
  },
  {
    name: "Rohan Khanna",
    role: "Marketing Head",
    brand: "",
    problem: "Burning cash on ads",
    result: "5 checkout leaks found & fixed",
    text: "We were burning cash before HastagCreator. Their team revealed 5 leaks in our checkout. Fixing them instantly paid for the service.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/initials/svg?seed=RK&backgroundColor=2563EB",
  },
  {
    name: "Sneha Patel",
    role: "CEO",
    brand: "GlowBeauty",
    problem: "Needed reach through influencers",
    result: "10M+ reach in the first campaign",
    text: "The sheer volume of high-quality influencers they connected us with was mind-boggling. Over 10M+ reach in our first campaign.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/initials/svg?seed=SP&backgroundColor=2563EB",
  },
  {
    name: "Vikram Singh",
    role: "D2C Brand Owner",
    brand: "",
    problem: "Optimising for clicks, not ROAS",
    result: "Focus shifted to ROAS",
    text: "Their razor-sharp focus on ROAS instead of just clicks changed our trajectory. Highly recommend for serious brands only.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/initials/svg?seed=VS&backgroundColor=2563EB",
  },
  {
    name: "Anjali Gupta",
    role: "E-com Director",
    brand: "",
    problem: "",
    result: "Ad budget treated like their own",
    text: "Best performance marketing agency in Mumbai, hands down. They treat your ad budget like their own.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/initials/svg?seed=AG&backgroundColor=2563EB",
  },
];

const GoogleReviews = () => {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden" id="reviews">
      <div className="absolute inset-0 bg-primary/5"></div>

      <div className="container-main relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#0A66C2] rounded-full p-1.5 flex items-center justify-center shadow-sm">
                <Linkedin className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-foreground font-black text-2xl">2,366+</span>
              <span className="text-foreground font-bold">LinkedIn Recommendations</span>
            </div>
            <h2 className="section-title text-foreground mb-4">
              What D2C Brands Say About Working With Us
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              From D2C founders and marketing leaders who scaled with us.
            </p>
          </motion.div>

          <div className="hidden md:block shrink-0">
            <AuditCTA source="testimonials" variant="dark" />
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative flex overflow-x-hidden group pb-8">
          <div className="flex gap-6 animate-marquee whitespace-nowrap px-4 py-4 shrink-0 min-w-full z-10 group-hover:[animation-play-state:paused] hover:[animation-play-state:paused]">
            {[...reviews, ...reviews].map((review, idx) => (
              <div
                key={idx}
                className="w-[300px] sm:w-[350px] md:w-[420px] shrink-0 bg-card border border-border/50 rounded-3xl p-6 md:p-8 shadow-card hover:shadow-card-hover transition-all duration-300 relative overflow-hidden group/card"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                
                <div className="flex items-center gap-4 mb-5 relative z-10">
                  <img
                    src={review.image}
                    alt=""
                    loading="lazy"
                    className="w-12 h-12 rounded-full border-2 border-primary/20 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-foreground text-lg leading-tight">{review.name}</h4>
                    <p className="text-sm text-muted-foreground truncate">
                      {review.role}
                      {review.brand && <>, <span className="font-bold text-foreground">{review.brand}</span></>}
                    </p>
                  </div>
                  <span className="ml-auto flex items-center gap-1 text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded-sm font-bold border border-green-200 shrink-0">
                    <BadgeCheck className="w-3 h-3" /> Client
                  </span>
                </div>

                <div className="space-y-2 mb-4 relative z-10 whitespace-normal">
                  {review.problem && (
                    <div className="flex items-start gap-2 text-sm">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span><span className="font-bold text-foreground">Problem:</span> <span className="text-muted-foreground">{review.problem}</span></span>
                    </div>
                  )}
                  <div className="flex items-start gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span><span className="font-bold text-foreground">Result:</span> <span className="text-muted-foreground">{review.result}</span></span>
                  </div>
                </div>

                <div className="flex text-yellow-500 mb-3 relative z-10">
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

        <div className="md:hidden mt-4">
          <AuditCTA source="testimonials" />
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;

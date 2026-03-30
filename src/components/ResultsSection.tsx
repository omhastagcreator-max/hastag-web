import { motion } from "framer-motion";
import { TrendingUp, DollarSign, MousePointerClick, ShoppingCart } from "lucide-react";

const results = [
  {
    client: "National Toy Brand",
    tagline: "Scaled Meta to 15x ROAS & reduced CPR from ₹250 to ₹200",
    rows: [
      { name: "Meta Ads (Scaling Phase)", spend: "₹3,20,000", revenue: "₹48,00,000", roas: "15.0x" },
      { name: "Google Ads (Performance Max)", spend: "₹1,15,000", revenue: "₹11,50,000", roas: "10.0x" }
    ]
  },
  {
    client: "Premium Painting Brand",
    tagline: "Scaled from 0 to 6.0x ROAS in 5 months",
    rows: [
      { name: "Omnichannel Funnel (Meta + Google)", spend: "₹2,50,000", revenue: "₹15,00,000", roas: "6.0x" }
    ]
  }
];

const ResultsSection = () => {
  return (
    <section className="section-padding overflow-hidden">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
            See the Results We Acheived
          </span>
          <h2 className="text-3xl md:text-4xl mb-3">100% Real, Verified Client Growth.</h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            All results are from live Meta & Google dashboards. We’re happy to walk you through them on a call.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Left: The "Screenshot" Mockups */}
          <div className="space-y-6">
            {results.map((res, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-card border border-border rounded-xl shadow-card overflow-hidden"
              >
                {/* Header Mock */}
                <div className="bg-secondary/50 border-b border-border px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    <div>
                      <span className="text-sm font-semibold text-foreground block">{res.client}</span>
                      <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">{res.tagline}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-green-600 bg-green-500/10 px-2.5 py-1 rounded-full border border-green-500/20">Active</span>
                </div>
                
                {/* Data Rows Mock */}
                <div className="overflow-x-auto nice-scrollbar">
                  <table className="w-full text-left min-w-[500px]">
                    <thead className="border-b border-border bg-card">
                      <tr>
                        <th className="px-4 py-2.5 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Campaign</th>
                        <th className="px-4 py-2.5 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider border-l border-border">Amount Spent</th>
                        <th className="px-4 py-2.5 text-[10px] text-primary font-bold uppercase tracking-wider">ROAS</th>
                        <th className="px-4 py-2.5 text-[10px] text-green-500 font-bold uppercase tracking-wider">Purchase Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {res.rows.map((row, j) => (
                        <tr key={j} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                          <td className="px-4 py-3 text-sm font-medium">{row.name}</td>
                          <td className="px-4 py-3 text-sm text-foreground/90 border-l border-border">{row.spend}</td>
                          <td className="px-4 py-3 text-lg font-black text-primary">{row.roas}</td>
                          <td className="px-4 py-3 text-sm font-bold text-green-500">{row.revenue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ))}
            
            <p className="text-xs text-muted-foreground italic text-center">
              * Real performance data. Specific client names kept confidential.
            </p>
          </div>

          {/* Right: Metrics / Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <TrendingUp size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Data-Backed Scaling</h3>
                <p className="text-sm text-muted-foreground">
                  We don't guess. We test creatives, audiences, and offers to find winning combinations that allow for aggressive, profitable scaling across Meta and Google.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <ShoppingCart size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Lower CPA, Higher AOV</h3>
                <p className="text-sm text-muted-foreground">
                  By optimizing your landing pages and funnels (CRO) alongside your ads, we drop your Cost Per Acquisition while increasing the average order value.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <MousePointerClick size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">High-Intent Traffic</h3>
                <p className="text-sm text-muted-foreground">
                  We filter out window-shoppers. Our ad strategies ensure your budget is spent only on users who are ready to pull out their credit cards.
                </p>
              </div>
            </div>

            <a href="/#audit-form" className="inline-block mt-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-foreground text-background px-8 py-3.5 rounded-full text-sm font-semibold shadow-lg hover:bg-foreground/90 transition-colors"
              >
                Get Similar Results
              </motion.button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;

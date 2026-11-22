/**
 * The three core video formats HastagCreator sells.
 * Older uploads used sales / influencer / brand / tvc – they are mapped onto the new groups.
 */
export type VideoGroup = "ugc" | "studio" | "influencer";

export const VIDEO_GROUPS: { key: VideoGroup; label: string; short: string; description: string }[] = [
  { key: "ugc", label: "Home Style UGC", short: "Home UGC", description: "Real people, real homes – native-looking videos that build trust and drive purchases." },
  { key: "studio", label: "Studio Shoot", short: "Studio", description: "Clean, premium product videos shot in our studio – built to show the product and close the sale." },
  { key: "influencer", label: "Influencer Reels", short: "Influencer", description: "Creators from our network selling your product to an audience that already trusts them." },
];

export const videoGroup = (cat?: string): VideoGroup => {
  const c = (cat || "").toLowerCase();
  if (c === "studio" || c === "brand" || c === "tvc") return "studio";
  if (c === "influencer") return "influencer";
  return "ugc"; // "ugc", legacy "sales", or empty
};

export const videoGroupLabel = (cat?: string) => VIDEO_GROUPS.find((g) => g.key === videoGroup(cat))!.label;

/** Old uploads stored a view count ("1.2M") in the slot now used for the sales result – hide those. */
export const isViewCount = (v?: string) => /^\s*[\d.,]+\s*[kmb]?\+?\s*(views?)?\s*$/i.test(v || "");
export const salesResult = (v?: string) => (v && !isViewCount(v) ? v.trim() : "");

/** Local copies keep hero autoplay independent of Instagram's embedded player. */
export const HERO_REELS = [
  { id: 'Dbs5SaGpnwt', title: 'Featured reel 1' },
  { id: 'Dbs4c6Gppdz', title: 'Featured reel 2' },
  { id: 'Dbs3j-Npqx_', title: 'Featured reel 3' },
].map(({ id, title }) => ({
  video: `/hero-reels/${id}.mp4`,
  title,
  source: `https://www.instagram.com/reel/${id}/`,
}));

export function localHeroVideo(url: string): string {
  const match = /^https?:\/\/(?:www\.)?instagram\.com\/reel\/([\w-]+)\/?(?:\?.*)?$/.exec(url);
  return HERO_REELS.find(reel => match?.[1] && reel.source.includes(`/reel/${match[1]}/`))?.video || url;
}

export const APP_DOMAIN =
  process.env.NODE_ENV !== "development"
    ? "https://hellotv-web.vercel.app"
    : "http://localhost:3000";
export const APP_DOMAIN_CDN_IMAGE = "https://phimimg.com";
export const DOMAIN_TMDB = "https://www.themoviedb.org";
export const VIDEO_TYPE_SLUG: Record<string, string> = {
  series: "phim-bo",
  single: "phim-le",
};
export const IMAGE_WEBPAGE = `https://phimapi.com/image.php?url=`;

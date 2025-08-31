import * as cheerio from "cheerio";

const imageApi = {
  fetchImagesData: async (tmdbId: string) => {
    if (!tmdbId) return [];
    try {
      const res = await fetch(
        `https://www.themoviedb.org/movie/${tmdbId}/images/backdrops?image_language=xx&language=vi-VN`,
        { cache: "no-cache" }
      );

      const html = await res.text();

      const $ = cheerio.load(html);

      const images: {
        src: string;
      }[] = [];

      $(".images li.card").each(function () {
        const src =
          $(this)
            .find("img.backdrop")
            .attr("srcset")
            ?.split(", ")[1]
            .replace(" 2x", "") || "";

        images.push({
          src,
        });
      });

      return images;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};

export default imageApi;

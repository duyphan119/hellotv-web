import * as cheerio from "cheerio";
import videoApi from "@/features/videos/api";
import { DOMAIN_TMDB } from "@/lib/constants";

function convertBirthday(text: string): string {
  // Regex tách: January 30, 2002 (23 years old)
  const regex =
    /^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})(?:\s+\((\d+)\s+years old\))?/;
  const match = text.match(regex);
  if (!match) return text;

  const monthMap: Record<string, string> = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };

  const month = monthMap[match[1]];
  const day = match[2].padStart(2, "0");
  const year = match[3];
  const age = match[4] ? ` (${match[4]} tuổi)` : "";

  return `${day}/${month}/${year}${age}`;
}

const actorApi = {
  fetchActorsData: async (tmdbId: string) => {
    const res = await fetch(`${DOMAIN_TMDB}/movie/${tmdbId}?language=vi-VN`, {
      cache: "no-cache",
    });

    const html = await res.text();

    const $ = cheerio.load(html);

    const actors: {
      id: string;
      name: string;
      slug: string;
      avatar: string;
      character: string;
    }[] = [];

    $(".people .card").each(function () {
      const avatar = $(this).find("img.profile").attr("src") || "";
      const name = $(this).find("p a").text().trim();
      const slug = $(this).find("p a").attr("href") || "";
      const character = $(this).find("p.character").text().trim();

      const id = slug?.split("/")[2].replace("?language=vi-VN", "");

      if (id)
        actors.push({
          id,
          name,
          slug,
          avatar,
          character,
        });
    });

    return actors;
  },
  fetchActorDetailsData: async (
    actorId: number | string
  ): Promise<TActorProfileRaw> => {
    const html = await (
      await fetch(`${DOMAIN_TMDB}/person/${actorId}?language=vi-VN`, {
        next: { revalidate: 100 },
      })
    ).text();
    const $ = cheerio.load(html);

    const actorName = $("h2.title a").text();
    const biography = $(".biography").text();

    const gender =
      $("section.facts p:nth-of-type(4)")
        .contents()
        .filter((_, el) => el.type === "text")
        .text()
        .trim() === "Male"
        ? "Nam"
        : "Nữ";

    const birthday = convertBirthday(
      $("section.facts p:nth-of-type(5)")
        .contents()
        .filter((_, el) => el.type === "text")
        .text()
        .trim()
    );

    return {
      id: actorId,
      name: actorName,
      biography,
      gender,
      birthday,
      avatar: $(".profile img").attr("src"),
    };
  },
  fetchVideosData: async function fetchActorData(
    actorId: number | string
  ): Promise<{
    items: TVideoItem[];
  }> {
    const res = await fetch(`${DOMAIN_TMDB}/person/${actorId}?language=vi-VN`, {
      headers: { "Accept-Language": "en-US,en;q=0.9" },
      next: { revalidate: 100 },
    });

    const html = await res.text();
    const $ = cheerio.load(html);

    const inputs = $(".credits_list .credits tbody tr")
      .map((_, el) => {
        const name = $(el).find("bdi").text();
        const [tmdbType, tmdbId] =
          $(el)
            .find("a.tooltip")
            .attr("href")
            ?.replace("?language=vi-VN", "")
            .split("/")
            .slice(1) || [];
        return { name, tmdbType, tmdbId };
      })
      .get();

    const results = await Promise.allSettled(
      inputs.map((input) => videoApi.searchVideos({ keyword: input.name }))
    );

    const items: TVideoItem[] = [];
    const videoIds = new Set<string>();

    results.forEach((res, i) => {
      if (res.status === "fulfilled") {
        const { data } = res.value as TVideosResponse;
        if (data.items) {
          const video = data.items.find(
            (item) =>
              item.tmdb.id &&
              item.tmdb.id.toString() === inputs[i].tmdbId &&
              item.tmdb.type === inputs[i].tmdbType &&
              item.origin_name === inputs[i].name
          );

          if (video && !videoIds.has(video._id)) {
            videoIds.add(video._id);
            items.push(video);
          }
        }
      }
    });

    return { items };
  },
};

export default actorApi;

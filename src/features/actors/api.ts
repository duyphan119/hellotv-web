import videoApi from "@/features/videos/api";

const actorApi = {
  fetchActorsData: async (type: string, id: string): Promise<TCast[]> => {
    const res = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US`,
      {
        cache: "no-cache",
        headers: {
          Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
      }
    );
    const data: { cast: TCast[] } = await res.json();
    return data.cast;
  },

  fetchActorDetailsData: async (actorId: number | string): Promise<TPerson> => {
    const res = await fetch(
      `https://api.themoviedb.org/3/person/${actorId}?language=en-US`,
      {
        next: { revalidate: 100 },
        headers: {
          Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
      }
    );
    return res.json();
  },

  fetchVideosData: async (
    actorId: number | string
  ): Promise<{ tv_list: TVideoItem[]; movie_list: TVideoItem[] }> => {
    const [tvRes, movieRes] = await Promise.allSettled([
      actorApi.fetchTvListData(actorId),
      actorApi.fetchMovieListData(actorId),
    ]);
    return {
      tv_list: tvRes.status === "fulfilled" ? tvRes.value : [],
      movie_list: movieRes.status === "fulfilled" ? movieRes.value : [],
    };
  },

  // 🔑 helper để tránh lặp lại
  fetchCreditVideos: async <T extends TTvCredit | TMovieCredit>(
    url: string,
    getKeyword: (item: T) => string,
    matchFn: (item: TVideoItem, credit: T) => boolean
  ): Promise<TVideoItem[]> => {
    console.log(url);
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
      cache: "no-cache",
    });
    const { cast }: { cast: T[] } = await res.json();

    const results = await Promise.allSettled(
      cast.map((c) => videoApi.searchVideos({ keyword: getKeyword(c) }))
    );

    const items: TVideoItem[] = [];
    const videoIds = new Set<string>();

    results.forEach((r, i) => {
      if (r.status === "fulfilled") {
        const { data } = r.value as TVideosResponse;
        if (data.items) {
          const video = data.items.find((item) => matchFn(item, cast[i]));
          if (video && !videoIds.has(video._id)) {
            videoIds.add(video._id);
            items.push(video);
          }
        }
      }
    });

    return items;
  },

  fetchTvListData: (actorId: string | number) =>
    actorApi.fetchCreditVideos<TTvCredit>(
      `https://api.themoviedb.org/3/person/${actorId}/tv_credits?language=en-US`,
      (c) => c.name,
      (item, c) =>
        item.tmdb.id && item.tmdb.type ? (item.tmdb.id === String(c.id) &&
        item.tmdb.type === "tv"):
        ((item.origin_name === c.name || item.origin_name === c.original_name)
        && (c.first_air_date+"").includes(item.year+"") 
        )
    ),

  fetchMovieListData: (actorId: string | number) =>
    actorApi.fetchCreditVideos<TMovieCredit>(
      `https://api.themoviedb.org/3/person/${actorId}/movie_credits?language=en-US`,
      (c) => c.title,
      (item, c) => item.tmdb.id && item.tmdb.type ? (item.tmdb.id === String(c.id) &&
        item.tmdb.type === "movie"):
       ( (item.origin_name === c.title || item.origin_name === c.original_title) &&
       (c.release_date+"").includes(item.year+""))
    ),
};

export default actorApi;

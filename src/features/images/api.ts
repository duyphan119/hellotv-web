const imageApi = {
  fetchImagesData: async (type: string, id: string): Promise<TImageRaw[]> => {
    if (!type || !id) return [];
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/images`,
        {
          cache: "no-cache",
          headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
          },
        }
      );

      const data: { backdrops: TImageRaw[] } = await res.json();

      return data.backdrops;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};

export default imageApi;

export type WatchedVideo = {
  id: string;
  slug: string;
  name: string;
  thumbnail: string;
  episodeSlug: string;
  server: number;
  time: number;
};

export const getWatchedVideos = () => {
  const watchedVideos: WatchedVideo[] = JSON.parse(
    localStorage.getItem("watched")!
  );

  if (!watchedVideos) return [];

  const filteredWatchedVideos = watchedVideos.filter(
    ({ time }) => time + 7 * 24 * 60 * 60 * 1000 > new Date().getTime()
  );

  localStorage.setItem("watched", JSON.stringify(filteredWatchedVideos));

  return filteredWatchedVideos;
};

export const saveWatchedVideo = (input: WatchedVideo) => {
  const watchedVideos = getWatchedVideos();

  const index = watchedVideos.findIndex(({ id }) => id === input.id);

  if (index !== -1) {
    watchedVideos.splice(index, 1);
  }
  watchedVideos.unshift(input);
  localStorage.setItem("watched", JSON.stringify(watchedVideos));
};

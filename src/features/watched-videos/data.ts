export type WatchedVideo = {
  id: string;
  slug: string;
  name: string;
  thumbnail: string;
  episodeName: string;
  serverName: string;
  time: number;
  originName: string;
  query: string;
  otherWatchedEpisodes: string[];
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
    input.otherWatchedEpisodes = [
      ...watchedVideos[index].otherWatchedEpisodes,
      input.episodeName,
    ];
    watchedVideos.splice(index, 1);
  }
  watchedVideos.unshift(input);

  localStorage.setItem("watched", JSON.stringify(watchedVideos));
};

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
  try {
    const watchedVideos: WatchedVideo[] = JSON.parse(
      localStorage.getItem("watched")!
    );

    if (!watchedVideos) return [];

    const filteredWatchedVideos = watchedVideos.filter(
      ({ time }) => time + 14 * 24 * 60 * 60 * 1000 > new Date().getTime()
    );

    localStorage.setItem("watched", JSON.stringify(filteredWatchedVideos));

    return filteredWatchedVideos;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const saveWatchedVideo = (input: WatchedVideo) => {
  const watchedVideos = getWatchedVideos();

  const index = watchedVideos.findIndex(({ id }) => id === input.id);

  if (index !== -1) {
    const watchedEpisodeString = `${input.episodeName}${input.serverName}`;
    input.otherWatchedEpisodes = [
      ...watchedVideos[index].otherWatchedEpisodes.filter(
        (item) => item !== watchedEpisodeString
      ),
      watchedEpisodeString,
    ];
    watchedVideos.splice(index, 1);
  }
  watchedVideos.unshift(input);

  localStorage.setItem("watched", JSON.stringify(watchedVideos));
};

export const deleteWatchedVideo = (id: string) => {
  const watchedVideos = getWatchedVideos();

  localStorage.setItem(
    "watched",
    JSON.stringify(watchedVideos.filter((item) => item.id !== id))
  );
};

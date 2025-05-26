export type WatchedVideo = {
  video: {
    slug: string;
    name: string;
    thumbnail: string;
    poster: string;
  };
  episode: {
    currentTime: number;
    duration: number;
    serverName: string;
    name: string;
  };
  time: number;
};

const STORAGE_KEY = "watchedVideos";

export const getWatchedVideos = (): WatchedVideo[] => {
  const jsonValue = localStorage.getItem(STORAGE_KEY);
  if (jsonValue !== null) {
    const time = new Date().getTime();
    const watchedVideos = JSON.parse(jsonValue).filter(
      (item: WatchedVideo) => item.time + 3 * 24 * 60 * 60 * 1000 > time
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedVideos));
    return watchedVideos;
  }

  return [];
};

export const getWatchedVideo = (slug: string) => {
  const watchedVideos = getWatchedVideos();

  return watchedVideos.find(({ video }) => video.slug === slug) || null;
};

export const createWatchedVideo = (inputs: WatchedVideo) => {
  const watchedVideos = getWatchedVideos();

  const index = watchedVideos.findIndex(
    ({ video: { slug } }) => slug === inputs.video.slug
  );

  if (index !== -1) {
    watchedVideos.splice(index, 1);
  }
  watchedVideos.unshift(inputs);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedVideos));
};

export const deleteWatchedVideo = (videoSlug: string) => {
  const watchedVideos = getWatchedVideos();
  const index = watchedVideos.findIndex(
    ({ video: { slug } }) => slug === videoSlug
  );

  if (index !== -1) {
    watchedVideos.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedVideos));
  }
};

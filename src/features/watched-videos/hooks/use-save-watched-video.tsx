import { useEffect } from "react";
import { saveWatchedVideo, WatchedVideo } from "../data";

export function useSaveWatchedVideo(input: WatchedVideo) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveWatchedVideo(input);
    }, 4567);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [input]);
}

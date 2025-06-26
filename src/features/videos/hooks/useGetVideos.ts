import { useQuery } from "@tanstack/react-query";
import {
  getLatestVideos,
  getVideosByCategory,
  getVideosByCountry,
  getVideosByTypeList,
  VideosParams,
} from "../data";

export const getVideos = async (searchParams: VideosParams) => {
  if (searchParams?.typelist) {
    const { typelist, ...others } = searchParams;
    return getVideosByTypeList(typelist, others);
  } else {
    if (searchParams?.country) {
      const { country, ...others } = searchParams;
      return getVideosByCountry(country, others);
    }
    if (searchParams?.category) {
      const { category, ...others } = searchParams;
      return getVideosByCategory(category, others);
    }
    return getLatestVideos({ page: searchParams.page });
  }
};

export const useGetVideos = (searchParams: VideosParams) => {
  return useQuery({
    queryKey: ["videos", searchParams],
    queryFn: () => getVideos(searchParams),
  });
};

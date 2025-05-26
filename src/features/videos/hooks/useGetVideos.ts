import {
  getLatestVideos,
  getVideosByCategory,
  getVideosByCountry,
  getVideosByTypeList,
  VideosParams,
} from "@/data/video";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useGetVideos(params?: VideosParams) {
  return useInfiniteQuery({
    queryKey: ["videos", params],
    queryFn: ({ pageParam }) => {
      if (params?.typelist)
        return getVideosByTypeList(params.typelist, {
          ...params,
          page: pageParam,
        });
      if (params?.country)
        return getVideosByCountry(params.country, {
          ...params,
          page: pageParam,
        });
      if (params?.category)
        return getVideosByCategory(params.category, {
          ...params,
          page: pageParam,
        });

      return getLatestVideos({
        page: pageParam,
      });
    },
    initialPageParam: 1,
    getNextPageParam: ({ pagination: { currentPage, totalPages } }) =>
      currentPage + 1 > totalPages ? undefined : currentPage + 1,
  });
}

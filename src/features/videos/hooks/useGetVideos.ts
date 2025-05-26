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
      if (params?.typelist) {
        const { typelist, ...searchParams } = params;
        return getVideosByTypeList(typelist, {
          ...searchParams,
          page: pageParam,
        });
      }
      if (params?.country) {
        const { country, ...searchParams } = params;
        return getVideosByCountry(country, {
          ...searchParams,
          page: pageParam,
        });
      }
      if (params?.category) {
        const { category, ...searchParams } = params;
        return getVideosByCategory(category, {
          ...searchParams,
          page: pageParam,
        });
      }

      return getLatestVideos({
        page: pageParam,
      });
    },
    initialPageParam: 1,
    getNextPageParam: ({ pagination: { currentPage, totalPages } }) =>
      currentPage + 1 > totalPages ? undefined : currentPage + 1,
  });
}

import { TypeList } from "@/features/typelist/data";
import { getVideosByTypeList, VideosParams } from "@/features/videos/data";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useGetVideosByTypeList(
  typeList: TypeList,
  params?: VideosParams
) {
  return useInfiniteQuery({
    queryKey: ["videos", typeList, params],
    queryFn: ({ pageParam }) =>
      getVideosByTypeList(typeList, {
        ...params,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: ({ pagination: { currentPage, totalPages } }) =>
      currentPage + 1 > totalPages ? undefined : currentPage + 1,
  });
}

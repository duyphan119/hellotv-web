import { TypeList } from "@/data/video";
import useGetVideosByTypeList from "./useGetVideosByTypeList";

export type VideosFilterParams = {
  typeList: string;
  categorySlug: string;
  countrySlug: string;
  year: string | number;
};

export default function useGetVideosFilterResults(filter: VideosFilterParams) {
  return useGetVideosByTypeList(filter.typeList as TypeList, {
    ...(filter.categorySlug ? { category: filter.categorySlug } : {}),
    ...(filter.countrySlug ? { country: filter.countrySlug } : {}),
    ...(filter.year ? { year: filter.year } : {}),
    limit: 12,
  });
}

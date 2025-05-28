import { getCategories } from "@/features/categories/data";
import { useQuery } from "@tanstack/react-query";

export default function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}

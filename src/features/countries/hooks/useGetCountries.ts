import { getCountries } from "@/features/countries/data";
import { useQuery } from "@tanstack/react-query";

export default function useGetCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });
}

import queryString from "query-string";

const countryApi = {
  fetchCountriesData: async (): Promise<TCountry[]> => {
    const res = await fetch("https://phimapi.com/quoc-gia");

    const data: TCountry[] = await res.json();

    return data;
  },
  fetchVideosData: async (
    countrySlug: string,
    filter?: Omit<TVideosFilter, "country">
  ): Promise<TVideosResponse> => {
    const url = queryString.stringifyUrl({
      url: `https://phimapi.com/v1/api/quoc-gia/${countrySlug}`,
      query: filter,
    });

    const res = await fetch(url, {
      next: { revalidate: 300 },
    });

    const data: TVideosResponse = await res.json();

    return data;
  },
};

export default countryApi;

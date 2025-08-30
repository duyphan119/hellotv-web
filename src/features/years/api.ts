import queryString from "query-string";

const yearApi = {
  fetchYearsData: (): number[] =>
    Array.from(
      { length: new Date().getFullYear() - 1969 },
      (_, i) => new Date().getFullYear() - i
    ),
  fetchVideosData: async (
    yearValue: string | number,
    filter?: Omit<TVideosFilter, "year">
  ): Promise<TVideosResponse> => {
    const url = queryString.stringifyUrl({
      url: `https://phimapi.com/v1/api/nam/${yearValue}`,
      query: filter,
    });

    const res = await fetch(url, {
      next: { revalidate: 300 },
    });

    const data: TVideosResponse = await res.json();

    return data;
  },
};

export default yearApi;

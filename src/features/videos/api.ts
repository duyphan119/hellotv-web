import queryString from "query-string";
const videoApi = {
  fetchLatestVideosData: async (
    filter?: Omit<TPaginationFilter, "limit">
  ): Promise<TLatestVideosResponse> => {
    const url = queryString.stringifyUrl({
      url: "https://phimapi.com/danh-sach/phim-moi-cap-nhat-v3",
      query: filter,
    });
    const res = await fetch(url, {
      next: { revalidate: 300 },
    });
    const data: TLatestVideosResponse = await res.json();

    if (!data.status) {
      return {data:{items:[],breadCrumb:[],params:{pagination:{currentPage:1,totalPages:1,totalItemsPerPage:12,totalItems:0}}}}
    }
    return data;
  },
  fetchVideoDetailsData: async (
    slug: string
  ): Promise<TVideoDetailsResponse> => {
    const res = await fetch(`https://phimapi.com/phim/${slug}`, {
      next: { revalidate: 300 },
    });
    const data: TVideoDetailsResponse = await res.json();

        if (!data.status) {
      return {data:{movie:null,episodes:[]}}
    }
    return data;
  },
  fetchVideosData: async (
    typelist: string,
    filter?: TVideosFilter
  ): Promise<TVideosResponse> => {
    const url = queryString.stringifyUrl({
      url: `https://phimapi.com/v1/api/danh-sach/${typelist}`,
      query: filter,
    });
    const res = await fetch(url, {
      next: { revalidate: 300 },
    });
    const data: TVideosResponse = await res.json();

        if (!data.status) {
      return {data:{items:[],breadCrumb:[],params:{pagination:{currentPage:1,totalPages:1,totalItemsPerPage:12,totalItems:0}}}}
    }
    return data;
  },
  searchVideos: async (
    filter?: TVideosFilter & { keyword: string }
  ): Promise<TVideosResponse> => {
    const url = queryString.stringifyUrl({
      url: "https://phimapi.com/v1/api/tim-kiem",
      query: filter,
    });
    const res = await fetch(url, {
      next: { revalidate: 300 },
    });
    const data: TVideosResponse = await res.json();

    if (!data.status) {
      return {data:{items:[],breadCrumb:[],params:{pagination:{currentPage:1,totalPages:1,totalItemsPerPage:12,totalItems:0}}}}
    }

    return data;
  },
};

export default videoApi;

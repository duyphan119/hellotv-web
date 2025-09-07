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
      return  {
  status: false,
  msg: "",
  data: {
    items: [],
    
      pagination: {
        totalItems: 0,
        totalItemsPerPage: 0,
        currentPage: 1,
        totalPages: 0,
      },
  
    
    
  },
};

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
      return {movie:null,episodes:[],status:false,msg:""}
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
      return {
  status: false,
  msg: "",
  data: {
    seoOnPage: {
      titleHead: "",
      descriptionHead: "",
      og_type: "",
      og_image: [],
      og_url: "",
    },
    items: [],
    itemsSportsVideos: [],
    params: {
      pagination: {
        totalItems: 0,
        totalItemsPerPage: 0,
        currentPage: 1,
        totalPages: 0,
      },
    },
    type_list: "",
    breadCrumb: [],
    APP_DOMAIN_FRONTEND: "",
    APP_DOMAIN_CDN_IMAGE: "",
    titlePage: "",
  },
};
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
      return {
  status: false,
  msg: "",
  data: {
    seoOnPage: {
      titleHead: "",
      descriptionHead: "",
      og_type: "",
      og_image: [],
      og_url: "",
    },
    items: [],
    itemsSportsVideos: [],
    params: {
      pagination: {
        totalItems: 0,
        totalItemsPerPage: 0,
        currentPage: 1,
        totalPages: 0,
      },
    },
    type_list: "",
    breadCrumb: [],
    APP_DOMAIN_FRONTEND: "",
    APP_DOMAIN_CDN_IMAGE: "",
    titlePage: "",
  },
};
   }

    return data;
  },
};

export default videoApi;

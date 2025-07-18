import { Category } from "@/features/categories/data";
import { Country } from "@/features/countries/data";
import qs from "query-string";
import { TypeList } from "../typelist/data";

export type LatestVideo = {
  id: string;
  name: string;
  originName: string;
  slug: string;
  thumbnail: string;
  poster: string;
  episodeCurrent: string;
  categories: Category[];
  countries: Country[];
  language: string;
  year: number;
};

export type Pagination = {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  totalItemsPerPage: number;
};

export type LatestVideoParams = {
  page?: string | number;
};

type LatestVideoRaw = {
  _id: string;
  name: string;
  origin_name: string;
  slug: string;
  thumb_url: string;
  poster_url: string;
  episode_current: string;
  country: Country[];
  category: Category[];
  lang: string;
};

type SeoOnPage = {
  og_type: string;
  titleHead: string;
  descriptionHead: string;
  og_image: string[];
  og_url: string;
};

export const getLatestVideos = async (params: LatestVideoParams = {}) => {
  try {
    const response = await fetch(
      `https://phimapi.com/danh-sach/phim-moi-cap-nhat-v3?${qs.stringify(
        params
      )}`,
      {
        next: {
          revalidate: 30,
          tags: ["latestVideos"],
        },
      }
    );

    const { items, pagination } = await response.json();

    const latestVideos: LatestVideo[] = items.map((item: LatestVideoRaw) => ({
      id: item._id,
      name: item.name,
      originName: item.origin_name,
      slug: item.slug,
      thumbnail: item.thumb_url,
      poster: item.poster_url,
      episodeCurrent: item.episode_current,
      countries: item.country,
      categories: item.category,
      language: item.lang,
    }));
    return {
      seoOnPage: DEFAULT_VIDEOS_RESPONSE.seoOnPage,
      titlePage: "Phim mới cập nhật",
      items: latestVideos,
      pagination: pagination as Pagination,
    };
  } catch (error) {
    console.log("getLatestVideos error", error);
    return {
      titlePage: "Phim mới cập nhật",
      seoOnPage: DEFAULT_VIDEOS_RESPONSE.seoOnPage,
      items: [],
      pagination: {
        totalItems: 0,
        currentPage: 1,
        totalPages: 1,
        totalItemsPerPage: 24,
      },
    };
  }
};

export type Video = LatestVideo & {
  director: string;
  actors: string[];
  content: string;
  totalEpisodes: number;
  trailer: string;
};

export type VideoServer = {
  name: string;
  episodes: Episode[];
};

export type Episode = {
  name: string;
  slug: string;
  filename: string;
  link_m3u8: string;
  link_embed: string;
};

const DEFAULT_VIDEOS_RESPONSE: {
  titlePage: string;
  items: LatestVideo[];
  pagination: Pagination;
  seoOnPage: SeoOnPage;
} = {
  titlePage: "",
  items: [],
  pagination: {
    totalItems: 0,
    currentPage: 1,
    totalPages: 1,
    totalItemsPerPage: 24,
  },
  seoOnPage: {
    og_type: "",
    titleHead: "",
    descriptionHead: "",
    og_image: [],
    og_url: "",
  },
};

export const getVideo = async (slug: string) => {
  try {
    const response = await fetch(`https://phimapi.com/phim/${slug}`, {
      next: {
        revalidate: 30,
        tags: ["video", slug],
      },
    });

    const { movie, episodes } = await response.json();
    const video: Video = {
      id: movie._id,
      name: movie.name,
      originName: movie.origin_name,
      slug: movie.slug,
      thumbnail: movie.thumb_url,
      poster: movie.poster_url,
      actors: movie.actor,
      content: movie.content,
      director: movie.director,
      categories: movie.category,
      countries: movie.country,
      episodeCurrent: movie.episode_current,
      language: movie.lang,
      totalEpisodes: +movie.episode_total,
      year: movie.year,
      trailer: movie.trailer_url,
    };

    const servers: VideoServer[] = episodes.map(
      (item: { server_name: string; server_data: Episode[] }) => ({
        name: item.server_name,
        episodes: item.server_data,
      })
    );

    return {
      video,
      servers,
    };
  } catch (error) {
    console.log("getVideo error", error);
    return {
      video: null,
      servers: [],
    };
  }
};

export type VideosParams = Partial<{
  page: number | string;
  sort_field: string;
  sort_type: "asc" | "desc";
  sort_lang: string;
  category: string;
  country: string;
  year: number | string;
  limit: number | string;
  typelist: TypeList;
}>;

export const getVideosByTypeList = async (
  typeList: TypeList,
  params: VideosParams = {}
) => {
  try {
    const response = await fetch(
      `https://phimapi.com/v1/api/danh-sach/${typeList}?${qs.stringify(
        params
      )}`,
      {
        next: {
          revalidate: 30,
          tags: ["videosByTypeList", typeList],
        },
      }
    );
    const {
      data: {
        items,
        APP_DOMAIN_CDN_IMAGE,
        params: { pagination },
        titlePage,
        seoOnPage,
      },
    } = await response.json();
    return {
      titlePage,
      seoOnPage: seoOnPage as SeoOnPage,
      items: items.map((item: LatestVideoRaw) => ({
        id: item._id,
        name: item.name,
        originName: item.origin_name,
        slug: item.slug,
        thumbnail: `${APP_DOMAIN_CDN_IMAGE}/${item.thumb_url}`,
        poster: `${APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`,
        episodeCurrent: item.episode_current,
        countries: item.country,
        categories: item.category,
        language: item.lang,
      })) as LatestVideo[],
      pagination: pagination as Pagination,
    };
  } catch (error) {
    console.log("getVideosByTypeList error", error);
    return {
      ...DEFAULT_VIDEOS_RESPONSE,
    };
  }
};

export const getVideosByCountry = async (
  countrySlug: string,
  params: Omit<VideosParams, "country"> = {}
) => {
  try {
    const response = await fetch(
      `https://phimapi.com/v1/api/quoc-gia/${countrySlug}?${qs.stringify(
        params
      )}`,
      {
        next: {
          revalidate: 30,
          tags: ["videosByCountry", countrySlug],
        },
      }
    );
    const {
      data: {
        items,
        APP_DOMAIN_CDN_IMAGE,
        params: { pagination },
        titlePage,
        seoOnPage,
      },
    } = await response.json();
    return {
      titlePage,
      seoOnPage: seoOnPage as SeoOnPage,
      items: items.map((item: LatestVideoRaw) => ({
        id: item._id,
        name: item.name,
        originName: item.origin_name,
        slug: item.slug,
        thumbnail: `${APP_DOMAIN_CDN_IMAGE}/${item.thumb_url}`,
        poster: `${APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`,
        episodeCurrent: item.episode_current,
        countries: item.country,
        categories: item.category,
        language: item.lang,
      })) as LatestVideo[],
      pagination: pagination as Pagination,
    };
  } catch (error) {
    console.log("getVideosByCountry error", error);
    return {
      ...DEFAULT_VIDEOS_RESPONSE,
    };
  }
};

export const getVideosByCategory = async (
  categorySlug: string,
  params: Omit<VideosParams, "category"> = {}
) => {
  try {
    const response = await fetch(
      `https://phimapi.com/v1/api/the-loai/${categorySlug}?${qs.stringify(
        params
      )}`,
      {
        next: {
          revalidate: 30,
          tags: ["videosByCategory", categorySlug],
        },
      }
    );
    const {
      data: {
        items,
        APP_DOMAIN_CDN_IMAGE,
        params: { pagination },
        titlePage,
        seoOnPage,
      },
    } = await response.json();
    return {
      titlePage,
      seoOnPage: seoOnPage as SeoOnPage,

      items: items.map((item: LatestVideoRaw) => ({
        id: item._id,
        name: item.name,
        originName: item.origin_name,
        slug: item.slug,
        thumbnail: `${APP_DOMAIN_CDN_IMAGE}/${item.thumb_url}`,
        poster: `${APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`,
        episodeCurrent: item.episode_current,
        countries: item.country,
        categories: item.category,
        language: item.lang,
      })) as LatestVideo[],
      pagination: pagination as Pagination,
    };
  } catch (error) {
    console.log("getVideosByCountry error", error);
    return {
      ...DEFAULT_VIDEOS_RESPONSE,
    };
  }
};

export type SearchVideosParams = VideosParams & { keyword: string };

export const searchVideos = async (params: SearchVideosParams) => {
  if (params.keyword) {
    try {
      const response = await fetch(
        `https://phimapi.com/v1/api/tim-kiem?${qs.stringify(params)}`,
        {
          next: {
            revalidate: 30,
            tags: ["search", params.keyword],
          },
        }
      );
      const {
        data: {
          items,
          APP_DOMAIN_CDN_IMAGE,
          params: { pagination },
          titlePage,
          seoOnPage,
        },
      } = await response.json();
      return {
        titlePage,
        seoOnPage: seoOnPage as SeoOnPage,
        items: items.map((item: LatestVideoRaw) => ({
          id: item._id,
          name: item.name,
          originName: item.origin_name,
          slug: item.slug,
          thumbnail: `${APP_DOMAIN_CDN_IMAGE}/${item.thumb_url}`,
          poster: `${APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`,
          episodeCurrent: item.episode_current,
          countries: item.country,
          categories: item.category,
          language: item.lang,
        })) as LatestVideo[],
        pagination: pagination as Pagination,
      };
    } catch (error) {
      console.log(`searchVideos error`, error);
    }
  }
  return DEFAULT_VIDEOS_RESPONSE;
};

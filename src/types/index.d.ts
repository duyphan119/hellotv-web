type TSeoOnPage = {
  titleHead: string;
  descriptionHead: string;
  og_type: string;
  og_image: string[];
  og_url?: string;
};

type TTmdbInfo = {
  type: string;
  id: string;
  season: number | null;
  vote_average: number;
  vote_count: number;
};

type TImdbInfo = {
  id: string;
  vote_average: number;
  vote_count: number;
};

type TModified = {
  time: string; // ISO string
};

type TCategory = {
  _id: string;
  name: string;
  slug: string;
};

type TCountry = TCategory;

type TVideoItem = {
  tmdb: TTmdbInfo;
  imdb: TImdbInfo;
  modified: TModified;
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  type: string;
  thumb_url: string;
  poster_url: string;
  sub_docquyen: boolean;
  time: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  year: number;
  category: (Omit<TCategory, "_id"> & { id: string })[];
  country: (Omit<TCountry, "_id"> & { id: string })[];
};

type TPagination = {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  totalPages: number;
};

type TPaginationFilter = Partial<{
  page: string;
  limit: string;
}>;

type TVideosFilter = TPaginationFilter &
  Partial<{
    year: string;
    country: string;
    category: string;
    sort_field: string;
    sort_type: string;
    sort_lang: string;
    typelist: string;
  }>;

type TParams = {
  type_slug?: string;
  filterCategory?: string[];
  filterCountry?: string[];
  filterYear?: string;
  sortField?: string;
  pagination: TPagination;
  itemsUpdateInDay?: number;
  totalSportsVideos?: number;
  itemsSportsVideosUpdateInDay?: number;
};

type TBreadcrumb = {
  name: string;
  slug?: string;
  position?: number;
  isCurrent?: boolean;
}[];

type TLatestVideosResponse = {
  status: boolean;
  msg: string;
  items: TVideoItem[];
  pagination: TPagination;
};

type TVideosResponse = {
  status: boolean;
  msg: string;
  data: {
    seoOnPage: TSeoOnPage;
    items: TVideoItem[];
    itemsSportsVideos?: TVideoItem[];
    params: TParams;
    type_list?: string;
    breadCrumb: TBreadcrumb;
    APP_DOMAIN_FRONTEND?: string;
    APP_DOMAIN_CDN_IMAGE: string;
    titlePage: string;
  };
};

type TCategoriesResponse = {
  status: boolean;
  msg: string;
  data: {
    items: TCategory[];
  };
};

type TYearsResponse = {
  status: boolean;
  msg: string;
  data: {
    items: { year: number }[];
  };
};

type TCountriesResponse = {
  status: boolean;
  msg: string;
  data: {
    items: TCountry[];
  };
};

type TServerDataItem = {
  name: string;
  slug: string;
  link_embed: string;
  link_m3u8: string;
  filename: string;
};

type TEpisode = {
  server_name: string;
  server_data: TServerDataItem[];
};

type TVideoDetails = TVideoItem & {
  content: string;
  director: string[];
  actor: string[];
  episodes: TEpisode[];
  is_copyright: boolean;
  trailer_url: string;
  chieurap: boolean;
  notify: string;
  showTimes: string;
  status: string;
  created: TModified;
};

type TVideoDetailsResponse = {
  status: boolean;
  msg: string;
  movie: TVideoDetails;
  episodes: TEpisode[];
};

type TActorsResponse = {
  status: boolean;
  msg: string;
  data: {
    tmdb_id: number;
    tmdb_type: string;
    ophim_id: string;
    slug: string;
    imdb_id: string;
    profile_sizes: {
      h632: string;
      original: string;
      w185: string;
      w45: string;
    };
    peoples: {
      tmdb_people_id: number;
      adult: false;
      gender: 2;
      gender_name: string;
      name: string;
      original_name: string;
      character: string;
      known_for_department: string;
      profile_path: string;
      also_known_as: string[];
    }[];
  };
};

type TImagesResponse = {
  status: boolean;
  msg: string;
  data: {
    tmdb_id: number;
    tmdb_type: string;
    tmdb_season: number;
    ophim_id: string;
    slug: string;
    image_sizes: {
      backdrop: {
        w1280: string;
        original: string;
        w300: string;
        w780: string;
      };
      poster: {
        w154: string;
        original: string;
        w185: string;
        w342: string;
        w500: string;
        w92: string;
        w780: string;
      };
    };
    images: {
      width: number;
      height: number;
      aspect_ratio: number;
      type: "backdrop" | "poster";
      file_path: string;
      iso_639_1: string;
    }[];
  };
};

type TActorProfileRaw = {
  gender: string;
  id: number | string;
  birthday: string;
  name: string;
  avatar?: string;
  biography: string;
};

type TPerson = {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null; // có thể null nếu không rõ
  deathday: string | null; // có thể null nếu người đó còn sống
  gender: 0 | 1 | 2 | 3; // theo TMDB docs
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  known_for_department: string;
  name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
};

type TCast = {
  adult: boolean;
  gender: number; // 1 = Nữ, 2 = Nam, 0 = Không xác định
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  character: string;
  credit_id: string;
  order: number;
};

type TImageRaw = {
  file_path: string;
  aspect_ratio: number;
};

type TTvCredit = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  first_air_date: string | null;
  name: string;
  vote_average: number;
  vote_count: number;

  // thêm từ credits
  character: string;
  credit_id: string;
  episode_count: number;
};

type TMovieCredit = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;

  // thêm từ credits
  character: string;
  credit_id: string;
  order: number;
};

import queryString from "query-string";

const categoryApi = {
  fetchCategoriesData: async (): Promise<TCategory[]> => {
    const res = await fetch("https://phimapi.com/the-loai");

    const data: TCategory[] = await res.json();

    return data;
  },
  fetchVideosData: async (
    categorySlug: string,
    filter?: Omit<TVideosFilter, "category">
  ): Promise<TVideosResponse> => {
    const url = queryString.stringifyUrl({
      url: `https://phimapi.com/v1/api/the-loai/${categorySlug}`,
      query: filter,
    });

    const res = await fetch(url, {
      next: { revalidate: 300 },
    });

    const data: TVideosResponse = await res.json();

    return data;
  },
};

export const categorySlugTitleMap: Record<string, string> = {
  "am-nhac": "Giai điệu cuộc sống",
  "bi-an": "Điều chưa giải đáp",
  "chien-tranh": "Khói lửa chiến trường",
  "chinh-kich": "Câu chuyện cảm xúc",
  "co-trang": "Trang phục cổ xưa",
  "gia-dinh": "Tình thân yêu thương",
  "hanh-dong": "Gay cấn, kịch tính",
  "hai-huoc": "Tiếng cười sảng khoái",
  "hoc-duong": "Tuổi học trò",
  "hinh-su": "Tội ác và công lý",
  "kinh-di": "Rùng rợn, ám ảnh",
  "kinh-dien": "Tác phẩm bất hủ",
  "khoa-hoc": "Khám phá tri thức",
  "lich-su": "Dấu mốc thời gian",
  "mien-tay": "Cao bồi hoang dã",
  "phim-18": "Dành cho người lớn",
  "phieu-luu": "Chuyến đi mạo hiểm",
  "tai-lieu": "Thông tin hữu ích",
  "tam-ly": "Khắc họa nội tâm",
  "than-thoai": "Truyền thuyết huyền ảo",
  "the-thao": "Sức mạnh và tốc độ",
  "tinh-cam": "Chuyện tình lãng mạn",
  "tre-em": "Dành cho thiếu nhi",
  "vien-tuong": "Tương lai giả tưởng",
  "vo-thuat": "Quyền cước tinh hoa",
};

export default categoryApi;

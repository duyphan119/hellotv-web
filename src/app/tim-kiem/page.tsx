import { searchVideos, SearchVideosParams } from "@/features/videos/data";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Metadata } from "next";
import Link from "next/link";
import Videos from "@/features/videos/components/videos";
import VideosPagination from "@/features/videos/components/videos-pagination";

type SearchVideosProps = {
  searchParams: Promise<SearchVideosParams>;
};

export const generateMetadata = async ({
  searchParams,
}: SearchVideosProps): Promise<Metadata> => {
  const { keyword } = await searchParams;
  try {
    const { seoOnPage } = await searchVideos({ keyword });

    return {
      title: `Hellotv | ${seoOnPage.titleHead}`,
    };
  } catch (error) {
    console.log(error);
  }
  return { title: "Hellorv | Tìm kiếm" };
};

export default async function Search({ searchParams }: SearchVideosProps) {
  const awaitedSearchParams = await searchParams;
  const { items, pagination, titlePage } = await searchVideos({
    ...awaitedSearchParams,
    limit: 30,
  });
  console.log(pagination);
  return (
    <div className="p-4">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Trang chủ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{titlePage}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Videos videos={items} />
      <VideosPagination
        pagination={pagination}
        searchParams={awaitedSearchParams}
      />
    </div>
  );
}

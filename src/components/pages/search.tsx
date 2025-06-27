import { SearchVideosParams } from "@/features/videos/data";
import useSearchVideos from "@/features/videos/hooks/useSearchVideos";
import Breadcrumb from "../breadcrumb";
import VideosPagination from "@/features/videos/components/videos-pagination";
import Videos from "@/features/videos/components/videos";

type SearchProps = {
  searchParams: SearchVideosParams;
};

export default function Search({ searchParams }: SearchProps) {
  const { data, isLoading } = useSearchVideos({
    ...searchParams,
    limit: 30,
  });

  return (
    <div className="p-4">
      <Breadcrumb items={[{ text: data?.titlePage }]} className="mb-4" />
      <Videos isLoading={isLoading} videos={data?.items || []} />
      {data && (
        <VideosPagination
          pagination={data?.pagination}
          searchParams={searchParams}
        />
      )}
    </div>
  );
}

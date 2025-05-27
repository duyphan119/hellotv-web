import { Skeleton } from "@/components/ui/skeleton";

export default function VideoDetailsSkeleton() {
  return (
    <>
      <Skeleton className="col-span-12 h-5" />
      <div className="col-span-12 md:col-span-9">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4">
            <Skeleton className="w-full aspect-[3/4]" />
          </div>
          <div className="col-span-12 md:col-span-8 space-y-1">
            <Skeleton className="w-full h-9" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5 mt-2" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-32 h-12 my-2" />
            <Skeleton className="w-full h-5 mb-2" />
            <Skeleton className="w-full h-36" />
          </div>
          <Skeleton className="col-span-12 h-20" />
          <div className="col-span-12 space-y-4">
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-full aspect-video" />
          </div>
        </div>
      </div>
    </>
  );
}

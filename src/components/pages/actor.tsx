"use client";

import Breadcrumb from "@/components/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import actorApi from "@/features/actors/api";
import VideoCard from "@/features/videos/components/video-card";
import VideoCardSkeleton from "@/features/videos/skeletons/video-card-skeleton";
import { useQueries } from "@tanstack/react-query";
import Image from "next/image";

type Props = {
  actorId: string | number;
};

export default function Actor({ actorId }: Props) {
  const [{ data: actor }, { data: videosData }] = useQueries({
    queries: [
      {
        queryKey: ["actor", actorId],
        queryFn: () => actorApi.fetchActorDetailsData(actorId),
      },
      {
        queryKey: ["videos-actor", actorId],
        queryFn: () => actorApi.fetchVideosData(actorId),
      },
    ],
  });

  return (
    <>
      {actor ? (
        <Breadcrumb
          breadCrumb={[{ name: `Diễn viên ${actor.name}`, isCurrent: true }]}
        />
      ) : (
        <Skeleton className="h-6" />
      )}
      <div className="flex md:flex-row flex-col gap-4">
        <div className="space-y-4">
          {actor ? (
            <>
              <div className="relative aspect-[2/3] w-full md:w-[300px]">
                <Image
                  unoptimized
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/h632${actor.profile_path}`
                      : actor.gender === 1
                      ? "/placeholder-actor-female.jpg"
                      : "/placeholder-actor-male.jpg"
                  }
                  alt="Profile"
                  fill
                  className="rounded-md object-cover"
                />
              </div>
              <h3 className="_text-primary text-3xl">{actor.name}</h3>
              <div className="space-y-1">
                <p className="">
                  Giới tính: {actor.gender === 1 ? "Nữ" : "Nam"}
                </p>
                <p className="">Ngày sinh: {actor.birthday}</p>
              </div>
            </>
          ) : (
            <>
              <Skeleton className="aspect-[2/3] w-full md:w-[300px]" />
              <Skeleton className="h-8" />
              <div className="space-y-1">
                <Skeleton className="h-6" />
                <Skeleton className="h-6" />
              </div>
            </>
          )}
        </div>
        <div className="md:flex-1 space-y-4">
          {videosData ? (
            <>
              {videosData.tv_list.length > 0 && (
                <>
                  <div className="text-lg font-medium">
                    <span className="_text-title-pink">Phim bộ</span>
                  </div>
                  <div className="grid grid-cols-12 gap-4 h-auto">
                    {videosData.tv_list.map((video) => (
                      <VideoCard
                        key={video._id}
                        video={video}
                        imageType="poster"
                        className="col-span-6 sm:col-span-4 md:col-span-3 _bg-layout"
                      />
                    ))}
                  </div>
                </>
              )}
              {videosData.movie_list.length > 0 && (
                <>
                  <div className="text-lg font-medium">
                    <span className="_text-title-pink">Phim lẻ</span>
                  </div>
                  <div className="grid grid-cols-12 gap-4 h-auto">
                    {videosData.movie_list.map((video) => (
                      <VideoCard
                        key={video._id}
                        video={video}
                        imageType="poster"
                        className="col-span-6 sm:col-span-4 md:col-span-3 _bg-layout"
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <Skeleton className="h-6" />
              <div className="grid grid-cols-12 gap-4 h-auto mt-1">
                {Array.from({ length: 4 }).map((_, index) => (
                  <VideoCardSkeleton
                    key={index}
                    imageType="poster"
                    className="col-span-6 sm:col-span-4 md:col-span-3"
                  />
                ))}
              </div>
              <Skeleton className="h-6" />
              <div className="grid grid-cols-12 gap-4 h-auto mt-1">
                {Array.from({ length: 4 }).map((_, index) => (
                  <VideoCardSkeleton
                    key={index}
                    imageType="poster"
                    className="col-span-6 sm:col-span-4 md:col-span-3"
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

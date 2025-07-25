"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import useSearchVideos from "@/features/videos/hooks/useSearchVideos";
import { Loader2, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import FallbackImage from "@/components/fallback-image";

export default function SearchForm() {
  const router = useRouter();

  const pathname = usePathname();

  const [keyword, setKeyword] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [input] = useDebounce(keyword, 400);

  const divRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data, isLoading } = useSearchVideos({
    keyword: input,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword("");
    inputRef.current?.blur();
    router.push(`/tim-kiem?keyword=${keyword}`);
  };

  useEffect(() => {
    setVisible(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={divRef} className="flex-1 relative">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-800 ring-1 ring-neutral-700 text-neutral-200  px-3 py-1.5 rounded-sm w-full flex items-center gap-3"
      >
        <input
          ref={inputRef}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => {
            setVisible(true);
          }}
          placeholder="Nhập tên phim..."
          className="outline-none bg-transparent w-full"
        />
        <button type="submit">
          <Search className="size-4 text-neutral-400" />
        </button>
      </form>
      {visible && input !== "" && (
        <div className="absolute top-full right-0 left-0 bg-neutral-950 border border-neutral-600 z-10 rounded-md">
          {!isLoading && data ? (
            <>
              <ScrollArea className="">
                <div className="space-y-4 max-h-64 p-4">
                  {data.items.map((video) => (
                    <Link
                      key={video.slug}
                      href={`/phim/${video.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setVisible(false);
                        window.location.href = `/phim/${video.slug}`;
                      }}
                      className="grid grid-cols-4 gap-4 hover:text-yellow-600"
                    >
                      <div className="col-span-1">
                        <FallbackImage
                          aspectRatio={16 / 9}
                          src={video.thumbnail}
                          alt={video.slug}
                        />
                      </div>
                      <div className="col-span-3">
                        <div className="">{video.name}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </ScrollArea>
              <Separator />
              <Link
                href={`/tim-kiem?keyword=${keyword}`}
                className="block text-center p-4 hover:text-yellow-600"
              >
                Xem tất cả
              </Link>
            </>
          ) : (
            <div className="flex items-center p-4 gap-4">
              <Loader2 className="size-5 animate-spin" />
              <div className="">Đang tìm kiếm</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { typeList } from "@/data/video";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-200">
      <div className="px-4">
        <div className="flex md:justify-between md:items-center items-start flex-1 md:flex-row flex-col gap-4 py-4">
          <div className="w-full md:w-auto">
            <h1 className="text-2xl font-bold">Hellotv</h1>
            <p className="mt-2">© 2025 Hellotv. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            {typeList.map((item) => (
              <Link
                key={item.slug}
                href={`/danh-sach-phim?typelist=${item.slug}`}
                className="justify-start hover:underline hover:underline-offset-2"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

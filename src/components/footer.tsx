"use client";

import { typeList } from "@/features/typelist/data";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground">
      <div className="max-w-5xl mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold">Hellotv</h1>
        <p className="">
          Hellotv - Trang xem phim online chất lượng cao miễn phí Vietsub,
          thuyết minh, lồng tiếng full HD. Kho phim mới khổng lồ, phim chiếu
          rạp, phim bộ, phim lẻ từ nhiều quốc gia như Việt Nam, Hàn Quốc, Trung
          Quốc, Thái Lan, Nhật Bản, Âu Mỹ… đa dạng thể loại. Khám phá nền tảng
          phim trực tuyến hay nhất {new Date().getFullYear()} chất lượng 4K!
        </p>
        <div className="flex gap-4">
          {typeList.map((item) => (
            <Link
              key={item.slug}
              href={`/danh-sach-phim?typelist=${item.slug}`}
              className="justify-start hover:text-primary hover:underline hover:underline-offset-2"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <p className="">© 2025 Hellotv. All rights reserved.</p>
      </div>
    </footer>
  );
}

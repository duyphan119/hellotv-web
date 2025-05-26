"use client";

import { typeList } from "@/data/video";
import CategoriesNavigationMenu from "@/features/categories/components/categories-navigation-menu";
import CountriesNavigationMenu from "@/features/countries/components/countries-navigation-menu";
import SearchForm from "@/features/videos/components/search-form";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-neutral-950 px-4 flex items-center h-16 gap-4">
      <div className="text-xl">
        <Link href="/">Hellotv</Link>
      </div>
      <div className="flex items-center">
        {typeList.map((item) => (
          <Link
            key={item.name}
            href={`/danh-sach-phim?typelist=${item.slug}`}
            className="text-sm font-medium px-4 py-2 hover:text-yellow-600"
          >
            {item.name}
          </Link>
        ))}
        <CategoriesNavigationMenu />
        <CountriesNavigationMenu />
      </div>
      <SearchForm />
    </header>
  );
}

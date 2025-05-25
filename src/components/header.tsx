"use client";

import CategoriesNavigationMenu from "@/features/categories/components/categories-navigation-menu";
import CountriesNavigationMenu from "@/features/countries/components/countries-navigation-menu";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-neutral-950 px-4 flex items-center h-16 gap-4">
      <div className="text-xl">
        <Link href="/">Hellotv</Link>
      </div>
      <div className="flex items-center">
        <Link
          href="/"
          className="text-sm font-medium px-4 py-2 hover:text-yellow-600"
        >
          Phim bộ
        </Link>
        <Link
          href="/"
          className="text-sm font-medium px-4 py-2 hover:text-yellow-600"
        >
          Phim lẻ
        </Link>
        <CategoriesNavigationMenu />
        <CountriesNavigationMenu />
      </div>
    </header>
  );
}

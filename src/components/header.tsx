"use client";

import CategoriesNavigationMenu from "@/features/categories/components/categories-navigation-menu";
import useGetCategories from "@/features/categories/hooks/useGetCategories";
import CountriesNavigationMenu from "@/features/countries/components/countries-navigation-menu";
import useGetCountries from "@/features/countries/hooks/useGetCountries";
import TypeListNavigationMenu from "@/features/typelist/components/typelist-navigation-menu";
import { typeList } from "@/features/typelist/data";
import SearchForm from "@/features/videos/components/search-form";
import Link from "next/link";
import DrawerMenu from "./drawer-menu";

export default function Header() {
  const { data: categoriesData } = useGetCategories();
  const { data: countriesData } = useGetCountries();

  return (
    <header className="bg-neutral-950 px-4 flex items-center h-16 gap-4">
      <div className="block translate-y-1 lg:hidden">
        <DrawerMenu
          categories={categoriesData || []}
          countries={countriesData || []}
        />
      </div>
      <div className="text-xl">
        <Link href="/">Hellotv</Link>
      </div>
      <div className="hidden lg:flex items-center">
        {typeList.map((item) => (
          <TypeListNavigationMenu
            key={item.name}
            countries={countriesData || []}
            {...item}
          />
        ))}
        <CategoriesNavigationMenu categories={categoriesData || []} />
        <CountriesNavigationMenu countries={countriesData || []} />
      </div>
      <SearchForm />
    </header>
  );
}

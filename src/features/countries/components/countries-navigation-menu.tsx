"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Country } from "@/data/country";
import Link from "next/link";

type CountriesNavigationMenuProps = {
  countries: Country[];
};

export default function CountriesNavigationMenu({
  countries,
}: CountriesNavigationMenuProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Quốc gia</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-4 lg:w-[600px] sm:w-[300px] w-screen bg-neutral-900">
              {countries.map((country) => (
                <Link
                  key={country.name}
                  href={`/danh-sach-phim?country=${country.slug}`}
                  className="p-2 col-span-4 sm:col-span-2 lg:col-span-1 text-neutral-200 hover:text-yellow-600"
                >
                  {country.name}
                </Link>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

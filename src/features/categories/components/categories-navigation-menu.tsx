"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Category } from "@/data/category";
import Link from "next/link";

type CategoriesNavigationMenuProps = {
  categories: Category[];
};

export default function CategoriesNavigationMenu({
  categories,
}: CategoriesNavigationMenuProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Thể loại</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-4 lg:w-[600px] sm:w-[300px] w-screen bg-neutral-900">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/danh-sach-phim?category=${category.slug}`}
                  className="p-2 col-span-4 sm:col-span-2 lg:col-span-1 text-neutral-200 hover:text-yellow-600"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

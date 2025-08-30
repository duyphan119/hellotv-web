"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { typeList } from "@/features/typelist/data";

export default function TypeListNavigationMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Kiểu phim</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid max-h-[70vh] grid-cols-3 lg:w-[600px] sm:w-[300px] w-screen bg-neutral-900">
              {typeList.map(({ name, slug }) => (
                <Link
                  key={name}
                  href={`/danh-sach/${slug}`}
                  className="p-2 col-span-1  _hover-underline hover:_text-primary"
                >
                  {name}
                </Link>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

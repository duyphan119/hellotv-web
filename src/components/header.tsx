"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { typeList } from "@/data/video";
import CategoriesNavigationMenu from "@/features/categories/components/categories-navigation-menu";
import useGetCategories from "@/features/categories/hooks/useGetCategories";
import CountriesNavigationMenu from "@/features/countries/components/countries-navigation-menu";
import useGetCountries from "@/features/countries/hooks/useGetCountries";
import SearchForm from "@/features/videos/components/search-form";
import { Menu } from "lucide-react";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

export default function Header() {
  const { data: categoriesData } = useGetCategories();
  const { data: countriesData } = useGetCountries();

  const [visible, setVisible] = useState<boolean>(false);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    setVisible(false);

    window.location.href = e.currentTarget.getAttribute("href") + "";
  };

  return (
    <header className="bg-neutral-950 px-4 flex items-center h-16 gap-4">
      <div className="block translate-y-1 lg:hidden">
        <Drawer direction="left" open={visible} onOpenChange={setVisible}>
          <DrawerTrigger>
            <Menu />
          </DrawerTrigger>
          <DrawerContent className="md:w-1/2 w-3/4 sm:w-2/3">
            <DrawerTitle className="sr-only">Menu</DrawerTitle>
            <ScrollArea className="py-2 h-full">
              <div className="space-y-4">
                {typeList.map((item) => (
                  <Link
                    key={item.name}
                    href={`/danh-sach-phim?typelist=${item.slug}`}
                    onClick={handleClick}
                    className="block text-sm font-medium px-4 py-2 hover:text-yellow-600"
                  >
                    {item.name}
                  </Link>
                ))}
                <Accordion type="single" collapsible>
                  <AccordionItem value="country">
                    <AccordionTrigger>Quốc gia</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 sm:grid-cols-3 bg-neutral-900">
                        {countriesData?.map((country) => (
                          <Link
                            key={country.name}
                            href={`/danh-sach-phim?country=${country.slug}`}
                            onClick={handleClick}
                            className="col-span-1 text-sm font-medium px-4 py-2 hover:text-yellow-600"
                          >
                            {country.name}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible>
                  <AccordionItem value="category">
                    <AccordionTrigger>Thể loại</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 sm:grid-cols-3 bg-neutral-900">
                        {categoriesData?.map((category) => (
                          <Link
                            key={category.name}
                            href={`/danh-sach-phim?category=${category.slug}`}
                            onClick={handleClick}
                            className="col-span-1 text-sm font-medium px-4 py-2 hover:text-yellow-600"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </ScrollArea>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="text-xl">
        <Link href="/">Hellotv</Link>
      </div>
      <div className="hidden lg:flex items-center">
        {typeList.map((item) => (
          <Link
            key={item.name}
            href={`/danh-sach-phim?typelist=${item.slug}`}
            className="text-sm font-medium px-4 py-2 hover:text-yellow-600"
          >
            {item.name}
          </Link>
        ))}
        <CategoriesNavigationMenu categories={categoriesData || []} />
        <CountriesNavigationMenu countries={countriesData || []} />
      </div>
      <SearchForm />
    </header>
  );
}

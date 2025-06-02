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
import { Category } from "@/features/categories/data";
import { Country } from "@/features/countries/data";
import { typeList } from "@/features/typelist/data";
import { Menu } from "lucide-react";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

type DrawerMenuProps = {
  countries: Country[];
  categories: Category[];
};

export default function DrawerMenu({ categories, countries }: DrawerMenuProps) {
  const [visible, setVisible] = useState<boolean>(false);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    setVisible(false);

    window.location.href = e.currentTarget.getAttribute("href") + "";
  };
  return (
    <Drawer direction="left" open={visible} onOpenChange={setVisible}>
      <DrawerTrigger>
        <Menu />
      </DrawerTrigger>
      <DrawerContent className="md:w-1/2 w-3/4 sm:w-2/3">
        <DrawerTitle className="sr-only">Menu</DrawerTitle>
        <ScrollArea className="py-2 h-full">
          <div className="space-y-4">
            {typeList.map((item) => (
              <Accordion type="single" collapsible key={item.name}>
                <AccordionItem value={item.slug}>
                  <AccordionTrigger>{item.name}</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 bg-neutral-900">
                      {countries.map((country) => (
                        <Link
                          key={country.name}
                          href={`/danh-sach-phim?typelist=${item.slug}&country=${country.slug}`}
                          onClick={handleClick}
                          className="col-span-1 text-sm font-medium px-4 py-2 hover:text-yellow-600"
                        >
                          {item.name} {country.name}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
            <Accordion type="single" collapsible>
              <AccordionItem value="country">
                <AccordionTrigger>Quốc gia</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 bg-neutral-900">
                    {countries.map((country) => (
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
                  <div className="grid grid-cols-2 bg-neutral-900">
                    {categories.map((category) => (
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
  );
}

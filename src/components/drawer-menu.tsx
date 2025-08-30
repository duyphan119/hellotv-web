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
import { typeList } from "@/features/typelist/data";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { useCommonData } from "./providers/common-data-provider";

export default function DrawerMenu() {
  const { categories, countries, years } = useCommonData();
  const [visible, setVisible] = useState(false);

  const handleClick = () => setVisible(false);

  const sections = [
    {
      title: "Kiểu phim",
      key: "typelist",
      items: typeList,
      href: (s: string) => `/danh-sach/${s}`,
    },
    {
      title: "Quốc gia",
      key: "country",
      items: countries,
      href: (s: string) => `/quoc-gia/${s}`,
    },
    {
      title: "Thể loại",
      key: "category",
      items: categories,
      href: (s: string) => `/the-loai/${s}`,
    },
    {
      title: "Năm",
      key: "year",
      items: years,
      href: (s: string) => `/nam/${s}`,
    },
  ];

  const renderAccordion = (
    title: string,
    key: string,
    items: { slug: string; name: string }[] | number[],
    hrefFn: (slug: string) => string
  ) => {
    const normalized = items.map((item) =>
      typeof item === "number"
        ? { slug: String(item), name: String(item) }
        : item
    );

    return (
      <Accordion type="single" collapsible key={key}>
        <AccordionItem value={key}>
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 bg-neutral-900">
              {normalized.map(({ slug, name }) => (
                <Link
                  key={slug}
                  href={hrefFn(slug)}
                  onClick={handleClick}
                  className="col-span-1 text-sm font-medium px-4 py-2 hover:_text-primary"
                >
                  {name}
                </Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
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
            {sections.map((s) =>
              renderAccordion(s.title, s.key, s.items, s.href)
            )}
            <Link href="/da-xem" className="block px-4 py-2">
              Đã xem
            </Link>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

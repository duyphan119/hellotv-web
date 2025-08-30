"use client";

import { useCommonData } from "@/components/providers/common-data-provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { typeList } from "@/features/typelist/data";
import { ArrowRight, FilterIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { useEffect, useState } from "react";

type Props = {
  slug: string;
  searchParams: TVideosFilter;
  mutilpleKeys?: string[];
  excludedKey: string;
};

export default function VideosYearFilter({
  slug,
  searchParams,
  mutilpleKeys = [],
  excludedKey,
}: Props) {
  const router = useRouter();

  const { categories, countries, years } = useCommonData();

  const [query, setQuery] = useState<TVideosFilter>(searchParams);

  const handleClick = (key: string, value: string) => {
    setQuery({
      ...query,
      [key]: value,
    });
  };

  const handleFilter = () => {
    const search = queryString.stringify({
      ...query,
      [excludedKey]: undefined,
    });
    if (query.typelist) {
      router.push(`/danh-sach/${query.typelist}?${search}`);
    } else {
      if (excludedKey === "country") {
        router.push(`/country/${query.typelist}?${search}`);
      } else if (excludedKey === "category") {
        router.push(`/the-loai/${query.typelist}?${search}`);
      } else if (excludedKey === "year") {
        router.push(`/nam/${query.typelist}?${search}`);
      }
    }
  };

  useEffect(() => {
    setQuery({ ...searchParams, [excludedKey]: slug });
  }, [searchParams, excludedKey, slug]);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="filter">
        <AccordionTrigger hideIcon className="_bg-layout">
          <FilterIcon className="size-3 mr-1" /> Bộ lọc
        </AccordionTrigger>
        <AccordionContent noPadding className="_bg-layout p-2 space-y-2">
          {excludedKey !== "typelist" && (
            <>
              <div className="flex flex-wrap justify-center gap-2">
                {typeList.map((item, i) => (
                  <Button
                    key={i}
                    size="sm"
                    variant={
                      query.typelist === item.slug
                        ? "outlinePrimary"
                        : "outline"
                    }
                    onClick={() => handleClick("typelist", item.slug)}
                  >
                    {item.name}
                  </Button>
                ))}
              </div>
              <Separator />
            </>
          )}
          <div className="flex flex-wrap justify-center gap-2">
            {countries.map((country, i) => (
              <Button
                key={i}
                size="sm"
                variant={
                  query.country && query.country.indexOf(country.slug) !== -1
                    ? "outlinePrimary"
                    : "outline"
                }
                onClick={() =>
                  handleClick(
                    "country",
                    mutilpleKeys.includes("country") && query.country
                      ? `${query.country},${country.slug}`
                      : country.slug
                  )
                }
              >
                {country.name}
              </Button>
            ))}
          </div>
          <Separator />
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category, i) => (
              <Button
                key={i}
                size="sm"
                variant={
                  query.category && query.category.indexOf(category.slug) !== -1
                    ? "outlinePrimary"
                    : "outline"
                }
                onClick={() =>
                  handleClick(
                    "category",
                    mutilpleKeys.includes("category") && query.category
                      ? `${query.category},${category.slug}`
                      : category.slug
                  )
                }
              >
                {category.name}
              </Button>
            ))}
          </div>
          <Separator />
          <div className="flex flex-wrap justify-center gap-2">
            {years.map((year, i) => {
              const value = year + "";
              return (
                <Button
                  key={i}
                  size="sm"
                  variant={query.year === value ? "outlinePrimary" : "outline"}
                  onClick={() => handleClick("year", value)}
                >
                  {year}
                </Button>
              );
            })}
          </div>
          <Separator />
          <div className="flex justify-center gap-2">
            <Button onClick={handleFilter}>
              Lọc kết quả <ArrowRight />
            </Button>
            <AccordionTrigger
              hideIcon
              onClick={() => setQuery(searchParams)}
              className={buttonVariants({ variant: "close" })}
            >
              <XIcon />
              Đóng
            </AccordionTrigger>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

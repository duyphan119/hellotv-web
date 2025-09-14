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
import { useRouter, usePathname } from "next/navigation";
import queryString from "query-string";
import { useEffect, useState } from "react";
type Props = {
  slug: string;
  searchParams: TVideosFilter;
  mutilpleKeys?: (keyof TVideosFilter)[];
  excludedKey: keyof TVideosFilter;
  isSearch?: boolean;
};

export default function VideosFilter({
  slug,
  searchParams,
  mutilpleKeys = [],
  excludedKey,
  isSearch = false,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { categories, countries, years } = useCommonData();
  const [query, setQuery] = useState<TVideosFilter>(searchParams);

  const handleClick = (
    key: keyof TVideosFilter,
    value: string,
    multiple = false
  ) => {
    const current = (query[key] as string) || "";
    let newValue: string | undefined;

    if (multiple) {
      const items = current.split(",").filter(Boolean);
      newValue = items.includes(value)
        ? items.filter((v) => v !== value).join(",") || undefined
        : [...items, value].join(",");
    } else {
      newValue = current === value ? undefined : value;
    }
    setQuery({ ...query, [key]: newValue });
  };

  const handleFilter = () => {
    const { typelist, category, country, year, ...others } = query;
    const params = { ...others, category, country, year };

    if (isSearch) {
      router.push(
        `/tim-kiem?${queryString.stringify({
          ...params,
          keyword: slug,
        })}`
      );
      return;
    }

    if (typelist) {
      router.push(`/danh-sach/${typelist}?${queryString.stringify(params)}`);
      return;
    }

    const catArr = category?.split(",") || [];
    const couArr = country?.split(",") || [];

    if (catArr.length === 1 && couArr.length !== 1) {
      router.push(
        `/the-loai/${catArr[0]}?${queryString.stringify({
          ...params,
          category: undefined,
          page: undefined,
        })}`
      );
    } else if (couArr.length === 1 && catArr.length !== 1) {
      router.push(
        `/quoc-gia/${couArr[0]}?${queryString.stringify({
          ...params,
          country: undefined,
          page: undefined
        })}`
      );
    } else {
      if(year){
        router.push(`/nam/${year}?${queryString.stringify({
          ...params, 
          year: undefined, 
          page: undefined,
        })}`);
      } else {
        router.push(`${pathname}?${queryString.stringify({
          ...params, 
          year: undefined,
          page: undefined,
        })}`);
      }
    }
  };

  useEffect(() => {
    setQuery({ ...searchParams, [excludedKey]: slug });
  }, [searchParams, excludedKey, slug]);

  const renderButtons = (
    items: { slug: string; name: string }[] | number[],
    key: keyof TVideosFilter,
    multiple = false
  ) => {
    const normalized = items.map((item) =>
      typeof item === "number"
        ? { slug: String(item), name: String(item) }
        : item
    );

    return (
      <div className="flex flex-wrap justify-center gap-2">
        {normalized.map(({ slug, name }) => {
          const isActive = (query[key] ?? "")
            .toString()
            .split(",")
            .includes(slug);
          return (
            <Button
              key={slug}
              size="sm"
              variant={isActive ? "outlinePrimary" : "outline"}
              onClick={() => handleClick(key, slug, multiple)}
            >
              {name}
            </Button>
          );
        })}
      </div>
    );
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="filter">
        <AccordionTrigger hideIcon className="_bg-layout">
          <FilterIcon className="size-3 mr-1" /> Bộ lọc
        </AccordionTrigger>
        <AccordionContent noPadding className="_bg-layout p-2 space-y-2">
          {!isSearch && (
            <>
              {renderButtons(typeList, "typelist")}
              <Separator />
            </>
          )}
          {renderButtons(
            countries,
            "country",
            mutilpleKeys.includes("country")
          )}
          <Separator />
          {renderButtons(
            categories,
            "category",
            mutilpleKeys.includes("category")
          )}
          <Separator />
          {renderButtons(years, "year")}
          <Separator />
          <div className="flex justify-center gap-2">
            <AccordionTrigger
              hideIcon
              className={buttonVariants({})}
              onClick={handleFilter}
            >
              Lọc kết quả <ArrowRight />
            </AccordionTrigger>
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

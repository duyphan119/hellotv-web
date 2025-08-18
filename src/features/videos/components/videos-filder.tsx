"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { categories } from "@/features/categories/data";
import { countries } from "@/features/countries/data";
import { TypeList, typeList } from "@/features/typelist/data";
import { ArrowRightIcon, FilterIcon, SortDescIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { VideosParams } from "../data";
import queryString from "query-string";

type Query = {
  typelist?: TypeList;
  country?: string;
  category?: string;
  year?: number;
  sort_field?: string;
  sort_type?: string;
};

type VideosFilterProps = {
  searchParams: VideosParams;
};

export default function VideosFilter({ searchParams }: VideosFilterProps) {
  const router = useRouter();

  const currentYear = new Date().getFullYear();

  const [query, setQuery] = useState<Query>({});

  useEffect(() => {
    setQuery({
      ...(searchParams.category ? { category: searchParams.category } : {}),
      ...(searchParams.country ? { country: searchParams.country } : {}),
      ...(searchParams.typelist ? { typelist: searchParams.typelist } : {}),
      ...(searchParams.year ? { year: Number(searchParams.year) } : {}),
      ...(searchParams.sort_field
        ? { sort_field: searchParams.sort_field }
        : {}),
      ...(searchParams.sort_type ? { sort_type: searchParams.sort_type } : {}),
      ...(searchParams.sort_lang ? { sort_lang: searchParams.sort_lang } : {}),
    });
  }, [searchParams]);

  const handleFilter = () => {
    router.push(`/danh-sach-phim?${queryString.stringify(query)}`);
  };

  const handleClick = (key: keyof Query, value: TypeList | number | string) => {
    if (query[key] === value) {
      setQuery({
        ...query,
        [key]: undefined,
      });
    } else {
      setQuery({
        ...query,
        [key]: value,
      });
    }
  };

  return (
    <Accordion type="multiple" className="space-y-4">
      <AccordionItem value="filter">
        <AccordionTrigger
          hideIcon={true}
          className="bg-secondary hover:bg-secondary/70 rounded-md"
        >
          <FilterIcon className="size-4 mr-2" /> Bộ lọc
        </AccordionTrigger>
        <AccordionContent
          noPadding={true}
          className="bg-background p-4 rounded-md space-y-2"
        >
          <div className="flex items-start">
            <p className="flex-shrink-0 pt-1 w-20">Kiểu phim:</p>
            <div className="flex flex-wrap items-center gap-2">
              {typeList.map(({ name, slug }) => {
                const isActive = query.typelist === slug;
                return (
                  <Button
                    key={slug}
                    size="sm"
                    variant={isActive ? "outlinePrimary" : "outline"}
                    onClick={() => {
                      handleClick("typelist", slug);
                    }}
                  >
                    {name}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="flex items-start">
            <p className="flex-shrink-0 pt-1 w-20">Quốc gia:</p>

            <div className="flex flex-wrap items-center gap-2">
              {countries.map(({ name, slug }) => {
                const isActive = query.country === slug;
                return (
                  <Button
                    key={slug}
                    size="sm"
                    variant={isActive ? "outlinePrimary" : "outline"}
                    onClick={() => {
                      handleClick("country", slug);
                    }}
                  >
                    {name}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="flex items-start">
            <p className="flex-shrink-0 pt-1 w-20">Thể loại:</p>

            <div className="flex flex-wrap items-center gap-2">
              {categories.map(({ name, slug }) => {
                const isActive = query.category === slug;
                return (
                  <Button
                    key={slug}
                    size="sm"
                    variant={isActive ? "outlinePrimary" : "outline"}
                    onClick={() => {
                      handleClick("category", slug);
                    }}
                  >
                    {name}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="flex items-start">
            <p className="flex-shrink-0 pt-1 w-20">Năm:</p>

            <div className="flex flex-wrap items-center gap-2">
              {new Array(currentYear - 1969).fill("").map((_, index) => {
                const value = currentYear - index;
                const isActive = query.year === value;
                return (
                  <Button
                    key={index}
                    size="sm"
                    variant={isActive ? "outlinePrimary" : "outline"}
                    onClick={() => {
                      handleClick("year", value);
                    }}
                  >
                    {value}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <AccordionTrigger
              onClick={handleFilter}
              hideIcon={true}
              className={buttonVariants({ size: "sm" })}
            >
              Lọc kết quả <ArrowRightIcon className="size-3" />
            </AccordionTrigger>
            <AccordionTrigger
              hideIcon={true}
              className={buttonVariants({ size: "sm", variant: "destructive" })}
            >
              <XIcon className="size-3" />
              Đóng
            </AccordionTrigger>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="sort">
        <AccordionTrigger
          hideIcon={true}
          className="bg-secondary hover:bg-secondary/70 rounded-md"
        >
          <SortDescIcon className="size-4 mr-2" /> Sắp xếp
        </AccordionTrigger>
        <AccordionContent
          noPadding={true}
          className="bg-background p-4 rounded-md space-y-2"
        >
          <div className="flex items-start">
            <p className="flex-shrink-0 pt-1 w-20">Xếp theo:</p>
            <div className="flex flex-wrap items-center gap-2">
              {[
                {
                  name: "Thời gian cập nhật",
                  value: "modified.time",
                },
                {
                  name: "Năm phát hành",
                  value: "year",
                },
              ].map(({ name, value }) => {
                const isActive = query.sort_field === value;
                return (
                  <Button
                    key={value}
                    size="sm"
                    variant={isActive ? "outlinePrimary" : "outline"}
                    onClick={() => {
                      handleClick("sort_field", value);
                    }}
                  >
                    {name}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="flex items-start">
            <p className="flex-shrink-0 pt-1 w-20">Cách xếp:</p>
            <div className="flex flex-wrap items-center gap-2">
              {[
                {
                  name: "Giảm dần",
                  value: "desc",
                },
                {
                  name: "Tăng dần",
                  value: "asc",
                },
              ].map(({ name, value }) => {
                const isActive = query.sort_type === value;
                return (
                  <Button
                    key={value}
                    size="sm"
                    variant={isActive ? "outlinePrimary" : "outline"}
                    onClick={() => {
                      handleClick("sort_type", value);
                    }}
                  >
                    {name}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AccordionTrigger
              onClick={handleFilter}
              hideIcon={true}
              className={buttonVariants({ size: "sm" })}
            >
              Sắp xếp kết quả <ArrowRightIcon className="size-3" />
            </AccordionTrigger>
            <AccordionTrigger
              hideIcon={true}
              className={buttonVariants({ size: "sm", variant: "destructive" })}
            >
              <XIcon className="size-3" />
              Đóng
            </AccordionTrigger>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

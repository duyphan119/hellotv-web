"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Pagination as PaginationResponse, VideosParams } from "@/data/video";
import { usePathname } from "next/navigation";
import qs from "query-string";

type VideosPaginationProps = {
  pagination: PaginationResponse;
  className?: string;
  searchParams?: VideosParams;
};

export default function VideosPagination({
  pagination,
  className = "mt-4",
  searchParams,
}: VideosPaginationProps) {
  const pathname = usePathname();
  const getHref = (page: number) => {
    return `${pathname}?${qs.stringify({
      ...searchParams,
      page: page,
    })}`;
  };

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={pagination.currentPage === 1}
            href={getHref(pagination.currentPage - 1)}
          />
        </PaginationItem>
        {Array(pagination.currentPage > 2 ? 5 : 7)
          .fill(pagination.currentPage - 2)
          .map((value, index) => {
            const page = value + index;
            const disabled = page === pagination.currentPage;
            if (page < 1 || page > pagination.totalPages) return null;
            return (
              <PaginationItem key={index}>
                <PaginationLink disabled={disabled} href={getHref(page)}>
                  {value + index}
                </PaginationLink>
              </PaginationItem>
            );
          })}
        <PaginationItem>
          <PaginationNext
            disabled={pagination.currentPage === pagination.totalPages}
            href={getHref(pagination.currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

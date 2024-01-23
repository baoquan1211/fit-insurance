import { PageableResponse } from "@/services";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Signal } from "@preact/signals-react";

type PaginationTableProps = {
  data: PageableResponse<unknown>;
  pageIndex: Signal<number>;
};

function PaginationTable({ data, pageIndex }: PaginationTableProps) {
  const listPage: number[] = [];
  for (let i = 0; i < data.total; i++) {
    listPage.push(i);
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer"
            onClick={() => {
              if (pageIndex.value === 0) return;
              pageIndex.value = pageIndex.value - 1;
            }}
          />
        </PaginationItem>
        {listPage.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === pageIndex.value}
              onClick={() => (pageIndex.value = page)}
              className="cursor-pointer"
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {listPage.length > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            className="cursor-pointer"
            onClick={() => {
              if (pageIndex.value === listPage.length - 1) return;
              pageIndex.value = pageIndex.value + 1;
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationTable;

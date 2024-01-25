import { PageableResponse } from "@/services";
import {
  Pagination,
  PaginationContent,
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
  const MAX_LENGH = 5;
  const listPage: number[] = [];
  const startPage = Math.max(0, pageIndex.value - 2);
  const endPage = Math.min(data.total, pageIndex.value + 3);
  let left = 0;
  let right = 0;

  if (data.total > MAX_LENGH) {
    if (endPage - startPage < MAX_LENGH) {
      if (endPage < MAX_LENGH) {
        left = 0;
        right = MAX_LENGH;
      } else {
        left = data.total - MAX_LENGH;
        right = data.total;
      }
    } else {
      left = startPage;
      right = endPage;
    }
  } else {
    left = 0;
    right = data.total;
  }

  for (let i = left; i < right; i++) {
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

        <PaginationItem>
          <PaginationNext
            className="cursor-pointer"
            onClick={() => {
              if (pageIndex.value === data.total - 1) return;
              pageIndex.value = pageIndex.value + 1;
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationTable;

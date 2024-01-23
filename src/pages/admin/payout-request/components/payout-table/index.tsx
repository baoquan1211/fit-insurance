import { DataTable } from "@/components/ui/data-table";
import { columns } from "./column";
import useFetchAllPayoutRequest from "../../hooks/useFetchAllPayoutRequest";
import PaginationTable from "./pagination";
import { signal } from "@preact/signals-react";
import Spinner from "@/components/ui/spinner";

export const PAGE_SIZE = 8;
export const pageIndex = signal(0);

function PayoutTable() {
  const { data: requests, isLoading } = useFetchAllPayoutRequest(
    pageIndex.value,
    PAGE_SIZE,
  );

  return (
    <div className="container mx-auto h-full overflow-auto py-10">
      {isLoading && (
        <div className="flex size-full items-center justify-center">
          <Spinner size={64} />
        </div>
      )}
      {requests && <DataTable columns={columns} data={requests?.content} />}
      {requests && (
        <div className="mt-2">
          <PaginationTable data={requests} pageIndex={pageIndex} />
        </div>
      )}
    </div>
  );
}

export default PayoutTable;

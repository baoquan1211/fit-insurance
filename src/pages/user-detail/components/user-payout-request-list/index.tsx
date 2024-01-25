import { DataTable } from "@/components/ui/data-table";
import { useAppSelector } from "@/hooks/redux.hook";
import useFetchPayoutRequestByBuyer from "@/hooks/useFetchPayoutRequestByBuyer";
import { columns } from "./column";
import Spinner from "@/components/ui/spinner";

function UserPayoutRequestList() {
  const auth = useAppSelector((state) => state.auth);
  const { data: requests, isLoading } = useFetchPayoutRequestByBuyer(
    auth.email as string,
    "all",
  );

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Yêu cầu bồi thường</h1>
      </div>
      {isLoading && (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner size={64} />
        </div>
      )}
      {requests && (
        <div className="mt-2 w-full overflow-scroll">
          <DataTable columns={columns} data={requests} hasPagination />
        </div>
      )}
    </div>
  );
}

export default UserPayoutRequestList;

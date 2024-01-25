import { cn, numberToCurrency } from "@/lib/utils";
import { PayoutRequest } from "@/services/app/payout-request";
import { ColumnDef } from "@tanstack/react-table";
import format from "date-fns/format";
import { Eye } from "lucide-react";
import SortingColumnHeader from "@/components/ui/sorting-column";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PayoutRequestDetail from "./payout-request-detail";

const statusMap: Record<string, string> = {
  ACCEPTED: "Đã duyệt",
  PENDING: "Chờ duyệt",
  REJECTED: "Từ chối",
};

export const columns: ColumnDef<PayoutRequest>[] = [
  {
    accessorKey: "id",
    header: "Mã yêu cầu",
  },
  {
    accessorKey: "contractId",
    header: "Mã hợp đồng",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <SortingColumnHeader
          column={column}
          header="Ngày tạo"
          className="text-sm"
        />
      );
    },
    cell: ({ row }) => {
      const date = Date.parse(row.getValue("createdAt"));
      return (
        <div className="font-medium">{format(date, "dd/MM/yyyy hh:mm")}</div>
      );
    },
  },
  {
    accessorKey: "totalPay",
    header: "Tổng tiền",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPay"));
      const formatted = numberToCurrency(amount);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <SortingColumnHeader
          column={column}
          header="Trạng thái"
          className="text-sm"
        />
      );
    },
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      return (
        <div
          className={cn(
            "flex w-[86px] items-center justify-center text-pretty rounded-3xl px-3 py-1 text-xs font-semibold",
            `${
              status === "ACCEPTED"
                ? "bg-green-600 text-destructive-foreground"
                : status === "PENDING"
                  ? "bg-yellow-600 text-destructive-foreground"
                  : "bg-destructive/90 text-destructive-foreground"
            }`,
          )}
        >
          {statusMap[status]}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const request = row.original;

      return (
        <Dialog>
          <DialogTrigger>
            <Eye />
          </DialogTrigger>
          <DialogContent className="h- h-[70dvh] min-w-[70vw] overflow-auto bg-muted p-4">
            <PayoutRequestDetail
              request={request}
              contractId={request?.contractId}
            />
          </DialogContent>
        </Dialog>
      );
    },
  },
];

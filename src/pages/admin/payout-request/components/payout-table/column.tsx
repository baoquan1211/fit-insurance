import { cn } from "@/lib/utils";
import { PayoutRequest } from "@/services/app/payout-request";
import { ColumnDef } from "@tanstack/react-table";
import format from "date-fns/format";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SortingColumnHeader from "@/components/ui/sorting-column";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PayoutRequestDetail from "../payout-request-detail";

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
        <div className="font-medium">{format(date, "dd/MM/yyyy hh:m")}</div>
      );
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Tùy chỉnh</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Tùy chỉnh</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(request?.id.toString())
                }
              >
                Copy mã yêu cầu
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem>Xem thông tin yêu cầu</DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="h-[70dvh] w-full min-w-[70vw] overflow-auto bg-gray-100 p-4">
            <PayoutRequestDetail
              contractId={request?.contractId}
              request={request}
            />
          </DialogContent>
        </Dialog>
      );
    },
  },
];

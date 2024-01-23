import { numberToCurrency } from "@/lib/utils";
import { Benefit } from "@/services/app/insurance-benefit";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Benefit>[] = [
  {
    accessorKey: "name",
    header: "Loại",
  },
  {
    accessorKey: "unit",
    header: "Đơn vị",
  },
  {
    accessorKey: "amount",
    header: "Số tiền",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = numberToCurrency(amount);

      return <div className="text-left font-medium">{formatted}đ</div>;
    },
  },
];

import { Checkbox } from "@/components/ui/checkbox";
import { numberToCurrency } from "@/lib/utils";
import { Benefit } from "@/services/app/insurance-benefit";
import { ColumnDef } from "@tanstack/react-table";
import { selectedBenefits } from "../..";

export const columns: ColumnDef<Benefit>[] = [
  {
    id: "select",
    header: ({ table }) => {
      const listId: number[] = [];
      table.getGroupedSelectedRowModel().rows.map((benefit) => {
        if (listId.indexOf(benefit.original.id) == -1)
          listId.push(benefit.original.id);
      });
      selectedBenefits.value = listId;
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
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

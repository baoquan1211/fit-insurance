import { ArrowUpDown } from "lucide-react";
import { Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

type SortingColumnHeaderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<any, unknown>;
  header: string;
  className?: string;
};

function SortingColumnHeader({
  column,
  header,
  className,
}: SortingColumnHeaderProps) {
  return (
    <button
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className={cn(
        "flex items-center gap-[1px] p-2 hover:bg-muted",
        className,
      )}
    >
      {header}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </button>
  );
}

export default SortingColumnHeader;

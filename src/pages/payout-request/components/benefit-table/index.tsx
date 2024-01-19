import { DataTable } from "@/components/ui/data-table";
import useFetchBenefitByContract from "@/hooks/useFetchBenefitsByContract";
import { columns } from "./column";

type BenefitTableProps = {
  contractId: number;
};

function BenefitTable({ contractId }: BenefitTableProps) {
  const { data: benefits } = useFetchBenefitByContract(contractId);
  if (benefits)
    return (
      <>
        {/* <DataTable columns={columns} data={benefits} /> */}
        <div className="flex max-w-3xl flex-col gap-4 rounded-lg bg-background p-6">
          <h2 className="text-xl font-semibold">
            Thông tin quyền lợi được hưởng
          </h2>
          <div className="mt-2">
            <DataTable columns={columns} data={benefits} />
          </div>
        </div>
      </>
    );
}

export default BenefitTable;

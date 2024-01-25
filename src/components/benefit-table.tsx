import { DataTable } from "@/components/ui/data-table";
import { columns } from "../pages/admin/payout-request/components/payout-request-detail/benifit-column";
import { type Benefit } from "@/services/app/insurance-benefit";

type BenefitTableProps = {
  benefits: Benefit[];
};

function BenefitTable({ benefits }: BenefitTableProps) {
  return (
    <>
      <div className="flex w-full flex-col gap-4 rounded-lg bg-background p-6">
        <h2 className="text-xl font-semibold">Thông tin quyền lợi được chọn</h2>
        <div className="mt-2">
          <DataTable columns={columns} data={benefits} />
        </div>
      </div>
    </>
  );
}

export default BenefitTable;

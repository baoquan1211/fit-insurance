import { formatDate, numberToCurrency } from "@/lib/utils";
import { Contract } from "@/services/app/contract";
import { Insurance } from "@/services/app/insurance";

type ContractInformantionProps = {
  insurance: Insurance;
  contract: Contract;
};

function ContractInformantion({
  contract,
  insurance,
}: ContractInformantionProps) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-background p-6">
      <h2 className="text-xl font-semibold">Thông tin hợp đồng</h2>
      <div className="flex items-center gap-12 rounded-md border-[1px] border-gray-100 p-3">
        <span className="text-sm font-medium text-slate-500">
          Chương trình bảo hiểm
        </span>
        <div className="flex items-center gap-3">
          <img src={insurance?.logo} className="size-8" alt="insurance" />
          {insurance?.name}
        </div>
      </div>
      <div className="grid grid-cols-2 items-center md:flex md:gap-14">
        <div className="w-28 text-sm font-medium text-slate-500 md:w-40">
          Mã hợp đồng
        </div>
        <div className="break-words">{contract?.id}</div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 items-center md:flex md:gap-14">
          <div className="w-28 text-sm font-medium text-slate-500 md:w-40">
            Thời hạn bảo hiểm
          </div>
          <div className="break-words">
            {formatDate(contract?.startAt as string)} {" - "}
            {formatDate(contract?.endAt as string)}
          </div>
        </div>
        <div className="grid grid-cols-2 items-center md:flex md:gap-14">
          <div className="w-28 text-sm font-medium text-slate-500 md:w-40">
            Tổng hạn mức chi trả
          </div>
          <div className="break-words">
            {numberToCurrency(contract?.totalPayPerYear as number)}đ
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContractInformantion;

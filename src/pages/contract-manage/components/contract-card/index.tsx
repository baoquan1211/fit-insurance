import { Button } from "@/components/ui/button";
import useFetchInsuranceById from "@/hooks/useFetchInsuranceById";
import useFetchInsuranceTypeById from "@/hooks/useFetchInsuranceTypeById";
import { formatDate } from "@/lib/utils";
import { Contract } from "@/services/app/contract";
import React from "react";
import { Link } from "react-router-dom";
import { ContractStatus, handleStatusContract } from "@/pages/contract-detail";

function ContractCard({ contract }: { contract: Contract }) {
  const { data: insurance } = useFetchInsuranceById(
    Number(contract?.insurance.id),
  );
  const { data: insuranceType } = useFetchInsuranceTypeById(
    Number(insurance?.insuranceTypeId),
  );

  const contractStatus = handleStatusContract(contract);

  return (
    <div className="flex w-full flex-col divide-y rounded-lg bg-white p-6 lg:w-fit">
      <div className="flex items-center gap-2 pb-2">
        <img src={insurance?.logo} alt="insurance" className="size-10" />

        <div className="flex flex-col text-lg font-semibold">
          {insuranceType?.name}
          <span className="text-sm font-medium text-slate-500">
            {insurance?.name}
          </span>
        </div>
      </div>
      <Link to={`/hopdong/chi-tiet/${contract?.id}`}>
        <div className="flex flex-col gap-y-3 py-4">
          <div className="grid grid-cols-2">
            <div className="text-sm font-medium text-slate-500">
              Người được bảo hiểm
            </div>
            <div className="text-base font-medium">{contract?.name}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="text-sm font-medium text-slate-500">
              Mã hợp đồng
            </div>
            <div className="text-base font-medium">{contract?.id}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="text-sm font-medium text-slate-500">
              Thời hạn bảo hiểm
            </div>
            <div className="text-base font-medium">
              {formatDate(contract?.startAt as string)} {" - "}
              {formatDate(contract?.endAt as string)}
            </div>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between pt-2">
        {contractStatus === ContractStatus.EXPIRED_PAYMENT ? (
          <div className="text-sm font-medium text-destructive">
            Quá hạn thanh toán
          </div>
        ) : contractStatus === ContractStatus.EXPIRED ? (
          <div className="text-sm font-medium text-destructive">
            Hợp đồng hết hạn
          </div>
        ) : contractStatus === ContractStatus.WAIT_FOR_PAYMENT ||
          contractStatus === ContractStatus.INITIAL ? (
          <div className="text-sm font-medium text-primary">
            Chưa thanh toán
          </div>
        ) : contractStatus === ContractStatus.ACTIVE ? (
          <div className="text-sm font-medium text-green-600">
            Hiện hiệu lực
          </div>
        ) : null}

        {contractStatus === ContractStatus.EXPIRED_PAYMENT ||
        contractStatus === ContractStatus.EXPIRED ? (
          <Link to={`/baohiem/${insuranceType?.slug}`}>
            <Button className="w-[130px]">Mua lại</Button>
          </Link>
        ) : (
          <Link to={`/hopdong/chi-tiet/${contract?.id}`}>
            <Button className="w-[130px]">Chi tiết</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default React.memo(ContractCard);

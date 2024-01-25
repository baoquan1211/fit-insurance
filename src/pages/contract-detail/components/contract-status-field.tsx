import { cn } from "@/lib/utils";
import { Contract } from "@/services/app/contract";
import React from "react";
import { ContractStatus, handleStatusContract } from "..";

type ContractStatusProps = {
  contract: Contract;
  status: ContractStatus;
};

function ContractStatusField({ contract, status }: ContractStatusProps) {
  const ContractStatusFieldInfo = {
    [ContractStatus.INITIAL]: {
      style: "border-primary bg-primary/5 text-primary",
      label: "Hợp đồng đang được khởi tạo",
    },
    [ContractStatus.WAIT_FOR_PAYMENT]: {
      style: "border-primary bg-primary/5 text-primary",
      label: "Chờ thanh toán",
    },
    [ContractStatus.EXPIRED_PAYMENT]: {
      style: "border-destructive bg-primary/5 text-destructive",
      label: "Quá hạn thanh toán",
    },
    [ContractStatus.ACTIVE]: {
      style: "border-green-600 bg-green-50 text-green-600",
      label: "Hiện đang hiệu lực",
    },
    [ContractStatus.EXPIRED]: {
      style: "border-destructive bg-primary/5 text-destructive",
      label: "Hết hạn hợp đồng",
    },
  };

  return (
    <div
      className={cn(
        "w-fit rounded-sm border-[1px] p-[6px] text-sm font-medium",
        `${ContractStatusFieldInfo[
          handleStatusContract(contract) as ContractStatus
        ]?.style}`,
      )}
    >
      {ContractStatusFieldInfo[status]?.label}
    </div>
  );
}

export default React.memo(ContractStatusField);

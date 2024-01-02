import { cn } from "@/lib/utils";
import { Contract } from "@/services/app/contract";
import React from "react";

type ContractStatusProps = {
  contract: Contract;
};

export enum ContractStatus {
  WAIT_FOR_PAYMENT,
  EXPIRED_PAYMENT,
  ACTIVE,
  EXPIRED,
}

const ContractStatusFieldInfo = {
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

function ContractStatusField({ contract }: ContractStatusProps) {
  function handleStatusContract(contract: Contract) {
    if (contract?.status === "UNPAID") {
      if (+new Date() >= +new Date(contract?.startAt)) {
        return ContractStatus.EXPIRED_PAYMENT;
      } else return ContractStatus.WAIT_FOR_PAYMENT;
    }
    if (contract?.status === "ACTIVE") return ContractStatus.ACTIVE;
    if (contract?.status === "EXPIRED") return ContractStatus.EXPIRED;
  }
  return (
    <div
      className={cn(
        "w-fit rounded-sm border-[1px] p-[6px] text-sm font-medium",
        `${ContractStatusFieldInfo[
          handleStatusContract(contract) as ContractStatus
        ]?.style}`,
      )}
    >
      {
        ContractStatusFieldInfo[
          handleStatusContract(contract) as ContractStatus
        ]?.label
      }
    </div>
  );
}

export default React.memo(ContractStatusField);

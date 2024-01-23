import React from "react";
import { formatDate, numberToCurrency } from "@/lib/utils";
import useFetchContractById from "@/hooks/useFetchContractById";
import { useParams } from "react-router-dom";
import useFetchInsuranceTypeById from "@/hooks/useFetchInsuranceTypeById";
import useFetchInsuranceById from "@/hooks/useFetchInsuranceById";
import { Contract } from "@/services/app/contract";
import InsuredPersonInfo from "./components/insured-person-info";
import LoadingPage from "@/components/loading-page";

const ContractStatusField = React.lazy(
  () => import("./components/contract-status-field"),
);
const PaymentContractBox = React.lazy(
  () => import("./components/payment-contract-box"),
);
const ActiveContractBox = React.lazy(
  () => import("./components/active-contract-box"),
);
const ExpiredContractBox = React.lazy(
  () => import("./components/expired-contract-box"),
);

export enum ContractStatus {
  INITIAL,
  WAIT_FOR_PAYMENT,
  EXPIRED_PAYMENT,
  ACTIVE,
  EXPIRED,
}

export function handleStatusContract(contract: Contract) {
  if (contract?.status === "UNPAID") {
    if (+new Date() >= +new Date(contract?.startAt)) {
      return ContractStatus.EXPIRED_PAYMENT;
    } else return ContractStatus.WAIT_FOR_PAYMENT;
  }
  if (contract?.status === "INITIAL") return ContractStatus.INITIAL;
  if (contract?.status === "ACTIVE") return ContractStatus.ACTIVE;
  return ContractStatus.EXPIRED;
}

function ContractDetailPage() {
  const { id } = useParams();
  const { data: contract, isLoading: contractLoading } = useFetchContractById(
    Number(id),
  );
  const { data: insurance, isLoading: insuranceLoading } =
    useFetchInsuranceById(Number(contract?.insurance.id));
  const { data: insuranceType, isLoading: insuranceTypeLoading } =
    useFetchInsuranceTypeById(Number(insurance?.insuranceTypeId));

  const contractStatus = handleStatusContract(contract!);
  const isLoading = contractLoading || insuranceLoading || insuranceTypeLoading;

  if (contract) {
    return (
      <main className="relative flex min-h-[calc(100dvh-72px)] w-full flex-col items-center bg-gray-100 px-3 py-6 md:py-16">
        {isLoading && <LoadingPage />}
        <section className="w-full md:w-auto">
          <h1 className="mb-4 w-fit self-start text-2xl font-semibold">
            Thông tin hợp đồng
          </h1>
          <div className="flex w-full flex-col gap-1 md:gap-6 lg:flex-row">
            <div className="flex w-fit max-w-3xl flex-col gap-6">
              <div className="flex max-w-3xl flex-col gap-4 rounded-lg bg-background p-6">
                <h2 className="text-xl font-semibold">Sản phẩm bảo hiểm</h2>
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-2 items-center md:flex md:gap-14">
                    <div className="w-28 text-sm font-medium text-slate-500 md:w-40">
                      Mã hợp đồng
                    </div>
                    <div>{contract?.id}</div>
                  </div>
                  <div className="grid grid-cols-2 items-center md:flex md:gap-14">
                    <div className="w-28 text-sm font-medium text-slate-500 md:w-40">
                      {insuranceType?.name}
                    </div>
                    <div>Bảo hiểm sức khỏe</div>
                  </div>
                  {contract?.status !== "INITIAL" ? (
                    <div className="grid grid-cols-2 items-center md:flex md:gap-14">
                      <div className="w-28 text-sm font-medium text-slate-500 md:w-40">
                        Trạng thái
                      </div>
                      <ContractStatusField
                        contract={contract}
                        status={contractStatus!}
                      />
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex max-w-3xl flex-col gap-4 rounded-lg bg-background p-6">
                <h2 className="text-xl font-semibold">
                  Thông tin chương trình bảo hiểm
                </h2>
                <div className="flex items-center gap-12 rounded-md border-[1px] border-gray-100 p-3">
                  <span className="text-sm font-medium text-slate-500">
                    Chương trình bảo hiểm
                  </span>
                  <div className="flex items-center gap-3">
                    <img
                      src={insurance?.logo}
                      className="size-8"
                      alt="insurance"
                    />
                    {insurance?.name}
                  </div>
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
                      Tổng phí
                    </div>
                    <div className="break-words">
                      {numberToCurrency(contract?.price as number)}đ
                    </div>
                  </div>
                </div>
              </div>

              <InsuredPersonInfo contract={contract} />
            </div>

            {contractStatus === ContractStatus.WAIT_FOR_PAYMENT ||
            contractStatus === ContractStatus.INITIAL ? (
              <PaymentContractBox contract={contract} />
            ) : contractStatus === ContractStatus.ACTIVE ? (
              <ActiveContractBox contractId={contract?.id} />
            ) : (
              <ExpiredContractBox />
            )}
          </div>
        </section>
      </main>
    );
  }
}

export default ContractDetailPage;

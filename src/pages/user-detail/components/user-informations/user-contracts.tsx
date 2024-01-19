import { useAppSelector } from "@/hooks/redux.hook";
import useFetchContractByBuyer from "@/hooks/useFetchContractByBuyer";
import Spinner from "@/components/ui/spinner";
import { ContractStatus, handleStatusContract } from "@/pages/contract-detail";
import useFetchPayoutRequestByBuyer from "@/hooks/useFetchPayoutRequestByBuyer";

function UserContracts() {
  const auth = useAppSelector((state) => state.auth);
  const { data: contracts, isLoading: contractLoading } =
    useFetchContractByBuyer(auth.email as string, "all");
  const { data: requests, isLoading: requestLoading } =
    useFetchPayoutRequestByBuyer(auth.email as string, "all");

  const totalContracts = contracts?.length;
  const activeContracts = contracts?.filter(
    (contract) => contract.status === "active",
  ).length;
  const unpaidContracts = contracts?.filter(
    (contract) =>
      handleStatusContract(contract) === ContractStatus.WAIT_FOR_PAYMENT ||
      handleStatusContract(contract) === ContractStatus.INITIAL,
  ).length;
  const totalRequests = requests?.length;

  return (
    <div className="grid grid-cols-2 justify-between gap-2 lg:grid-cols-4">
      <div className="flex flex-col items-center rounded-lg bg-background p-6">
        {contractLoading ? (
          <Spinner hasLogo={false} size={28} />
        ) : (
          <div className="text-xl font-semibold text-primary">
            {typeof totalContracts == "number" && totalContracts < 10
              ? "0"
              : null}
            {totalContracts}
          </div>
        )}
        <span className="text-center text-sm">Hợp đồng</span>
      </div>
      <div className="flex flex-col items-center rounded-lg bg-background p-6">
        {contractLoading ? (
          <Spinner hasLogo={false} size={28} />
        ) : (
          <div className="text-xl font-semibold text-primary">
            {typeof activeContracts == "number" && activeContracts < 10
              ? "0"
              : null}
            {activeContracts}
          </div>
        )}
        <span className="text-center text-sm">Hợp đồng hiệu lực</span>
      </div>
      <div className="flex flex-col items-center rounded-lg bg-background p-6">
        {contractLoading ? (
          <Spinner hasLogo={false} size={28} />
        ) : (
          <div className="text-xl font-semibold text-primary">
            {typeof unpaidContracts == "number" && unpaidContracts < 10
              ? "0"
              : null}
            {unpaidContracts}
          </div>
        )}
        <span className="text-center text-sm">Hợp đồng chưa thanh toán</span>
      </div>
      <div className="flex flex-col items-center rounded-lg bg-background p-6">
        {requestLoading ? (
          <Spinner hasLogo={false} size={28} />
        ) : (
          <div className="text-xl font-semibold text-primary">
            {typeof totalRequests == "number" && totalRequests < 10
              ? "0"
              : null}
            {totalRequests}
          </div>
        )}
        <span className="text-center text-sm">Yêu cầu bồi thường</span>
      </div>
    </div>
  );
}

export default UserContracts;

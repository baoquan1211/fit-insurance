import useFetchContractByBuyer from "@/hooks/useFetchContractByBuyer";
import ContractCard from "../contract-card";
import { useAppSelector } from "@/hooks/redux.hook";
import React from "react";

function ContractList({
  status,
}: {
  status: "active" | "incomplete" | "expired";
}) {
  const user = useAppSelector((state) => state.auth);
  const { data: contracts } = useFetchContractByBuyer(
    user?.email as string,
    status,
  );
  return (
    <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
      {contracts?.map((contract) => (
        <ContractCard contract={contract} key={contract?.id} />
      ))}
    </div>
  );
}

export default React.memo(ContractList);

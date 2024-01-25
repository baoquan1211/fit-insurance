import useFetchContractByBuyer from "@/hooks/useFetchContractByBuyer";
import ContractCard from "../contract-card";
import { useAppSelector } from "@/hooks/redux.hook";
import React from "react";
import EmptyList from "./empty-list";
import LoadingPage from "@/components/loading-page";

function ContractList({
  status,
}: {
  status: "active" | "incomplete" | "expired";
}) {
  const user = useAppSelector((state) => state.auth);
  const { data: contracts, isLoading } = useFetchContractByBuyer(
    user?.email as string,
    status,
  );

  console.log(isLoading);

  return (
    <>
      {isLoading && <LoadingPage isLayout />}
      {contracts?.length === 0 ? (
        <div className="mt-8 w-full">
          <EmptyList />
        </div>
      ) : (
        <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          {contracts?.map((contract) => (
            <ContractCard contract={contract} key={contract?.id} />
          ))}
        </div>
      )}
    </>
  );
}

export default React.memo(ContractList);

import Spinner from "@/components/ui/spinner";
import useFetchContractById from "@/hooks/useFetchContractById";
import useFetchInsuranceById from "@/hooks/useFetchInsuranceById";
import InsuredPersonInfo from "@/pages/contract-detail/components/insured-person-info";
import ContractInformantion from "@/pages/payout-request/components/contract-information";
import { PayoutRequest } from "@/services/app/payout-request";
import PayoutRequestStatus from "./payout-request-status";
import BenefitTable from "@/components/benefit-table";

type PayoutRequestDetailProps = {
  contractId: number;
  request: PayoutRequest;
};

function PayoutRequestDetail({
  contractId,
  request,
}: PayoutRequestDetailProps) {
  const { data: contract, isLoading: contractLoading } =
    useFetchContractById(contractId);
  const { data: insurance, isLoading: insuranceLoading } =
    useFetchInsuranceById(Number(contract?.insurance?.id));

  if (contractLoading || insuranceLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner size={48} hasLogo={false} />
      </div>
    );
  if (!contract || !insurance) return null;
  return (
    <>
      <ContractInformantion contract={contract} insurance={insurance} />
      <InsuredPersonInfo contract={contract} />
      <PayoutRequestStatus request={request} />
      <BenefitTable benefits={request?.benefits} />
    </>
  );
}

export default PayoutRequestDetail;

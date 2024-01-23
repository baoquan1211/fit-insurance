import useFetchContractById from "@/hooks/useFetchContractById";
import useFetchInsuranceById from "@/hooks/useFetchInsuranceById";
import ContractInformantion from "@/pages/payout-request/components/contract-information";
import { PayoutRequest } from "@/services/app/payout-request";
import BenefitTable from "./benefit-table";
import HealthDocumentShow from "./health-document-show";
import InsuredPersonInfo from "@/pages/contract-detail/components/insured-person-info";
import UpdateStatusForm from "./update-status-form";
import Spinner from "@/components/ui/spinner";

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

      <BenefitTable benefits={request?.benefits} />

      <HealthDocumentShow documents={request?.documents} />

      <UpdateStatusForm requestId={request?.id} />
    </>
  );
}

export default PayoutRequestDetail;

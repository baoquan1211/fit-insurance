import { findByContract } from "@/services/app/insurance-benefit";
import { useSuspenseQuery } from "@tanstack/react-query";

function useFetchBenefitByContract(contractId: number) {
  return useSuspenseQuery({
    queryKey: ["benefits-contracts", contractId],
    queryFn: async () => {
      const response = await findByContract(contractId);
      if (response.status && response.status >= 400) {
        return Promise.reject(response.message);
      }
      if (response.data) return response.data;
    },
    staleTime: Infinity,
  });
}

export default useFetchBenefitByContract;

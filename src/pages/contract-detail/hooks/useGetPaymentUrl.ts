import { getPaymentUrl } from "@/services/app/contract";
import { useMutation } from "@tanstack/react-query";

function useGetPaymentUrl() {
  return useMutation({
    mutationKey: ["payment-id"],
    mutationFn: async ({ contractId }: { contractId: number }) => {
      const response = await getPaymentUrl(contractId);
      if (response.status && response.status >= 400) {
        return Promise.reject(response.message);
      }
      if (response.data) {
        return response.data;
      }
    },
  });
}

export default useGetPaymentUrl;

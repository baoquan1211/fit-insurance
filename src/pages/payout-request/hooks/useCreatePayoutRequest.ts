import { PayoutRequestCreation, create } from "@/services/app/payout-request";
import { useMutation } from "@tanstack/react-query";

function useCreatePayoutRequest() {
  return useMutation({
    mutationKey: ["create-payout-request"],
    mutationFn: async (data: PayoutRequestCreation) => {
      const response = await create(data);
      if (response.status >= 400 && response.message)
        throw new Error(response.message);
      return response.data;
    },
  });
}

export default useCreatePayoutRequest;

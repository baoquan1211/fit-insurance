import { useMutation } from "@tanstack/react-query";
import {
  PayoutRequestUpdate,
  updateStatus,
} from "@/services/app/payout-request";

function useUpdateStatusPayoutRequest() {
  return useMutation({
    mutationKey: ["update-status-payout-request"],
    mutationFn: async (data: PayoutRequestUpdate) => {
      const response = await updateStatus(data);
      if (response.status >= 400) throw new Error(response.message);
      return response.data;
    },
  });
}

export default useUpdateStatusPayoutRequest;

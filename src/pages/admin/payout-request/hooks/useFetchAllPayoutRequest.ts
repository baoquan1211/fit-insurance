import { findAll } from "@/services/app/payout-request";
import { useQuery } from "@tanstack/react-query";

function useFetchAllPayoutRequest(page: number = 0, size: number = 5) {
  return useQuery({
    queryKey: ["payout-requests", page, size],
    queryFn: async () => {
      const response = await findAll(page, size);
      if (response.status >= 400) {
        return Promise.reject(response.message);
      }
      if (response.data) return response.data;
    },
    staleTime: 60 * 1000,
  });
}

export default useFetchAllPayoutRequest;

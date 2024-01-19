import { findByEmail } from "@/services/app/payout-request";
import { useQuery } from "@tanstack/react-query";

function useFetchPayoutRequestByBuyer(
  email: string,
  status: "pending" | "accepted" | "rejected" | "all" = "all",
) {
  return useQuery({
    queryKey: ["payout-by-buyer", email, status],
    queryFn: async () => {
      const response = await findByEmail(email, status);
      if (response.status >= 400) throw new Error(response.message);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export default useFetchPayoutRequestByBuyer;

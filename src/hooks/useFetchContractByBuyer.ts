import { findByEmail } from "@/services/app/contract";
import { useQuery } from "@tanstack/react-query";

function useFetchContractByBuyer(
  email: string,
  status: "active" | "incomplete" | "expired" | "all",
) {
  return useQuery({
    queryKey: ["contracts-by-buyer", email, status],
    queryFn: async () => {
      const response = await findByEmail(email, status);
      if (response.status >= 400) throw new Error(response.message);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export default useFetchContractByBuyer;

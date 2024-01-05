import { findByEmail } from "@/services/app/contract";
import { useSuspenseQuery } from "@tanstack/react-query";

function useFetchContractByBuyer(
  email: string,
  status: "active" | "incomplete" | "expired" | "all",
) {
  return useSuspenseQuery({
    queryKey: ["contract-email", email, status],
    queryFn: async () => {
      const response = await findByEmail(email, status);
      if (response.status >= 400) throw new Error(response.message);
      return response.data;
    },
    staleTime: 1000,
  });
}

export default useFetchContractByBuyer;

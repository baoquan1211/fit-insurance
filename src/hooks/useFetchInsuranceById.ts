import { findById } from "@/services/app/insurance";
import { useSuspenseQuery } from "@tanstack/react-query";

function useFetchInsuranceById(id: number) {
  return useSuspenseQuery({
    queryKey: ["insurances", id],
    queryFn: async () => {
      const response = await findById(id);
      if (response.status && response.status >= 400) {
        return Promise.reject(response.message);
      }
      if (response.data) return response.data;
    },
    staleTime: Infinity,
  });
}

export default useFetchInsuranceById;

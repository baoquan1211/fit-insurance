import { findById } from "@/services/app/insurance";
import { useQuery } from "@tanstack/react-query";

function useFetchInsuranceById(id: number) {
  return useQuery({
    queryKey: ["insurances", id],
    queryFn: async () => {
      const response = await findById(id);
      if (response.status && response.status >= 400) {
        return Promise.reject(response.message);
      }
      if (response.data) return response.data;
    },
    enabled: !!id,
    staleTime: Infinity,
  });
}

export default useFetchInsuranceById;

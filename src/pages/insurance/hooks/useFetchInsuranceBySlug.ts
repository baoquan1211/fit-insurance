import { findBySlug } from "@/services/app/insurance";
import { useQuery } from "@tanstack/react-query";

function useFetchInsuranceBySlug(slug: string) {
  return useQuery({
    queryKey: ["insurances", slug],
    queryFn: async () => {
      const response = await findBySlug(slug);
      if (response.status && response.status >= 400) {
        return Promise.reject(response.message);
      }
      if (response.data) return response.data;
    },
    staleTime: Infinity,
  });
}

export default useFetchInsuranceBySlug;

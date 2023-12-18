import { DataResponse } from "@/services";
import { findBySlug } from "@/services/app/insurance";
import { useQuery } from "@tanstack/react-query";
import { Insurance } from "../components/product-list";

function useFetchInsuranceBySlug(slug: string) {
  return useQuery({
    queryKey: ["insurances", slug],
    queryFn: async () => {
      const response: DataResponse = await findBySlug(slug);
      if (response.status && response.status >= 400) {
        return Promise.reject(response.message);
      }
      if (response.data) return response.data as Insurance[];
    },
    staleTime: Infinity,
  });
}

export default useFetchInsuranceBySlug;

import { Insurance } from "@/pages/insurance/components/product-list";
import { DataResponse } from "@/services";
import { findById } from "@/services/app/insurance";
import { useQuery } from "@tanstack/react-query";

function useFetchInsuranceById(id: number) {
  return useQuery({
    queryKey: ["insurances", id],
    queryFn: async () => {
      const response: DataResponse = await findById(id);
      if (response.status && response.status >= 400) {
        return Promise.reject(response.message);
      }
      if (response.data) return response.data as Insurance;
    },
    staleTime: Infinity,
  });
}

export default useFetchInsuranceById;

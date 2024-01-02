import { findById } from "@/services/app/insurance-type";
import { useQuery } from "@tanstack/react-query";

function useFetchInsuranceTypeById(id: number) {
  return useQuery({
    queryKey: ["insurance-type", id],
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

export default useFetchInsuranceTypeById;

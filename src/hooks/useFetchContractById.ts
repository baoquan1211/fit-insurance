import { findById } from "@/services/app/contract";
import { useQuery } from "@tanstack/react-query";

function useFetchContractById(id: number) {
  return useQuery({
    queryKey: ["contracts", id],
    queryFn: async () => {
      const response = await findById(id);
      if (response.status >= 400) throw new Error(response.message);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000,
  });
}

export default useFetchContractById;

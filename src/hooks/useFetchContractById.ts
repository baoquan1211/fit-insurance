import { findById } from "@/services/app/contract";
import { useSuspenseQuery } from "@tanstack/react-query";

function useFetchContractById(id: number) {
  return useSuspenseQuery({
    queryKey: ["contracts", id],
    queryFn: async () => {
      const response = await findById(id);
      if (response.status >= 400) throw new Error(response.message);
      return response.data;
    },
    staleTime: 1000,
  });
}

export default useFetchContractById;

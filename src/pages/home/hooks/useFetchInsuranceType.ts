import { findAll } from "@/services/app/insurance-type";
import { useSuspenseQuery } from "@tanstack/react-query";

function useFetchInsuranceType() {
  return useSuspenseQuery({
    queryKey: ["insurance-type"],
    queryFn: async () => {
      const response = await findAll();
      if (response.status && response.status >= 400) {
        throw new Error(response.message);
      }
      if (response.data) return response.data;
    },
    select: (data) => {
      data?.map((type) => {
        if (typeof type.advantage == "string")
          type.advantage = JSON.parse(type.advantage);
        return type;
      });
      return data;
    },
    staleTime: Infinity,
  });
}

export default useFetchInsuranceType;

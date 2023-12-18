import { DataResponse } from "@/services";
import { findAll } from "@/services/app/insurance-type";
import { useSuspenseQuery } from "@tanstack/react-query";
import { InsuranceType } from "../components/product-show";
import { useCallback } from "react";

function useFetchInsuranceType() {
  return useSuspenseQuery({
    queryKey: ["insurance-type"],
    queryFn: async () => {
      const response: DataResponse = await findAll();
      if (response.status && response.status >= 400) {
        throw new Error(response.message);
      }
      if (response.data) return response.data as InsuranceType[];
    },
    select: useCallback((data: InsuranceType[] | undefined) => {
      data?.map((type) => {
        if (typeof type.advantage == "string")
          type.advantage = JSON.parse(type.advantage);
        return type;
      });
      return data;
    }, []),
    staleTime: Infinity,
  });
}

export default useFetchInsuranceType;

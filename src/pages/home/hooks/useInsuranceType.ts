import { DataResponse } from "@/services";
import { findAll } from "@/services/app/insurance-type";
import { useSuspenseQuery } from "@tanstack/react-query";
import { InsuranceType } from "../components/product-show";

function useInsuranceType() {
  return useSuspenseQuery({
    queryKey: ["insurance-type"],
    queryFn: async () => {
      const response: DataResponse = await findAll();
      if (response.status && response.status >= 400) {
        throw new Error(response.message);
      }
      if (response.data) return response.data as InsuranceType[];
    },
  });
}

export default useInsuranceType;

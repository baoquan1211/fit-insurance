import { DataResponse } from "@/services";
import { calculateFee } from "@/services/app/insurance";
import { useQuery } from "@tanstack/react-query";

function useCalculateFee(id: number, birthdate: string, startDate: string) {
  return useQuery({
    queryKey: ["insurance-fee", id, birthdate, startDate],
    queryFn: async () => {
      const response: DataResponse = await calculateFee(
        Number(id),
        birthdate,
        startDate,
      );
      if (response.status && response.status >= 400) {
        return Promise.reject(response.message);
      }
      if (response.data) return response.data as number;
    },
  });
}

export default useCalculateFee;

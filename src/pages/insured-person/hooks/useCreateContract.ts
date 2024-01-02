import { useMutation } from "@tanstack/react-query";
import { ContractCreation } from "..";
import { create } from "@/services/app/contract";

function useCreateContract() {
  return useMutation({
    mutationKey: ["createContract"],
    mutationFn: async (data: ContractCreation) => {
      const response = await create(data);
      if (response.status >= 400 && response.message)
        throw new Error(response.message);
      return response.data;
    },
  });
}

export default useCreateContract;

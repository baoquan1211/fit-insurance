import { RegisterResquest, register } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";

function useRegister() {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterResquest) => {
      return register(data);
    },
  });
}

export default useRegister;

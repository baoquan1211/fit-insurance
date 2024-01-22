import { useMutation } from "@tanstack/react-query";
import { ChangePasswordResquest, changePassword } from "@/services/auth";

function useChangePassword() {
  return useMutation({
    mutationKey: ["change-password"],
    mutationFn: async (data: ChangePasswordResquest) => {
      const response = await changePassword(data);
      if (response.status >= 400) return Promise.reject(response.message);
      return response.data;
    },
  });
}

export default useChangePassword;

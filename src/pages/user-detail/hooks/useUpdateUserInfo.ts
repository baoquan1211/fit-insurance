import { useMutation } from "@tanstack/react-query";
import { UpdateUserForm, updateUserByEmail } from "@/services/app/user";

function useUpdateUserInfo() {
  return useMutation({
    mutationKey: ["update-user-info"],
    mutationFn: async (data: UpdateUserForm) => {
      const response = await updateUserByEmail(data);
      if (response.status >= 400) return Promise.reject(response.message);
      return response.data;
    },
  });
}

export default useUpdateUserInfo;

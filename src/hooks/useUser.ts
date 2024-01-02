import { useSuspenseQuery } from "@tanstack/react-query";
import { useAuth } from "./auth.hook";
import { getUserByEmail } from "@/services/app/user";

function useUser() {
  const auth = useAuth();
  const email = auth.email;
  return useSuspenseQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await getUserByEmail(email as string);
      if (response.status >= 400) throw new Error(response.message);
      return response.data;
    },
    staleTime: Infinity,
  });
}

export default useUser;

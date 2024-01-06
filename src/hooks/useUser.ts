import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserByEmail } from "@/services/app/user";
import { useAppSelector } from "./redux.hook";

function useUser() {
  const auth = useAppSelector((state) => state.auth);
  const email = auth.email;
  return useSuspenseQuery({
    queryKey: ["users", email],
    queryFn: async () => {
      const response = await getUserByEmail(email as string);
      if (response.status >= 400) throw new Error(response.message);
      return response.data;
    },
    staleTime: Infinity,
  });
}

export default useUser;

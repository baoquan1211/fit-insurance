import { useAppSelector } from "./redux-hooks";

export function useAuth() {
  const authSelector = useAppSelector((state) => state.auth);
  return authSelector;
}

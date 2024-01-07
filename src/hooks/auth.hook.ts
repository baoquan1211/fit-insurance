import { store } from "@/stores";
import { logoutAction, refreshAction } from "@/stores/actions/auth";

export function useAuth() {
  const auth = store.getState().auth;
  return auth;
}

export function useRefresh() {
  store.dispatch(refreshAction());
}

export function useLogout() {
  store.dispatch(logoutAction());
}

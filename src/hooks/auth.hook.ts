import { store } from "@/stores";
import { logoutAction, refreshAction } from "@/stores/actions/auth";

export function useAuth() {
  const auth = store.getState().auth;
  return auth;
}

export function useRefresh() {
  const refreshToken = store.getState().auth.refresh;
  if (refreshToken !== null) store.dispatch(refreshAction({ refreshToken }));
}

export function useLogout() {
  const refreshToken = store.getState().auth.refresh;
  if (refreshToken !== null) store.dispatch(logoutAction({ refreshToken }));
}

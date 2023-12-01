import axios from "@/services";
// import { store } from "@/redux/store";

export interface LoginResquest {
  email: string;
  password: string;
}

export interface LoginSuccess {
  refresh: string;
  access: string;
}

const login = (data: LoginResquest) => {
  return axios.post<LoginSuccess>("/login", data);
};

export interface RefreshTokenRequest {
  refresh: string;
}

export interface RefreshTokenSuccess {
  access: string;
}

const refresh = () => {
  //   const refreshToken = store.getState().auth.refresh;
  return axios.post<RefreshTokenSuccess>("/refresh", {
    refresh: "refreshToken",
  });
};

const logout = () => {
  //   const refreshToken = store.getState().auth.refresh;
  return axios.post("/logout", { refresh: "refreshToken" });
};

export interface RegisterResquest {
  name: string;
  email: string;
  password: string;
}

const register = (data: RegisterResquest) => {
  return axios.post<RegisterResquest>("/v1/users", data);
};

export { login, refresh, logout, register };

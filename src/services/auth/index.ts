import axios from "@/services";

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

const refresh = (refreshToken: string) => {
  return axios.post<RefreshTokenSuccess>("/refresh", {
    refresh: refreshToken,
  });
};

const logout = (refreshToken: string) => {
  return axios.post("/logout", { refresh: refreshToken });
};

export interface RegisterResquest {
  name: string;
  email: string;
  password: string;
}

const register = (data: RegisterResquest) => {
  return axios.post<RegisterResquest>("/register", data);
};

export { login, refresh, logout, register };

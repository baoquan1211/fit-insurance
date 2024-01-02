import axios, { ApiResponse } from "@/services";

export interface LoginResquest {
  email: string;
  password: string;
}

export interface LoginSuccess {
  refresh: string;
  access: string;
}

const login = async (data: LoginResquest) => {
  const response: ApiResponse<LoginSuccess> = await axios.post("/login", data);
  return response;
};

export interface RefreshTokenRequest {
  refresh: string;
}

export interface RefreshTokenSuccess {
  access: string;
}

const refresh = async (refreshToken: string) => {
  const response: ApiResponse<RefreshTokenSuccess> = await axios.post(
    "/refresh",
    {
      refresh: refreshToken,
    },
  );
  return response;
};

const logout = (refreshToken: string) => {
  return axios.post("/logout", { refresh: refreshToken });
};

export interface RegisterResquest {
  name: string;
  email: string;
  password: string;
}

const register = async (data: RegisterResquest) => {
  const response: ApiResponse<unknown> = await axios.post("/register", data);
  return response;
};

export { login, refresh, logout, register };

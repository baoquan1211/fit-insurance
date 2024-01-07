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

export interface RefreshTokenSuccess {
  access: string;
}

const refresh = async () => {
  const response: ApiResponse<RefreshTokenSuccess> =
    await axios.get("/refresh");
  return response;
};

const logout = () => {
  return axios.get("/logout");
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

import axios, { ApiResponse } from "@/services";

export interface LoginResquest {
  email: string;
  password: string;
}

export interface LoginSuccess {
  access: string;
}

export const login = async (data: LoginResquest) => {
  const response: ApiResponse<LoginSuccess> = await axios.post("/login", data);
  return response;
};

export interface RefreshTokenSuccess {
  access: string;
}

export const refresh = async () => {
  const response: ApiResponse<RefreshTokenSuccess> =
    await axios.get("/refresh");
  return response;
};

export const logout = () => {
  return axios.get("/logout");
};

export interface RegisterResquest {
  name: string;
  email: string;
  password: string;
}

export const register = async (data: RegisterResquest) => {
  const response: ApiResponse<unknown> = await axios.post("/register", data);
  return response;
};

export interface ChangePasswordResquest {
  email: string;
  lastPassword: string;
  newPassword: string;
}

export const changePassword = async (data: ChangePasswordResquest) => {
  const response: ApiResponse<unknown> = await axios.patch(
    "/change-password",
    data,
  );
  return response;
};

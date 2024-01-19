import axios, { ApiResponse } from "@/services";

export type User = {
  name: string;
  phone?: string;
  identityCard?: string;
  email: string;
  avatarUrl?: string;
};

export const getUserByEmail = async (email: string) => {
  const response: ApiResponse<User> = await axios.get(`/users/email/${email}`);
  return response;
};

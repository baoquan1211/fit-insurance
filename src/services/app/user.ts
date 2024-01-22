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

export type UpdateUserForm = {
  email: string;
  phone: string;
  identityCard: string;
  avatar: File;
};

export const updateUserByEmail = async (data: UpdateUserForm) => {
  const formData = new FormData();
  formData.append("phone", data.phone);
  formData.append("email", data.email);
  formData.append("identifyCard", data.identityCard);
  if (data.avatar !== null) formData.append("avatarFile", data.avatar);
  const response: ApiResponse<User> = await axios.patch(`/users`, formData);
  return response;
};

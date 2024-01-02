import axios, { ApiResponse } from "@/services";

export type InsuranceType = {
  name: string;
  slug: string;
  description: string;
  advantage: string[];
  image: string;
  active: boolean;
  insurances?: [];
};

export const findAll = async () => {
  const response: ApiResponse<InsuranceType[]> =
    await axios.get("/insurance-types");
  return response;
};

export const findById = async (id: number) => {
  const response: ApiResponse<InsuranceType> = await axios.get(
    `/insurance-types/${id}`,
  );
  return response;
};

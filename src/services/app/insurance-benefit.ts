import axios, { ApiResponse } from "@/services";

export type Benefit = {
  id: number;
  name: string;
  unit: string;
  amount: number;
  insuranceId: number;
  active: boolean;
};

export const findById = async (id: number) => {
  const response: ApiResponse<Benefit> = await axios.get(`/benefits/${id}`);
  return response;
};

export const findByContract = async (contractId: number) => {
  const response: ApiResponse<Benefit[]> = await axios.get(
    `/benefits/contracts/${contractId}`,
  );
  return response;
};

export const findByInsurance = async (insuranceId: number) => {
  const response: ApiResponse<Benefit[]> = await axios.get(
    `/benefits/insurances/${insuranceId}`,
  );
  return response;
};

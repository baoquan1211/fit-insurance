import axios, { ApiResponse } from "@/services";
import { Benefit } from "./insurance-benefit";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Insurance extends Record<string, any> {
  id: number;
  insuranceTypeId: number;
  name: string;
  logo: string;
  totalPayPerYear: number;
  minFeePerYear: number;
  benefits: Benefit[];
}

export const findBySlug = async (slug: string) => {
  const response: ApiResponse<Insurance[]> = await axios.get(
    `/insurances/insurance-types/slug/${slug}`,
  );
  return response;
};

export const findById = async (id: number) => {
  const response: ApiResponse<Insurance> = await axios.get(`/insurances/${id}`);
  return response;
};

export const calculateFee = async (
  id: number,
  birthdate: string,
  startDate: string,
) => {
  const response: ApiResponse<number> = await axios.post(
    `/insurances/${id}/calculate-fee`,
    {
      birthdate,
      startDate,
    },
  );
  return response;
};

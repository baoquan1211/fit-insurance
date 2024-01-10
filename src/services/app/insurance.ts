import axios, { ApiResponse } from "@/services";

export type Benefit = {
  id: number;
  name: string;
  unit: string;
  amount: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Insurance extends Record<string, any> {
  id: number;
  insuranceTypeId: number;
  name: string;
  description: string;
  minFeePerYear: number;
  logo: string;
  detail: string;
  totalPayPerYear: number;
  inpatientFeePayPerDay: number;
  healthCheckFeePayBeforeInpatientPerYear: number;
  healthCheckFeePayAfterInpatientPerYear: number;
  surgicalFeePayPerYear: number;
  medicalVehicleFeePayPerYear: number;
  functionalRestorationPayPerYear: number;
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

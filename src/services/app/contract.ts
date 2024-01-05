import { ContractCreation } from "@/pages/insured-person";
import axios, { ApiResponse } from "@/services";
import { type User } from "./user";
import { type Insurance } from "./insurance";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Contract extends Record<string, any> {
  id: number;
  buyer: User;

  // Insured person information
  phone: string;
  name: string;
  gender: "MALE" | "FEMALE";
  email: string;
  birthdate: string;
  identityCard: string;
  wardId: number;
  address: string;

  // Insurance information
  insurance: Insurance;
  price: number;
  totalPayPerYear: number;
  inpatientFeePayPerDay: number;
  healthCheckFeePayBeforeInpatientPerYear: number;
  healthCheckFeePayAfterInpatientPerYear: number;
  surgicalFeePayPerYear: number;
  medicalVehicleFeePayPerYear: number;
  functionalRestorationPayPerYear: number;

  // Contract information
  startAt: string;
  endAt: string;
  status: string;
}

export const create = async (data: ContractCreation) => {
  const response: ApiResponse<Contract> = await axios.post("/contracts", data);
  return response;
};

export const findById = async (id: number) => {
  const response: ApiResponse<Contract> = await axios.get(`/contracts/${id}`);
  return response;
};

export const getPaymentUrl = async (id: number) => {
  const response: ApiResponse<string> = await axios.post(
    `/contracts/${id}/payment/vnpay`,
  );
  return response;
};

export const findByEmail = async (
  email: string,
  status: "active" | "incomplete" | "expired" | "all" = "all",
) => {
  const response: ApiResponse<Contract[]> = await axios.get(
    `/contracts?email=${email}&status=${status}`,
  );
  return response;
};

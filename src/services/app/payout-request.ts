import axios, { ApiResponse } from "@/services";
import { Benefit } from "./insurance-benefit";

type HealthDocument = {
  name: string;
  url: string;
};

export type PayoutRequest = {
  id: number;
  createdAt: string;
  status: string;
  benefits: Benefit[];
  contractId: number;
  totalPay: number;
  documents: HealthDocument[];
};

export type PayoutRequestCreation = {
  benefits: number[];
  files: File[];
  buyer: string;
  contractId: number;
};

export const create = async (data: PayoutRequestCreation) => {
  const formData = new FormData();
  formData.append("buyer", data.buyer);
  formData.append("contract", data.contractId.toString());
  data.benefits.forEach((benefit) =>
    formData.append("benefits", benefit.toString()),
  );
  data.files.forEach((file) => formData.append("files", file));
  const response: ApiResponse<PayoutRequest> = await axios.post(
    "/payout-request",
    formData,
  );
  return response;
};

export const findByEmail = async (
  email: string,
  status: "pending" | "accepted" | "rejected" | "all" = "all",
) => {
  const response: ApiResponse<PayoutRequest[]> = await axios.get(
    `/payout-request?email=${email}&status=${status}`,
  );
  return response;
};

import axios, { ApiResponse, PageableResponse } from "@/services";
import { Benefit } from "./insurance-benefit";

export type HealthDocument = {
  name: string;
  url: string;
};

export type PayoutRequest = {
  id: number;
  createdAt: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  benefits: Benefit[];
  contractId: number;
  totalPay: number;
  message: string;
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
    "/payout-requests",
    formData,
  );
  return response;
};

export const findByEmail = async (
  email: string,
  status: "pending" | "accepted" | "rejected" | "all" = "all",
) => {
  const response: ApiResponse<PayoutRequest[]> = await axios.get(
    `/payout-requests/email/${email}?status=${status}`,
  );
  return response;
};

export const findAll = async (page: number, size: number) => {
  const response: ApiResponse<PageableResponse<PayoutRequest>> =
    await axios.get(`/payout-requests?page=${page}&limit=${size}`);
  return response;
};

export type PayoutRequestUpdate = {
  id: number;
  status: "accepted" | "rejected";
  message?: string;
};

export const updateStatus = async (data: PayoutRequestUpdate) => {
  const response: ApiResponse<unknown> = await axios.patch(
    `/payout-requests/${data.id}`,
    {
      status: data.status,
      message: data.message,
    },
  );
  return response;
};

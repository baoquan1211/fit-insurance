import axios, { DataResponse } from "@/services";

export const findBySlug = (slug: string) => {
  return axios.get<DataResponse>(`/insurances/insurance-types/slug/${slug}`);
};

export const findById = (id: number) => {
  return axios.get<DataResponse>(`/insurances/${id}`);
};

export const calculateFee = (
  id: number,
  birthdate: string,
  startDate: string,
) => {
  return axios.post<DataResponse>(`/insurances/${id}/calculate-fee`, {
    birthdate,
    startDate,
  });
};

import axios, { DataResponse } from "@/services";

export const findAll = () => {
  return axios.get<DataResponse>("/insurance-types");
};

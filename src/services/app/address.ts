import axios, { ApiResponse } from "@/services";

export type Province = {
  id: number;
  type: string;
  name: string;
};

export type District = {
  id: number;
  type: string;
  name: string;
  provinceId: number;
};

export type Ward = {
  id: number;
  type: string;
  name: string;
  districtId: number;
};

export const findAllProvinces = async () => {
  const response: ApiResponse<Province[]> = await axios.get(`/provinces`);
  return response;
};

export const findAllDistrictsByProvince = async (provinceId: number) => {
  const response: ApiResponse<District[]> = await axios.get(
    `/districts/provinces/${provinceId}`,
  );
  return response;
};

export const findAllWardsByDistrict = async (districtId: number) => {
  const response: ApiResponse<Ward[]> = await axios.get(
    `/wards/districts/${districtId}`,
  );
  return response;
};

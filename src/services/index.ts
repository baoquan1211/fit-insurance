import { useAuth, useLogout, useRefresh } from "@/hooks/auth.hook";
import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api/v1`,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export type SuccessResponse<T> = {
  status: number;
  data?: T;
};

export type ErrorResponse = {
  message?: string;
  status: number;
};

export type ApiResponse<T> = SuccessResponse<T> & ErrorResponse;

instance.interceptors.request.use(
  function (config) {
    const auth = useAuth();
    config.headers.Authorization = "Bearer " + auth.access;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const res = {
      data: response.data,
      status: response.status,
    } as AxiosResponse<SuccessResponse<unknown>>;
    return res;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    //return Promise.reject(error);

    const { response, config } = error;
    if (
      (response.status === 401 || response.status === 403) &&
      config.url !== "/refresh" &&
      config.url !== "/login" &&
      config.url !== "/logout" &&
      config.url !== "/register" &&
      config.url !== "/change-password"
    ) {
      {
        console.log("REFRESHING TOKEN");
        useRefresh();
      }
    } else {
      if (config.url === "/refresh") {
        useLogout();
      }

      const response: ErrorResponse = {
        message: error.response.data.error,
        status: error.response.status,
      };
      return response;
    }
  },
);

export default instance;

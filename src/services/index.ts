import { useAuth } from "@/hooks/auth-hooks";
import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api/v1`,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export interface DataResponse {
  message?: string;
  status: number;
  data?: unknown;
}

axios.interceptors.request.use(
  function (config) {
    const auth = useAuth();
    config.headers.Authorization = "Bearer " + auth.access;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const res = {
      data: response.data,
      status: response.status,
    } as AxiosResponse<unknown, unknown>;
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
      console.log("REFRESHING TOKEN");
      //   store.dispatch(refreshAction());
    } else {
      const response: DataResponse = {
        message: error.response.data.error,
        status: error.response.status,
      };
      return response;
    }
  }
);

export default instance;

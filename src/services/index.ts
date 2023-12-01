import axios, { AxiosResponse } from "axios";
// import { store } from "@/redux/store";
// import { refreshAction } from "@/redux/actions/authAction";
const instance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api/v1`,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export interface ErrorResponse {
  message?: string;
  status: number;
}

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
      response.data.code === "token_not_valid" &&
      config.url !== "/refresh" &&
      config.url !== "/login" &&
      config.url !== "/logout"
    ) {
      console.log("REFRESHING TOKEN");
      //   store.dispatch(refreshAction());
    } else {
      const response: ErrorResponse = {
        message: error.response.data,
        status: error.response.status,
      };
      return response;
    }
  }
);

export default instance;

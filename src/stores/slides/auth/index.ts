import { createSlice } from "@reduxjs/toolkit";
import {
  loginAction,
  logoutAction,
  refreshAction,
} from "@/stores/actions/auth";
import { jwtDecode } from "jwt-decode";

export type authSlideState = {
  status: "loading" | "idle" | "error" | "success";
  access: string | null;
  email: string | null;
  message: string | null;
};

const initialState: authSlideState = {
  status: "idle",
  access: null,
  email: null,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.status = "loading";
      state.access = null;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.status = "success";
      state.access = action.payload.data?.access as string;
      const decodedAccess = jwtDecode(action.payload.data?.access as string);
      state.email = decodedAccess.sub as string;
    });
    builder.addCase(loginAction.rejected, (state) => {
      state.status = "error";
    });
    builder.addCase(logoutAction.pending, (state) => {
      state.status = "loading";
      state.access = null;
      state.message = null;
    });
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.access = null;
      state.message = null;
      state.status = "idle";
      state.email = null;
    });
    builder.addCase(logoutAction.rejected, (state) => {
      state.status = "error";
    });
    builder.addCase(refreshAction.pending, (state) => {
      console.log("INFO: Refreshing token");
      state.status = "loading";
      state.access = null;
      state.message = null;
    });
    builder.addCase(refreshAction.fulfilled, (state, action) => {
      console.log("INFO: Refreshing token successfully");
      state.status = "success";
      state.access = action.payload.data?.access as string;
    });
    builder.addCase(refreshAction.rejected, (state) => {
      console.log("ERROR: Refreshing token failed");
      state.access = null;
      state.message = null;
      state.status = "error";
      state.email = null;
    });
  },
});

export default authSlice.reducer;

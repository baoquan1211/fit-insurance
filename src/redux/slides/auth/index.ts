import { createSlice } from "@reduxjs/toolkit";
import { loginAction, logoutAction, refreshAction } from "@/redux/actions/auth";
import { jwtDecode } from "jwt-decode";
export type authSlideType = {
  status: "loading" | "idle" | "error" | "success";
  access: string | null;
  refresh: string | null;
  email: string | null;
  message: string | null;
};

const initialState: authSlideType = {
  status: "idle",
  access: null,
  refresh: null,
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
      state.refresh = null;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.status = "success";
      state.access = action.payload.data.access;
      state.refresh = action.payload.data.refresh;
      const decodedAccess = jwtDecode(action.payload.data.access);
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
      state.refresh = null;
      state.email = null;
    });
    builder.addCase(logoutAction.rejected, (state) => {
      state.status = "error";
    });
    builder.addCase(refreshAction.pending, (state, action) => {
      console.log(action);
      state.status = "loading";
      state.access = null;
      state.message = null;
    });
    builder.addCase(refreshAction.fulfilled, (state, action) => {
      console.log("REFRESHING TOKEN FINISHED");
      state.status = "success";
      state.access = action.payload.data.access;
    });
    builder.addCase(refreshAction.rejected, (state: authSlideType) => {
      console.log("REFRESHING TOKEN FAILED");
      state.access = null;
      state.message = null;
      state.status = "error";
      state.refresh = null;
      state.email = null;
    });
  },
});

export default authSlice.reducer;

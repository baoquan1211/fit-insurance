import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout, refresh } from "@/services/auth";
import { LoginResquest } from "@/services/auth";

export const loginAction = createAsyncThunk(
  "auth/login",
  async (loginData: LoginResquest, thunkAPI) => {
    try {
      const response = await login(loginData);
      if (response.status == 401 || response.status == 403)
        return thunkAPI.rejectWithValue(response);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const logoutAction = createAsyncThunk(
  "auth/logout",
  async ({ refreshToken }: { refreshToken: string }, thunkAPI) => {
    try {
      const response = await logout(refreshToken);
      if (response.status == 401 || response.status == 403)
        return thunkAPI.rejectWithValue(response.data);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const refreshAction = createAsyncThunk(
  "auth/refresh",
  async ({ refreshToken }: { refreshToken: string }, thunkAPI) => {
    try {
      const response = await refresh(refreshToken);
      if (response.status >= 400) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

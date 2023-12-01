import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slides/auth";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "auth",
  storage,
};

const persistReducers = persistReducer(persistConfig, authSliceReducer);

export const store = configureStore({
  reducer: {
    auth: persistReducers,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

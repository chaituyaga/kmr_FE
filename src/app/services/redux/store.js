import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import stockReducer from "../slices/stockSlice";

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    stockReducer: stockReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

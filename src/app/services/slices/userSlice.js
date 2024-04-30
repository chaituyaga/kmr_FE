import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiClient } from "../axiosService";

const initialState = {
  userName: "",
  loading: false,
  error: "",
  isUser: false,
  signUpMsg: "",
  isOtpTrue: false,
};

export const getIsUserExist = createAsyncThunk(
  "users/getIsUser",
  async (data) => {
    return await ApiClient.post("/isUser", data);
  }
);

export const createNewuser = createAsyncThunk(
  "users/createUser",
  async (data) => {
    return await ApiClient.post("/signUpUser", data);
  }
);

export const validateOtp = createAsyncThunk(
  "users/validateOtp",
  async (data) => {
    return await ApiClient.post("/validateOtp", data);
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIsUserExist.pending, (state) => {
        state.loading = true;
      })
      .addCase(getIsUserExist.fulfilled, (state, action) => {
        state.loading = false;
        state.isUser = action.payload.data;
      })
      .addCase(getIsUserExist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewuser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewuser.fulfilled, (state, action) => {
        state.loading = false;
        state.signUpMsg = action.payload;
      })
      .addCase(createNewuser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(validateOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(validateOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.isOtpTrue = action.payload;
        let obj = {
          isUser: action.payload.data,
        }
        localStorage.setItem("user", JSON.stringify(action.payload.data));
      })
      .addCase(validateOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;

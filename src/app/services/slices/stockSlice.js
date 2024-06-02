import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiClient } from "../axiosService";

const initialState = {
  suppliers: [],
};

export const getAllSuppliers = createAsyncThunk(
  "stocks/getAllSuppliers",
  async (data, thunkAPI) => {
    return await ApiClient.get("/suppliers");
  }
);

export const addSupplier = createAsyncThunk(
  "stocks/addSupplier",
  async (data, thunkAPI) => {
    return await ApiClient.post("/addSupplier", { suppliername: data });
  }
);

export const getAllCustomers = createAsyncThunk(
  "stocks/getAllCustomers",
  async (data, thunkAPI) => {
    return await ApiClient.get("/customers");
  }
);

export const addCustomer = createAsyncThunk(
  "stocks/addCustomer",
  async (data, thunkAPI) => {
    return await ApiClient.post("/addCustomer", { customername: data });
  }
);

export const getAllStocks = createAsyncThunk(
  "stocks/getAllStocks",
  async (data, thunkAPI) => {
    return await ApiClient.get("/stocks");
  }
);

export const addStocks = createAsyncThunk(
  "stocks/addStocks",
  async (data, thunkAPI) => {
    return await ApiClient.post("/addStocks", { value: data });
  }
);

export const stockSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default stockSlice.reducer;

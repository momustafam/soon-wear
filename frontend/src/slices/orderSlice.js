import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  success: false,
  order: {},
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrder: (state, { payload }) => {
      state.order = payload;
      state.success = true;
    },
    resetOrder: (state) => {
      state.success = false;
      state.order = {};
    },
  },
});

export const sendOrder = createAsyncThunk("order/send", async (order) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/orders",
      order,
      config
    );

    return data;
  } catch (error) {
    throw error;
  }
});

export default orderSlice.reducer;
export const { createOrder, resetOrder } = orderSlice.actions;

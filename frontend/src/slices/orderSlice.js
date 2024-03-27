import { createSlice } from "@reduxjs/toolkit";

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

export default orderSlice.reducer;
export const { createOrder, resetOrder } = orderSlice.actions;

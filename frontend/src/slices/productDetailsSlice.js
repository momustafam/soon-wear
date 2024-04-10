import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: {},
  loading: false,
  error: false,
};

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.fulfilled, (state, { payload }) => {
        state.product = payload;
        state.error = false;
        state.loading = false;
      })
      .addCase(getProductDetails.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getProductDetails.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const getProductDetails = createAsyncThunk(
  "productDetails/get",
  async (product_id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/products/${product_id}`,
        config
      );

      return data;
    } catch (error) {
      throw error;
    }
  }
);

export default productDetailsSlice.reducer;

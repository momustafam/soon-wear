import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  sizes: [],
};

const sizeSlice = createSlice({
  name: "sizes",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getSizes.fulfilled, (state, { payload }) => {
        state.sizes = payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(getSizes.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getSizes.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const getSizes = createAsyncThunk("sizes/get", async () => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/sizes",
      config
    );

    return data;
  } catch (error) {
    throw error;
  }
});

export default sizeSlice.reducer;

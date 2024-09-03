import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  colors: [],
};

const colorSlice = createSlice({
  name: "colors",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getColors.fulfilled, (state, { payload }) => {
        state.colors = payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(getColors.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getColors.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const getColors = createAsyncThunk("colors/get", async () => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/colors",
      config
    );

    return data;
  } catch (error) {
    throw error;
  }
});

export default colorSlice.reducer;

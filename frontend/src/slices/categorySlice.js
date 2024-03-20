import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "categorys",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.categories = payload.data[0].categories;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCategories.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.categories = null;
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const getCategories = createAsyncThunk("categorys/get", async () => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const data = axios.get(
      "https://65f42ad7f54db27bc020adb1.mockapi.io/api/v1/landing-page",
      config
    );
    return data;
  } catch (error) {
    console.log(error);
  }
});

export default categorySlice.reducer;

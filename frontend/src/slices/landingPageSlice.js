import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  banners: [],
  discounts: [],
  recently_arrived: [],
  top_selling: [],
};

const landingPageSlice = createSlice({
  name: "landingPage",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getLandingPageData.fulfilled, (state, { payload }) => {
        const data = payload.data[0];
        state.categories = data.categories;
        state.banners = data.banners;
        state.discounts = data.discounts;
        state.recently_arrived = data.recently_arrived;
        state.top_selling = data.top_selling;
        state.loading = false;
        state.error = null;
      })
      .addCase(getLandingPageData.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLandingPageData.rejected, (state, action) => {
        state.categories = null;
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const getLandingPageData = createAsyncThunk(
  "landingPage/get",
  async () => {
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
  }
);

export default landingPageSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  banners: {
    main_banner_dynamic: [],
    main_banner_static: [],
    top_selling_banner: [],
    recently_arrived_banner: [],
    customer_review: [],
  },
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
        const data = payload;
        state.categories = data.categories;
        state.banners = data.banners;
        state.discounts = data.top_discounts;
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
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/landing-page?format=json",
        config
      );

      return data;
    } catch (error) {
      console.error("Error fetching landing page data:", error);
      throw error;
    }
  }
);

export default landingPageSlice.reducer;

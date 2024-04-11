import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  categoryProducts: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.categories = payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getCategories.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(getProductByCategory.fulfilled, (state, { payload }) => {
        state.categoryProducts = payload.results;
        state.loading = false;
        state.error = false;
      })
      .addCase(getProductByCategory.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getProductByCategory.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const getCategories = createAsyncThunk("categories/get", async () => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/categories",
      config
    );

    return data;
  } catch (error) {
    throw error;
  }
});

export const getProductByCategory = createAsyncThunk(
  "categories/getProductsByCategory",
  async ({ category_id, feature, options = "" }) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const query =
        category_id !== null ? `category=${category_id}` : `feature=${feature}`;

      if (options !== "") {
        options = "&" + options;
      }

      const { data } = await axios.get(
        `http://localhost:8000/api/v1/products?${query + options}`,
        config
      );

      return data;
    } catch (error) {
      throw error;
    }
  }
);

export default categorySlice.reducer;

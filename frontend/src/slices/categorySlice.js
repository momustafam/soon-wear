import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  category: "",
  categories: [],
  categoryProducts: [],
  next: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.fulfilled, (state, { payload }) => {
        state.category = payload.name;
      })
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
        state.next = payload.next;
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
      })
      .addCase(addMoreProducts.fulfilled, (state, { payload }) => {
        state.categoryProducts = [
          ...state.categoryProducts,
          ...payload.results,
        ];
        state.next = payload.next;
      });
  },
});

export const getCategory = createAsyncThunk("category/get", async (id) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/categories/${id}`,
      config
    );

    return data;
  } catch (error) {
    throw error;
  }
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
  async ({ category_id, feature, name, options = "" }) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      let query = "";
      if (name) query = `search=${name}`;
      else if (category_id) query = `category=${category_id}`;
      else if (feature) query = `feature=${feature}`;

      if (options !== "") {
        options = "&" + options;
      }

      const url = `http://localhost:8000/api/v1/products?${query + options}`;
      const { data } = await axios.get(url, config);

      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const addMoreProducts = createAsyncThunk(
  "categories/addMoreProducts",
  async (_, { getState }) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // get next from current state
      const {
        category: { next },
      } = getState();

      const { data } = await axios.get(next, config);

      return data;
    } catch (error) {
      throw error;
    }
  }
);

export default categorySlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {},
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    addFilter: (state, { payload }) => {
      const { name: type, value, checked } = payload;
      state.filters = {
        ...state.filters,
        [type]: {
          ...state.filters[type],
          [value]: checked,
        },
      };
    },

    resetFilter: (state) => {
      state.filters = {};
    },
  },
});

export default filtersSlice.reducer;
export const { addFilter, resetFilter } = filtersSlice.actions;

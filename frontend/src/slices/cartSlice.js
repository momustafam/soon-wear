import { createSlice } from "@reduxjs/toolkit";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cartItems: cartItemsFromStorage,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const item = { ...payload.product }; // Create a copy of product object
      const size = payload.size;
      const countInStock = payload.countInStock;
      const newItem = { ...item, size, countInStock, qty: 1 }; // Create a new object with 'size' property added
      const existItem = state.cartItems.find((x) => x.id === newItem.id);

      if (existItem) {
        if (existItem.size != newItem.size) {
          state.cartItems = [...state.cartItems, newItem];
        } else {
          state.cartItems = state.cartItems.map((x) =>
            x.id === existItem.id ? newItem : x
          );
        }
      } else {
        state.cartItems = [...state.cartItems, newItem];
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      console.log(action.payload.id, action.payload.size);
      state.cartItems = state.cartItems.filter(
        (x) =>
          x.id !== parseInt(action.payload.id) || x.size !== action.payload.size
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    resetCartItems: (state) => {
      localStorage.removeItem("cartItems");
      state.cartItems = [];
    },
    addKeyToCart: (state, { payload }) => {
      // Find the index of the product in cartItems array
      const index = state.cartItems.findIndex(
        (item) => item.id === payload.id && item.size === payload.size
      );

      if (index !== -1) {
        // If the product is found, update it by adding the new key-value pair
        state.cartItems[index] = {
          ...state.cartItems[index],
          [payload.key]: payload.value,
        };
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, resetCartItems, addKeyToCart } =
  cartSlice.actions;

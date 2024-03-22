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
      const qty = payload.qty;
      const newItem = { ...item, size, qty }; // Create a new object with 'size' property added
      const existItem = state.cartItems.find((x) => x.id === newItem.id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.id === existItem.id ? newItem : x
        );
      } else {
        state.cartItems = [...state.cartItems, newItem];
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.id !== parseInt(action.payload)
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    resetCartItems: (state) => {
      localStorage.removeItem("cartItems");
      state.cartItems = [];
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(addToCart.fulfilled, (state, { payload }) => {
  //       const item = payload;
  //       const existItem = state.cartItems.find((x) => x.product === item.product);

  //       if (existItem) {
  //         state.cartItems = state.cartItems.map((x) =>
  //           x.product === existItem.product ? item : x
  //         );
  //       } else {
  //         state.cartItems = [...state.cartItems, item];
  //       }

  //       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  //     });
  //   },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, resetCartItems } = cartSlice.actions;

import { configureStore } from "@reduxjs/toolkit";
import landingPageReducer from "./slices/landingPageSlice";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    landingPage: landingPageReducer,
    cart: cartReducer,
  },
});

export default store;

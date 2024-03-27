import { configureStore } from "@reduxjs/toolkit";
import landingPageReducer from "./slices/landingPageSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    landingPage: landingPageReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export default store;

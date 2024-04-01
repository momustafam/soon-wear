import { configureStore } from "@reduxjs/toolkit";
import landingPageReducer from "./slices/landingPageSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import categoryReducer from "./slices/categorySlice";

const store = configureStore({
  reducer: {
    landingPage: landingPageReducer,
    cart: cartReducer,
    order: orderReducer,
    category: categoryReducer,
  },
});

export default store;

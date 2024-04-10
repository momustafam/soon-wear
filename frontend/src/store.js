import { configureStore } from "@reduxjs/toolkit";
import landingPageReducer from "./slices/landingPageSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import categoryReducer from "./slices/categorySlice";
import colorReducer from "./slices/colorSlice";
import sizeReducer from "./slices/sizeSlice";
import productDetailsReducer from "./slices/productDetailsSlice";

const store = configureStore({
  reducer: {
    landingPage: landingPageReducer,
    cart: cartReducer,
    order: orderReducer,
    category: categoryReducer,
    color: colorReducer,
    size: sizeReducer,
    productDetails: productDetailsReducer,
  },
});

export default store;

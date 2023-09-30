import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/userSlice";
import productReducer from "./slices/products/productSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
  },
});
export default store;

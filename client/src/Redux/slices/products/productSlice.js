import { createSlice } from "@reduxjs/toolkit";
import {
  addProductAction,
  getProductAction,
  deleteProductAction,
  editProductAction,
  addProductImageAction,
  updateStatusProductAction,
  getSingleProductAction
} from "./productAction";
const initialState = {
  products: [],
  loading: false,
  error: null,
  product: {},
  productImages: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addProductAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addProductAction.fulfilled, (state, action) => {
      state.product = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addProductAction.rejected, (state, action) => {
      state.product.error = action.payload;
      state.loading = false;
    });
    builder.addCase(getProductAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProductAction.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getProductAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteProductAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteProductAction.fulfilled, (state, action) => {
      state.product = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteProductAction.rejected, (state, action) => {
      state.product.error = action.payload;
      state.loading = false;
    });
    builder.addCase(editProductAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editProductAction.fulfilled, (state, action) => {
      state.product = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(editProductAction.rejected, (state, action) => {
      state.product.error = action.payload;
      state.loading = false;
    });
    builder.addCase(addProductImageAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addProductImageAction.fulfilled, (state, action) => {
      state.productImages = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addProductImageAction.rejected, (state, action) => {
      state.productImages.error = action.payload;
      state.loading = false;
    });
    builder.addCase(updateStatusProductAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateStatusProductAction.fulfilled, (state, action) => {
      state.product = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateStatusProductAction.rejected, (state, action) => {
      state.product.error = action.payload;
      state.loading = false;
    });
    builder.addCase(getSingleProductAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getSingleProductAction.fulfilled, (state, action) => {
      state.product = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getSingleProductAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

const productReducer = productSlice.reducer;
export default productReducer;

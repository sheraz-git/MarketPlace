import { createSlice } from "@reduxjs/toolkit";
import {
  userSignupAction,
  userLoginAction,
  userLogoutAction,
  getUserProfileAction,
  getAllUserAction,
  updateStatusUserAction,
} from "./userAction";

const initialState = {
  users: [],
  loading: false,
  error: null,
  profile: {},
  userAuth: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    loading: false,
    error: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(userSignupAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userSignupAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(userSignupAction.rejected, (state, action) => {
      state.userAuth.error = action.payload;
      state.loading = false;
    });
    builder.addCase(userLoginAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLoginAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(userLoginAction.rejected, (state, action) => {
      state.userAuth.error = action.payload;
      state.loading = false;
    });
    builder.addCase(userLogoutAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = null;
      state.loading = false;
    });
    builder.addCase(getUserProfileAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserProfileAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getUserProfileAction.rejected, (state, action) => {
      state.profile.error = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllUserAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllUserAction.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getAllUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(updateStatusUserAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateStatusUserAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateStatusUserAction.rejected, (state, action) => {
      state.userAuth.error = action.payload;
      state.loading = false;
    });
  },
});

const userReducer = userSlice.reducer;
export default userReducer;

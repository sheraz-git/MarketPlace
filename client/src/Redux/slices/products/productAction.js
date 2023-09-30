import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../baseURL";
import { createAxiosConfig } from "../token";

export const addProductImageAction = createAsyncThunk(
  "addImageProduct",
  async (formData, { rejectWithValue, getState }) => {
    try {
      const token = getState().user?.userAuth?.userInfo?.token;
      const config = createAxiosConfig(token);
      const response = await axios.post(
        `${baseURL}/productImagesCtrl`,formData,config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addProductAction = createAsyncThunk(
  "addProduct",
  async (values, { rejectWithValue, getState }) => {
    try {
      const seller = await getState().user?.userAuth?.userInfo?.data?._id;
      const token = getState().user?.userAuth?.userInfo?.token;
      const config = createAxiosConfig(token);
      const response = await axios.post(
        `${baseURL}/productAddCtrl`,
        { seller, ...values },
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductAction = createAsyncThunk(
  "getProduct",
  async (filters, { rejectWithValue, getState }) => {
     try {
      const token = getState().user?.userAuth?.userInfo?.token;
      const config = createAxiosConfig(token);
      const { data } = await axios.post(
        `${baseURL}/getAllProductBySellerId`,filters
        ,config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProductAction = createAsyncThunk(
  "deleteProduct",
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getState().user?.userAuth?.userInfo?.token;
      const config = createAxiosConfig(token);
      const response = await axios.delete(
        `${baseURL}/deleteProduct/${id}`,
        config
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editProductAction = createAsyncThunk(
  "editProduct",
  async ({ id, values }, { rejectWithValue, getState }) => {
    try {
      const token = getState().user?.userAuth?.userInfo?.token;
      const config = createAxiosConfig(token);
      const response = await axios.patch(
        `${baseURL}/updateProductInfo/${id}`,
        values,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStatusProductAction = createAsyncThunk(
  "updateStatusProduct",
  async ( {id, status} , { rejectWithValue, getState }) => {
    try {
      const token = getState().user?.userAuth?.userInfo?.token;
      const config = createAxiosConfig(token);
      const response = await axios.patch(
        `${baseURL}/updateProductStatus/${id}`,{status},
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSingleProductAction = createAsyncThunk(
  "getSingleProduct",
  async (id,{ rejectWithValue, getState }) => {
    try {
      const token = getState().user?.userAuth?.userInfo?.token;
      const config = createAxiosConfig(token);
      const response = await axios.get(
        `${baseURL}/getProductByIdCtrl/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


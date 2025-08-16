import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stage: "initial", // initial, identifying, verifying, verified
  data: {
    name: "",
    email: "",
    phone: "",
    verified: false,
    documents: [],
  },
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setStage: (state, action) => {
      state.stage = action.payload;
    },
    updateCustomerData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetCustomer: (state) => {
      return initialState;
    },
  },
});

export const {
  setStage,
  updateCustomerData,
  setLoading,
  setError,
  resetCustomer,
} = customerSlice.actions;

export default customerSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type InitialStateParams = {
  customer: {
    isAuthenticated: boolean;
    token: string;
    name: string;
    email: string;
    orders: Array<{
      price: string;
      name: string;
      bsft_id: string;
      image: string;
    }>;
  };
};

const initialState: InitialStateParams = {
  customer: {
    isAuthenticated: false,
    token: "",
    name: "",
    email: "",
    orders: [],
  },
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<{ token: string }>) => {
      state.customer.isAuthenticated = true;
      state.customer.token = action.payload.token;
      window.localStorage.setItem("@auth_token", action.payload.token);
    },

    signout: (state, action: PayloadAction) => {
      state.customer.isAuthenticated = false;
      state.customer.token = "";
      window.localStorage.removeItem("@auth_token");
    },
    setCustomerInfo: (
      state,
      action: PayloadAction<{
        email: string;
        name: string;
        orders: Array<{
          price: string;
          name: string;
          bsft_id: string;
          image: string;
        }>;
      }>
    ) => {
      state.customer.email = action.payload.email;
      state.customer.name = action.payload.name;
      state.customer.orders = action.payload.orders;
    },
  },
});

export const { authenticate, signout, setCustomerInfo } = customerSlice.actions;

export const selectCustomer = (state: RootState) => state.customerReducer;

export default customerSlice.reducer;

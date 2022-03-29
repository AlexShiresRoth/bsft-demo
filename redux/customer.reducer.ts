import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type InitialStateParams = {
  customer: {
    isAuthenticated: boolean;
    token: string;
  };
};

const initialState: InitialStateParams = {
  customer: {
    isAuthenticated: false,
    token: "",
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
  },
});

export const { authenticate, signout } = customerSlice.actions;

export const selectCustomer = (state: RootState) => state.customerReducer;

export default customerSlice.reducer;

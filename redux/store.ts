import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import customerReducer from "./customer.reducer";

export function makeStore() {
  return configureStore({
    reducer: {
      customerReducer,
    },
  });
}

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;

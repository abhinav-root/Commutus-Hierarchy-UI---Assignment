import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./employees/employeesSlice";

export const store = configureStore({
  reducer: {
    company: employeesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

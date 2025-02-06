import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
// import userReducer from "./userSlice";
import authReducer from "./authSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,

    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add RTK Query middleware
});

export default store;

import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import { apiSlice } from "./apiSlice.js";

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", apiSlice.reducerPath],
};

// Combine reducers
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
});

// Persist the reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

// Persistor for rehydration
export const persistor = persistStore(store);

export default store;

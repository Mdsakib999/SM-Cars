import { configureStore } from "@reduxjs/toolkit";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import authReducer, { setUser, clearUser } from "./authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import { apiSlice } from "./apiSlice.js";

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: [apiSlice.reducerPath],
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

// Listen for Firebase auth state changes
// onAuthStateChanged(auth, async (user) => {
//   console.log("Auth state changed:", user);
//   if (user) {
//     try {
//       const token = await user.getIdToken(true);
//       console.log("User Token:", token);
//       store.dispatch(
//         setUser({
//           user: {
//             _id: user._id,
//             email: user.email,
//             name: user.displayName || user.email,
//             role: user.role || "user",
//             uid: user.uid,
//           },
//           token,
//         })
//       );
//     } catch (error) {
//       console.error("Error fetching token:", error);
//     }
//   } else {
//     console.log("User is null, clearing state");
//     store.dispatch(clearUser());
//   }
// });

export default store;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Stores user information (e.g., email, name)
  token: null, // Stores authentication token
  loading: false, // Tracks loading state for async actions
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set user data and token when signup or login succeeds
    setUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false; // Set loading to false when data is set
    },
    // Action to clear user data and token when logging out
    clearUser(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
    },
    // Action to set loading state to true while signup/login is in progress
    setLoading(state) {
      state.loading = true;
    },
  },
});

export const { setUser, clearUser, setLoading } = authSlice.actions;

export default authSlice.reducer;

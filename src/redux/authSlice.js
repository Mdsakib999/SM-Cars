import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    clearUser(state) {
      console.log("Clearing user state but preserving persist state");
      state.user = null;
      state.token = null;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { setUser, clearUser, setLoading, clearLoading } =
  authSlice.actions;
export default authSlice.reducer;

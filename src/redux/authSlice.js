import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = {
        _id: action.payload.user._id,
        email: action.payload.user.email,
        name: action.payload.user.name,
        role: action.payload.user.role,
        subscription: action.payload.user.subscription,
        uid: action.payload.user.uid,
      };
      state.token = action.payload.token;
      state.loading = false;
    },
    clearUser(state) {
      console.log("Clearing user state but preserving persist state");
      state.user = null;
      state.token = null;
      state.loading = false;
    },
    setLoading(state) {
      state.loading = true;
    },
  },
});

export const { setUser, clearUser, setLoading } = authSlice.actions;
export default authSlice.reducer;

// Async function to check auth state
export const listenForAuthChanges = () => (dispatch) => {
  onAuthStateChanged(auth, (currentUser) => {
    dispatch(setUser(currentUser));
  });
};

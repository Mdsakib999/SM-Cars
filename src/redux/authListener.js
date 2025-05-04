import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";

import { auth } from "../firebase/firebase.config";
import store from "./store";
import { setUser, clearUser, setLoading } from "./authSlice";

let initialAuthCheckDone = false;

onAuthStateChanged(auth, async (firebaseUser) => {
  if (!initialAuthCheckDone) {
    store.dispatch(setLoading());
  }

  try {
    const state = store.getState();
    const persistedUser = state.auth.user;
    const persistedToken = state.auth.token;

    if (firebaseUser) {
      const token = await firebaseUser.getIdToken(true);
      if (!persistedUser || persistedUser.uid !== firebaseUser.uid) {
        const response = await fetch(
          `http://localhost:3000/api/users/${firebaseUser.uid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = await response.json();
        store.dispatch(setUser({ user: userData, token }));
      } else if (persistedToken !== token) {
        store.dispatch(setUser({ user: persistedUser, token }));
      }
    } else {
      store.dispatch(clearUser());
    }
  } catch (error) {
    console.error("Auth state error:", error);
    store.dispatch(clearUser());
  } finally {
    if (!initialAuthCheckDone) {
      initialAuthCheckDone = true;
    }
  }
});

onIdTokenChanged(auth, async (firebaseUser) => {
  try {
    const state = store.getState();

    // Only run initial check once
    if (!state.auth.initialized) {
      store.dispatch(setLoading());
    }

    if (firebaseUser) {
      const token = await firebaseUser.getIdToken();

      if (!state.auth.user || state.auth.user.uid !== firebaseUser.uid) {
        const response = await fetch(`/api/users/${firebaseUser.uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const userData = await response.json();
          store.dispatch(setUser({ user: userData, token }));
        } else {
          store.dispatch(clearUser());
        }
      } else if (state.auth.token !== token) {
        store.dispatch(setUser({ user: state.auth.user, token }));
      }
    } else {
      store.dispatch(clearUser());
    }
  } catch (error) {
    store.dispatch(clearUser());
  } finally {
    if (!store.getState().auth.initialized) {
      store.dispatch(setInitialized());
    }
  }
});

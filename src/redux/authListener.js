// authListener.js
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import store from "./store";
import { setUser, clearUser } from "./authSlice";

onAuthStateChanged(auth, async (firebaseUser) => {
  console.log("Auth state changed:", firebaseUser);

  if (firebaseUser) {
    try {
      const token = await firebaseUser.getIdToken(true);
      console.log("User Token:", token);

      const response = await fetch(
        `http://localhost:3000/api/users/${firebaseUser.uid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();

      if (userData && userData.role) {
        store.dispatch(
          setUser({
            user: {
              _id: userData._id,
              email: userData.email,
              name: userData.name,
              role: userData.role,
              uid: firebaseUser.uid,
              subscription: userData.subscription,
            },
            token,
          })
        );
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  } else {
    console.log("User is null, clearing state");
    store.dispatch(clearUser());
  }
});

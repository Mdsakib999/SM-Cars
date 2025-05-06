import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Email sign-up function
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // Sign-out function
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  const updateUserProfile = ({ name, photo }) =>
    updateProfile(auth.currentUser, { displayName: name, photoURL: photo });

  // Monitor the auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(false);
      console.log(currentUser);
      if (currentUser) {
        setUser(currentUser);
        const userData = {
          email: currentUser.email,
        };
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/users/get-token`,
          userData
        );
        const jwt = response.data.data.token;
        setToken(response.data.data.token);
        localStorage.setItem("accessToken", response.data.data.token);
        window.dispatchEvent(new Event("token-set"));

        const resp = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/users/me`,
          {
            headers: { Authorization: `Bearer ${jwt}` },
          }
        );
        console.log("user data", resp.data);
        setProfile(resp.data.data);
      } else {
        setUser(null);
        setProfile(null);
        localStorage.removeItem("accessToken");
        window.dispatchEvent(new Event("token-set"));
      }
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  // Context value
  const authInfo = {
    user,
    profile,
    token,
    loading,
    createUser,
    signIn,
    updateUserProfile,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

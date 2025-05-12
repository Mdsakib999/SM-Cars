// AuthProvider.jsx
import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword as firebaseUpdatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios";
import { useCreateUserInDBMutation } from "@/redux/apiSlice";

export const AuthContext = createContext(null);
const auth = getAuth(app);

export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const [createUserInDB] = useCreateUserInDBMutation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setFirebaseUser(user);

        // Rehydrate or fetch JWT
        let tok = localStorage.getItem("accessToken");
        if (!tok) {
          try {
            const { data: tokenResp } = await axios.post(
              `${import.meta.env.VITE_SERVER_URL}/api/users/get-token`,
              { email: user.email }
            );
            tok = tokenResp.data.token;
            localStorage.setItem("accessToken", tok);
          } catch (err) {
            console.error("Failed to get token:", err);
          }
        }
        setToken(tok);

        // Fetch user profile
        if (tok) {
          try {
            const { data: profileResp } = await axios.get(
              `${import.meta.env.VITE_SERVER_URL}/api/users/me`,
              { headers: { Authorization: `Bearer ${tok}` } }
            );
            setProfile(profileResp.data);
          } catch (err) {
            console.error("Failed to fetch profile:", err);
            setProfile(null);
            setToken(null);
            localStorage.removeItem("accessToken");
          }
        }
      } else {
        setFirebaseUser(null);
        setProfile(null);
        setToken(null);
        localStorage.removeItem("accessToken");
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const register = async ({ email, password, name, contact, role }) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name, photoURL: "" });
    await createUserInDB({ email, name, contact, picture: "", role }).unwrap();

    const { data: tokenResp } = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/users/get-token`,
      { email }
    );
    const tok = tokenResp.data.token;
    setToken(tok);
    localStorage.setItem("accessToken", tok);

    const { data: profileResp } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/users/me`,
      { headers: { Authorization: `Bearer ${tok}` } }
    );
    setProfile(profileResp.data);
  };

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);

    const { data: tokenResp } = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/users/get-token`,
      { email }
    );
    const tok = tokenResp.data.data.token;
    setToken(tok);
    localStorage.setItem("accessToken", tok);

    const { data: profileResp } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/users/me`,
      { headers: { Authorization: `Bearer ${tok}` } }
    );
    setProfile(profileResp.data);
  };

  const logOut = () => {
    signOut(auth);
    setProfile(null);
    setToken(null);
  };

  const updatePassword = async (currentPassword, newPassword) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user || !user.email) {
      throw new Error("No user logged in");
    }

    const cred = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, cred);
    await firebaseUpdatePassword(user, newPassword);
    await user.getIdToken(true);
  };
  const authInfo = {
    firebaseUser,
    profile,
    token,
    loading,
    register,
    login,
    logOut,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
      {loading && <div>Loading...</div>}
    </AuthContext.Provider>
  );
}
export default AuthProvider;

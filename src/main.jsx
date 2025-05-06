import React from "react";
import ReactDOM from "react-dom/client";
import "./firebase/firebase.config.js";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/routs.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./provider/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />

    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

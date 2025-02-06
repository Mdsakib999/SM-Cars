import React from "react";
import ReactDOM from "react-dom/client";
import "./firebase/firebase.config.js";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/routs.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);

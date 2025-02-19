import React from "react";
import ReactDOM from "react-dom/client";
import "./firebase/firebase.config.js";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/routs.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import "./redux/authListener.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading app...</div>} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

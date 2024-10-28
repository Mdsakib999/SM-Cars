import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Buy from "../pages/Buy/Buy";
import Sell from "../pages/Sell/Sell";
import Pricing from "../pages/Pricing/Pricing";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Car from "../pages/Car/Car";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/buy",
        element: <Buy></Buy>,
      },
      {
        path: "/sell",
        element: <Sell></Sell>,
      },
      {
        path: "/pricing",
        element: <Pricing></Pricing>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/car/:carId",
        element: <Car />,
      },
    ],
  },
]);

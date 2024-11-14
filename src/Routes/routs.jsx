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
import Dashboard from "../pages/Dashboard/Dashboard";

import MyCars from "../components/DashboardComponent/MyCars/MyCars";
import AddNewCar from "../components/DashboardComponent/AddNewCar/AddNewCar";

import Overview from "../pages/Dashboard/Buyer/Overview";
import BidHistory from "../pages/Dashboard/Buyer/BidHistory";
import SavedCars from "../pages/Dashboard/Buyer/SavedCars";
import SubscriptionPlan from "../pages/Dashboard/Buyer/SubscriptionPlan";
import MyWins from "../pages/Dashboard/Buyer/myWins";
import Settings from "../pages/Dashboard/Buyer/Settings";

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
        path: "/dashboard/:userRole",
        element: <Dashboard />,
        children: [
          // Buyer Routes
          { path: "overview", element: <Overview /> },
          { path: "bid-history", element: <BidHistory /> },
          { path: "saved-cars", element: <SavedCars /> },
          { path: "subscription-plan", element: <SubscriptionPlan /> },
          { path: "my-wins", element: <MyWins /> },

          { path: "my-cars", element: <MyCars /> },
          { path: "add-new-car", element: <AddNewCar /> },
          { path: "settings", element: <Settings /> },
        ],
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

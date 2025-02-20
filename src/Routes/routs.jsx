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

import BuyerOverview from "../pages/Dashboard/Buyer/BuyerOverview";
import SellerOverview from "../pages/Dashboard/Seller/SellerOverview";
import BidHistory from "../pages/Dashboard/Buyer/BidHistory";
import SavedCars from "../pages/Dashboard/Buyer/SavedCars";
import SubscriptionPlan from "../pages/Dashboard/General/SubscriptionPlan";
import MyWins from "../pages/Dashboard/Buyer/myWins";

import AddNewCar from "../pages/Dashboard/Seller/AddNewCar";
import MyCars from "../pages/Dashboard/Seller/MyCars";
import VerifyAccount from "../pages/Dashboard/Seller/VerifyAccount";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import BanUsers from "../pages/Dashboard/Admin/BanUsers";
import Settings from "../pages/Dashboard/General/Settings";
import Overview from "../pages/Dashboard/General/Overview";
import ManageListings from "../pages/Dashboard/Admin/ManageListings";
import Reports from "../pages/Dashboard/Admin/Reports";
import ManageSubscriptionPlans from "../pages/Dashboard/Admin/ManageSubscriptionPlans";
import AdminCarDetails from "../pages/Dashboard/Admin/AdminCarDetails";
import Checkout from "../pages/Checkout/Checkout";
import MyCarDetails from "../pages/Dashboard/Seller/MyCarDetails";

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
        path: "/checkout",
        element: <Checkout></Checkout>,
      },

      {
        path: "/dashboard/:userRole",
        element: <Dashboard />,
        children: [
          // Buyer Routes
          { path: "", element: <Overview /> },
          { path: "buyer-overview", element: <BuyerOverview /> },
          { path: "bid-history", element: <BidHistory /> },
          { path: "saved-cars", element: <SavedCars /> },
          { path: "subscription-plan", element: <SubscriptionPlan /> },
          { path: "my-wins", element: <MyWins /> },
          // Seller Routes
          { path: "seller-overview", element: <SellerOverview /> },
          { path: "my-cars", element: <MyCars /> },
          { path: "my-cars/:id", element: <MyCarDetails /> },
          { path: "add-new-car", element: <AddNewCar /> },
          { path: "verify-seller", element: <VerifyAccount /> },
          { path: "settings", element: <Settings /> },
          // Admin routes
          { path: "manage-users", element: <ManageUsers /> },
          { path: "manage-listings", element: <ManageListings /> },
          { path: "manage-biddings", element: <ManageUsers /> },
          { path: "admin-car-details/:carId", element: <AdminCarDetails /> },
          {
            path: "manage-subscriptions",
            element: <ManageSubscriptionPlans />,
          },
          { path: "reports", element: <Reports /> },
          { path: "ban-users", element: <BanUsers /> },
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

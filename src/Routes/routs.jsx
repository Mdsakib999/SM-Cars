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
import Checkout from "../pages/Checkout/Checkout";
import AuctionCars from "@/pages/AuctionCars/AuctionCars";

import BuyerOverview from "../pages/Dashboard/Buyer/BuyerOverview";
import BidHistory from "../pages/Dashboard/Buyer/BidHistory";
import SavedCars from "../pages/Dashboard/Buyer/SavedCars";
import MyWins from "../pages/Dashboard/Buyer/myWins";

import SellerOverview from "../pages/Dashboard/Seller/SellerOverview";
import AddNewCar from "../pages/Dashboard/Seller/AddNewCar";
import MyCars from "../pages/Dashboard/Seller/MyCars";
import VerifyAccount from "../pages/Dashboard/Seller/VerifyAccount";
import MyCarDetails from "@/pages/Dashboard/Seller/MyCarDetails";
import EditCar from "@/pages/Dashboard/Seller/EditCar";

import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import BanUsers from "../pages/Dashboard/Admin/BanUsers";
import ManageListings from "../pages/Dashboard/Admin/ManageListings";
import Reports from "../pages/Dashboard/Admin/Reports";
import ManageSubscriptionPlans from "../pages/Dashboard/Admin/ManageSubscriptionPlans";
import AdminCarDetails from "../pages/Dashboard/Admin/AdminCarDetails";
import UserDetails from "@/pages/Dashboard/Admin/UserDetails";

import Settings from "../pages/Dashboard/General/Settings";
import Overview from "../pages/Dashboard/General/Overview";
import SubscriptionPlan from "../pages/Dashboard/General/SubscriptionPlan";

import ProtectedRoute from "./ProtectedRoute";
import AuthLayout from "./AuthLayout";

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
        element: <AuthLayout />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/signup", element: <Signup /> },
        ],
      },

      {
        path: "/auction-cars",
        element: <AuctionCars></AuctionCars>,
      },
      {
        path: "/auction-cars/:carId",
        element: <Car />,
      },

      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          // Buyer Routes
          { path: "", element: <Overview /> },
          {
            path: "buyer-overview",
            element: (
              <ProtectedRoute requiredRole="buyer">
                <BuyerOverview />
              </ProtectedRoute>
            ),
          },
          {
            path: "bid-history",
            element: (
              <ProtectedRoute requiredRole="buyer">
                <BidHistory />
              </ProtectedRoute>
            ),
          },
          {
            path: "saved-cars",
            element: (
              <ProtectedRoute requiredRole="buyer">
                <SavedCars />
              </ProtectedRoute>
            ),
          },

          {
            path: "my-wins",
            element: (
              <ProtectedRoute requiredRole="buyer">
                <MyWins />
              </ProtectedRoute>
            ),
          },
          // Seller Routes
          {
            path: "seller-overview",
            element: (
              <ProtectedRoute requiredRole="seller">
                <SellerOverview />
              </ProtectedRoute>
            ),
          },
          {
            path: "my-cars",
            element: (
              <ProtectedRoute requiredRole="seller">
                <MyCars />
              </ProtectedRoute>
            ),
          },
          {
            path: "my-cars/:id",
            element: (
              <ProtectedRoute requiredRole="seller">
                <MyCarDetails />
              </ProtectedRoute>
            ),
          },
          {
            path: "add-new-car",
            element: (
              <ProtectedRoute requiredRole="seller">
                <AddNewCar />
              </ProtectedRoute>
            ),
          },
          {
            path: "edit-car/:id",
            element: (
              <ProtectedRoute requiredRole="seller">
                <EditCar />
              </ProtectedRoute>
            ),
          },
          {
            path: "verify-seller",
            element: (
              <ProtectedRoute requiredRole="seller">
                <VerifyAccount />
              </ProtectedRoute>
            ),
          },
          { path: "subscription-plan", element: <SubscriptionPlan /> },
          { path: "settings", element: <Settings /> },
          // Admin routes
          {
            path: "manage-users",
            element: (
              <ProtectedRoute requiredRole="admin">
                <ManageUsers />
              </ProtectedRoute>
            ),
          },
          {
            path: "manage-listings",
            element: (
              <ProtectedRoute requiredRole="admin">
                <ManageListings />
              </ProtectedRoute>
            ),
          },
          {
            path: "manage-biddings",
            element: (
              <ProtectedRoute requiredRole="admin">
                <ManageUsers />{" "}
              </ProtectedRoute>
            ),
          },
          {
            path: "admin-car-details/:carId",
            element: (
              <ProtectedRoute requiredRole="admin">
                <AdminCarDetails />
              </ProtectedRoute>
            ),
          },
          {
            path: "user-details/:userId",
            element: (
              <ProtectedRoute requiredRole="admin">
                <UserDetails></UserDetails>
              </ProtectedRoute>
            ),
          },
          {
            path: "manage-subscriptions",
            element: (
              <ProtectedRoute requiredRole="admin">
                <ManageSubscriptionPlans />
              </ProtectedRoute>
            ),
          },
          {
            path: "reports",
            element: (
              <ProtectedRoute requiredRole="admin">
                <Reports />{" "}
              </ProtectedRoute>
            ),
          },
          {
            path: "ban-users",
            element: (
              <ProtectedRoute requiredRole="admin">
                <BanUsers />
              </ProtectedRoute>
            ),
          },
          { path: "settings", element: <Settings /> },
        ],
      },
    ],
  },
]);

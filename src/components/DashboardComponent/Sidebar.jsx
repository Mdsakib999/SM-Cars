// src/components/Sidebar.jsx
import React, { useEffect, useContext } from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineDollarCircle,
  AiOutlineCar,
  AiOutlineUserDelete,
  AiOutlineSafety,
  AiOutlineMessage,
} from "react-icons/ai";
import { FiBarChart } from "react-icons/fi";
import { CiBookmark, CiSettings, CiBoxList } from "react-icons/ci";
import { SlHome } from "react-icons/sl";
import { GoHistory } from "react-icons/go";
import {
  IoAddCircleOutline,
  IoHammerOutline,
  IoCarOutline,
} from "react-icons/io5";
import { AuthContext } from "@/provider/AuthProvider";
import Logo from "/logo.png";

const sidebarMenu = {
  buyer: [
    { name: "Dashboard", path: "", icon: <SlHome /> },
    { name: "Bid History", path: "bid-history", icon: <GoHistory /> },
    { name: "Auction Cars", path: "auction-cars", icon: <IoCarOutline /> },
    {
      name: "Subscription Plan",
      path: "subscription-plan",
      icon: <AiOutlineDollarCircle />,
    },
    { name: "Settings", path: "settings", icon: <CiSettings /> },
  ],
  seller: [
    { name: "Dashboard", path: "seller-overview", icon: <SlHome /> },
    { name: "My Cars", path: "my-cars", icon: <AiOutlineCar /> },
    { name: "Add New Car", path: "add-new-car", icon: <IoAddCircleOutline /> },
    {
      name: "Verify Account",
      path: "verify-seller",
      icon: <AiOutlineSafety />,
    },
    {
      name: "Subscription Plan",
      path: "subscription-plan",
      icon: <AiOutlineDollarCircle />,
    },
    { name: "Settings", path: "settings", icon: <CiSettings /> },
  ],
  admin: [
    { name: "Manage Users", path: "manage-users", icon: <AiOutlineUser /> },
    {
      name: "Manage Subscriptions",
      path: "manage-subscriptions",
      icon: <CiBookmark />,
    },
    { name: "Manage Listings", path: "manage-listings", icon: <CiBoxList /> },
    {
      name: "Manage Auctions",
      path: "manage-auctions",
      icon: <IoHammerOutline />,
    },
    { name: "Reports", path: "reports", icon: <FiBarChart /> },
    { name: "Leads", path: "leads", icon: <AiOutlineMessage /> },
    { name: "Ban Users", path: "ban-users", icon: <AiOutlineUserDelete /> },
    { name: "Settings", path: "settings", icon: <CiSettings /> },
  ],
};

const Sidebar = ({ setActiveSection }) => {
  const { profile, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="fixed inset-y-0 left-0 flex items-center justify-center w-20 lg:w-64 bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500"></div>
      </div>
    );
  }

  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  const menuItems = sidebarMenu[profile.role] || [];
  const segments = location.pathname.split("/").filter(Boolean);
  const activePath = segments[1] || "";
  const activeItem =
    menuItems.find((item) => item.path === activePath) || menuItems[0];

  useEffect(() => {
    if (activeItem) {
      setActiveSection(activeItem.name);
    }
  }, [activeItem, setActiveSection]);

  return (
    <div className="fixed inset-y-0 left-0 bg-white text-black h-full border p-4 w-20 lg:w-64 overflow-y-auto">
      <div className="flex flex-col items-center lg:items-start">
        <div className="flex items-center justify-center lg:justify-between w-full mb-12 mt-4">
          <Link to="/" onClick={() => setActiveSection("Dashboard")}>
            <img
              className="w-[45px] lg:w-[55px] rounded-full"
              src={Logo}
              alt="Logo"
            />
          </Link>
        </div>
        <nav className="space-y-6 flex flex-col w-full">
          {menuItems.map((item) => {
            const isActive = item.name === activeItem?.name;
            return (
              <Link
                key={item.name}
                to={`/dashboard/${item.path}`}
                onClick={() => setActiveSection(item.name)}
                className={`relative flex items-center space-x-2 p-2 rounded w-full transition-colors ${
                  isActive
                    ? "text-orange-500 bg-orange-50"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {isActive && (
                  <div className="absolute -left-5 top-0 bottom-0 w-2 rounded-md bg-orange-500" />
                )}
                <span
                  className={isActive ? "text-orange-500" : "text-gray-500"}
                >
                  {item.icon}
                </span>
                <span className="hidden lg:block ml-2">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

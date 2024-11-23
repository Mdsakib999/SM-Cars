import { useState } from "react";
import {
  AiOutlineUser,
  AiOutlineDollarCircle,
  AiOutlineCar,
  AiOutlineUserDelete,
  AiOutlineSafety,
} from "react-icons/ai";
import { FiChevronRight, FiChevronLeft, FiBarChart } from "react-icons/fi";
import { CiBookmark, CiSettings, CiMedal, CiBoxList } from "react-icons/ci";
import { SlHome } from "react-icons/sl";
import { GoHistory } from "react-icons/go";
import { IoAddCircleOutline, IoHammerOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const sidebarMenu = {
  buyer: [
    { name: "Dashboard", path: "", icon: <SlHome /> },
    { name: "Bid History", path: "bid-history", icon: <GoHistory /> },
    { name: "Saved Cars", path: "saved-cars", icon: <CiBookmark /> },
    {
      name: "Subscription Plan",
      path: "subscription-plan",
      icon: <AiOutlineDollarCircle />,
    },
    { name: "My Wins", path: "my-wins", icon: <CiMedal /> },
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
      name: "Manage Listings",
      path: "manage-listings",
      icon: <CiBoxList />,
    },
    {
      name: "Manage Biddings",
      path: "manage-biddings",
      icon: <IoHammerOutline />,
    },
    {
      name: "Reports",
      path: "reports",
      icon: <FiBarChart />,
    },
    { name: "Ban Users", path: "ban-users", icon: <AiOutlineUserDelete /> },
    { name: "Settings", path: "settings", icon: <CiSettings /> },
  ],
};

const Sidebar = ({ setActiveSection, userRole }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  //
  // const menuItems = sidebarMenu[userRole] || [];
  const menuItems = [
    ...sidebarMenu.buyer,
    ...sidebarMenu.seller,
    ...sidebarMenu.admin,
  ];

  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  return (
    <div
      className={`fixed inset-y-0 left-0 bg-white text-black h-full border p-4 transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-20"
      } lg:w-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-md`}
    >
      <div className="flex flex-col items-center lg:items-start">
        <div className="flex items-center justify-between w-full mb-12 mt-4 ml-4">
          {(isExpanded || (!isExpanded && window.innerWidth >= 1024)) && (
            <h2 className="text-xl lg:text-3xl font-md transition-opacity duration-300 lg:hidden">
              SMCARS
            </h2>
          )}
          <h2 className="hidden text-xl lg:text-3xl font-md transition-opacity duration-300 md:block">
            SMCARS
          </h2>

          <button
            onClick={toggleSidebar}
            className="lg:hidden text-2xl focus:outline-none"
          >
            {isExpanded ? <FiChevronLeft /> : <FiChevronRight />}
          </button>
        </div>

        <nav className="space-y-10 flex flex-col w-full">
          {/* User role */}

          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={`/dashboard/${userRole}/${item.path}`}
              onClick={() => {
                setActiveItem(index);
                setActiveSection(item.name);
              }}
              className={`relative flex items-center space-x-2 p-2 rounded w-full text-md lg:text-xl ${
                activeItem === index ? "text-orange-500" : "text-gray-500"
              }`}
            >
              {activeItem === index && (
                <div className="absolute -left-5 top-0 bottom-0 w-2 rounded-md bg-orange-500"></div>
              )}

              <span
                className={
                  activeItem === index
                    ? "text-black text-xl lg:text-2xl"
                    : "text-gray-500 text-xl lg:text-2xl"
                }
              >
                {item.icon}
              </span>

              <span
                className={`ml-2 ${isExpanded ? "block" : "hidden"} lg:block ${
                  activeItem === index ? "text-orange-500" : "text-gray-500"
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

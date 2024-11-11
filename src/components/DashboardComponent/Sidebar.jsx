import { useState } from "react";
import {
  AiOutlineUser,
  AiOutlineDollarCircle,
  AiOutlineCar,
  AiOutlineUserDelete,
  AiOutlineSafety,
} from "react-icons/ai";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { CiBookmark, CiSettings, CiMedal } from "react-icons/ci";
import { SlHome } from "react-icons/sl";
import { GoHistory } from "react-icons/go";
import { IoAddCircleOutline } from "react-icons/io5";

const sidebarMenu = {
  buyer: [
    { name: "Dashboard", icon: <SlHome /> },
    { name: "Bid History", icon: <GoHistory /> },
    { name: "Saved Cars", icon: <CiBookmark /> },
    { name: "Subscription Plan", icon: <AiOutlineDollarCircle /> },
    { name: "Winning Bids", icon: <CiMedal /> },
    { name: "Settings", icon: <CiSettings /> },
  ],
  seller: [
    { name: "Dashboard", icon: <SlHome /> },
    { name: "My Cars", icon: <AiOutlineCar /> },
    { name: "Add New Car", icon: <IoAddCircleOutline /> },
    { name: "Verify Account", icon: <AiOutlineSafety /> },
    { name: "Subscription Plan", icon: <AiOutlineDollarCircle /> },
    { name: "Settings", icon: <CiSettings /> },
  ],
  admin: [
    { name: "Manage Users", icon: <AiOutlineUser /> },
    { name: "Ban Users", icon: <AiOutlineUserDelete /> },
    { name: "Settings", icon: <CiSettings /> },
  ],
};

const Sidebar = ({ setActiveSection, userRole }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const menuItems = sidebarMenu[userRole] || [];

  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  return (
    <div
      className={`fixed inset-y-0 left-0 bg-white text-black h-full p-4 transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-20"
      } lg:w-64`}
    >
      <div className="flex flex-col items-center lg:items-start">
        <div className="flex items-center justify-between w-full mb-12 mt-4 ml-4">
          {(isExpanded || (!isExpanded && window.innerWidth >= 1024)) && (
            <h2 className="text-3xl font-md transition-opacity duration-300 lg:hidden">
              SMCARS
            </h2>
          )}
          <h2 className="hidden text-3xl font-md transition-opacity duration-300 md:block">
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
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              onClick={() => {
                setActiveItem(index); // Highlight active item in sidebar
                setActiveSection(item.name); // Set active section name in Dashboard
              }}
              className={`relative flex items-center space-x-2 p-2 rounded w-full text-xl ${
                activeItem === index ? "text-orange-500" : "text-gray-500"
              }`}
            >
              {activeItem === index && (
                <div className="absolute -left-5 top-0 bottom-0 w-2 rounded-md bg-orange-500"></div>
              )}

              <span
                className={
                  activeItem === index
                    ? "text-black text-3xl"
                    : "text-gray-500 text-3xl"
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
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

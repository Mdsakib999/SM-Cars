import React from "react";
import { FiUser } from "react-icons/fi"; // Example icon for profile

const DashboardNav = ({ sectionName, userName }) => {
  return (
    <div className="flex items-center justify-between p-4  bg-white  py-8">
      {/* Section Name */}
      <h2 className="text-2xl font-semibold">{sectionName}</h2>

      {/* User Profile */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">{userName}</span>
        <FiUser className="text-3xl text-gray-600" />
      </div>
    </div>
  );
};

export default DashboardNav;

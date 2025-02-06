import React from "react";
import { FiUser } from "react-icons/fi"; // Example icon for profile

const DashboardNav = ({ sectionName }) => {
  return (
    <div className="flex items-center justify-between px-4  bg-white  py-4 w-full fixed">
      {/* Section Name */}
      <h2 className="text-md lg:text-2xl font-semibold">{sectionName}</h2>

      {/* User Profile */}
      <div className="flex flex-col items-end space-x-4">
        <FiUser className="text-5xl text-gray-600 px-2 border rounded-full" />
      </div>
    </div>
  );
};

export default DashboardNav;

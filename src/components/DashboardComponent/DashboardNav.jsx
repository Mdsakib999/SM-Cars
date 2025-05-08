import React, { useContext } from "react";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/provider/AuthProvider";

const DashboardNav = ({ sectionName }) => {
  const { profile, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 bg-white py-4 w-full fixed">
      {/* Section Name + Logout Button */}
      <div className="flex items-center gap-4 w-[80%]">
        <h2 className="text-md lg:text-2xl font-semibold">{sectionName}</h2>
        <button
          className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* User Profile Icon */}
      {profile ? (
        <div className="flex items-center space-x-2">
          <FiUser className="text-4xl text-gray-600 p-1 border rounded-full" />
          <div className="text-right">
            <p className="font-medium">{profile.name || profile.email}</p>
            <p className="text-sm text-gray-500 capitalize">{profile.role}</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-600">No user signed in</p>
      )}
    </div>
  );
};

export default DashboardNav;

import React from "react";
import { FiUser } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/apiSlice";
import { clearUser } from "../../redux/authSlice";
import { apiSlice } from "../../redux/apiSlice";
import { persistor } from "../../redux/store";
const DashboardNav = ({ sectionName }) => {
  // Read the user directly from Redux
  const user = useSelector((state) => state.auth.user);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (!user) {
      console.log("No user is signed in.");
      return;
    }
    try {
      await logout().unwrap();

      await signOut(auth);

      dispatch(clearUser());

      await persistor.purge();
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 bg-white py-4 w-full fixed">
      {/* Section Name */}
      <div className="flex items-center justify-between w-[80%]">
        <h2 className="text-md lg:text-2xl font-semibold">{sectionName}</h2>
        <button
          className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-white w-[80px]"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* User Profile */}
      {user ? (
        <div className="flex flex-col items-end space-x-4">
          <FiUser className="text-5xl text-gray-600 px-2 border rounded-full" />
        </div>
      ) : (
        <div className="flex flex-col items-end space-x-4">
          <p className="text-sm text-gray-600">No user signed in</p>
        </div>
      )}
    </div>
  );
};

export default DashboardNav;

import React from "react";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="border p-4 flex flex-col lg:flex-row justify-between items-center rounded-xl bg-white col-span-2 md:col-span-4">
      <div className="flex items-center lg:space-x-4">
        <img
          src="https://placehold.co/60x60"
          alt="profile-pic"
          className="rounded-full w-20 hidden lg:block"
        />
        <div>
          <span className="block text-gray-600 tracking-wide leading-4">
            Welcome back,
          </span>
          <h2 className="text-xl lg:text-2xl font-medium">{user?.name}</h2>
          <span className="text-gray-600 tracking-wide">{user?.email}</span>
        </div>
      </div>
      <button className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-white w-[150px]">
        Settings
      </button>
    </div>
  );
};

export default ProfileCard;

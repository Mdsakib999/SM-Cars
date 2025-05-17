import { AuthContext } from "@/provider/AuthProvider";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileCard = () => {
  const { profile, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="border p-4 flex flex-col lg:flex-row justify-between items-center rounded-xl bg-white col-span-2 md:col-span-4 animate-pulse">
        <div className="flex items-center lg:space-x-4">
          <Skeleton circle height={60} width={60} className="hidden lg:block" />
          <div className="space-y-2">
            <Skeleton height={16} width={100} />
            <Skeleton height={24} width={150} />
            <Skeleton height={16} width={200} />
          </div>
        </div>
        <Skeleton height={36} width={150} />
      </div>
    );
  }
  return (
    <div className="border p-4 flex flex-col lg:flex-row justify-between items-center rounded-xl bg-white col-span-2 md:col-span-4">
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-4 space-y-4 lg:space-y-0">
        <div
          className="
      w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gray-300 border-4 border-white flex items-center justify-center text-2xl lg:text-3xl font-bold text-white"
        >
          {profile.name?.charAt(0).toUpperCase()}
        </div>

        {/* Text */}
        <div className="text-center lg:text-left">
          <span className="block text-gray-600 tracking-wide leading-4">
            Welcome back,
          </span>
          <h2 className="text-lg lg:text-2xl font-medium">{profile?.name}</h2>
          <span className="text-gray-600 tracking-wide block">
            {profile?.email}
          </span>
        </div>
      </div>

      <Link to="/dashboard/settings">
        <button className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-white w-[150px]">
          Settings
        </button>
      </Link>
    </div>
  );
};

export default ProfileCard;

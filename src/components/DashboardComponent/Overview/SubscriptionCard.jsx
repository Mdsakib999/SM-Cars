import React, { useContext } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import { Link } from "react-router-dom";
const SubscriptionCard = () => {
  const { profile, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="text-center py-6">Loading subscription plans...</div>
    );
  }

  if (loading) {
    return (
      <div className="border p-4 flex flex-col justify-between rounded-xl bg-white col-span-2 md:col-span-2 animate-pulse">
        <div>
          <Skeleton height={32} width={200} />
          <Skeleton height={16} width={150} className="mt-2" />
          <hr className="border-t border-gray-200 my-4" />
        </div>
        <Skeleton height={20} width={120} />
        <Skeleton height={48} width={100} className="mb-4 ml-8" />
        <Skeleton height={40} width={`100%`} />
      </div>
    );
  }

  return (
    <div className="border p-4 flex flex-col justify-between rounded-xl bg-white col-span-2 md:col-span-2">
      <div>
        <h2 className="text-2xl font-medium mb-2">Subscription Plan</h2>
        <span className="text-gray-600 mb-4">
          View and manage your subscription
        </span>

        <hr className="border-t border-gray-200 mt-2" />
      </div>
      <span className="text-md font-sm text-gray-700 tracking-wide">
        Current Plan
      </span>
      <span className="text-5xl text-orange-500 tracking-wider ml-8">
        {profile?.subscription?.name}
      </span>
      <Link to="/dashboard/subscription-plan">
        <button className="border px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-white w-full">
          Manage Subscription
        </button>
      </Link>
    </div>
  );
};

export default SubscriptionCard;

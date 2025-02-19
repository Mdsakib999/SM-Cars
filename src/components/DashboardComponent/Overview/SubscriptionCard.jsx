import React from "react";
import { useSelector } from "react-redux";
import { useGetUserSubscriptionQuery } from "../../../redux/apiSlice";
const SubscriptionCard = () => {
  const uid = useSelector((state) => state.auth.user?.uid);
  const { data, isLoading, error } = useGetUserSubscriptionQuery(uid);
  if (isLoading) {
    return (
      <div className="text-center py-6">Loading subscription plans...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6 text-red-500">Error loading plans</div>
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
        {data?.name}
      </span>
      <button className="border px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-white w-full">
        Manage Subscription
      </button>
    </div>
  );
};

export default SubscriptionCard;

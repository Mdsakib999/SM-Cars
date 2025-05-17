import React, { useContext } from "react";
import { useGetBuyerLimitQuery } from "@/redux/apiSlice";
import { AuthContext } from "@/provider/AuthProvider";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RemainingBidsOverview = () => {
  const { profile, loading: authLoading } = useContext(AuthContext);
  const { data, isLoading, isError } = useGetBuyerLimitQuery(profile._id, {
    skip: authLoading,
  });

  if (authLoading || isLoading) {
    return (
      <div className="border p-4 flex flex-col justify-between rounded-xl bg-white col-span-2 md:col-span-2 animate-pulse">
        <div>
          <Skeleton height={24} width={150} />
          <Skeleton height={16} width={200} className="mt-2" />
          <hr className="border-t border-gray-200 my-4" />
        </div>
        <Skeleton height={80} width={100} className="mb-4 ml-8" />
        <Skeleton height={40} width={`100%`} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-6 text-red-500">Error loading bids</div>
    );
  }

  const remaining = data?.remaining;

  return (
    <div className="border p-4 flex flex-col justify-between rounded-xl bg-white col-span-2 md:col-span-2">
      <div>
        <h2 className="text-xl font-medium mb-2">Bids Remaining</h2>
        <span className="text-gray-600 mb-4">
          Track the number of bids remaining
        </span>
        <hr className="border-t border-gray-200 mt-2" />
      </div>

      <h1 className="text-8xl font-md text-orange-500 mb-4 ml-8">
        {remaining ?? 0}
      </h1>
      {remaining >= 0 ? (
        <Link to="/dashboard/auction-cars/">
          <button className="border px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-white w-full">
            Bid Now
          </button>
        </Link>
      ) : (
        <Link to="/dashboard/subscription-plan">
          <button className="border px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-white w-full">
            Upgrade
          </button>
        </Link>
      )}
    </div>
  );
};

export default RemainingBidsOverview;

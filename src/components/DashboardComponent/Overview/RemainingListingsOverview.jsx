import React, { useContext } from "react";
import { useGetSellerLimitQuery } from "../../../redux/apiSlice";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/provider/AuthProvider";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RemainingListingsOverview = () => {
  const { profile } = useContext(AuthContext);
  const uid = profile?._id;

  const navigate = useNavigate();
  const { data, isLoading, error } = useGetSellerLimitQuery(uid);

  const remaining = data?.remaining ?? 0;

  if (isLoading) {
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

  return (
    <div className="border p-4 flex flex-col justify-between rounded-xl bg-white col-span-2 md:col-span-2">
      <div>
        <h2 className="text-xl font-medium mb-2">Listing Remaining</h2>
        <span className="text-gray-600 mb-4">
          Track the number of listings remaining
        </span>
        <hr className="border-t border-gray-200 mt-2" />
      </div>

      <h1 className="text-8xl font-md text-orange-500 mb-4 ml-8">
        {remaining}
      </h1>

      {remaining > 0 ? (
        <button
          onClick={() => navigate("/dashboard/add-new-car")}
          className="border px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-white w-full"
        >
          Upload a Car for Sale
        </button>
      ) : (
        <Link to="/dashboard/subscription-plan">
          <button
            onClick={() => navigate("/dashboard/subscription-plan")}
            className="border px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-white w-full"
          >
            Upgrade Subscription
          </button>
        </Link>
      )}
    </div>
  );
};

export default RemainingListingsOverview;

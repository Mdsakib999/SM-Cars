import React from "react";
import { useSelector } from "react-redux";
import { useGetSellerLimitQuery } from "../../../redux/apiSlice";
import { useNavigate } from "react-router-dom";

const RemainingListingsOverview = () => {
  const uid = useSelector((state) => state.auth.user?._id);
  console.log("seller id", uid);
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetSellerLimitQuery(uid);
  console.log(data);

  if (isLoading) {
    return <p>Loading your listing limit...</p>;
  }
  if (error || !data) {
    return <p>Error fetching listing limit.</p>;
  }

  const { remaining, limit, used } = data;
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
          onClick={() => navigate("/seller/add-car")}
          className="border px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-white w-full"
        >
          Upload a Car for Sale
        </button>
      ) : (
        <button
          onClick={() => navigate("/subscription-plan")}
          className="border px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-white w-full"
        >
          Upgrade Subscription
        </button>
      )}
    </div>
  );
};

export default RemainingListingsOverview;

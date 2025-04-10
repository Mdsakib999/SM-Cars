import React from "react";
import { useSelector } from "react-redux";
import { useGetBuyerLimitQuery } from "@/redux/apiSlice";

const RemainingBidsOverview = () => {
  const user = useSelector((state) => state.auth.user);
  const { data, isLoading, isError } = useGetBuyerLimitQuery(user._id);
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
        {data?.remaining}
      </h1>
      <button className="border px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-white w-full">
        Upgrade
      </button>
    </div>
  );
};

export default RemainingBidsOverview;

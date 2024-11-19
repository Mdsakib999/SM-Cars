import React from "react";

const RemainingListingsOverview = () => {
  return (
    <div className="border p-4 flex flex-col justify-between rounded-xl bg-white col-span-2 md:col-span-2">
      <div>
        <h2 className="text-xl font-medium mb-2">Listing Remaining</h2>
        <span className="text-gray-600 mb-4">
          Track the number of listings remaining
        </span>
        <hr className="border-t border-gray-200 mt-2" />
      </div>

      <h1 className="text-8xl font-md text-orange-500 mb-4 ml-8">0</h1>
      <button className="border px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-white w-full">
        Upgrade
      </button>
    </div>
  );
};

export default RemainingListingsOverview;

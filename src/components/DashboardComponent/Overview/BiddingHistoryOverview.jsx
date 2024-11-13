import React from "react";

const BiddingHistoryOverview = () => {
  return (
    <div className="border p-4 flex flex-col justify-between rounded-xl bg-white col-span-1 md:col-span-2">
      <h2 className="text-2xl font-medium mb-2">Bidding History</h2>
      <span className="text-gray-600 mb-4">
        Review your recent bidding activity
      </span>
      <hr className="border-t border-gray-200 mb-4" />
      <div className="flex items-center mb-4">
        {/* Car Image */}
        <img
          src="https://images.unsplash.com/photo-1683403792818-a48b86226939?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with actual image source
          alt="Car"
          className="w-16 h-16 rounded-lg object-cover"
        />

        {/* Bid Details */}
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-semibold">Car Name</h3>
          <div className="text-gray-600 text-sm">Your Bid: $15,000</div>
          <div className="flex items-center mt-1">
            <span>Ongoing</span>
          </div>
        </div>
      </div>
      <button className="border px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-white w-full">
        View History
      </button>
    </div>
  );
};

export default BiddingHistoryOverview;

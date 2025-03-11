import React from "react";
import { BsCheckCircle, BsXCircle, BsArrowRepeat } from "react-icons/bs";
import { useGetBiddedCarsQuery } from "@/redux/apiSlice";

const BidHistory = () => {
  // Fetch bidded cars
  const { data, isLoading, isError } = useGetBiddedCarsQuery();
  console.log(data);

  if (isLoading) {
    return <div className="text-center text-lg font-medium">Loading...</div>;
  }

  if (isError || !data) {
    return (
      <div className="text-center text-red-500 font-medium">
        Failed to load bidding history.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-medium mb-4">Bidding History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.biddedCars?.map((bid, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl overflow-hidden flex flex-col"
          >
            {/* Car Image */}
            <img
              className="w-full h-48 object-cover"
              src={bid.image?.url}
              alt={bid.carName}
            />

            {/* Bid Details */}
            <div className="p-4 flex flex-col justify-between flex-1">
              <h3 className="text-lg font-semibold mb-2">{bid.carName}</h3>

              <div className="flex justify-between">
                <p className="text-md text-gray-700 mb-2">Last Bid</p>
                <p className="text-black text-lg">${bid.lastBid}</p>
              </div>

              <hr className="border border-b-2" />

              <div className="flex items-center mb-4 justify-between my-4">
                <p className="text-lg">Status</p>
                <div className="flex items-center">
                  {bid.status === "active" ? (
                    <BsCheckCircle className="text-green-500 text-xl mr-2" />
                  ) : (
                    <BsXCircle className="text-red-500 text-xl mr-2" />
                  )}
                  <span
                    className={`font-medium ${
                      bid.status === "active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {bid.status}
                  </span>
                </div>
              </div>

              {/* Bid Again Button */}
              {bid.status === "active" ? (
                <button className="w-full border px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white flex justify-center gap-4">
                  <BsArrowRepeat className="text-2xl" />
                  Bid Again
                </button>
              ) : (
                <button className="w-full border px-4 py-2 rounded-lg bg-gray-300 text-gray-600 cursor-not-allowed">
                  Auction Ended
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BidHistory;

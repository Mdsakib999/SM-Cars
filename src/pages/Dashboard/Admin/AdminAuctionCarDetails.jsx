import React from "react";
import { useParams } from "react-router-dom";
import { useGetAdminAuctionDetailsQuery } from "@/redux/apiSlice";
import {
  BsClockHistory,
  BsPeople,
  BsCashCoin,
  BsCheckCircle,
} from "react-icons/bs";

const AdminAuctionCarDetails = () => {
  const { auctionId } = useParams();
  const { data, isLoading, error } = useGetAdminAuctionDetailsQuery(auctionId);

  if (isLoading)
    return <div className="text-center p-8">Loading auction details...</div>;
  if (error)
    return (
      <div className="text-center p-8 text-red-500">Error loading auction</div>
    );
  if (!data?.data)
    return <div className="text-center p-8">Auction not found</div>;

  const {
    car,
    seller,
    bids,
    statistics,
    startTime,
    endTime,
    reservePrice,
    status,
  } = data.data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Auction Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{car.carName}</h1>
          <p className="text-gray-500 mt-2">
            {car.brand} • {car.modelYear}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
          <span
            className={`w-3 h-3 rounded-full ${
              status === "active" ? "bg-green-500" : "bg-gray-500"
            }`}
          />
          <span className="text-sm font-medium">{status.toUpperCase()}</span>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <BsClockHistory className="text-blue-500 text-xl" />
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">
                {new Date(startTime).toLocaleDateString()} -{" "}
                {new Date(endTime).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <BsPeople className="text-purple-500 text-xl" />
            <div>
              <p className="text-sm text-gray-500">Bidders</p>
              <p className="font-medium">{statistics.uniqueBidders} Unique</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <BsCashCoin className="text-green-500 text-xl" />
            <div>
              <p className="text-sm text-gray-500">Highest Bid</p>
              <p className="font-medium">
                ৳{statistics.highestBid?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <BsCheckCircle
              className={`text-xl ${
                statistics.reserveMet ? "text-green-500" : "text-red-500"
              }`}
            />
            <div>
              <p className="text-sm text-gray-500">Reserve Price</p>
              <p className="font-medium">৳{reservePrice?.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Car & Seller Details */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Vehicle Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Mileage</span>
                <span>{car.mileage} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fuel Type</span>
                <span>{car.fuelType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Condition</span>
                <span>{car.condition}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Seller Information</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="font-medium">{seller.name}</p>
                  <p className="text-sm text-gray-500">{seller.email}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    seller.accountStatus === "verified"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {seller.accountStatus}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                <p>{seller.contact}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bidding Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-6">
              Bidding Activity ({bids.length})
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-3">Bidder</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Time</th>
                    <th className="pb-3">Experience</th>
                  </tr>
                </thead>
                <tbody>
                  {bids.map((bid) => (
                    <tr key={bid._id} className="border-b hover:bg-gray-50">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-medium">{bid.bidder.name}</p>
                            <p className="text-sm text-gray-500">
                              {bid.bidder.email}
                            </p>
                          </div>
                          {bid.amount === statistics.highestBid && (
                            <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                              Winning Bid
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4">৳{bid.amount?.toLocaleString()}</td>
                      <td className="py-4 text-sm text-gray-500">
                        {new Date(bid.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="py-4">
                        <div className="text-sm">
                          <p>{bid.bidder.totalBids} bids</p>
                          <p>{bid.bidder.auctionsWon} wins</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuctionCarDetails;

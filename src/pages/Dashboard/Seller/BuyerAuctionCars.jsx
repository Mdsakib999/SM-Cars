import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllAuctionCarsQuery } from "@/redux/apiSlice";
import Countdown from "@/components/AuctionComponent/CountDown";
import { BsArrowUpRight, BsFunnel } from "react-icons/bs";

const BuyerAuctionCars = () => {
  const { data, isLoading, error } = useGetAllAuctionCarsQuery();
  const [filter, setFilter] = useState("all");

  if (isLoading)
    return (
      <div className="text-center py-8 text-gray-500">Loading auctions...</div>
    );
  if (error)
    return (
      <div className="text-center py-8 text-red-500">
        Error loading auctions
      </div>
    );

  const auctions = Array.isArray(data) ? data : data?.auctions || [];
  if (auctions.length === 0)
    return <div className="text-center py-8">No auctions available</div>;

  // Filter and sort auctions
  const filteredAuctions = auctions
    .filter((auction) => {
      if (filter === "active") return auction.status !== "ended";
      if (filter === "ended") return auction.status === "ended";
      return true;
    })
    .sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Live Auctions</h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <BsFunnel className="text-gray-500" />
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full ${
                filter === "all"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              All ({auctions.length})
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-4 py-2 rounded-full ${
                filter === "active"
                  ? "bg-green-100 text-green-600"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              Active ({auctions.filter((a) => a.status !== "ended").length})
            </button>
            <button
              onClick={() => setFilter("ended")}
              className={`px-4 py-2 rounded-full ${
                filter === "ended"
                  ? "bg-red-100 text-red-600"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              Ended ({auctions.filter((a) => a.status === "ended").length})
            </button>
          </div>
        </div>
      </div>

      {/* Auction Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAuctions.map((auction) => {
          const car = auction.car;
          const isEnded = auction.status === "ended";

          return (
            <Link
              to={`/auction-cars/${car._id}`}
              key={auction._id}
              className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Image Section */}
              <div className="aspect-video relative overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={
                    car.images?.[0]?.url || "https://via.placeholder.com/300"
                  }
                  alt={car.carName}
                />
                {!isEnded && (
                  <div className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                    <Countdown time={auction.endTime} />
                  </div>
                )}
                {isEnded && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-lg font-bold">
                      Auction Ended
                    </span>
                  </div>
                )}
              </div>

              {/* Details Section */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {car.carName}
                  </h3>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      isEnded
                        ? "bg-gray-100 text-gray-500"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {car.brand}
                  </span>
                </div>

                <div className="space-y-1 text-sm text-gray-600">
                  <p>Year: {car.modelYear}</p>
                  <p>Mileage: {car.mileage?.toLocaleString() || "N/A"} km</p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">Current Bid</p>
                    <p className="text-lg font-bold text-gray-900">
                      ${(auction.currentBid || car.price).toLocaleString()}
                    </p>
                  </div>
                  <button className="flex items-center text-orange-500 hover:text-orange-700">
                    <span className="mr-2">View Details</span>
                    <BsArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BuyerAuctionCars;

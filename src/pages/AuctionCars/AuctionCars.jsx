import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllAuctionCarsQuery } from "@/redux/apiSlice";
import Countdown from "@/components/AuctionComponent/CountDown";
import { BsArrowUpRight, BsFunnel } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AuctionCars = () => {
  const { data, isLoading, error } = useGetAllAuctionCarsQuery();
  const [filter, setFilter] = useState("all");

  // Normalize auctions array
  const auctions = Array.isArray(data) ? data : data?.auctions ?? [];

  // Filtered and sorted auctions
  const filteredAuctions = auctions
    .filter((auction) => {
      if (filter === "active") return auction.status !== "ended";
      if (filter === "ended") return auction.status === "ended";
      return true;
    })
    .sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

  // JSX for header and filters
  const renderHeader = () => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <h1 className="text-3xl font-bold text-gray-900">Live Auctions</h1>
      <div className="flex items-center gap-4">
        <BsFunnel className="text-gray-500" />
        {[
          { key: "all", label: `All (${auctions.length})`, color: "blue" },
          {
            key: "active",
            label: `Active (${
              auctions.filter((a) => a.status !== "ended").length
            })`,
            color: "green",
          },
          {
            key: "ended",
            label: `Ended (${
              auctions.filter((a) => a.status === "ended").length
            })`,
            color: "red",
          },
        ].map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-full text-sm transition 
              ${
                filter === key
                  ? `bg-${color}-100 text-${color}-600`
                  : "text-gray-500 hover:bg-gray-100"
              }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );

  // JSX for loading skeleton cards
  const renderSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
          role="status"
          aria-busy="true"
        >
          <div className="w-full h-48 bg-gray-200">
            <Skeleton height={192} width="100%" />
          </div>
          <div className="p-4 space-y-2">
            <Skeleton height={24} width="50%" />
            <Skeleton height={16} count={2} />
            <div className="flex items-center justify-between mt-4">
              <Skeleton height={20} width="30%" />
              <Skeleton height={32} width={80} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // JSX for displaying auctions
  const renderAuctions = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredAuctions.map((auction) => {
        const { _id: auctionId, car, status, endTime } = auction;
        const isEnded = status === "ended";
        return (
          <Link
            to={`/auction-cars/${auctionId}`}
            key={auctionId}
            className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                src={car.images?.[0]?.url || "https://via.placeholder.com/300"}
                alt={car.carName}
              />
              {!isEnded && (
                <div className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                  <Countdown time={endTime} />
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
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {renderHeader()}
      {isLoading && renderSkeletons()}
      {!isLoading && error && (
        <div className="text-center py-8 text-red-500">
          Error loading auctions
        </div>
      )}
      {!isLoading && !error && filteredAuctions.length === 0 && (
        <div className="text-center py-8">No auctions available</div>
      )}
      {!isLoading && !error && filteredAuctions.length > 0 && renderAuctions()}
    </div>
  );
};

export default AuctionCars;

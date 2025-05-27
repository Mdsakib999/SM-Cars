// CarCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { BsArrowUpRight } from "react-icons/bs";
import { IoSpeedometerOutline } from "react-icons/io5";
import { BsBackpack, BsBezier } from "react-icons/bs";
import { useGetAllAuctionCarsQuery } from "@/redux/apiSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MAX_CARDS = 4;

const CarCard = () => {
  const { data: auctionsData, isLoading, error } = useGetAllAuctionCarsQuery();

  const auctions = auctionsData?.auctions ?? [];
  const latestAuctions = auctions
    .slice()
    .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
    .slice(0, MAX_CARDS);

  return (
    <div className="p-6">
      {error && (
        <div className="text-center p-6 text-red-500">Error loading cars</div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: MAX_CARDS }).map((_, i) => (
            <div
              key={i}
              className="bg-white border rounded-xl overflow-hidden shadow-sm"
              role="status"
              aria-busy="true"
            >
              <div className="w-full h-48 bg-gray-200">
                <Skeleton height={192} width="100%" />
              </div>
              <div className="p-4 space-y-2">
                <Skeleton height={24} width="60%" />
                <Skeleton height={16} count={1} />
                <div className="flex justify-between border-t border-b py-3">
                  <Skeleton circle={true} height={40} width={40} />
                  <Skeleton circle={true} height={40} width={40} />
                  <Skeleton circle={true} height={40} width={40} />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton height={24} width="30%" />
                  <Skeleton height={32} width={80} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : latestAuctions.length === 0 ? (
        <div className="text-center p-6">No cars available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {latestAuctions.map((auction) => {
            const car = auction.car;
            return (
              <div
                key={auction._id}
                className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={
                    car.images?.[0]?.url || "https://via.placeholder.com/300"
                  }
                  alt={car.carName}
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{car.carName}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-1">
                    {car.description}
                  </p>

                  <div className="flex justify-between border-t border-b py-3 mb-4">
                    <div className="text-center">
                      <IoSpeedometerOutline className="text-xl mx-auto mb-1" />
                      <span className="text-xs text-gray-600">
                        {car.mileage} km
                      </span>
                    </div>
                    <div className="text-center">
                      <BsBackpack className="text-xl mx-auto mb-1" />
                      <span className="text-xs text-gray-600">
                        {car.fuelType}
                      </span>
                    </div>
                    <div className="text-center">
                      <BsBezier className="text-xl mx-auto mb-1" />
                      <span className="text-xs text-gray-600">
                        {car.engine}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold ">
                      ${car.price?.toLocaleString()}
                    </span>
                    <Link to={`/auction-cars/${auction._id}`}>
                      <button className="flex items-center text-orange-500 hover:text-orange-400 text-sm">
                        View Details <BsArrowUpRight className="ml-1" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CarCard;

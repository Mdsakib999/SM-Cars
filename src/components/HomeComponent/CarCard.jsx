import React from "react";
import { Link } from "react-router-dom";
import { BsArrowUpRight } from "react-icons/bs";
import { IoSpeedometerOutline } from "react-icons/io5";
import { BsBackpack, BsBezier } from "react-icons/bs";
import { useGetAllAuctionCarsQuery } from "@/redux/apiSlice";

const CarCard = () => {
  const { data: auctionsData, isLoading, error } = useGetAllAuctionCarsQuery();

  if (isLoading) return <div className="text-center p-6">Loading cars...</div>;
  if (error)
    return (
      <div className="text-center p-6 text-red-500">Error loading cars</div>
    );

  // Get latest 4 auctions sorted by date
  const latestAuctions = auctionsData?.auctions
    ? [...auctionsData.auctions]
        .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
        .slice(0, 4)
    : [];

  if (!latestAuctions?.length)
    return <div className="text-center p-6">No cars available</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {latestAuctions.map((auction) => {
        const car = auction.car; // Extract car from auction
        return (
          <div
            key={auction._id}
            className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              className="w-full h-48 object-cover"
              src={car.images?.[0]?.url || "https://via.placeholder.com/300"}
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
                  <span className="text-xs text-gray-600">{car.fuelType}</span>
                </div>
                <div className="text-center">
                  <BsBezier className="text-xl mx-auto mb-1" />
                  <span className="text-xs text-gray-600">{car.engine}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold ">
                  ৳{car.price?.toLocaleString()}
                </span>
                <Link to={`/auction-cars/${car._id}`}>
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
  );
};

export default CarCard;

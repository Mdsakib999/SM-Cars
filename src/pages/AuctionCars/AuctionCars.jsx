import React from "react";
import { Link } from "react-router-dom";
import { useGetAllAuctionCarsQuery } from "@/redux/apiSlice";
import Countdown from "@/components/AuctionComponent/CountDown";

const AuctionCars = () => {
  const { data, isLoading, error } = useGetAllAuctionCarsQuery();

  if (isLoading) return <p>Loading auction cars...</p>;
  if (error) return <p>Error loading auction cars</p>;

  const auctions = Array.isArray(data) ? data : data?.auctions || [];

  if (auctions.length === 0) return <p>No auction cars found.</p>;

  return (
    <div className="space-y-6 p-4 w-[93%] mx-auto flex flex-col ">
      <div className="text-center text-xl font-semibold">All Cars</div>
      <div className="space-y-6 p-4 ">
        {auctions.map((auction) => {
          const car = auction.car;
          return (
            <Link
              to={`/auction-cars/${car._id}`}
              key={auction._id}
              className="flex flex-col md:flex-row bg-gray-100 shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image Section */}
              <div className="md:w-1/3">
                <img
                  src={
                    car.images && car.images[0]?.url
                      ? car.images[0].url
                      : "https://via.placeholder.com/300"
                  }
                  alt={car.carName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details Section */}
              <div className="md:w-2/3 p-4">
                <h2 className="text-2xl font-bold mb-2">{car.carName}</h2>
                <p className="text-gray-600">Brand: {car.brand}</p>
                <p className="text-gray-600">Model Year: {car.modelYear}</p>
                <p className="text-gray-600">
                  Price: ${car.price.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  Auction Status: {auction.status}
                </p>
                {/* Countdown Component */}
                <div className="mt-2">
                  <strong>Time Left: </strong>
                  <Countdown time={auction.endTime} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AuctionCars;

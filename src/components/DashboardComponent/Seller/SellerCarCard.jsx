// SellerCarCard.jsx
import React from "react";
import { IoSpeedometerOutline } from "react-icons/io5";
import { BsBackpack, BsBezier } from "react-icons/bs";
import { AiOutlineSafety } from "react-icons/ai";
import { Link } from "react-router-dom";

const SellerCarCard = ({
  car,
  onAddToAuction,
  onRequestApproval,
  isRequestingApproval,
}) => {
  return (
    <div className="bg-white border rounded-xl overflow-hidden  ">
      {/* Image Section */}
      <div className="">
        <img
          className="w-full h-48 object-cover"
          src={car.images?.[0]?.url || ""}
          alt={car.carName || "No Car Available"}
        />

        {car.auctionStatus === "sold" && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 text-sm rounded">
            Sold
          </div>
        )}
      </div>

      {/* Car Information */}
      <div className="p-4">
        <h3 className="text-2xl font-semibold tracking-wide mb-2">
          {car.carName} | {car.brand}
        </h3>
        <p className="text-gray-700 mb-4 truncate">{car.description}</p>

        <ul className="text-gray-800 mb-4 flex justify-between border-t-2 border-b-2 py-2">
          <li className="flex flex-col items-center">
            <IoSpeedometerOutline className="text-xl mb-1" />
            <span>{car.mileage}</span>
          </li>
          <li className="flex flex-col items-center">
            <BsBackpack className="text-xl mb-1" />
            <span>{car.fuelType}</span>
          </li>
          <li className="flex flex-col items-center">
            <BsBezier className="text-xl mb-1" />
            <span>{car.gearBox}</span>
          </li>
        </ul>

        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold text-black">{car.price}</span>
          <span
            className={`py-1 px-3 rounded-full text-sm ${
              car.status === "approved"
                ? "bg-green-200 text-green-800"
                : car.status === "pending"
                ? "bg-orange-200 text-orange-800"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {car.status}
          </span>
        </div>

        {/* Action Buttons */}
        {car.status === "on_hold" && (
          <button
            onClick={() => onRequestApproval(car._id)}
            disabled={isRequestingApproval}
            className="w-full flex items-center justify-center bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200"
          >
            <AiOutlineSafety className="mr-2" />
            {isRequestingApproval ? "Requesting..." : "Request Approval"}
          </button>
        )}

        {/* Only show Add to Auction button if auctionStatus is "none" */}
        {car.status === "approved" && car.auctionStatus === "none" && (
          <button
            onClick={() => onAddToAuction(car._id)}
            className="w-full flex items-center justify-center bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200"
          >
            Add to Auction
          </button>
        )}

        <Link to={`/dashboard/seller/my-cars/${car._id}`}>
          <button className="w-full flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 transition duration-200 mt-3">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SellerCarCard;

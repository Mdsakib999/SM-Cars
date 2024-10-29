import React from "react";
import { IoHammerSharp } from "react-icons/io5";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const CarBidDetail = () => {
  const highestBidders = [
    { position: 1, name: "Alice", amount: "$1500" },
    { position: 2, name: "Bob", amount: "$1300" },
    { position: 3, name: "Charlie", amount: "$1200" },
  ];
  return (
    <div className="w-full lg:w-1/2 border rounded-md space-y-4 bg-gray-50 p-4">
      {/* Bidding Time */}

      <div className="flex items-center justify-between gap-4 border-b-2 pb-3">
        <IoHammerSharp className="text-4xl lg:text-6xl text-orange-500 p-2" />
        <h3 className="text-2xl lg:text-3xl font-semibold uppercase">
          Bidding ends at
        </h3>
        <div className="text-lg lg:text-2xl border bg-orange-500 text-white rounded-lg p-2">
          23H:16M:23S
        </div>
      </div>
      <h2 className="text-3xl font-semibold">
        Mercedes-Benz GLB-Klasse GLB 180 d
      </h2>
      <div className="flex gap-4">
        <p className="text-md font-semibold">Minimum Bid:</p>
        <span>13,223,22</span>
      </div>

      {/* Enter Amount */}
      <div className="flex flex-col sm:flex-row items-center gap-4 border rounded-md p-4 bg-white">
        <label className="text-lg font-medium text-gray-700">
          Enter Amount:
        </label>
        <input
          type="number"
          placeholder="Amount"
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button className="btn btn-secondary">Place Bid</button>
      </div>
      {/* Bid Positions */}
      <div className="bg-gray-100 p-4 rounded-md space-y-2">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">
          Top Bidders
        </h4>
        {highestBidders.map((bidder, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 rounded-md ${
              index === 0
                ? "bg-green-200 text-green-800 font-bold"
                : "bg-white text-gray-700"
            }`}
          >
            <span className="text-xl">{`#${bidder.position}`}</span>
            <span className="text-lg">{bidder.name}</span>
            <span className="text-lg font-medium">{bidder.amount}</span>
          </div>
        ))}
      </div>

      {/* Location and Contact */}
      <div className="bg-white border rounded-md p-4 flex items-center gap-4">
        <FaMapMarkerAlt className="text-orange-500 text-2xl" />
        <div>
          <h4 className="text-lg font-semibold text-gray-700">Location</h4>
          <p className="text-gray-600">123 Main St, Los Angeles, CA</p>
        </div>
      </div>
      <div className="bg-white border rounded-md p-4 flex items-center gap-4">
        <FaPhoneAlt className="text-orange-500 text-2xl" />
        <div>
          <h4 className="text-lg font-semibold text-gray-700">Contact</h4>
          <p className="text-gray-600">+88 (888) 888-4567</p>
        </div>
      </div>
    </div>
  );
};

export default CarBidDetail;

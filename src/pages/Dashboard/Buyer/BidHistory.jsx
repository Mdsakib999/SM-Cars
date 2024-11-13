import React from "react";
import { BsArrowUpRight, BsCheckCircle, BsXCircle } from "react-icons/bs";

const bidHistoryData = [
  {
    carModel: "Toyota Corolla",
    image:
      "https://images.unsplash.com/photo-1683403792818-a48b86226939?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lastBid: "$18,500",
    status: "Ongoing", // options: "Ongoing", "Completed"
  },
  {
    carModel: "Honda Civic",
    image:
      "https://images.unsplash.com/photo-1582467029665-d4b0775057de?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDIyMHx8fGVufDB8fHx8fA%3D%3D",
    lastBid: "$19,000",
    status: "Completed",
  },
  {
    carModel: "Nissan Altima",
    image:
      "https://images.unsplash.com/photo-1582467029213-ce71667c2e28?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8",
    lastBid: "$20,000",
    status: "Ongoing",
  },
];

const BidHistory = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-medium mb-4">Bidding History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bidHistoryData.map((bid, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl overflow-hidden flex flex-col"
          >
            {/* Car Image */}
            <img
              className="w-full h-48 object-cover"
              src={bid.image}
              alt={bid.carModel}
            />
            {/* Bid Details */}
            <div className="p-4 flex flex-col justify-between flex-1">
              <h3 className="text-lg font-semibold mb-2">{bid.carModel}</h3>
              <div className="flex justify-between">
                <p className="text-md  text-gray-700 mb-2">Last Bid</p>
                <p className="text-black text-lg">{bid.lastBid}</p>
              </div>
              <hr className="border border-b-2" />
              <div className="flex items-center mb-4 justify-between my-4">
                <p className="text-lg ">Status</p>
                <div className="flex items-center">
                  {bid.status === "Ongoing" ? (
                    <BsCheckCircle className="text-green-500 text-xl mr-2" />
                  ) : (
                    <BsXCircle className="text-red-500 text-xl mr-2" />
                  )}
                  <span
                    className={`font-medium ${
                      bid.status === "Ongoing"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {bid.status}
                  </span>
                </div>
              </div>
              {/* Bid Again Button */}
              {bid.status === "Ongoing" && (
                <button className="w-full border px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-white">
                  Bid Again
                </button>
              )}
              {bid.status === "Completed" && (
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

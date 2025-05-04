import React from "react";
import {
  BsCheckCircle,
  BsXCircle,
  BsArrowRepeat,
  BsClock,
} from "react-icons/bs";
import { useGetBiddedCarsQuery } from "@/redux/apiSlice";
import { Link } from "react-router-dom";

const BidHistory = () => {
  const { data, isLoading, isError } = useGetBiddedCarsQuery();

  if (isLoading) {
    return <div className="text-center text-lg font-medium">Loading...</div>;
  }

  if (isError || !data?.auctionsWithBids) {
    return (
      <div className="text-center text-red-500 font-medium">
        Failed to load bidding history.
      </div>
    );
  }

  if (data.auctionsWithBids?.length === 0) {
    return (
      <div className="text-center p-6">
        <p className="text-lg font-medium mb-4">You have not bidded yet.</p>
        <Link to="/auction-cars" className="text-orange-500 hover:underline">
          Browse Cars to Place a Bid
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-medium mb-6">Bidding History</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.auctionsWithBids.map((auction, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* Car Image and Basic Info */}
            <div className="relative">
              <img
                className="w-full h-48 object-cover"
                src={auction.car?.images[0]?.url || "/placeholder-car.jpg"}
                alt={auction.car?.carName}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-4">
                <h3 className="text-xl font-semibold text-white">
                  {auction.car?.carName}
                </h3>
                <p className="text-gray-200">{auction.car?.brand}</p>
              </div>
            </div>

            {/* Auction Details */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-600">Auction Status</p>
                  <div className="flex items-center gap-2">
                    <StatusIcon status={auction.status} />
                    <span
                      className={`font-medium ${statusColor(auction.status)}`}
                    >
                      {auction.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Your Bids</p>
                  <p className="font-medium">{auction.bids.length}</p>
                </div>
              </div>

              {/* Bidding Timeline */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Start:</span>
                  <span>
                    {new Date(auction.startTime).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">End:</span>
                  <span>{new Date(auction.endTime).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Bid History List */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-2">Your Bids</h4>
                <div className="space-y-2">
                  {auction.bids.map((bid, bidIndex) => (
                    <div
                      key={bidIndex}
                      className="flex justify-between items-center text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">
                          {new Date(bid.timestamp).toLocaleTimeString()}
                        </span>
                        <BidStatusBadge
                          status={getBidStatus(
                            auction.status,
                            bid.amount,
                            auction.currentBid
                          )}
                        />
                      </div>
                      <span className="font-medium">${bid.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                className={`w-full mt-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
                  auction.status === "active"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-gray-200 text-gray-600 cursor-not-allowed"
                }`}
                disabled={auction.status !== "active"}
              >
                {auction.status === "active" ? (
                  <>
                    <BsArrowRepeat className="text-xl" />
                    Place New Bid
                  </>
                ) : (
                  "Auction Ended"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper Components
const StatusIcon = ({ status }) => {
  const iconClass = "text-xl";
  switch (status) {
    case "active":
      return <BsClock className={`${iconClass} text-blue-500`} />;
    case "ended":
      return <BsCheckCircle className={`${iconClass} text-green-500`} />;
    default:
      return <BsClock className={`${iconClass} text-gray-500`} />;
  }
};

const BidStatusBadge = ({ status }) => {
  const baseStyle = "px-2 py-1 rounded-full text-xs font-medium";
  switch (status) {
    case "won":
      return (
        <span className={`${baseStyle} bg-green-100 text-green-800`}>Won</span>
      );
    case "lost":
      return (
        <span className={`${baseStyle} bg-red-100 text-red-800`}>Lost</span>
      );
    default:
      return (
        <span className={`${baseStyle} bg-blue-100 text-blue-800`}>
          Pending
        </span>
      );
  }
};

const statusColor = (status) => {
  switch (status) {
    case "active":
      return "text-blue-600";
    case "ended":
      return "text-green-600";
    default:
      return "text-gray-600";
  }
};

const getBidStatus = (auctionStatus, bidAmount, currentBid) => {
  if (auctionStatus !== "ended") return "pending";
  if (currentBid === bidAmount) return "won";
  return "lost";
};

export default BidHistory;

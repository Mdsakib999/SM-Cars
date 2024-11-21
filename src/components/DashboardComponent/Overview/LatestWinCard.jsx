import React from "react";

const LatestWinCard = ({ latestWin }) => {
  return (
    <div className="border p-4 flex flex-col justify-between rounded-xl bg-white col-span-1 md:col-span-2 shadow-sm">
      <h2 className="text-2xl font-medium mb-2">Latest Win</h2>
      <hr className="border-t border-gray-200 mb-4" />

      {latestWin ? (
        <div className="flex items-center mb-4">
          {/* Car Image */}
          <img
            src={latestWin.carImage}
            alt={latestWin.carName}
            className="w-16 h-16 rounded-lg object-cover"
          />

          {/* Win Details */}
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-semibold">{latestWin.carName}</h3>
            <div className="text-gray-600 text-sm">
              Winning Bid: ${latestWin.bidAmount}
            </div>
            <div className="text-sm text-green-600 mt-1 font-medium">
              Status: {latestWin.status}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 mb-4">
          <p className="text-lg font-medium">No Wins Yet</p>
          <p className="text-sm">Your recent wins will appear here.</p>
        </div>
      )}

      {/* Conditional Buttons */}
      {latestWin ? (
        <button
          className="border px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white w-full"
          onClick={() => alert(`Contact Seller: ${latestWin.sellerContact}`)}
        >
          Contact Seller
        </button>
      ) : (
        <button
          className="border px-4 py-2 rounded-lg bg-gray-300 text-gray-600 w-full cursor-not-allowed"
          disabled
        >
          No Wins
        </button>
      )}
    </div>
  );
};

export default LatestWinCard;

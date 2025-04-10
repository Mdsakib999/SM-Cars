import React, { useState } from "react";
import { useCreateAuctionMutation } from "../../../redux/apiSlice";

const AuctionModal = ({ isOpen, onClose, car, seller }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [reservePrice, setReservePrice] = useState("");

  const [createAuction, { isLoading, error }] = useCreateAuctionMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      car: car._id,
      seller,
      startTime,
      endTime,
      reservePrice,
    };
    try {
      await createAuction(formData).unwrap();
      onClose();
    } catch (err) {
      console.error("Auction creation error:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      {/* Modal Container */}
      <div className="relative bg-white rounded-lg max-w-md mx-auto p-6 z-10">
        <h2 className="text-xl font-bold mb-4">Create Auction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Time</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Time</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Reserve Price
            </label>
            <input
              type="number"
              value={reservePrice}
              onChange={(e) => setReservePrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm">
              {error.data?.message || "Error creating auction"}
            </p>
          )}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600 transition"
            >
              {isLoading ? "Creating..." : "Create Auction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuctionModal;

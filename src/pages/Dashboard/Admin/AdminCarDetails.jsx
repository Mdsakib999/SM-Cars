import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetAdminCarDetailsQuery,
  useApproveCarMutation,
  useRejectCarMutation,
} from "../../../redux/apiSlice";
import { Dialog } from "@headlessui/react";

const AdminCarDetails = () => {
  const { carId } = useParams();
  const { data, isLoading, isError, refetch } =
    useGetAdminCarDetailsQuery(carId);
  const [approveCar, { isLoading: isApproving }] = useApproveCarMutation();
  const [rejectCar, { isLoading: isRejecting }] = useRejectCarMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [car, setCar] = useState(null);

  useEffect(() => {
    if (data) {
      setCar(data.car || data);
    }
  }, [data]);

  if (isLoading) return <div>Loading car details...</div>;
  if (isError) return <div>Error loading car details</div>;
  if (!car) return <div>No car data available</div>;

  const handleAction = async () => {
    try {
      if (actionType === "approve") {
        await approveCar(carId).unwrap();
      } else if (actionType === "reject") {
        await rejectCar(carId).unwrap();
      }
      await refetch(); // Refresh data after update
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{car.carName}</h1>
      <img
        src={car.images?.[0]?.url || "https://via.placeholder.com/300"}
        alt={car.carName}
        className="w-full max-w-md rounded-lg"
      />
      <p className="mt-4">
        <strong>Price:</strong> ${car.price.toLocaleString()}
      </p>
      <p>
        <strong>Vendor:</strong> {car.sellerId?.name} ({car.sellerId?.email})
      </p>
      <p>
        <strong>Contact:</strong> {car.sellerId?.contact}
      </p>
      <p>
        <strong>Brand:</strong> {car.brand}
      </p>
      <p>
        <strong>Status:</strong>
        <span
          className={`ml-2 font-semibold ${
            car.status === "pending"
              ? "text-yellow-500"
              : car.status === "approved"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {car.status}
        </span>
      </p>

      {/* Show buttons only if status is pending */}
      {car.status === "pending" && (
        <div className="mt-6">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-xl mr-2 disabled:opacity-50"
            onClick={() => {
              setActionType("approve");
              setIsModalOpen(true);
            }}
            disabled={isApproving || isRejecting}
          >
            {isApproving ? "Approving..." : "Approve"}
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-xl disabled:opacity-50"
            onClick={() => {
              setActionType("reject");
              setIsModalOpen(true);
            }}
            disabled={isApproving || isRejecting}
          >
            {isRejecting ? "Rejecting..." : "Reject"}
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="bg-black opacity-50 fixed inset-0" />
        <div className="bg-white rounded-lg p-6 z-10 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Confirm Action</h2>
          <p className="mb-6">
            Are you sure you want to
            <span className="font-semibold text-red-600">
              {" "}
              {actionType === "approve" ? "approve" : "reject"}{" "}
            </span>
            this car?
          </p>
          <div className="flex justify-end">
            <button
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg mr-2"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className={`${
                actionType === "approve" ? "bg-green-500" : "bg-red-500"
              } text-white py-2 px-4 rounded-lg`}
              onClick={handleAction}
            >
              Confirm
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AdminCarDetails;

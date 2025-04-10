import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  useGetAdminCarDetailsQuery,
  useApproveCarMutation,
  useRejectCarMutation,
  useDeleteCarMutation,
} from "../../../redux/apiSlice";
import { Dialog } from "@headlessui/react";
import { LuBadgeCheck } from "react-icons/lu";
import { CiClock2 } from "react-icons/ci";
import { BiXCircle } from "react-icons/bi";
import { CheckCircle2, XCircle } from "lucide-react";
import { toast } from "react-toastify";

const AdminCarDetails = () => {
  const { carId } = useParams();
  const { data, isLoading, isError, refetch } =
    useGetAdminCarDetailsQuery(carId);
  const [approveCar, { isLoading: isApproving }] = useApproveCarMutation();
  const [rejectCar, { isLoading: isRejecting }] = useRejectCarMutation();
  const [deleteCar, { isLoading: isDeleting }] = useDeleteCarMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

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
      } else if (actionType === "delete") {
        await deleteCar({ carId: car._id.toString() }).unwrap();
        toast.success("Car deleted successfully");
        navigate(-1);
        return;
      }
      await refetch();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const getStatusBadge = () => {
    const baseStyles =
      "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium";
    switch (car.status) {
      case "approved":
        return (
          <span className={`${baseStyles} bg-green-100 text-green-800`}>
            <LuBadgeCheck className="h-5 w-5 mr-2" />
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className={`${baseStyles} bg-red-100 text-red-800`}>
            <BiXCircle className="h-5 w-5 mr-2" />
            Rejected
          </span>
        );
      default:
        return (
          <span className={`${baseStyles} bg-yellow-100 text-yellow-800`}>
            <CiClock2 className="h-5 w-5 mr-2" />
            Pending Review
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-white shadow-sm font-bold py-2 px-4 rounded"
      >
        ← Back to Listings
      </button>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <div className="space-y-4">
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
              <img
                src={car.images?.[0]?.url || "https://via.placeholder.com/800"}
                alt={car.carName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {car.images?.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`${car.carName} ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Car Details */}
          <div className="space-y-6">
            <div className="border-b pb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                {car.carName}
              </h1>
              <div className="mt-2 flex items-center space-x-4">
                <span className="text-2xl font-semibold text-orange-600">
                  ${car.price.toLocaleString()}
                </span>
                {getStatusBadge()}
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <dt className="text-sm font-medium text-gray-500">Brand</dt>
                <dd className="mt-1 text-lg font-semibold">{car.brand}</dd>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <dt className="text-sm font-medium text-gray-500">
                  Model Year
                </dt>
                <dd className="mt-1 text-lg font-semibold">{car.modelYear}</dd>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <dt className="text-sm font-medium text-gray-500">Mileage</dt>
                <dd className="mt-1 text-lg font-semibold">
                  {car.mileage} miles
                </dd>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <dt className="text-sm font-medium text-gray-500">Fuel Type</dt>
                <dd className="mt-1 text-lg font-semibold">{car.fuelType}</dd>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <dt className="text-sm font-medium text-gray-500">Color</dt>
                <dd className="mt-1 text-lg font-semibold">{car.color}</dd>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <dt className="text-sm font-medium text-gray-500">Condition</dt>
                <dd className="mt-1 text-lg font-semibold">{car.condition}</dd>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <dt className="text-sm font-medium text-gray-500">Gearbox</dt>
                <dd className="mt-1 text-lg font-semibold">{car.gearBox}</dd>
              </div>
            </div>

            {/* Seller Info Card */}
            <div className="bg-indigo-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">
                Seller Information
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-24 text-gray-600">Name:</span>
                  <span className="font-medium">{car.sellerId?.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-24 text-gray-600">Email:</span>
                  <span className="font-medium">{car.sellerId?.email}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-24 text-gray-600">Contact:</span>
                  <span className="font-medium">{car.sellerId?.contact}</span>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  setActionType("delete");
                  setIsModalOpen(true);
                }}
                className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-xl font-medium transition-colors flex items-center justify-center"
                disabled={isApproving || isRejecting || isDeleting}
              >
                {isDeleting ? (
                  <span className="animate-pulse">Deleting...</span>
                ) : (
                  <>
                    <BiXCircle className="w-5 h-5 mr-2" />
                    Delete Listing
                  </>
                )}
              </button>
            </div>

            {/* Action Buttons */}
            {car.status === "pending" && (
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => {
                    setActionType("approve");
                    setIsModalOpen(true);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-medium transition-colors flex items-center justify-center"
                  disabled={isApproving || isRejecting || isDeleting}
                >
                  {isApproving ? (
                    <span className="animate-pulse">Approving...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Approve Listing
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setActionType("reject");
                    setIsModalOpen(true);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl font-medium transition-colors flex items-center justify-center"
                  disabled={isApproving || isRejecting || isDeleting}
                >
                  {isRejecting ? (
                    <span className="animate-pulse">Rejecting...</span>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 mr-2" />
                      Reject Listing
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Confirmation Modal */}
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-8 space-y-6">
              <Dialog.Title className="text-2xl font-bold text-gray-900">
                {actionType === "approve"
                  ? "Confirm Approval"
                  : actionType === "reject"
                  ? "Confirm Rejection"
                  : "Confirm Deletion"}
              </Dialog.Title>
              <p className="text-gray-600">
                {actionType === "approve" &&
                  "Are you sure you want to approve this car listing? This action will make it visible on the platform."}
                {actionType === "reject" &&
                  "Are you sure you want to reject this car listing? This action will remove it from the public platform."}
                {actionType === "delete" &&
                  "Are you sure you want to delete this car listing? This action cannot be undone."}
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAction}
                  className={`px-6 py-2 text-white rounded-lg font-medium transition-colors ${
                    actionType === "approve"
                      ? "bg-green-600 hover:bg-green-700"
                      : actionType === "reject"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-gray-800 hover:bg-gray-900"
                  }`}
                >
                  {actionType === "approve"
                    ? "Confirm Approval"
                    : actionType === "reject"
                    ? "Confirm Rejection"
                    : "Confirm Deletion"}
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminCarDetails;

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetSellerCarDetailsQuery } from "../../../redux/apiSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { LuBadgeCheck } from "react-icons/lu";
import { CiClock2 } from "react-icons/ci";
import { BiXCircle } from "react-icons/bi";

const MyCarDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, refetch } = useGetSellerCarDetailsQuery(id);

  const navigate = useNavigate();
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
        className="mb-4 bg-white  shadow-sm font-bold py-2 px-4 rounded"
      >
        ← Back to Cars
      </button>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
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
                <dt className="text-sm font-medium text-gray-500">Conditoin</dt>
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

            {/* Action Buttons */}
            {car.status === "pending" && (
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => {
                    setActionType("approve");
                    setIsModalOpen(true);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-medium transition-colors flex items-center justify-center"
                  disabled={isApproving || isRejecting}
                >
                  {isApproving ? (
                    <span className="animate-pulse">Approving...</span>
                  ) : (
                    <>
                      <CheckBadgeIcon className="w-5 h-5 mr-2" />
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
                  disabled={isApproving || isRejecting}
                >
                  {isRejecting ? (
                    <span className="animate-pulse">Rejecting...</span>
                  ) : (
                    <>
                      <XCircleIcon className="w-5 h-5 mr-2" />
                      Reject Listing
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCarDetails;

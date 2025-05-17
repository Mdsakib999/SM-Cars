import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  useGetAdminCarDetailsQuery,
  useApproveCarMutation,
  useRejectCarMutation,
  useDeleteCarMutation,
} from "../../../redux/apiSlice";
import { LuBadgeCheck } from "react-icons/lu";
import { CiClock2 } from "react-icons/ci";
import { BiXCircle } from "react-icons/bi";
import { CheckCircle2, XCircle } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";

const AdminCarDetails = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } =
    useGetAdminCarDetailsQuery(carId);

  // derive car directly
  const car = data?.car || data;

  const [approveCar, { isLoading: isApproving }] = useApproveCarMutation();
  const [rejectCar, { isLoading: isRejecting }] = useRejectCarMutation();
  const [deleteCar, { isLoading: isDeleting }] = useDeleteCarMutation();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState(null);

  const handleAction = async () => {
    try {
      if (actionType === "approve") await approveCar(carId).unwrap();
      if (actionType === "reject") await rejectCar(carId).unwrap();
      if (actionType === "delete") {
        await deleteCar({ carId }).unwrap();
        toast.success("Car deleted successfully");
        navigate(-1);
        return;
      }
      await refetch();
    } catch (err) {
      console.error(err);
      toast.error("Action failed");
    } finally {
      setIsConfirmOpen(false);
    }
  };

  const getStatusBadge = () => {
    const base =
      "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium";
    if (!car) return <Skeleton width={100} height={32} />;
    if (car.status === "approved")
      return (
        <span className={`${base} bg-green-100 text-green-800`}>
          <LuBadgeCheck className="h-5 w-5 mr-2" /> Approved
        </span>
      );
    if (car.status === "rejected")
      return (
        <span className={`${base} bg-red-100 text-red-800`}>
          <BiXCircle className="h-5 w-5 mr-2" /> Rejected
        </span>
      );
    return (
      <span className={`${base} bg-yellow-100 text-yellow-800`}>
        <CiClock2 className="h-5 w-5 mr-2" /> Pending
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <Skeleton height={40} width={150} className="mb-4" />
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          <Skeleton height={300} />
          <Skeleton height={32} width="70%" />
          <Skeleton height={24} width="40%" />
          <Skeleton count={7} height={80} />
          <Skeleton height={120} />
          <div className="flex space-x-4">
            <Skeleton height={40} width="45%" />
            <Skeleton height={40} width="45%" />
          </div>
        </div>
      </div>
    );
  }

  if (isError)
    return <div className="p-8 text-red-500">Error loading car details.</div>;
  if (!car) return <div className="p-8">No car data available.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-white shadow-sm font-bold py-2 px-4 rounded"
      >
        ← Back
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
              {car.images?.slice(1).map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt={`${car.carName} ${i + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
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
            <div className="grid grid-cols-2 gap-4">
              {[
                ["Brand", car.brand],
                ["Year", car.modelYear],
                ["Mileage", `${car.mileage} miles`],
                ["Fuel", car.fuelType],
                ["Color", car.color],
                ["Condition", car.condition],
                ["Gearbox", car.gearBox],
              ].map(([l, v]) => (
                <div key={l} className="p-4 bg-gray-50 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500">{l}</dt>
                  <dd className="mt-1 text-lg font-semibold">{v}</dd>
                </div>
              ))}
            </div>
            <div className="bg-indigo-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                Seller
              </h3>
              {["name", "email", "contact"].map((f) => (
                <div key={f} className="flex items-center mb-1">
                  <span className="w-24 text-gray-600 capitalize">{f}:</span>
                  <span className="font-medium">
                    {car.sellerId?.[f] || "—"}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setActionType("delete");
                  setIsConfirmOpen(true);
                }}
                disabled={isDeleting || isApproving || isRejecting}
                className="bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-xl flex items-center justify-center"
              >
                {isDeleting ? (
                  "Deleting…"
                ) : (
                  <>
                    <BiXCircle className="mr-2" />
                    Delete
                  </>
                )}
              </button>
              {car.status === "pending" && (
                <>
                  <button
                    onClick={() => {
                      setActionType("approve");
                      setIsConfirmOpen(true);
                    }}
                    disabled={isApproving || isDeleting || isRejecting}
                    className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex items-center justify-center"
                  >
                    {isApproving ? (
                      "Approving…"
                    ) : (
                      <>
                        <CheckCircle2 className="mr-2" />
                        Approve
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setActionType("reject");
                      setIsConfirmOpen(true);
                    }}
                    disabled={isRejecting || isDeleting || isApproving}
                    className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl flex items-center justify-center"
                  >
                    {isRejecting ? (
                      "Rejecting…"
                    ) : (
                      <>
                        <XCircle className="mr-2" />
                        Reject
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full space-y-4">
            <h2 className="text-xl font-bold">
              {actionType === "approve"
                ? "Confirm Approve"
                : actionType === "reject"
                ? "Confirm Reject"
                : "Confirm Delete"}
            </h2>
            <p>
              Are you sure you want to <strong>{actionType}</strong> this
              listing?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAction}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCarDetails;

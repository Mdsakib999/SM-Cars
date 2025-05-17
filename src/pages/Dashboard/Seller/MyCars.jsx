import React, { useContext, useState } from "react";
import {
  useGetSellerCarsQuery,
  useRequestCarApprovalMutation,
} from "@/redux/apiSlice";
import { BsPlusCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import SellerCarCard from "../../../components/DashboardComponent/Seller/SellerCarCard";
import AuctionModal from "../../../components/DashboardComponent/Seller/AuctionModal";
import { AuthContext } from "@/provider/AuthProvider";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MyCars = () => {
  const { profile } = useContext(AuthContext);
  const { data, isLoading, error } = useGetSellerCarsQuery(profile._id);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isAuctionModalOpen, setAuctionModalOpen] = useState(false);

  const [requestCarApproval, { isLoading: isRequestingApproval }] =
    useRequestCarApprovalMutation();

  if (isLoading) {
    return (
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white border rounded-xl overflow-hidden shadow animate-pulse"
          >
            <div className="w-full h-40 bg-gray-300" />
            <div className="p-4 space-y-2">
              <Skeleton height={20} width="80%" />
              <Skeleton height={16} width="40%" />
              <Skeleton height={32} width="100%" className="mt-4" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (error) return <div>Error loading cars</div>;

  const carsList = data?.cars?.length ? data.cars : [];

  const handleAddToAuction = (carId) => {
    const car = carsList.find((c) => c._id === carId);
    setSelectedCar(car);
    setAuctionModalOpen(true);
  };

  const handleRequestApproval = async (carId) => {
    try {
      await requestCarApproval(carId).unwrap();
      console.log("Car approval requested successfully!");
    } catch (error) {
      console.error("Failed to request approval:", error);
    }
  };

  return (
    <div className="p-6">
      {carsList.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {carsList.map((car) => (
            <SellerCarCard
              key={car._id}
              car={car}
              onAddToAuction={handleAddToAuction}
              onRequestApproval={handleRequestApproval}
              isRequestingApproval={isRequestingApproval}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-xl">
          <div className="max-w-md mx-auto">
            <BsPlusCircleFill className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Cars Listed Yet</h3>
            <p className="text-gray-600 mb-6">
              Start your selling journey by uploading your first car listing
            </p>
            <Link
              to="/dashboard/add-new-car"
              className="inline-flex items-center bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-500 transition-colors duration-200"
            >
              <BsPlusCircleFill className="mr-2" />
              Upload First Car
            </Link>
          </div>
        </div>
      )}

      {isAuctionModalOpen && selectedCar && (
        <AuctionModal
          isOpen={isAuctionModalOpen}
          onClose={() => setAuctionModalOpen(false)}
          car={selectedCar}
          seller={sellerId}
        />
      )}
    </div>
  );
};

export default MyCars;

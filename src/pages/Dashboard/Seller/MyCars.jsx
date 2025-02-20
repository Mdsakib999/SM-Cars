import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetSellerCarsQuery } from "../../../redux/apiSlice";
import { BsPlusCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import SellerCarCard from "../../../components/DashboardComponent/Seller/SellerCarCard";
import AuctionModal from "../../../components/DashboardComponent/Seller/AuctionModal";

const MyCars = () => {
  const sellerId = useSelector((state) => state.auth.user?._id);
  const { data, isLoading, error } = useGetSellerCarsQuery(sellerId);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isAuctionModalOpen, setAuctionModalOpen] = useState(false);

  console.log("car data", data);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading cars</div>;

  const carsList = data?.cars?.length ? data.cars : [];

  const handleVerificationRequest = (carId) => {
    alert(`Verification request sent for Car ID: ${carId}`);
  };

  const handleAddToAuction = (carId) => {
    const car = carsList.find((c) => c._id === carId);
    setSelectedCar(car);
    setAuctionModalOpen(true);
  };

  return (
    <div className="p-6">
      {carsList.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {carsList.map((car) => (
            <SellerCarCard
              key={car._id}
              car={car}
              onRequestVerification={handleVerificationRequest}
              onAddToAuction={handleAddToAuction}
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
              to="/dashboard/seller/add-new-car"
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

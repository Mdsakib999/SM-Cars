import React from "react";
import { useSelector } from "react-redux";
import { IoSpeedometerOutline } from "react-icons/io5";
import { BsBackpack, BsBezier, BsPlusCircleFill } from "react-icons/bs";
import { AiOutlineSafety } from "react-icons/ai";
import { useGetSellerCarsQuery } from "../../../redux/apiSlice";
import { Link } from "react-router-dom";
const MyCars = () => {
  const sellerId = useSelector((state) => state.auth.user?._id);
  const { data, isLoading, error } = useGetSellerCarsQuery(sellerId);
  // console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading cars</div>;

  const carsList = isLoading || error || !data?.cars?.length ? [] : data.cars;

  const handleVerificationRequest = (carId) => {
    alert(`Verification request sent for Car ID: ${carId}`);
  };

  return (
    <div className="p-6">
      {data?.cars?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {carsList.map((car, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl overflow-hidden relative"
            >
              {/* Image Section with Bookmark */}
              <div className="relative">
                <img
                  className="w-full h-48 object-cover"
                  src={car.images?.[0]?.url || ""}
                  alt={car.carName || "No Car Available"}
                />
              </div>

              {/* Car Information */}
              <div className="p-4">
                <h3 className="text-2xl font-sm tracking-wide mb-2">
                  {car.carName} | {car.brand}
                </h3>
                <p className="text-gray-700 mb-4 truncate">{car.description}</p>

                <ul className="text-gray-800 mb-4 flex justify-between border-t-2 border-b-2">
                  <li className="flex flex-col items-center mb-2 mt-4">
                    <IoSpeedometerOutline className="text-xl mb-2" />
                    <div>{car.mileage}</div>
                  </li>
                  <li className="flex flex-col items-center mb-2 mt-4">
                    <BsBackpack className="text-xl mb-2" />
                    <div>{car.fuelType}</div>
                  </li>
                  <li className="flex flex-col items-center mb-2 mt-4">
                    <BsBezier className="text-xl mb-2" />
                    <div>{car.gearBox}</div>
                  </li>
                </ul>

                {/* Price and Status */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-black">
                    {car.price}
                  </span>
                  <span
                    className={`py-1 px-3 rounded-full text-sm ${
                      car.status === "Verified"
                        ? "bg-green-200 text-green-800"
                        : car.status === "Pending Verification"
                        ? "bg-orange-200 text-orange-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {car.status}
                  </span>
                </div>

                {/* Action Button */}
                {car.status === "Pending Verification" && (
                  <button
                    onClick={() => handleVerificationRequest(car._id)}
                    className="w-full flex items-center justify-center bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200"
                  >
                    <AiOutlineSafety className="mr-2" />
                    Request Verification
                  </button>
                )}
              </div>
            </div>
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
              to="/dashboard/seller/add-new-car" // Update this to your actual upload route
              className="inline-flex items-center bg-orange-600 text-white px-6 py-3 rounded-lg
                        hover:bg-orange-500 transition-colors duration-200"
            >
              <BsPlusCircleFill className="mr-2" />
              Upload First Car
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCars;

import React from "react";

import { IoSpeedometerOutline } from "react-icons/io5";
import { BsBackpack, BsBezier } from "react-icons/bs";
import { AiOutlineSafety } from "react-icons/ai";

// Sample data for MyCars
const myCarsList = [
  {
    id: 1,
    model: "Toyota Corolla",
    image:
      "https://images.unsplash.com/photo-1683403792818-a48b86226939?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "A reliable sedan with a comfortable interior and advanced safety features.",
    mileage: "30 MPG",
    fuel_type: "Petrol",
    transmission: "CVT",
    price: "$20,000",
    status: "Verified",
  },
  {
    id: 2,
    model: "Honda Civic",
    image:
      "https://images.unsplash.com/photo-1582467029665-d4b0775057de?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDIyMHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "A compact car known for its sporty handling and fuel efficiency.",
    mileage: "32 MPG",
    fuel_type: "Petrol",
    transmission: "CVT",
    price: "$22,500",
    status: "Pending Verification",
  },
  {
    id: 3,
    model: "Mazda 3",
    image:
      "https://images.unsplash.com/photo-1697923479426-b66d6aa8fc6c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDIwN3x8fGVufDB8fHx8fA%3D%3D",
    description:
      "A stylish and fun-to-drive compact car with excellent handling.",
    mileage: "29 MPG",
    fuel_type: "Petrol",
    transmission: "CVT",
    price: "$23,500",
    status: "Pending Verification",
  },
];

const MyCars = () => {
  const handleVerificationRequest = (carId) => {
    alert(`Verification request sent for Car ID: ${carId}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {myCarsList.map((car, index) => (
        <div
          key={index}
          className="bg-white border rounded-xl overflow-hidden relative shadow-md"
        >
          {/* Image Section with Bookmark */}
          <div className="relative">
            <img
              className="w-full h-48 object-cover"
              src={car.image}
              alt={car.model}
            />
          </div>

          {/* Car Information */}
          <div className="p-4">
            <h3 className="text-2xl font-sm tracking-wide mb-2">{car.model}</h3>
            <p className="text-gray-700 mb-4 truncate">{car.description}</p>

            <ul className="text-gray-800 mb-4 flex justify-between border-t-2 border-b-2">
              <li className="flex flex-col items-center mb-2 mt-4">
                <IoSpeedometerOutline className="text-xl mb-2" />
                <div>{car.mileage}</div>
              </li>
              <li className="flex flex-col items-center mb-2 mt-4">
                <BsBackpack className="text-xl mb-2" />
                <div>{car.fuel_type}</div>
              </li>
              <li className="flex flex-col items-center mb-2 mt-4">
                <BsBezier className="text-xl mb-2" />
                <div>{car.transmission}</div>
              </li>
            </ul>

            {/* Price and Status */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-black">{car.price}</span>
              <span
                className={`py-1 px-3 rounded-full text-sm ${
                  car.status === "Verified"
                    ? "bg-green-200 text-green-800"
                    : "bg-orange-200 text-orange-800"
                }`}
              >
                {car.status}
              </span>
            </div>

            {/* Action Button */}
            {car.status === "Pending Verification" && (
              <button
                onClick={() => handleVerificationRequest(car.id)}
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
  );
};

export default MyCars;

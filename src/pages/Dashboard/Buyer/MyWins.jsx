import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FiCheckCircle } from "react-icons/fi";

const winningBids = [
  {
    model: "Ford Mustang",
    image:
      "https://images.unsplash.com/photo-1683403792818-a48b86226939?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$35,000",
    location: "Los Angeles, CA",
    status: "Available for Viewing",
  },
  {
    model: "BMW 3 Series",
    image:
      "https://images.unsplash.com/photo-1683403792818-a48b86226939?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$42,000",
    location: "New York, NY",
    status: "Available for Viewing",
  },
  {
    model: "Audi A4",
    image:
      "https://images.unsplash.com/photo-1683403792818-a48b86226939?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$38,500",
    location: "San Francisco, CA",
    status: "Available for Viewing",
  },
];

const MyWins = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Winning Bids</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {winningBids.map((car, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg overflow-hidden "
          >
            {/* Car Image */}
            <img
              className="w-full h-48 object-cover"
              src={car.image}
              alt={car.model}
            />

            {/* Car Details */}
            <div className="p-4 flex flex-col h-full">
              <h3 className="text-2xl font-semibold mb-2">{car.model}</h3>
              <p className="text-xl text-black font-bold mb-4">{car.price}</p>

              {/* Location and Status */}
              <div className="flex items-center mb-2 text-gray-600">
                <IoLocationOutline className="text-xl mr-2" />
                <span>{car.location}</span>
              </div>
              <div className="flex items-center mb-4 text-green-600">
                <FiCheckCircle className="text-xl mr-2" />
                <span>{car.status}</span>
              </div>

              {/* Request a Visit Button */}
              <button className="w-full border rounded-lg py-2 text-white bg-orange-500 hover:bg-orange-600 transition">
                Request a Visit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWins;

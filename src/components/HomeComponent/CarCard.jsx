import React from "react";
import { Link } from "react-router-dom";
import { BsArrowUpRight } from "react-icons/bs";
import { IoSpeedometerOutline } from "react-icons/io5";
import { BsBackpack } from "react-icons/bs";
import { BsBezier } from "react-icons/bs";

const cars = [
  {
    model: "Toyota Corolla",
    image:
      "https://images.unsplash.com/photo-1683403792818-a48b86226939?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "A reliable sedan with a comfortable interior and advanced safety features.",
    mileage: "30 MPG",
    fuel_type: "Petrol",
    transmission: "CVT",
    price: "$20,000",
  },
  {
    model: "Honda Civic",
    image:
      "https://images.unsplash.com/photo-1582467029665-d4b0775057de?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDIyMHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "A compact car known for its sporty handling and fuel efficiency.",
    mileage: "32 MPG",
    fuel_type: "Petrol",
    transmission: "CVT",
    price: "$22,500",
  },
  {
    model: "Nissan Altima",
    image:
      "https://images.unsplash.com/photo-1582467029213-ce71667c2e28?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8",
    description:
      "A midsize sedan offering smooth performance and a spacious cabin.",
    mileage: "28 MPG",
    fuel_type: "Petrol",
    transmission: "CVT",
    price: "$24,000",
  },
  {
    model: "Mazda 3",
    image:
      "https://images.unsplash.com/photo-1697923479426-b66d6aa8fc6c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDIwN3x8fGVufDB8fHx8fA%3D%3D",

    description:
      "A stylish and fun-to-drive compact car with excellent handling.",
    mileage: "29 MPG",
    fuel_type: "Petrol",
    transmission: "CVT",
    price: "$23,500",
  },
  // {
  //   model: "Hyundai Elantra",
  //   image:
  //     "https://images.unsplash.com/photo-1697923479426-b66d6aa8fc6c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDIwN3x8fGVufDB8fHx8fA%3D%3D",

  //   description:
  //     "A value-packed sedan with modern features and an efficient engine.",
  //   mileage: "33 MPG",
  //   fuel_type: "Petrol",
  //   transmission: "CVT",
  //   price: "$19,500",
  // },
  // {
  //   model: "Kia Forte",
  //   image:
  //     "https://images.unsplash.com/photo-1697923479426-b66d6aa8fc6c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDIwN3x8fGVufDB8fHx8fA%3D%3D",

  //   description:
  //     "A compact sedan with a sleek design and a range of tech features.",
  //   mileage: "31 MPG",
  //   fuel_type: "Petrol",
  //   transmission: "CVT",
  //   price: "$21,000",
  // },
];

const CarCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {cars.map((car, index) => (
        <div key={index} className="bg-white border rounded-xl overflow-hidden">
          <img
            className="w-full h-48 object-cover"
            src={car.image}
            alt={car.model}
          />
          <div className="p-4">
            <h3 className="text-2xl font-sm tracking-wide mb-2">{car.model}</h3>

            <p className="text-gray-700 mb-4 truncate">{car.description}</p>
            <ul className="text-gray-800 mb-2 flex justify-between border-t-2 border-b-2 ">
              <li className="flex flex-col items-center mb-2 mt-4">
                <IoSpeedometerOutline className="text-xl mr-2 mb-3" />
                <div>{car.mileage}</div>
              </li>
              <li className="flex flex-col items-center mb-2 mt-4">
                <BsBackpack className="text-xl mr-2 mb-3" />
                <div>{car.fuel_type}</div>
              </li>
              <li className="flex flex-col items-center mb-2 mt-4">
                <BsBezier className="text-xl mr-2 mb-3" />
                <div>{car.transmission}</div>
              </li>
            </ul>

            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-black">{car.price}</span>
              <Link to="/car/cardetails">
                <button className="flex items-center text-orange-500 py-2 px-4 rounded-md hover:text-orange-600">
                  View Details <BsArrowUpRight className="ml-2" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarCard;

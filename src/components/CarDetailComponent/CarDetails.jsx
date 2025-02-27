import React from "react";
import { FaGasPump, FaCogs, FaRoad, FaTint } from "react-icons/fa";
import { GiGearStickPattern, GiCarDoor, GiCarSeat } from "react-icons/gi";
import { MdAir, MdDirectionsCar } from "react-icons/md";

const CarDetails = ({ car }) => {
  return (
    <div>
      <h4 className="text-4xl font-medium py-4">Car Information</h4>
      <div className="p-4 rounded-md space-y-4 border">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <div className="flex items-center gap-4 text-gray-700 lg:py-4">
            <FaCogs className="text-orange-500 text-3xl lg:text-5xl" />
            <div className="flex flex-col">
              <span className="tracking-wider pb-2">Engine</span>
              <p className="text-xl lg:text-3xl">{car.engine}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-700 lg:py-4">
            <GiGearStickPattern className="text-orange-500 text-3xl lg:text-5xl" />
            <div className="flex flex-col">
              <span className="tracking-wider pb-2">Gear Box</span>
              <p className="text-xl lg:text-3xl">{car.gearBox}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-700 lg:py-4">
            <FaRoad className="text-orange-500 text-3xl lg:text-5xl" />
            <div className="flex flex-col">
              <span className="tracking-wider pb-2">Mileage</span>
              <p className="text-xl lg:text-3xl">{car.mileage}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-700 lg:py-4">
            <FaGasPump className="text-orange-500 text-3xl lg:text-5xl" />
            <div className="flex flex-col">
              <span className="tracking-wider pb-2">Fuel Type</span>
              <p className="text-xl lg:text-3xl">{car.fuelType}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-700 lg:py-4">
            <GiCarDoor className="text-orange-500 text-3xl lg:text-5xl" />
            <div className="flex flex-col">
              <span className="tracking-wider pb-2">Condition</span>
              <p className="text-xl lg:text-3xl">{car.condition}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-700 lg:py-4">
            <FaTint className="text-orange-500 text-3xl lg:text-5xl" />
            <div className="flex flex-col">
              <span className="tracking-wider pb-2">Color</span>
              <p className="text-xl lg:text-3xl">{car.color}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-700 lg:py-4">
            <MdAir className="text-orange-500 text-3xl lg:text-5xl" />
            <div className="flex flex-col">
              <span className="tracking-wider pb-2">Air Conditioning</span>
              <p className="text-xl lg:text-3xl">
                {car.airConditioning ? "Yes" : "No"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-700 lg:py-4">
            <MdDirectionsCar className="text-orange-500 text-3xl lg:text-5xl" />
            <div className="flex flex-col">
              <span className="tracking-wider pb-2">Body Type</span>
              <p className="text-xl lg:text-3xl">{car.bodyType || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-700 lg:py-4">
            <GiCarSeat className="text-orange-500 text-3xl lg:text-5xl" />
            <div className="flex flex-col">
              <span className="tracking-wider pb-2">Drive Type</span>
              <p className="text-xl lg:text-3xl">{car.driveType || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
      {car.features && car.features.length > 0 && (
        <>
          <h4 className="text-4xl font-medium py-4">Features</h4>
          <div className="rounded-md space-y-2 text-lg">
            {car.features.map((feature, index) => (
              <p key={index}>{feature}</p>
            ))}
          </div>
        </>
      )}
      {car.sellerNote && (
        <>
          <h4 className="text-4xl font-medium py-4">Seller's Note</h4>
          <div className="rounded-md space-y-2 text-lg">
            <p>{car.sellerNote}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CarDetails;

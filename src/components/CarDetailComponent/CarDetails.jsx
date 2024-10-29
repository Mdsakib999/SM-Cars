import React from "react";
import { FaGasPump, FaCogs, FaRoad, FaTint } from "react-icons/fa";
import { GiGearStickPattern, GiCarDoor, GiCarSeat } from "react-icons/gi";
import { MdAir, MdDirectionsCar } from "react-icons/md";

// Car data JSON object
const carData = {
  carInformation: {
    engine: "V8 Turbo",
    gearBox: "Automatic",
    mileage: "15,000 km",
    fuelType: "Diesel",
    condition: "Excellent",
    color: "Black",
    airConditioning: "Yes",
    bodyType: "SUV",
    driveType: "AWD",
  },
  features: [
    "Bluetooth Connectivity",
    "Rear-View Camera",
    "Heated Seats",
    "Navigation System",
    "Keyless Entry",
    "Parking Sensors",
  ],
  sellerNote:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at voluptatibus dolorum, ipsum nostrum fugiat nesciunt excepturi totam officiis consequuntur, debitis ea quisquam sapiente, exercitationem deleniti nisi sint eveniet modi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab adipisci, cum nostrum veritatis maiores quas perspiciatis ea. Autem, vitae corrupti iste temporibus voluptates natus nesciunt dolorum voluptatum assumenda, quo omnis ipsum voluptatibus at corporis, tenetur ratione mollitia vero. Cupiditate odio, error assumenda nisi explicabo deserunt repudiandae ducimus cum quibusdam aliquid? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis explicabo iure ad facilis enim dignissimos eveniet odit cum, ratione deserunt ullam, natus asperiores officiis maiores quia? Quia voluptates cumque tenetur!",
};

const CarDetails = () => {
  return (
    <div>
      <h4 className="text-4xl font-md py-4">Car Information</h4>
      <div className="p-4 rounded-md space-y-4 border">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {/* Car Information */}
          <div className="flex items-center gap-4 text-gray-700 lg:py-4">
            <FaCogs className="text-orange-500 text-3xl lg:text-5xl" />
            <div className="flex flex-col">
              <span className="tracking-wider pb-2">Engine</span>
              <p className="text-xl lg:text-3xl">
                {carData.carInformation.engine}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-700 lg:py-4">
            <GiGearStickPattern className="text-orange-500 text-3xl lg:text-5xl" />
            <div className="flex flex-col">
              <span className="tracking-wider pb-2">Gear Box</span>
              <p className="text-xl lg:text-3xl">
                {carData.carInformation.gearBox}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-700 lg:py-4">
            <FaRoad className="text-orange-500 text-3xl lg:text-5xl" />
            <div className="flex flex-col">
              <span className="tracking-wider pb-2">Mileage</span>
              <p className="text-xl lg:text-3xl">
                {carData.carInformation.mileage}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-700 lg:py-4">
            <FaGasPump className="text-orange-500 text-3xl lg:text-5xl" />
            <div className="flex flex-col">
              <span className="tracking-wider pb-2">Fuel Type</span>
              <p className="text-xl lg:text-3xl">
                {carData.carInformation.fuelType}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-700 lg:py-4">
            <GiCarDoor className="text-orange-500 text-3xl lg:text-5xl" />
            <div className="flex flex-col">
              <span className="tracking-wider pb-2">Condition</span>
              <p className="text-xl lg:text-3xl">
                {carData.carInformation.condition}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-700 lg:py-4">
            <FaTint className="text-orange-500 text-3xl lg:text-5xl" />
            <div className="flex flex-col">
              <span className="tracking-wider pb-2">Color</span>
              <p className="text-xl lg:text-3xl">
                {carData.carInformation.color}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-700 lg:py-4">
            <MdAir className="text-orange-500 text-3xl lg:text-5xl" />
            <div className="flex flex-col">
              <span className="tracking-wider pb-2">Air Con</span>
              <p className="text-xl lg:text-3xl">
                {carData.carInformation.airConditioning}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-700 lg:py-4">
            <MdDirectionsCar className="text-orange-500 text-3xl lg:text-5xl" />
            <div className="flex flex-col">
              <span className="tracking-wider pb-2">Body Type</span>
              <p className="text-xl lg:text-3xl">
                {carData.carInformation.bodyType}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-700 lg:py-4">
            <GiCarSeat className="text-orange-500 text-3xl lg:text-5xl" />
            <div className="flex flex-col">
              <span className="tracking-wider pb-2">Drive Type</span>
              <p className="text-xl lg:text-3xl">
                {carData.carInformation.driveType}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <h4 className="text-4xl font-md py-4">Features</h4>
      <div className="rounded-md space-y-2 text-lg">
        {carData.features.map((feature, index) => (
          <p key={index}>{feature}</p>
        ))}
      </div>

      {/* Seller's Info Section */}
      <h4 className="text-4xl font-md py-4">Seller's Note</h4>
      <div className="rounded-md space-y-2 text-lg">
        <p>{carData.sellerNote}</p>
      </div>
    </div>
  );
};

export default CarDetails;

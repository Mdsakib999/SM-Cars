import React from "react";
import AuthForm from "../../components/AuthForm";
import BuyCarBenefits from "../../components/BuyCarComponent/BuyCarBenefits";
import BuyCarSteps from "../../components/BuyCarComponent/BuyCarSteps";
import { Link } from "react-router-dom";
const Buy = () => {
  return (
    <div className="">
      {/* Background Image Section */}
      <div
        className="bg-cover bg-center bg-no-repeat h-[450px] mx-auto"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1592853625511-ad0edcc69c07?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      ></div>

      {/* AuthForm Section */}
      <div className="flex justify-center items-center -mt-60 px-4">
        <div className="container">
          <AuthForm defaultRole="buyer" />
        </div>
      </div>
      <BuyCarBenefits />
      <BuyCarSteps />
      <div className="container mx-auto my-12 p-6 text-center  rounded-lg ">
        <h2 className="text-4xl font-semibold mb-4">
          Start Your Car Buying Journey
        </h2>
        <p className="text-lg text-gray-700 mb-6 tracking-wide">
          Discover a wide range of cars, place bids, and drive home your dream
          vehicle.
        </p>
        <Link to="/signup">
          <button className="btn btn-primary py-2 px-6 text-lg font-medium bg-black-500 text-white rounded-lg hover:bg-black hover:text-white transition">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Buy;

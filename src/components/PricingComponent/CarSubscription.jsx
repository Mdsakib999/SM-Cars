import React, { useState } from "react";
import BuyCarSubscription from "./BuyCarSubscription";
import SellCarSubscription from "./SellCarSubscription";

const CarSubscriptionSwitcher = () => {
  const [activeOption, setActiveOption] = useState("buy");

  const handleOptionChange = (option) => {
    setActiveOption(option);
  };

  return (
    <div className="flex flex-col items-center justify-center pt-20 p-6">
      <h1 className="text-4xl md:text-5xl lg:text-6xl text-center mb-2">
        From Startup to Enterprise.
      </h1>
      <p className="text-center text-md text-gray-600  p-4">
        Perfectly tailored for every stage of your growth. <br />
        Get started today, no credit card needed.
      </p>
      <div className="flex space-x-4 mb-6 ">
        <button
          onClick={() => handleOptionChange("buy")}
          className={`px-6 py-3 rounded-lg font-semibold ${
            activeOption === "buy"
              ? "bg-orange-500 text-white"
              : "bg-white text-black border "
          } transition duration-300`}
        >
          Buy Car
        </button>
        <button
          onClick={() => handleOptionChange("sell")}
          className={`px-6 py-3 rounded-lg font-semibold ${
            activeOption === "sell"
              ? "bg-orange-500 text-white"
              : "bg-white text-black border "
          } transition duration-300`}
        >
          Sell Car
        </button>
      </div>

      <div className="w-full max-w-7xl">
        {activeOption === "buy" ? (
          <BuyCarSubscription />
        ) : (
          <SellCarSubscription />
        )}
      </div>
    </div>
  );
};

export default CarSubscriptionSwitcher;

import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BuyCarSubscription from "./BuyCarSubscription";
import SellCarSubscription from "./SellCarSubscription";
import { useGetAllSubscriptionsQuery } from "../../redux/apiSlice";

const CAR_CARD_COUNT = 3;

const CarSubscriptionSwitcher = () => {
  const [activeOption, setActiveOption] = useState("buy");
  const { data, isLoading, isError } = useGetAllSubscriptionsQuery();

  const plans =
    activeOption === "buy"
      ? data?.buyerSubscriptions ?? []
      : data?.sellerSubscriptions ?? [];

  return (
    <div className="flex flex-col items-center pt-20 p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          From Startup to Enterprise.
        </h1>
        <p className="text-md text-gray-600">
          Perfectly tailored for every stage of your growth. <br />
          Get started today, no credit card needed.
        </p>
      </div>

      {/* Toggle buttons */}
      <div className="flex space-x-4">
        {["buy", "sell"].map((opt) => (
          <button
            key={opt}
            onClick={() => setActiveOption(opt)}
            className={`
              px-6 py-3 rounded-lg font-semibold transition
              ${
                activeOption === opt
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-white text-black border border-gray-300 hover:shadow"
              }
            `}
          >
            {opt === "buy" ? "Buy Car" : "Sell Car"}
          </button>
        ))}
      </div>

      {/* Plans / Skeleton area */}
      <div className="w-full max-w-7xl">
        {isError && (
          <div className="text-red-600 text-center py-10">
            Error loading subscriptions!
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: CAR_CARD_COUNT }).map((_, i) => (
              <div
                key={i}
                className="p-6 border rounded-lg shadow-sm space-y-4"
                role="status"
                aria-busy="true"
              >
                <Skeleton height={24} width="60%" />
                <Skeleton count={2} height={16} />
                <Skeleton height={40} width="50%" />
              </div>
            ))}
          </div>
        ) : activeOption === "buy" ? (
          <BuyCarSubscription plans={plans} />
        ) : (
          <SellCarSubscription plans={plans} />
        )}
      </div>
    </div>
  );
};

export default CarSubscriptionSwitcher;

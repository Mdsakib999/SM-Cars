import React from "react";
import { FiCheck } from "react-icons/fi";
import { BsCheckCircle } from "react-icons/bs";

const plans = [
  {
    title: "Free Plan",
    price: "Free",
    features: ["1 Car Bid", "Basic Support"],
    isCurrentPlan: true,
  },
  {
    title: "Standard",
    price: "$40/month",
    features: ["5 Car Bids", "Priority Support"],
    isCurrentPlan: false,
  },
  {
    title: "Premium",
    price: "$70/month",
    features: ["10 Car Bids", "Premium Support", "Profile Highlight"],
    isCurrentPlan: false,
  },
  {
    title: "Exclusive",
    price: "$100/month",
    features: ["Unlimited Bids", "24/7 Support", "Top Search Priority"],
    isCurrentPlan: false,
  },
];

const SubscriptionPlan = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white border rounded-lg p-6 flex flex-col justify-between hover:bg-orange-100 transition ${
              plan.isCurrentPlan
                ? "border-green-500 border-2"
                : "border-gray-200"
            }`}
          >
            {/* Plan Header */}
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-2xl font-semibold">{plan.title}</h3>
              {plan.isCurrentPlan && (
                <div className="flex items-center gap-2 text-green-500">
                  <BsCheckCircle className="text-xl" />
                  <span className="font-medium">Current Plan</span>
                </div>
              )}
            </div>

            <p className="text-3xl font-medium mb-4 text-black">{plan.price}</p>

            {/* Plan Features */}
            <ul className="text-gray-600 mb-6 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <FiCheck className="text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Plan Button */}
            <div className="mt-auto">
              {plan.isCurrentPlan ? (
                <button className="w-full px-4 py-2 rounded-lg bg-gray-300 text-gray-600 cursor-not-allowed">
                  Current Plan
                </button>
              ) : (
                <button className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
                  Upgrade Plan
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlan;

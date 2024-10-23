import React from "react";
import { FiCheck } from "react-icons/fi";

const BuyCarSubscription = () => {
  const plans = [
    {
      title: "Basic",
      price: "$20",
      features: [
        "1 Car Listing",
        "Basic Support",
        "1 Car Listing",
        "Basic Support",
      ],
    },
    {
      title: "Standard",
      price: "$40",
      features: ["5 Car Listings", "Priority Support"],
    },
    {
      title: "Premium",
      price: "$70",
      features: ["10 Car Listings", "Premium Support"],
    },
    {
      title: "Exclusive",
      price: "$100",
      features: ["Unlimited Listings", "24/7 Support"],
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
      {plans.map((plan, index) => (
        <div
          key={index}
          className="bg-white border rounded-lg p-6 flex flex-col justify-between h-full hover:bg-orange-100 transition"
        >
          <div className="flex-grow">
            <h3 className="text-2xl font-md">{plan.title}</h3>
            <p className="text-3xl font-md mb-4 text-black">{plan.price}</p>
            <ul className="text-gray-600 mb-4">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 pb-2">
                  <FiCheck />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          {/* Sticky Button at Bottom */}
          <div className="mt-auto">
            <button className="w-full btn btn-primary transition duration-300">
              Select Plan
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BuyCarSubscription;

import React from "react";
import { FiCheck } from "react-icons/fi";
const SellCarSubscription = ({ plans }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
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
            <button className="w-full btn btn-primary hover:bg-black hover:text-white hover:border-white transition duration-300">
              Select Plan
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SellCarSubscription;

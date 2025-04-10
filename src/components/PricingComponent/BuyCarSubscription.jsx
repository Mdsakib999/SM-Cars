import React from "react";
import { FiCheck } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BuyCarSubscription = ({ plans }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleSelectPlan = (planId) => {
    if (!user) {
      // Not logged in: redirect to login and pass intended destination as state
      navigate("/login", { state: { from: `/checkout?planId=${planId}` } });
    } else {
      // Logged in: go directly to checkout page with selected plan
      navigate(`/checkout?planId=${planId}`);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {plans.map((plan) => (
        <div
          key={plan._id}
          className="bg-white border rounded-lg p-6 flex flex-col justify-between h-full hover:bg-orange-100 transition"
        >
          <div className="flex-grow">
            <h3 className="text-2xl font-md">{plan.name}</h3>
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
            <button
              onClick={() => handleSelectPlan(plan._id)}
              className="w-full btn btn-primary hover:bg-black hover:text-white hover:border-white transition duration-300"
            >
              Select Plan
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BuyCarSubscription;

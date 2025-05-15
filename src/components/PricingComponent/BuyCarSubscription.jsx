import React, { useContext } from "react";
import { FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AuthProvider, { AuthContext } from "@/provider/AuthProvider";
const BuyCarSubscription = ({ plans }) => {
  const { profile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSelectPlan = (planId) => {
    if (!profile) {
      navigate("/login", { state: { from: `/checkout?planId=${planId}` } });
    } else {
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

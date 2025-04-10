import React from "react";
import { FiCheck } from "react-icons/fi";
import { BsCheckCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useGetRoleBasedPlansQuery } from "../../../redux/apiSlice";
import { Link } from "react-router-dom";
const SubscriptionPlan = () => {
  const userRole = useSelector((state) => state.auth.user?.role);
  const userCurrentSub = useSelector((state) => state.auth.user?.subscription); // current subscription plan ID

  const {
    data: plans,
    isLoading,
    error,
  } = useGetRoleBasedPlansQuery(userRole, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return (
      <div className="text-center py-6">Loading subscription plans...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6 text-red-500">Error loading plans</div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans?.map((plan, index) => {
          const isCurrentPlan = plan._id === userCurrentSub;
          return (
            <div
              key={index}
              className={`bg-white border rounded-lg p-6 flex flex-col justify-between hover:bg-orange-100 transition ${
                isCurrentPlan ? "border-green-500 border-2" : "border-gray-200"
              }`}
            >
              {/* Plan Header */}
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-2xl font-semibold">{plan.name}</h3>
                {isCurrentPlan && (
                  <div className="flex items-center gap-2 text-green-500">
                    <BsCheckCircle className="text-xl" />
                    <span className="font-medium">Current Plan</span>
                  </div>
                )}
              </div>

              <p className="text-3xl font-medium mb-4 text-black">
                ৳{plan.price}
              </p>

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
                {isCurrentPlan ? (
                  <button
                    disabled
                    className="w-full px-4 py-2 rounded-lg bg-gray-300 text-gray-600 cursor-not-allowed"
                  >
                    Current Plan
                  </button>
                ) : (
                  <Link to={`/checkout?planId=${plan._id}`}>
                    <button className="w-full px-4 py-2 rounded-lg text-black hover:bg-black hover:text-white transition border border-black">
                      Upgrade Plan
                    </button>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionPlan;

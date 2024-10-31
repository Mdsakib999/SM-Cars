import React from "react";
import { Link } from "react-router-dom";

const BuyCarSteps = () => {
  const steps = [
    {
      id: 1,
      title: "Choose a Subscription Plan",
      description:
        "Select one of our subscription plans to gain access to exclusive car listings and bidding options.",
    },
    {
      id: 2,
      title: "Place Your Bid",
      description:
        "Browse available cars and place your bids. If you’re the highest bidder, you move to the next step.",
    },
    {
      id: 3,
      title: "View the Car in Person",
      description:
        "If you win the bid, schedule a time to see the car physically. Inspect the car before proceeding.",
    },
    {
      id: 4,
      title: "Pay In-Person",
      description:
        "After inspecting the car, complete the purchase by paying in person and completing the paperwork.",
    },
  ];

  return (
    <div className="container mx-auto my-8 p-4">
      <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
        How it works
      </h2>
      <div className="grid gap-8 lg:grid-cols-2">
        {steps.map((step) => (
          <div key={step.id} className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 border-b-2 py-4">
              <span className="text-5xl font-extrabold text-orange-600 opacity-50 ">
                {step.id}.
              </span>{" "}
              <br />
              {step.title}
            </h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCarSteps;

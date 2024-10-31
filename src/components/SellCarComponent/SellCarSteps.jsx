import React from "react";

const SellCarSteps = () => {
  const steps = [
    {
      id: 1,
      title: "Choose a Subscription Plan",
      description:
        "Purchase a subscription plan to gain access to exclusive selling tools and visibility for your listing.",
    },
    {
      id: 2,
      title: "Submit Required Documents",
      description:
        "Upload necessary documents, including car ownership proof and ID, to verify your listing.",
    },
    {
      id: 3,
      title: "Sign Seller Agreement",
      description:
        "Review and sign our seller agreement to confirm your intent to list the car on our platform.",
    },
    {
      id: 4,
      title: "List Your Car for Sale",
      description:
        "Create a detailed listing for your car, including photos and specifications, to attract potential buyers.",
    },
  ];

  return (
    <div className="container mx-auto my-8 p-4">
      <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
        How it works
      </h2>
      <div className="grid gap-8 lg:grid-cols-2 ">
        {steps.map((step) => (
          <div key={step.id} className="border p-4 rounded-lg ">
            <h3 className="text-lg font-semibold mb-2 py-4 border-b-2">
              <span className="text-5xl font-extrabold text-orange-600 opacity-50">
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

export default SellCarSteps;

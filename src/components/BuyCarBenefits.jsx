import React from "react";
import { TbZoomMoney } from "react-icons/tb";
import { LiaMoneyCheckSolid } from "react-icons/lia";

const BuyCarBenefits = () => {
  return (
    <section className="lg:w-[92%] mx-auto my-8 py-4 rounded-lg">
      <h3 className="text-center text-3xl font-semibold p-8 pb-20">
        Benefit’s Of Buying With SM Car’s{" "}
        <span className="text-orange-500">Membership</span>
      </h3>
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h4 className="text-lg pb-4">Trusted Car Dealership</h4>
          <p className="text-gray-800">
            Our well-established dealership ensures you get reliable cars that
            suit your needs.
          </p>
          <TbZoomMoney className="text-4xl my-4 text-orange-400" />
        </div>
        <div>
          <h4 className="text-lg pb-4">Flexible Financing Options</h4>
          <p className="text-gray-800">
            Our finance department can provide solutions tailored to your
            budget.
          </p>
          <LiaMoneyCheckSolid className="text-4xl my-4 text-orange-400" />
        </div>
        <div>
          <h4 className="text-lg pb-4">Wide Range of Cars</h4>
          <p className="text-gray-800">
            Choose from a vast selection of vehicles to match your preferences
            and lifestyle.
          </p>
          <TbZoomMoney className="text-4xl my-4 text-orange-400" />
        </div>
        <div>
          <h4 className="text-lg pb-4">Affordable Pricing</h4>
          <p className="text-gray-800">
            Get the best value for money with our competitive pricing on all
            listings.
          </p>
          <LiaMoneyCheckSolid className="text-4xl my-4 text-orange-400" />
        </div>
      </div>
    </section>
  );
};

export default BuyCarBenefits;

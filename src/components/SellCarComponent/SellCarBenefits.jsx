import React from "react";
import { TbZoomMoney } from "react-icons/tb";
import { LiaMoneyCheckSolid } from "react-icons/lia";

const SellCarBenefits = () => {
  return (
    <section className="container mx-auto my-8 py-4 rounded-lg px-4">
      <h3 className="text-center text-4xl md:text-5xl lg:text-6xl p-8 pb-20">
        Benefit’s Of Selling With SM Car’s{" "}
        <span className="text-orange-500">Membership</span>
      </h3>
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h4 className="text-lg pb-4">Reach Thousands of Buyers</h4>
          <p className="text-gray-800">
            List your car and expose it to thousands of potential buyers
            instantly.
          </p>
          <TbZoomMoney className=" text-4xl my-4 text-orange-400" />
        </div>
        <div>
          <h4 className="text-lg pb-4">Fast Listing Approval</h4>
          <p className="text-gray-800">
            Our streamlined process ensures that your car listing goes live in
            no time.
          </p>
          <LiaMoneyCheckSolid className="text-4xl my-4 text-orange-400" />
        </div>
        <div>
          <h4 className="text-lg pb-4">Affordable Listing Fees</h4>
          <p className="text-gray-800">
            Enjoy low fees for listing your car, maximizing your profit.
          </p>
          <TbZoomMoney className="text-4xl my-4 text-orange-400" />
        </div>
        <div>
          <h4 className="text-lg pb-4">Professional Guidance</h4>
          <p className="text-gray-800">
            Our team will provide you with professional advice to get the best
            deals for your car.
          </p>
          <LiaMoneyCheckSolid className="text-4xl my-4 text-orange-400" />
        </div>
      </div>
    </section>
  );
};

export default SellCarBenefits;

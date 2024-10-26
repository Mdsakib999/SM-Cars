import React from "react";
import { TbZoomMoney } from "react-icons/tb";
import { LiaMoneyCheckSolid } from "react-icons/lia";
const Benefits = () => {
  return (
    <section className=" lg:w-[96%]  mx-auto my-12 py-4 rounded-lg">
      <h3 className="text-center text-3xl font-semibold p-8 pb-20">
        Benefit’s Of SM Car’s{" "}
        <span className="text-orange-500 ">Membership?</span>
      </h3>
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h4 className="text-lg pb-4">Trusted Car Dealership</h4>
          <p className="text-gray-800">
            Our stress-free finance department that can find financial solutions
            to save you money.
          </p>
          <TbZoomMoney className="text-4xl my-4 text-orange-400" />
        </div>
        <div>
          <h4 className="text-lg pb-4">Trusted Car Dealership</h4>
          <p className="text-gray-800">
            Our stress-free finance department that can find financial solutions
            to save you money.
          </p>
          <LiaMoneyCheckSolid className="text-4xl my-4 text-orange-400" />
        </div>
        <div>
          <h4 className="text-lg pb-4">Trusted Car Dealership</h4>
          <p className="text-gray-800">
            Our stress-free finance department that can find financial solutions
            to save you money.
          </p>
          <TbZoomMoney className="text-4xl my-4 text-orange-400" />
        </div>
        <div>
          <h4 className="text-lg pb-4">Trusted Car Dealership</h4>
          <p className="text-gray-800">
            Our stress-free finance department that can find financial solutions
            to save you money.
          </p>
          <LiaMoneyCheckSolid className="text-4xl my-4 text-orange-400" />
        </div>
      </div>
    </section>
  );
};

export default Benefits;

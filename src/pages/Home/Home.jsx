import React from "react";
import Header from "../../components/HomeComponent/Header";
import CarCard from "../../Components/HomeComponent/CarCard";
import { IoCarSportOutline } from "react-icons/io5";
import { GrMoney } from "react-icons/gr";

import Benefits from "../../components/HomeComponent/Benefits";
import ContactForm from "../../components/HomeComponent/ContactForm";

const Home = () => {
  return (
    <div className="w-[93%] mx-auto">
      <Header></Header>

      <h3 className="text-3xl text-center font-bold p-12">
        Find Cars For Sale
      </h3>

      <CarCard />
      {/* Buy Car / Sell Car */}
      <section className="flex flex-col lg:flex-row justify-between lg:w-[96%] mx-auto gap-6 my-4">
        <div className="p-10 bg-yellow-100 rounded-xl lg:w-[50%]">
          <h3 className="text-xl font-semibold">Are you looking for car ?</h3>
          <p className="tracking-wide text-gray-700 mr-12 mt-4 mb-4">
            We are committed to providing our customers with exceptional
            service. We are committed to providing our customers with
            exceptional service.
          </p>
          <button className="btn btn-secondary">Get Started</button>
          <div className="flex justify-end">
            <IoCarSportOutline className="text-7xl text-orange-600" />
          </div>
        </div>
        <div className="p-10 bg-red-100 rounded-xl lg:w-[50%]">
          <h3 className="text-xl font-semibold">Do you want to sell a car ?</h3>
          <p className="tracking-wide text-gray-700 mr-12 mt-4 mb-4">
            We are committed to providing our customers with exceptional
            service.
          </p>
          <button className="btn  bg-black text-white border-white">
            Get Started
          </button>
          <div className="flex justify-end">
            <GrMoney className="text-7xl text-orange-600" />
          </div>
        </div>
      </section>
      {/* Grow your business */}
      <section className="flex flex-col lg:flex-row lg:w-[96%] mx-auto gap-6 mt-4 mb-4">
        {/* Text Content */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <h3 className="text-2xl font-semibold mb-4">
            Online, in-person, <br />
            everywhere
          </h3>
          <p className="text-gray-700 mb-4 w-[350px]">
            Choose from thousands of vehicles from multiple brands and buy
            online with Click & Drive, or visit us at one of our dealerships
            today.
          </p>
          <div>
            <button className="btn btn-secondary">Get Started</button>
          </div>
        </div>

        {/* Image Content */}
        <div className="lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1517491093410-ab48c47bc750?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-full h-auto rounded-xl"
          />
        </div>
      </section>

      <Benefits />
      <ContactForm />
    </div>
  );
};

export default Home;

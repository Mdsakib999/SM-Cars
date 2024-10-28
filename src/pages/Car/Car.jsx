import React from "react";
import CarImageGallary from "../../components/CarDetailComponent/CarImageGallary";
import CarBidDetail from "../../components/CarDetailComponent/CarBidDetail";
import CarDetails from "../../components/CarDetailComponent/CarDetails";

const Car = () => {
  return (
    <div className="container p-4">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <CarImageGallary />
        <CarBidDetail />
      </div>
      <div>
        <CarDetails />
      </div>
    </div>
  );
};

export default Car;

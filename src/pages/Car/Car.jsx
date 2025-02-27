import React from "react";
import { useParams } from "react-router-dom";
import { useGetAuctionCarDetailsQuery } from "@/redux/apiSlice";
import CarImageGallery from "@/components/CarDetailComponent/CarImageGallary";
import CarBidDetail from "@/components/CarDetailComponent/CarBidDetail";
import CarDetails from "@/components/CarDetailComponent/CarDetails";

const Car = () => {
  const { carId } = useParams();
  const { data, isLoading, error } = useGetAuctionCarDetailsQuery(carId);

  if (isLoading) return <p>Loading car details...</p>;
  if (error) return <p>Error loading car details</p>;

  const { car, auction } = data;
  console.log(data);

  return (
    <div className="container p-4">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <CarImageGallery images={car.images} />
        <CarBidDetail auction={auction} car={car} />
      </div>
      <div className="mt-6">
        <CarDetails car={car} />
      </div>
    </div>
  );
};

export default Car;

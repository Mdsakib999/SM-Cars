// src/pages/Car.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useGetAuctionByIdQuery } from "@/redux/apiSlice";
import CarImageGallery from "@/components/CarDetailComponent/CarImageGallary";
import CarBidDetail from "@/components/CarDetailComponent/CarBidDetail";
import CarDetails from "@/components/CarDetailComponent/CarDetails";

const Car = () => {
  const { auctionId } = useParams();
  const { data, isLoading, isError, refetch } = useGetAuctionByIdQuery(
    auctionId,
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  if (isLoading) return <p>Loading auction details…</p>;
  if (isError || !data?.auction) return <p>Error loading auction details</p>;

  const { auction } = data;
  const car = auction.car;

  return (
    <div className="container p-4">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <CarImageGallery images={car.images} />

        <CarBidDetail auction={auction} car={car} onRefresh={refetch} />
      </div>

      <div className="mt-6">
        <CarDetails car={car} />
      </div>
    </div>
  );
};

export default Car;

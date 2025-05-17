// src/pages/Car.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useGetAuctionCarDetailsQuery } from "@/redux/apiSlice";
import CarImageGallery from "@/components/CarDetailComponent/CarImageGallary";
import CarBidDetail from "@/components/CarDetailComponent/CarBidDetail";
import CarDetails from "@/components/CarDetailComponent/CarDetails";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Car = () => {
  const { auctionId } = useParams();
  const { data, isLoading, isError, refetch } = useGetAuctionCarDetailsQuery(
    auctionId,
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  // Loading state with skeletons
  if (isLoading) {
    return (
      <div className="container p-4 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Image gallery skeleton */}
          <Skeleton height={400} />
          {/* Bid detail skeleton */}
          <div className="space-y-4">
            <Skeleton height={30} width="50%" />
            <Skeleton height={20} width="30%" />
            <Skeleton count={4} height={20} />
            <Skeleton height={40} width="40%" />
          </div>
        </div>
        {/* Car details skeleton */}
        <div className="space-y-3">
          <Skeleton height={24} width="30%" />
          <Skeleton count={6} height={18} />
        </div>
      </div>
    );
  }

  if (isError || !data?.auction) {
    return (
      <div className="container p-4 text-center text-red-500">
        Error loading auction details.{" "}
        <button onClick={refetch} className="underline">
          Retry
        </button>
      </div>
    );
  }

  const { auction } = data;
  const car = auction.car;

  return (
    <div className="container p-4 space-y-6">
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

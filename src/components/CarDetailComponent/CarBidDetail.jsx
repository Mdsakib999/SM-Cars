import React from "react";
import { useSelector } from "react-redux";
import { IoHammerSharp } from "react-icons/io5";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import Countdown from "../AuctionComponent/CountDown";
import {
  usePlaceBidMutation,
  useGetAuctionCarDetailsQuery,
} from "@/redux/apiSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

const CarBidDetail = ({ auction, car }) => {
  const user = useSelector((state) => state.auth.user);
  const { data: auctionData, refetch } = useGetAuctionCarDetailsQuery(car._id);
  console.log(auction.bids);
  // Correctly initialize the mutation hook
  const [placeBid, { isLoading }] = usePlaceBidMutation();

  // Determine the minimum bid: currentBid if exists, otherwise reservePrice (or car price)
  const minimumBid = auction.currentBid || auction.reservePrice || car.price;

  // Set up Formik for bid placement
  const formik = useFormik({
    initialValues: { amount: car.price },
    validationSchema: Yup.object({
      amount: Yup.number()
        .typeError("Bid must be a number")
        .min(minimumBid + 1, `Bid must be greater than $${minimumBid}`)
        .required("Bid amount is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await placeBid({
          carId: car._id,
          auctionId: auction._id,
          amount: Number(values.amount),
        }).unwrap();
        resetForm();
        // Optionally, trigger a manual refetch if necessary:
        refetch();
      } catch (error) {
        console.error("Error placing bid:", error);
      }
    },
  });

  // Get the top 3 highest bids
  let highestBidders = [];
  if (auction && auction.bids) {
    highestBidders = [...auction.bids]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);
  }

  return (
    <div className="w-full lg:w-1/2 border rounded-md space-y-4 bg-gray-50 p-4">
      {auction ? (
        <>
          <div className="flex items-center justify-between gap-4 border-b-2 pb-3">
            <IoHammerSharp className="text-4xl lg:text-6xl text-orange-500 p-2" />

            <h3 className="text-xl lg:text-2xl font-md uppercase">
              {auction.status === "scheduled"
                ? "Bidding starts at"
                : "Bidding ends at"}
            </h3>

            <div className="text-lg lg:text-2xl border bg-orange-500 text-white rounded-lg p-2">
              <Countdown
                time={
                  auction.status === "scheduled"
                    ? auction.startTime
                    : auction.endTime
                }
              />
            </div>
          </div>
          <h2 className="text-3xl font-semibold">{car.carName}</h2>
          <div className="flex gap-4">
            <p className="text-md font-semibold">Minimum Bid:</p>
            <span>
              $
              {auction.currentBid
                ? auction.currentBid.toLocaleString()
                : car.price.toLocaleString()}
            </span>
          </div>
          {/* Bid placement form */}
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-4 border rounded-md p-4 bg-white"
          >
            <label
              htmlFor="amount"
              className="text-lg font-medium text-gray-700"
            >
              Enter Amount:
            </label>
            <input
              id="amount"
              type="number"
              name="amount"
              placeholder="Amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {formik.touched.amount && formik.errors.amount && (
              <div className="text-red-500 text-sm">{formik.errors.amount}</div>
            )}
            <button
              type="submit"
              className="btn btn-secondary"
              disabled={isLoading}
            >
              {isLoading ? "Placing bid..." : "Place Bid"}
            </button>
          </form>
          {highestBidders.length > 0 && (
            <div className="bg-gray-100 p-4 rounded-md space-y-2">
              <h4 className="text-lg font-semibold text-gray-700 mb-2">
                Top Bidders
              </h4>
              {highestBidders.map((bidder, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-md ${
                    index === 0
                      ? "bg-green-200 text-green-800 font-bold"
                      : "bg-white text-gray-700"
                  }`}
                >
                  <span className="text-xl">{`#${index + 1}`}</span>
                  <span className="text-lg">
                    {bidder.bidderName || "Bidder"}
                  </span>
                  <span className="text-lg font-medium">
                    ${bidder.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
          {car.contactInfo && (
            <>
              {car.contactInfo.location && (
                <div className="bg-white border rounded-md p-4 flex items-center gap-4">
                  <FaMapMarkerAlt className="text-orange-500 text-2xl" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700">
                      Location
                    </h4>
                    <p className="text-gray-600">{car.contactInfo.location}</p>
                  </div>
                </div>
              )}
              {car.contactInfo.phone && (
                <div className="bg-white border rounded-md p-4 flex items-center gap-4">
                  <FaPhoneAlt className="text-orange-500 text-2xl" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700">
                      Contact
                    </h4>
                    <p className="text-gray-600">{car.contactInfo.phone}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="text-center text-gray-600">
          <p>No active auction for this car.</p>
        </div>
      )}
    </div>
  );
};

export default CarBidDetail;

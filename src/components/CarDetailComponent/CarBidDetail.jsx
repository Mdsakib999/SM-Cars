import React, { useContext } from "react";
import { IoHammerSharp } from "react-icons/io5";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import Countdown from "../AuctionComponent/CountDown";
import { usePlaceBidMutation } from "@/redux/apiSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "@/provider/AuthProvider";
import { toast } from "react-toastify";

const CarBidDetail = ({ auction, car, onRefresh }) => {
  const { profile } = useContext(AuthContext);
  const [placeBid, { isLoading }] = usePlaceBidMutation();

  const minimumBid = auction.currentBid || car.price;

  const formik = useFormik({
    initialValues: { amount: minimumBid },
    validationSchema: Yup.object({
      amount: Yup.number()
        .typeError("Bid must be a number")
        .min(minimumBid + 1, `Bid must be greater than $${minimumBid}`)
        .required("Bid amount is required"),
    }),
    onSubmit: async ({ amount }, { resetForm }) => {
      try {
        await placeBid({
          carId: car._id,
          auctionId: auction._id,
          amount: Number(amount),
        }).unwrap();
        toast.success("Your bid was placed successfully!");
        resetForm();
        onRefresh && onRefresh();
      } catch (error) {
        console.error("Error placing bid:", error);
        toast.error("Failed to place bid. Please try again.");
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
            {auction.status !== "ended" && (
              <h3 className="text-xl lg:text-2xl font-md uppercase mb-2">
                {auction.status === "scheduled"
                  ? "Bidding starts at"
                  : "Bidding ends at"}
              </h3>
            )}

            <div className="text-lg lg:text-2xl border bg-orange-500 text-white rounded-lg p-2">
              <Countdown
                time={
                  auction.status === "active"
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
                : auction.reservePrice.toLocaleString()}
            </span>
          </div>

          {profile?.role === "buyer" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit(e);
              }}
              className="flex flex-col sm:flex-row items-center gap-4 border rounded-md p-4 bg-white"
            >
              <label
                htmlFor="amount"
                className="text-lg font-medium text-gray-700"
              >
                Enter Amount:
              </label>
              <input
                type="number"
                placeholder="Enter your bid"
                {...formik.getFieldProps("amount")}
                className={`w-full p-2 border rounded ${
                  auction.status !== "active"
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : ""
                }`}
                disabled={auction.status !== "active"}
              />
              {formik.touched.amount && formik.errors.amount && (
                <div className="text-red-500 text-sm">
                  {formik.errors.amount}
                </div>
              )}
              <button
                type="submit"
                className="btn btn-secondary"
                disabled={isLoading}
              >
                {isLoading ? "Placing bid..." : "Place Bid"}
              </button>
            </form>
          ) : (
            <div className="p-4 bg-white border rounded-md">
              <p className="text-gray-600">Only buyers can place bids.</p>
            </div>
          )}
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
                  <span className="text-lg">{bidder.name || "Bidder"}</span>
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

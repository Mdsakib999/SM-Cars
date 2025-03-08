import React, { useState } from "react";
import {
  useGetApprovedCarsQuery,
  useCreateAuctionAdminMutation,
} from "@/redux/apiSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ManageAuctions = () => {
  const { data, isLoading, isError } = useGetApprovedCarsQuery();
  const [createAuction, { isLoading: creatingAuction }] =
    useCreateAuctionAdminMutation();
  const [selectedCar, setSelectedCar] = useState(null);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading listings</div>;
  if (!data) return <div>No data available</div>;

  const listings = data.approvedCars || data;

  const openAuctionModal = (car) => {
    setSelectedCar(car);
  };

  const closeAuctionModal = () => {
    setSelectedCar(null);
  };

  // Validation schema ensuring start time is not in the past,
  // and that end time is after the selected start time.
  const validationSchema = Yup.object().shape({
    startTime: Yup.date()
      .min(new Date(), "Start time cannot be in the past")
      .required("Start time is required"),
    endTime: Yup.date()
      .min(Yup.ref("startTime"), "End time must be after start time")
      .required("End time is required"),
    reservePrice: Yup.number()
      .typeError("Reserve Price must be a number")
      .positive("Reserve Price must be positive")
      .required("Reserve Price is required"),
  });

  const initialValues = {
    startTime: null,
    endTime: null,
    reservePrice: "",
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Auction Modal */}
      {selectedCar && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Create Auction for {selectedCar.carName}
            </h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                // Get seller ID from the selected car (handle object or string)
                const sellerId =
                  typeof selectedCar.sellerId === "object"
                    ? selectedCar.sellerId._id
                    : selectedCar.sellerId;
                try {
                  const response = await createAuction({
                    car: selectedCar._id,
                    seller: sellerId,
                    startTime: values.startTime.toISOString(),
                    endTime: values.endTime.toISOString(),
                    reservePrice: Number(values.reservePrice),
                  }).unwrap();
                  toast.success("Auction created successfully!");
                  console.log("Auction created:", response);
                  closeAuctionModal();
                } catch (error) {
                  console.error("Error creating auction:", error);
                  toast.error("Error creating auction");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ setFieldValue, values, isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 mb-1"
                      htmlFor="startTime"
                    >
                      Start Time
                    </label>
                    <DatePicker
                      selected={values.startTime}
                      onChange={(date) => setFieldValue("startTime", date)}
                      showTimeSelect
                      timeIntervals={15}
                      dateFormat="Pp"
                      className="w-full border rounded px-3 py-2"
                      placeholderText="Select start time"
                      minDate={new Date()}
                    />
                    <ErrorMessage
                      name="startTime"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 mb-1"
                      htmlFor="endTime"
                    >
                      End Time
                    </label>
                    <DatePicker
                      selected={values.endTime}
                      onChange={(date) => setFieldValue("endTime", date)}
                      showTimeSelect
                      timeIntervals={15}
                      dateFormat="Pp"
                      className="w-full border rounded px-3 py-2"
                      placeholderText="Select end time"
                      minDate={values.startTime || new Date()}
                    />
                    <ErrorMessage
                      name="endTime"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 mb-1"
                      htmlFor="reservePrice"
                    >
                      Reserve Price
                    </label>
                    <Field
                      type="number"
                      id="reservePrice"
                      name="reservePrice"
                      placeholder="Enter reserve price"
                      className="w-full border rounded px-3 py-2"
                    />
                    <ErrorMessage
                      name="reservePrice"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={closeAuctionModal}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || creatingAuction}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      {isSubmitting || creatingAuction
                        ? "Creating..."
                        : "Create Auction"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {/* Listing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((car) => {
          // Extract sellerId safely
          const sellerId =
            typeof car.sellerId === "object" ? car.sellerId._id : car.sellerId;
          return (
            <div
              key={car._id}
              className="bg-white border rounded-xl overflow-hidden shadow-md"
            >
              {/* Car Image */}
              <div>
                <img
                  src={
                    car.images?.[0]?.url || "https://via.placeholder.com/150"
                  }
                  alt={car.carName || "Car Image"}
                  className="w-full h-48 object-cover"
                />
              </div>

              {/* Car Details */}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  {car.carName} | {car.brand}
                </h3>
                <p className="text-gray-700 mb-2">
                  Vendor:{" "}
                  {car.sellerId && car.sellerId.name
                    ? `${car.sellerId.name} (${car.sellerId.email})`
                    : "No Vendor"}
                </p>
                <p className="text-gray-700 mb-2">
                  Starting Price: ${car.price.toLocaleString()}
                </p>
                <p className="text-gray-700 mb-4">
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      car.status === "approved"
                        ? "text-green-600"
                        : car.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {car.status}
                  </span>
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link
                    to={`/dashboard/admin-car-details/${car._id}`}
                    className="flex-1 bg-blue-500 text-white py-2 text-center rounded-md hover:bg-blue-600 transition"
                  >
                    View Details
                  </Link>
                  {car.status === "approved" &&
                    car.auctionStatus === "none" && (
                      <button
                        onClick={() => openAuctionModal(car)}
                        className="flex-1 bg-green-500 text-white py-2 text-center rounded-md hover:bg-green-600 transition"
                      >
                        Create Auction
                      </button>
                    )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageAuctions;

import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import * as Yup from "yup";
import {
  useGetSellerCarDetailsQuery,
  useEditCarMutation,
} from "../../../redux/apiSlice";
import CarForm from "../../../components/DashboardComponent/Seller/CarForm";
import { AuthContext } from "@/provider/AuthProvider";

const EditCar = () => {
  const { id: carId } = useParams();
  const navigate = useNavigate();
  const {
    data: carData,
    isLoading,
    isError,
  } = useGetSellerCarDetailsQuery(carId);
  const [editCar] = useEditCarMutation();
  const { profile } = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    carName: Yup.string().required("Car name is required"),
    brand: Yup.string().required("Brand is required"),
    modelYear: Yup.number()
      .required("Model year is required")
      .min(1900, "Invalid model year")
      .max(new Date().getFullYear() + 1, "Invalid model year"),
    engine: Yup.string().required("Engine is required"),
    gearBox: Yup.string().required("Gearbox is required"),
    mileage: Yup.number()
      .required("Mileage is required")
      .min(0, "Invalid mileage"),
    fuelType: Yup.string().required("Fuel type is required"),
    condition: Yup.string().required("Condition is required"),
    color: Yup.string().required("Color is required"),
    airConditioning: Yup.boolean(),
    price: Yup.number().required("Price is required").min(0, "Invalid price"),
    description: Yup.string().required("Description is required"),
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin text-4xl text-orange-500" />
      </div>
    );
  if (isError) return <div>Error loading car data</div>;
  if (!carData) return <div>Car not found</div>;

  const car = carData.car || carData;

  // Prevent editing if the car has been approved.
  if (car.status === "approved") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-white shadow-sm font-bold py-2 px-4 rounded"
        >
          ← Back
        </button>
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h1 className="text-3xl font-bold mb-4">Edit Car</h1>
          <p className="text-red-500">
            This car has been approved and cannot be edited.
          </p>
        </div>
      </div>
    );
  }

  const initialValues = {
    carName: car.carName,
    brand: car.brand,
    modelYear: car.modelYear,
    engine: car.engine,
    gearBox: car.gearBox,
    mileage: car.mileage,
    fuelType: car.fuelType,
    condition: car.condition,
    color: car.color,
    airConditioning: car.airConditioning,
    price: car.price,
    description: car.description,
    images: null, // New images if provided
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();

      // Append all fields except images
      Object.keys(values).forEach((key) => {
        if (
          key !== "images" &&
          values[key] !== null &&
          values[key] !== undefined
        ) {
          formData.append(key, values[key]);
        }
      });

      // Append sellerId
      formData.append("sellerId", profile._id);

      // Append new images if provided
      if (values.images) {
        Array.from(values.images).forEach((file) => {
          formData.append("images", file);
        });
      }

      await editCar({ id: carId, data: formData }).unwrap();
      navigate(`/dashboard/seller/my-cars/${carId}`);
    } catch (error) {
      console.error("Edit car error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-white shadow-sm font-bold py-2 px-4 rounded"
      >
        ← Back
      </button>
      <h1 className="text-3xl font-bold mb-6">Edit Car Details</h1>
      <CarForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        car={car}
      />
    </div>
  );
};

export default EditCar;

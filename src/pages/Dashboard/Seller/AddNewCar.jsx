import React, { useState, useCallback } from "react";
import {
  useCreateCarMutation,
  useGetSellerLimitQuery,
} from "../../../redux/apiSlice";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import { FaSpinner } from "react-icons/fa";

const AddNewCar = () => {
  const navigate = useNavigate();
  const { profile } = useContext(AuthContext);
  const uid = profile?._id;
  const {
    data: subscriptionLimitData,
    isLoading: subscriptionLimitLoading,
    isError: subLimitError,
  } = useGetSellerLimitQuery(uid);

  const [createCar, { isLoading, isError, isSuccess }] = useCreateCarMutation();
  const sellerId = profile?._id;
  const [previewImages, setPreviewImages] = useState([]);
  const [showContactInfo, setShowContactInfo] = useState(false);

  if (subscriptionLimitLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin text-4xl text-orange-500" />
      </div>
    );
  if (!subscriptionLimitData || subLimitError)
    return <p>Error fetching data.</p>;
  if (!subscriptionLimitData || subLimitError) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Listing Limit Reached</h2>
        <p className="mb-6">
          You have reached your listing limit. Please upgrade your subscription
          to add more cars.
        </p>
        <button
          onClick={() => navigate("/subscription-plan")}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
        >
          Upgrade Plan
        </button>
      </div>
    );
  }

  const initialValues = {
    carName: "",
    brand: "",
    engine: "",
    modelYear: "",
    price: "",
    mileage: "",
    fuelType: "",
    color: "",
    description: "",
    gearBox: "",
    condition: "",
    airConditioning: false,
    images: [],
    contactInfo: {
      phone: "",
      location: "",
      city: "",
    },
  };

  const validationSchema = Yup.object().shape({
    carName: Yup.string().required("Car name is required"),
    brand: Yup.string().required("Brand is required"),
    engine: Yup.string().required("Engine type is required"),
    modelYear: Yup.string().required("Model year is required"),
    price: Yup.number().required("Price is required"),
    mileage: Yup.string().required("Mileage is required"),
    fuelType: Yup.string().required("Fuel type is required"),
    color: Yup.string().required("Color is required"),
    description: Yup.string().required("Description is required"),
    gearBox: Yup.string().required("Gearbox type is required"),
    condition: Yup.string().required("Condition is required"),
    airConditioning: Yup.boolean(),
    images: Yup.array().min(1, "At least one image is required"),
    contactInfo: Yup.object().shape({
      phone: Yup.string(),
      location: Yup.string(),
      city: Yup.string(),
    }),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!sellerId) {
      alert("User ID is missing. Please log in.");
      return;
    }
    const formData = new FormData();
    formData.append("sellerId", sellerId);
    formData.append("carName", values.carName);
    formData.append("brand", values.brand);
    formData.append("engine", values.engine);
    formData.append("modelYear", values.modelYear);
    formData.append("price", values.price);
    formData.append("mileage", values.mileage);
    formData.append("fuelType", values.fuelType);
    formData.append("color", values.color);
    formData.append("description", values.description);
    formData.append("gearBox", values.gearBox);
    formData.append("condition", values.condition);
    formData.append("airConditioning", values.airConditioning.toString());

    if (showContactInfo) {
      if (values.contactInfo.phone)
        formData.append("contactInfo[phone]", values.contactInfo.phone);
      if (values.contactInfo.location)
        formData.append("contactInfo[location]", values.contactInfo.location);
      if (values.contactInfo.city)
        formData.append("contactInfo[city]", values.contactInfo.city);
    }

    values.images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await createCar(formData).unwrap();
      alert("Car added successfully!");
      resetForm();
      navigate("/dashboard/my-cars");
    } catch (error) {
      console.error("Failed to add car:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-xl border w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Car
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, isSubmitting }) => {
            const onDrop = useCallback(
              (acceptedFiles) => {
                setFieldValue("images", [
                  ...(values.images || []),
                  ...acceptedFiles,
                ]);
                const newPreviews = acceptedFiles.map((file) =>
                  Object.assign(file, { preview: URL.createObjectURL(file) })
                );
                setPreviewImages((prev) => [...prev, ...newPreviews]);
              },
              [setFieldValue, values.images]
            );
            const { getRootProps, getInputProps, isDragActive } = useDropzone({
              onDrop,
              multiple: true,
              accept: {
                "image/*": [],
              },
            });

            return (
              <Form className="space-y-6">
                {/* Car Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Car Name
                  </label>
                  <Field
                    type="text"
                    name="carName"
                    placeholder="Enter car name"
                    className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                  />
                  <ErrorMessage
                    name="carName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Brand and Model Year */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Brand
                    </label>
                    <Field
                      type="text"
                      name="brand"
                      placeholder="Enter car brand"
                      className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                    />
                    <ErrorMessage
                      name="brand"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Model Year
                    </label>
                    <Field
                      type="number"
                      name="modelYear"
                      placeholder="e.g., 2022"
                      className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                    />
                    <ErrorMessage
                      name="modelYear"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                {/* Price and Mileage */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Price (BDT)
                    </label>
                    <Field
                      type="number"
                      name="price"
                      placeholder="Enter car price"
                      className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mileage (km)
                    </label>
                    <Field
                      type="number"
                      name="mileage"
                      placeholder="Enter car mileage"
                      className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                    />
                    <ErrorMessage
                      name="mileage"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                {/* Fuel Type and Color */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Fuel Type
                    </label>
                    <Field
                      as="select"
                      name="fuelType"
                      className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                    >
                      <option value="" disabled>
                        Select fuel type
                      </option>
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                    </Field>
                    <ErrorMessage
                      name="fuelType"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Color
                    </label>
                    <Field
                      type="text"
                      name="color"
                      placeholder="Enter car color"
                      className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                    />
                    <ErrorMessage
                      name="color"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                {/* Engine */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Engine Type
                  </label>
                  <Field
                    type="text"
                    name="engine"
                    placeholder="e.g., V6, Electric, etc."
                    className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                  />
                  <ErrorMessage
                    name="engine"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    placeholder="Enter car description"
                    rows="4"
                    className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Gearbox */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gearbox
                  </label>
                  <Field
                    as="select"
                    name="gearBox"
                    className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                  >
                    <option value="" disabled>
                      Select gearbox type
                    </option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </Field>
                  <ErrorMessage
                    name="gearBox"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Condition
                  </label>
                  <Field
                    as="select"
                    name="condition"
                    className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                  >
                    <option value="" disabled>
                      Select condition
                    </option>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                    <option value="Excellent">Excellent</option>
                  </Field>
                  <ErrorMessage
                    name="condition"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Air Conditioning */}
                <div className="flex items-center">
                  <label className="text-sm font-medium text-gray-700 mr-4">
                    Air Conditioning
                  </label>
                  <Field
                    type="checkbox"
                    name="airConditioning"
                    className="mt-1 focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded"
                  />
                  <ErrorMessage
                    name="airConditioning"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Upload Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Car Images
                  </label>
                  <div
                    {...getRootProps({
                      className:
                        "mt-2 p-3 w-full rounded-lg border border-gray-300 cursor-pointer text-center",
                    })}
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>Drop the images here...</p>
                    ) : (
                      <p>
                        Drag 'n' drop some images here, or click to select
                        images
                      </p>
                    )}
                  </div>
                  <ErrorMessage
                    name="images"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Image Previews */}
                {previewImages && previewImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {previewImages.map((file, index) => (
                      <img
                        key={index}
                        src={file.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                    ))}
                  </div>
                )}

                {/* Optional Contact Info */}
                <div>
                  {!showContactInfo ? (
                    <button
                      type="button"
                      onClick={() => setShowContactInfo(true)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                    >
                      Add Contact Info
                    </button>
                  ) : (
                    <div className="mt-4 space-y-4 border p-4 rounded-md">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <Field
                          type="text"
                          name="contactInfo.phone"
                          placeholder="Enter phone number"
                          className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                        />
                        <ErrorMessage
                          name="contactInfo.phone"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Location
                        </label>
                        <Field
                          type="text"
                          name="contactInfo.location"
                          placeholder="Enter location"
                          className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                        />
                        <ErrorMessage
                          name="contactInfo.location"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <Field
                          type="text"
                          name="contactInfo.city"
                          placeholder="Enter city"
                          className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                        />
                        <ErrorMessage
                          name="contactInfo.city"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowContactInfo(false)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Remove Contact Info
                      </button>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="bg-orange-500 text-white p-3 rounded-lg w-full md:w-1/4 hover:bg-orange-600"
                  >
                    {isSubmitting || isLoading ? "Adding Car..." : "Add Car"}
                  </button>
                </div>
                {isError && (
                  <p className="text-red-500 text-center mt-4">
                    Something went wrong. Please try again.
                  </p>
                )}
                {isSuccess && (
                  <p className="text-green-500 text-center mt-4">
                    Car added successfully!
                  </p>
                )}
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddNewCar;

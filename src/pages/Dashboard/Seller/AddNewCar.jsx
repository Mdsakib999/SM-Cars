import React, { useState } from "react";
import { useCreateCarMutation } from "../../../redux/apiSlice";
import { useSelector } from "react-redux";

const AddNewCar = () => {
  const [formData, setFormData] = useState({
    carName: "",
    brand: "",
    engine: "",
    modelYear: "",
    price: "",
    mileage: "",
    fuelType: "",
    color: "",
    description: "",
    gearbox: "",
    condition: "",
    airConditioning: false,
    images: [],
  });
  const [createCar, { isLoading, isError, isSuccess }] = useCreateCarMutation();
  const sellerId = useSelector((state) => state.auth.user?._id);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file selection for multiple images
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    setFormData({ ...formData, images: files });
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sellerId) {
      alert("User ID is missing. Please log in.");
      return;
    }

    // Create a FormData object to send images and other data
    const data = new FormData();
    data.append("sellerId", sellerId); // Send sellerId
    data.append("carName", formData.carName);
    data.append("engine", formData.engine);
    data.append("brand", formData.brand);
    data.append("modelYear", formData.modelYear);
    data.append("price", formData.price);
    data.append("mileage", formData.mileage);
    data.append("fuelType", formData.fuelType);
    data.append("color", formData.color);
    data.append("description", formData.description);
    data.append("gearBox", formData.gearbox);
    data.append("condition", formData.condition);
    data.append("airConditioning", formData.airConditioning);

    // Append images to FormData
    formData.images.forEach((file) => {
      data.append("images", file);
    });

    // Use the RTK query mutation to send the data to the backend
    try {
      await createCar(data).unwrap();

      alert("Car added successfully!");
    } catch (error) {
      console.error("Failed to add car:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl border w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Car
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Car Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Car Name
            </label>
            <input
              type="text"
              name="carName"
              value={formData.carName}
              onChange={handleChange}
              placeholder="Enter car name"
              className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          {/* Brand and Model Year */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Enter car brand"
                className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Model Year
              </label>
              <input
                type="number"
                name="modelYear"
                value={formData.modelYear}
                onChange={handleChange}
                placeholder="e.g., 2022"
                className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                required
              />
            </div>
          </div>

          {/* Price and Mileage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price (BDT)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter car price"
                className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mileage (km)
              </label>
              <input
                type="number"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                placeholder="Enter car mileage"
                className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                required
              />
            </div>
          </div>

          {/* Fuel Type and Color */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fuel Type
              </label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                required
              >
                <option value="" disabled>
                  Select fuel type
                </option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 ">
                Color
              </label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Enter car color"
                className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                required
              />
            </div>
          </div>
          {/* Engine */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Engine Type
            </label>
            <input
              type="text"
              name="engine"
              value={formData.engine}
              onChange={handleChange}
              placeholder="e.g., 2022"
              className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter car description"
              className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
              rows="4"
              required
            ></textarea>
          </div>
          {/* Gearbox */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gearbox
            </label>
            <select
              name="gearbox"
              value={formData.gearbox}
              onChange={handleChange}
              className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
              required
            >
              <option value="" disabled>
                Select gearbox type
              </option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Condition
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
              required
            >
              <option value="" disabled>
                Select condition
              </option>
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Excellent">Excellent</option>
            </select>
          </div>

          {/* Air Conditioning */}
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700 mr-4">
              Air Conditioning
            </label>
            <input
              type="checkbox"
              name="airConditioning"
              checked={formData.airConditioning}
              onChange={handleCheckboxChange}
              className="mt-1 focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded"
            />
          </div>

          {/* Upload Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Car Image
            </label>
            <input
              type="file"
              name="images"
              onChange={handleFileChange}
              className="mt-2 p-3 w-full rounded-lg border border-gray-300"
              multiple
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-500 text-white p-3 rounded-lg w-full md:w-1/4 hover:bg-orange-600"
            >
              {isLoading ? "Adding Car..." : "Add Car"}
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
        </form>
      </div>
    </div>
  );
};

export default AddNewCar;

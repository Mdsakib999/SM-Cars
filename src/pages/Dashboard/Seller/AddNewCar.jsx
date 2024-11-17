import React, { useState } from "react";

const AddNewCar = () => {
  const [formData, setFormData] = useState({
    carName: "",
    brand: "",
    modelYear: "",
    price: "",
    mileage: "",
    fuelType: "",
    color: "",
    description: "",
    carImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, carImage: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl">
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

          {/* Upload Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Car Image
            </label>
            <input
              type="file"
              name="carImage"
              onChange={handleFileChange}
              className="mt-2 p-3 w-full rounded-lg border border-gray-300"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-500 text-white p-3 rounded-lg w-full md:w-1/4 hover:bg-orange-600"
            >
              Add Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCar;

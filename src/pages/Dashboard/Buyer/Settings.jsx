import React from "react";
import { useState } from "react";
const Settings = () => {
  const [formData, setFormData] = useState({
    name: "Charlene Reed",
    email: "charlenereed@gmail.com",
    username: "Charlene Reed",
    password: "",
    dateOfBirth: "25 January 1990",
    presentAddress: "San Jose, California, USA",
    permanentAddress: "San Jose, California, USA",
    city: "San Jose",
    postalCode: "45962",
    country: "USA",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl">
        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src="https://placehold.co/100x100"
              alt="Profile"
              className="rounded-full w-24 h-24"
            />
            <button className="absolute bottom-0 right-0 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-sm">+</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 p-3 w-full rounded-lg border border-gray-300"
              />

              <label className="block text-sm font-medium text-gray-700 mt-4">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 p-3 w-full rounded-lg border border-gray-300"
              />

              <label className="block text-sm font-medium text-gray-700 mt-4">
                Date of Birth
              </label>
              <input
                type="text"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="mt-2 p-3 w-full rounded-lg border border-gray-300"
              />

              <label className="block text-sm font-medium text-gray-700 mt-4">
                Permanent Address
              </label>
              <input
                type="text"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
                className="mt-2 p-3 w-full rounded-lg border border-gray-300"
              />

              <label className="block text-sm font-medium text-gray-700 mt-4">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="mt-2 p-3 w-full rounded-lg border border-gray-300"
              />
            </div>

            {/* Right Column */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                User Name
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-2 p-3 w-full rounded-lg border border-gray-300"
              />

              <label className="block text-sm font-medium text-gray-700 mt-4">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-2 p-3 w-full rounded-lg border border-gray-300"
              />

              <label className="block text-sm font-medium text-gray-700 mt-4">
                Present Address
              </label>
              <input
                type="text"
                name="presentAddress"
                value={formData.presentAddress}
                onChange={handleChange}
                className="mt-2 p-3 w-full rounded-lg border border-gray-300"
              />

              <label className="block text-sm font-medium text-gray-700 mt-4">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-2 p-3 w-full rounded-lg border border-gray-300"
              />

              <label className="block text-sm font-medium text-gray-700 mt-4">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-2 p-3 w-full rounded-lg border border-gray-300"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-orange-500 text-white p-3 rounded-lg w-full md:w-1/4"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;

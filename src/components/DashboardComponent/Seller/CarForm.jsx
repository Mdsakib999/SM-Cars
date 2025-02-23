import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const CarForm = ({ initialValues, validationSchema, onSubmit, car }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          {/* Car Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Car Name
            </label>
            <Field
              name="carName"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            />
            <ErrorMessage
              name="carName"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <Field
              name="brand"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            />
            <ErrorMessage
              name="brand"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Model Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Model Year
            </label>
            <Field
              type="number"
              name="modelYear"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            />
            <ErrorMessage
              name="modelYear"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Engine */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Engine
            </label>
            <Field
              name="engine"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            />
            <ErrorMessage
              name="engine"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            >
              <option value="">Select gearbox type</option>
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
            </Field>
            <ErrorMessage
              name="gearBox"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Mileage */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mileage (miles)
            </label>
            <Field
              type="number"
              name="mileage"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            />
            <ErrorMessage
              name="mileage"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Fuel Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fuel Type
            </label>
            <Field
              as="select"
              name="fuelType"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            >
              <option value="">Select fuel type</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </Field>
            <ErrorMessage
              name="fuelType"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            >
              <option value="">Select condition</option>
              <option value="new">New</option>
              <option value="used">Used</option>
              <option value="excellent">Excellent</option>
            </Field>
            <ErrorMessage
              name="condition"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Color
            </label>
            <Field
              name="color"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            />
            <ErrorMessage
              name="color"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Air Conditioning */}
          <div className="flex items-center gap-2">
            <Field
              type="checkbox"
              name="airConditioning"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label className="block text-sm text-gray-900">
              Air Conditioning
            </label>
            <ErrorMessage
              name="airConditioning"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price ($)
            </label>
            <Field
              type="number"
              name="price"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            />
            <ErrorMessage
              name="price"
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
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload New Images (Will replace existing)
            </label>
            <input
              type="file"
              multiple
              onChange={(e) => setFieldValue("images", e.target.files)}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {/* Existing image previews */}
            {car.images && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {car.images.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={`Car ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CarForm;

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const AuthForm = ({ defaultRole = "buyer" }) => {
  const [isLogin, setIsLogin] = useState(false);

  // Yup schema that conditionally validates confirmPassword based on isLogin
  const validationSchema = Yup.object({
    contactNo: Yup.string()
      .required("Contact number is required")
      .matches(/^[0-9]+$/, "Must be digits only"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "At least 6 characters, please"),
    confirmPassword: !isLogin
      ? Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required")
      : Yup.string(),
    role: Yup.string()
      .oneOf(["buyer", "seller"], "Invalid role")
      .required("Role is required"),
  });

  const formik = useFormik({
    initialValues: {
      contactNo: "",
      password: "",
      confirmPassword: "",
      role: defaultRole,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Submitted values:", values);
      // Do your magic here with the values
    },
  });

  // Update role when defaultRole changes
  useEffect(() => {
    formik.setFieldValue("role", defaultRole);
  }, [defaultRole]);

  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={formik.handleSubmit}>
          {/* Role Selection (only in Signup mode) */}
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Sign up as
              </label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="buyer"
                    checked={formik.values.role === "buyer"}
                    onChange={formik.handleChange}
                    className="mr-2"
                  />
                  Buyer
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="seller"
                    checked={formik.values.role === "seller"}
                    onChange={formik.handleChange}
                    className="mr-2"
                  />
                  Seller
                </label>
              </div>
              {formik.touched.role && formik.errors.role && (
                <div className="text-red-500 text-sm">{formik.errors.role}</div>
              )}
            </div>
          )}

          {/* Contact Number Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Contact No
            </label>
            <input
              type="text"
              name="contactNo"
              placeholder="Enter your contact number"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contactNo}
            />
            {formik.touched.contactNo && formik.errors.contactNo && (
              <div className="text-red-500 text-sm">
                {formik.errors.contactNo}
              </div>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* Confirm Password Input (only for Signup) */}
          {!isLogin && (
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle between Login and Signup */}
        <p className="text-center mt-4">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                className="text-orange-500 hover:underline"
                onClick={toggleAuthMode}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="text-orange-500 hover:underline"
                onClick={toggleAuthMode}
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;

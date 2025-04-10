import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useSignupMutation } from "../../redux/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, clearLoading, setUser } from "../../redux/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const [signup] = useSignupMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    contact: Yup.string()
      .required("Contact number is required")
      .matches(/^[0-9]+$/, "Contact must be digits only"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    userRole: Yup.string()
      .oneOf(["buyer", "seller"], "Invalid role")
      .required("Role is required"),
    termsAccepted: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
      email: "",
      password: "",
      confirmPassword: "",
      userRole: "buyer",
      termsAccepted: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      // Start loading state
      dispatch(setLoading());
      try {
        const response = await signup({
          name: values.name,
          contact: values.contact,
          email: values.email,
          password: values.password,
          role: values.userRole,
        }).unwrap();
        dispatch(
          setUser({
            user: response.user,
            token: response.token,
          })
        );
        toast.success("Signup successful! Logged in automatically.");
        navigate("/login");
      } catch (err) {
        dispatch(clearLoading());
        const errorMessage =
          err?.data?.message ||
          err?.error ||
          "An error occurred during signup.";
        toast.error(errorMessage);
      }
    },
  });

  return (
    <div className="flex min-h-full">
      {/* Left Side - Image */}
      <div className="w-1/2 hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1577473403731-a36ec9087f44?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Sign Up"
          className="object-cover h-[100vh] w-full"
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-white p-8">
        <form
          className="bg-white p-6 w-full max-w-md"
          onSubmit={formik.handleSubmit}
        >
          <h2 className="text-2xl font-semibold mb-6 tracking-wide leading-5">
            Welcome
          </h2>

          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-md mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-100 appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>

          {/* Contact Number Field */}
          <div className="mb-4">
            <label
              htmlFor="contact"
              className="block text-gray-700 text-sm font-md mb-2"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              placeholder="Enter your contact number"
              value={formik.values.contact}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-100 appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.touched.contact && formik.errors.contact && (
              <div className="text-red-500 text-sm">
                {formik.errors.contact}
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-md mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-100 appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-md mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-100 appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <div
              className="absolute inset-y-0 right-0 pr-2 pt-6 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="text-gray-600" />
              ) : (
                <AiOutlineEye className="text-gray-600" />
              )}
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-md mb-2"
            >
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-100 appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="text-red-500 text-sm">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>

          {/* Register As */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-md mb-2">
              Register as:
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => formik.setFieldValue("userRole", "buyer")}
                className={`px-4 py-2 border rounded ${
                  formik.values.userRole === "buyer"
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                Buyer
              </button>
              <button
                type="button"
                onClick={() => formik.setFieldValue("userRole", "seller")}
                className={`px-4 py-2 border rounded ${
                  formik.values.userRole === "seller"
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                Seller
              </button>
            </div>
            {formik.touched.userRole && formik.errors.userRole && (
              <div className="text-red-500 text-sm">
                {formik.errors.userRole}
              </div>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="mb-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formik.values.termsAccepted}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-checkbox"
              />
              <span className="ml-2 text-gray-700 text-sm">
                I agree to the terms and conditions
              </span>
            </label>
            {formik.touched.termsAccepted && formik.errors.termsAccepted && (
              <div className="text-red-500 text-sm">
                {formik.errors.termsAccepted}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <div className="mt-4 text-center">
            <span className="text-gray-700 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-500 hover:underline">
                Log In
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

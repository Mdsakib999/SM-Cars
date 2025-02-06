import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useSignupMutation } from "../../redux/apiSlice";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";

const Signup = () => {
  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
    userRole: "buyer",
    termsAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { name, contact, email, password, confirmPassword, termsAccepted } =
      formData;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions.");
      return;
    }

    dispatch(setLoading());

    try {
      // Call signup mutation
      const response = await signup({
        name,
        contact,
        email,
        password, // Send password for creation
        role: formData.userRole, // Send user role (buyer/seller)
      }).unwrap();

      // Dispatching user and token to the Redux store
      dispatch(
        setUser({
          user: response.user,
          token: response.token,
        })
      );

      toast.success("Signup successful! Logged in automatically.");
      navigate("/login");
    } catch (err) {
      // Check for error messages
      if (err?.data?.message) {
        toast.error(err?.data?.message || "An error occurred during signup.");
      } else {
        toast.error("An error occurred during signup.");
      }
      console.error("Error during signup:", err);
    }
  };

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
        <form className="bg-white p-6 w-full max-w-md" onSubmit={handleSignUp}>
          <h2 className="text-2xl font-semibold mb-6 tracking-wide leading-5">
            Welcome
          </h2>
          <ToastContainer />

          {/* Name Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-md mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-gray-100 appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Contact Number Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-md mb-2"
              htmlFor="contact"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              placeholder="Enter your contact number"
              value={formData.contact}
              onChange={handleInputChange}
              className="bg-gray-100 appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-md mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-gray-100 appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-md mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className="bg-gray-100 appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
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
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-md mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="bg-gray-100 appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Register As */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-md mb-2">
              Register as:
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, userRole: "buyer" })}
                className={`px-4 py-2 border rounded ${
                  formData.userRole === "buyer"
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                Buyer
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, userRole: "seller" })}
                className={`px-4 py-2 border rounded ${
                  formData.userRole === "seller"
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                Seller
              </button>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mb-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                className="form-checkbox"
              />
              <span className="ml-2 text-gray-700 text-sm">
                I agree to the terms and conditions
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
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

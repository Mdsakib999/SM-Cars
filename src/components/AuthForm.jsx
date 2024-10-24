import React, { useState, useEffect } from "react";

const AuthForm = ({ defaultRole = "buyer" }) => {
  const [isLogin, setIsLogin] = useState(false); // Toggle between Login and Signup
  const [role, setRole] = useState(defaultRole); // Toggle between Buyer and Seller

  // If the defaultRole changes update the role state
  useEffect(() => {
    setRole(defaultRole);
  }, [defaultRole]);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin); // Toggle between login and signup forms
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value); // Update the role (buyer or seller)
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {/* Role Selection for Signup */}
        {!isLogin && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sign up as
            </label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  value="buyer"
                  checked={role === "buyer"}
                  onChange={handleRoleChange}
                  className="mr-2"
                />
                Buyer
              </label>
              <label>
                <input
                  type="radio"
                  value="seller"
                  checked={role === "seller"}
                  onChange={handleRoleChange}
                  className="mr-2"
                />
                Seller
              </label>
            </div>
          </div>
        )}

        {/* Contact Number Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Contact No
          </label>
          <input
            type="text"
            placeholder="Enter your contact number"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Submit Button */}
        <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-300">
          {isLogin ? "Login" : "Sign Up"}
        </button>

        {/* Switch between Login and Signup */}
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

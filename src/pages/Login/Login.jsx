import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/apiSlice";
import { setLoading, setUser, clearLoading } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, isSuccess, data: responseData, error }] =
    useLoginMutation();
  const dispatch = useDispatch();

  const userToken = useSelector((state) => state.auth.token);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(setLoading());

    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setUser(response));

      console.log("Login successful");
    } catch (err) {
      dispatch(clearLoading());
      console.error("Login failed:", err);
    }
  };

  // After a successful login, redirect based on location.state
  useEffect(() => {
    if (isSuccess && responseData?.token) {
      const redirectPath =
        location.state?.from || `/dashboard/${responseData.user.role}`;
      console.log("Token is set, proceeding to:", redirectPath);
      navigate(redirectPath, { replace: true });
    }
  }, [isSuccess, responseData, location, navigate]);

  return (
    <div className="flex min-h-full">
      {/* Left side - Image */}
      <div className="w-1/2 hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1577473403731-a36ec9087f44?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Sign Up"
          className="object-cover h-[100vh] w-full"
        />
      </div>

      {/* Right side - Form */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-white p-8">
        <form className="bg-white p-6 w-full max-w-md" onSubmit={handleLogin}>
          <h2 className="text-2xl font-semibold mb-6 tracking-wide leading-5">
            Nice to see you again
          </h2>

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter your email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
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

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            {/* Error Message */}
            {error && (
              <p className="text-red-500 mt-2">{error.data?.message}</p>
            )}
          </div>
          <div className="mt-4 text-center">
            <span className="text-gray-700 text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-orange-500 hover:underline">
                Sign Up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

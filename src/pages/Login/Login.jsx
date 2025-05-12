import React, { useState, useContext, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AuthProvider, { AuthContext } from "../../provider/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user, profile, loading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const togglePasswordVisibility = () => setShowPassword((v) => !v);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      toast.success("Logged in successfully!");
    } catch (err) {
      console.error("Login failed", err);
      setError(err.message || "Login failed");
      toast.error(err.message || "Login failed");
    }
  };

  useEffect(() => {
    if (profile) {
      const from =
        location.state?.from?.pathname || `/dashboard/${profile.role}`;
      navigate(from, { replace: true });
    }
  }, [profile, navigate, location]);

  return (
    <div className="flex min-h-full">
      <ToastContainer />
      <div className="w-1/2 hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1577473403731-a36ec9087f44?q=80&w=1287&auto=format&fit=crop"
          alt="Login"
          className="object-cover h-screen w-full"
        />
      </div>
      <div className="flex items-center justify-center w-full md:w-1/2 p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg shadow"
        >
          <h2 className="text-2xl font-bold mb-6">Welcome Back</h2>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded relative"
            />
            <div
              className="absolute right-2 top-9 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </div>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
          >
            {loading ? "Signing in…" : "Login"}
          </button>

          <p className="mt-4 text-sm text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-orange-500 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

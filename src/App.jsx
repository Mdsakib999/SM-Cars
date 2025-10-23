// src/App.jsx
import React, { useState, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import Footer from "./pages/Footer/Footer";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { useAuctionSocket } from "./hooks/useAuctionSocket";

const App = () => {
  useAuctionSocket();

  const [isVisible, setIsVisible] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const location = useLocation();

  // Scroll-to-top on route change
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Show/hide scroll-to-top button on scroll
  useLayoutEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // Determine if on dashboard to hide navbar/footer
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div>
      {!isDashboard && <Navbar />}

      <div
        className={`min-h-[calc(100vh-196px)] ${isDashboard ? "lg:ml-64" : ""}`}
      >
        <Outlet />
      </div>

      {!isDashboard && <Footer />}

      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-300 z-50"
        >
          <FaArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default App;

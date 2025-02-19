import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import Footer from "./Pages/Footer/Footer";
import Navbar from "./Components/Navbar";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState(null); // To store the current user
  const location = useLocation();

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Check if the current route is /dashboard
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div>
      {/* Conditionally render Navbar and Footer */}
      {!isDashboard && <Navbar user={user} />}

      <div
        className={`min-h-[calc(100vh-196px)] ${isDashboard ? "lg:ml-64" : ""}`}
      >
        <Outlet />
      </div>

      {!isDashboard && <Footer />}

      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-300 z-50"
        >
          <FaArrowUp size={24} />
        </button>
      )}
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import Footer from "./Pages/Footer/Footer";
import Navbar from "./Components/Navbar";

function App() {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle visibility of the button when scrolling
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll the page to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-196px)] ">
        <Outlet />
      </div>
      <Footer></Footer>
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

import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  if (user === null) {
    console.log("No user found");
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky top-0 z-20 bg-white">
      <nav className="flex justify-between items-center w-full xl:max-w-[97%] mx-auto px-5 md:px-10 lg:px-20 py-4 text-black">
        {/* Logo */}
        <div className="flex items-center lg:mr-14 cursor-pointer">
          <img
            className="w-[45px] lg:w-[50px] rounded-full"
            src="https://i.ibb.co/4S75tm6/SM-Foods-logo.jpg"
            alt="Logo"
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-grow justify-left space-x-6 font-medium text-gray-700 tracking-wider">
          <li className="cursor-pointer hover:text-black">
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer hover:text-black">
            <Link to="/about">About</Link>
          </li>
          <li className="cursor-pointer hover:text-black">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="cursor-pointer hover:text-black">
            <Link to="/buy">Buy Car</Link>
          </li>
          <li className="cursor-pointer hover:text-black">
            <Link to="/sell">Sell Car</Link>
          </li>
          <li className="cursor-pointer hover:text-black">
            <Link to="/auction-cars">Cars</Link>
          </li>
          <li className="cursor-pointer hover:text-black">
            <Link to="/pricing">Pricing</Link>
          </li>
        </ul>

        {/* Conditionally render based on user */}
        {user ? (
          <Link
            className="hidden md:block btn btn-primary"
            to={`/dashboard`}
            onClick={toggleMenu}
          >
            Dashboard
          </Link>
        ) : (
          <Link
            className="hidden md:block btn btn-primary"
            to="/signup"
            onClick={toggleMenu}
          >
            Get Started
          </Link>
        )}

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none text-gray-700"
          >
            {isOpen ? (
              <FiX className="w-[25px] h-[25px]" />
            ) : (
              <FiMenu className="w-[25px] h-[25px]" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-30`}
      >
        {/* Close Icon */}
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu}>
            <FiX className="w-[25px] h-[25px] text-gray-700" />
          </button>
        </div>

        {/* Drawer Menu Items */}
        <div className="flex flex-col p-6 space-y-6">
          <Link
            to="/"
            className="text-lg font-medium text-gray-700"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-lg font-medium text-gray-700"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-lg font-medium text-gray-700"
            onClick={toggleMenu}
          >
            Contact
          </Link>
          <Link
            to="/auction-cars"
            className="text-lg font-medium text-gray-700"
            onClick={toggleMenu}
          >
            Cars
          </Link>
          <Link
            to="/buy"
            className="text-lg font-medium text-gray-700"
            onClick={toggleMenu}
          >
            Buy Car
          </Link>
          <Link
            to="/sell"
            className="text-lg font-medium text-gray-700"
            onClick={toggleMenu}
          >
            Sell Car
          </Link>
          <Link
            to="/pricing"
            className="text-lg font-medium text-gray-700"
            onClick={toggleMenu}
          >
            Pricing
          </Link>

          {user ? (
            <Link
              className="btn btn-primary"
              to="/dashboard"
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
          ) : (
            <Link className="btn btn-primary" to="/signup" onClick={toggleMenu}>
              Get Started
            </Link>
          )}
        </div>
      </div>

      {/* Overlay to close the drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-20"
          onClick={toggleMenu}
        />
      )}
    </div>
  );
};

export default Navbar;

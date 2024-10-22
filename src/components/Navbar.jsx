import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky top-0 z-20 bg-white">
      <nav className="flex justify-between items-center w-full lg:max-w-[100%] mx-auto px-5 md:px-24 py-4 text-black">
        {/* Logo */}
        <div className="flex items-center lg:mr-14 cursor-pointer">
          <img
            className="w-[45px] md:w-[50px] rounded-full"
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
          <li className="cursor-pointer hover:text-black">Buy Car</li>
          <li className="cursor-pointer hover:text-black">Sell Car</li>
          <li className="cursor-pointer hover:text-black">Pricing</li>
        </ul>
        <button className="hidden md:inline-block btn btn-primary">
          Submit Listing
        </button>

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
          <button className="btn btn-primary" onClick={toggleMenu}>
            Submit Listing
          </button>
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

import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "/logo.png";
import { useContext } from "react";
import AuthProvider, { AuthContext } from "@/provider/AuthProvider";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useContext(AuthContext);
  console.log(profile);
  const location = useLocation();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Helper to check active path
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="sticky top-0 z-10 bg-white">
      <nav className="flex justify-between items-center w-full xl:max-w-[97%] mx-auto px-5 md:px-10 lg:px-20 py-4 text-black">
        {/* Logo */}
        <div className="flex items-center lg:mr-14 cursor-pointer">
          <img
            className="w-[45px] lg:w-[55px] rounded-full"
            src={Logo}
            alt="Logo"
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-grow justify-left space-x-6 font-medium text-gray-700 tracking-wider">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
            { to: "/buy", label: "Buy Car" },
            { to: "/sell", label: "Sell Car" },
            { to: "/auction-cars", label: "Cars" },
            { to: "/pricing", label: "Pricing" },
          ].map(({ to, label }) => (
            <li key={to} className="cursor-pointer">
              <Link
                to={to}
                className={`hover:text-orange-500 transition-colors ${
                  isActiveLink(to) ? "text-orange-500" : "text-gray-700"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {profile ? (
          <Link
            className={`hidden md:block btn btn-primary transition-colors ${
              isActiveLink("/dashboard") && "bg-orange-500 border-orange-500"
            }`}
            to={`/dashboard`}
            onClick={toggleMenu}
          >
            Dashboard
          </Link>
        ) : (
          <Link
            className={`hidden md:block btn btn-primary transition-colors ${
              isActiveLink("/signup") && "bg-orange-500 border-orange-500"
            }`}
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
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
            { to: "/auction-cars", label: "Cars" },
            { to: "/buy", label: "Buy Car" },
            { to: "/sell", label: "Sell Car" },
            { to: "/pricing", label: "Pricing" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-lg font-medium transition-colors ${
                isActiveLink(to) ? "text-orange-500" : "text-gray-700"
              }`}
              onClick={toggleMenu}
            >
              {label}
            </Link>
          ))}

          {profile ? (
            <Link
              className={`btn btn-primary transition-colors ${
                isActiveLink("/dashboard") && "bg-orange-500 border-orange-500"
              }`}
              to="/dashboard"
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              className={`btn btn-primary transition-colors ${
                isActiveLink("/signup") && "bg-orange-500 border-orange-500"
              }`}
              to="/signup"
              onClick={toggleMenu}
            >
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

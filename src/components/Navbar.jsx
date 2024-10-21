import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom"; // Import Link for routing

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky top-0 z-20 bg-white ">
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
        <ul className="hidden md:flex flex-grow justify-left space-x-6 font-medium text-gray-700 tracking-wider ">
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
    </div>
  );
};

export default Navbar;

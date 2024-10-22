import React from "react";
import { FiMail } from "react-icons/fi";
import { BiPhoneCall } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="overflow-hidden relative z-10 bg-black text-white pb-10 pt-20 lg:pt-[80px] ">
      {/* Gradient circle */}
      <div className="background-gradient-footer w-56 h-56 md:w-80 md:h-80 absolute top-[50%] right-[-25%]  md:top-[50%] md:left-[-8%] rounded-full "></div>

      <div className="container  lg:w-[90%] mx-auto ">
        <div className="mx-4 flex justify-between flex-wrap border-b border-zinc-600 ">
          {/* logo div */}
          <div className=" w-full px-4 sm:w-2/3 lg:w-3/12 ">
            <div className="mb-10 w-full  flex flex-col items-center">
              <a href="/#" className="mb-6 inline-block max-w-[110px] ">
                <img
                  src="https://i.ibb.co/tP79HPK/SMIt-Solution-Logo-removebg-preview.png"
                  alt="logo"
                  className="max-w-full"
                />
              </a>
              <p className="mb-7 text-base text-body-color text-center">
                Our core principle is providing exceptional service to fuel our
                clients' business growth.
              </p>
            </div>
          </div>

          <div className="w-full md:w-5/12 px-4 flex md:justify-evenly justify-between mb-8 ">
            <div>
              <p className="mb-6 text-lg font-semibold text-white">Company</p>
              <Link to="/about" className="mt-3 block">
                About SM IT{" "}
              </Link>
              <Link to="/services" className="mt-3 block">
                Services
              </Link>
              <p className="mt-3 ">Our Team</p>
              <p className="mt-3">
                <Link to="/career">Career</Link>{" "}
              </p>
            </div>

            <div>
              <p className="mb-6  text-lg font-semibold text-white ">
                Quick Links
              </p>
              <p className="mt-3">Premium Support</p>
              <p className="mt-3">
                {" "}
                <Link to="/termsConditions">Terms & Condition</Link>
              </p>
              <p className="mt-3">
                <Link to="/privacy">Privacy Policy</Link>
              </p>

              <p className="mt-3">
                {" "}
                <Link to="/contact">Contact Us</Link>
              </p>
            </div>
          </div>

          {/* Icon div */}
          <div className=" w-full px-4 sm:w-1/2 lg:w-3/12 ">
            <div className="mb-4 w-full ">
              <p className="mb-6 text-lg font-semibold text-white ">Address</p>
              <div className=" ">
                <p className="flex items-center gap-x-2">
                  <FiMail className="text-xl"></FiMail>{" "}
                  smitsolutionbd01@gmail.com
                </p>
                <p className="flex items-center gap-x-2 mt-2">
                  <BiPhoneCall className="text-xl"></BiPhoneCall> +88
                  01711646758
                </p>
                <p className="flex  gap-x-2 mt-2">
                  <SlLocationPin className="text-3xl"></SlLocationPin> House -
                  NE(B) 2/1, Road- 71, Gulshan-02, Dhaka, Bangladesh.
                </p>
                <p className="flex  gap-x-2 mt-2">
                  <SlLocationPin className="text-2xl"></SlLocationPin> Nasirabad
                  Properties Road 1, Chittagong, Bangladesh.
                </p>
              </div>

              <div className="flex mt-5 gap-x-4">
                <Link
                  to="https://www.facebook.com/smitsolution.uae"
                  target="_blank"
                >
                  <FaFacebookF className="border rounded-full p-1 text-3xl hover:text-blue-500 hover:border-blue-500"></FaFacebookF>
                </Link>
                <Link
                  to="https://www.linkedin.com/company/smitsolution/"
                  target="_blank"
                >
                  <FaLinkedin className="border rounded-full p-1 text-3xl hover:text-blue-500 hover:border-blue-500"></FaLinkedin>
                </Link>
                <Link to="https://x.com/smitsolutionuae" target="_blank">
                  <FaXTwitter className="border rounded-full p-1 text-3xl hover:text-gray-400 hover:border-blue-500"></FaXTwitter>
                </Link>
                <Link
                  to="https://www.instagram.com/smitsolution.uae/"
                  target="_blank"
                >
                  <FaInstagram className="border rounded-full p-1 text-3xl hover:text-pink-600 hover:border-orange-600"></FaInstagram>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-sm md:text-base lg:mt-5 mt-3 md:font-semibold">
        Copyright © SM IT Solution 2024. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

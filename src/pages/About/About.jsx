import React from "react";
import {
  FaSmile,
  FaLightbulb,
  FaHandHoldingHeart,
  FaMedal,
} from "react-icons/fa";
const About = () => {
  return (
    <div className=" py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-6xl mb-8 text-gray-900">About Us</h2>
          <p className="mt-4 tracking-wider text-gray-600">
            Learn more about who we are and what we do.
          </p>
        </div>

        {/* Mission Section */}

        <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
          <div className="w-full ">
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-800 leading-loose">
              At SM Cars, our mission is to provide high-quality products and
              services that bring value to our customers. We believe in
              excellence, integrity, and innovation in everything we do. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Aut vel eos
              reiciendis iusto eveniet fugit dolorem. Doloribus, sunt placeat
              dicta, beatae doloremque blanditiis minima consequuntur quos ipsa
              aut, harum quidem?
            </p>
            <button className="btn btn-primary hover:bg-black hover:text-white hover:border-white transition  duration-300 my-4">
              Get in touch
            </button>
          </div>
          <div className="w-full ">
            <img
              src="https://plus.unsplash.com/premium_photo-1680281936377-b600644b8bf3?q=80&w=1314&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Our Mission"
              className="w-full max-h-64 object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Vision or Values Section */}
        <div className="text-center">
          <h3 className="text-3xl font-semibold text-gray-900 text-center mb-8 mt-8">
            Our Values
          </h3>
          <div className="flex flex-col md:flex-row justify-between items-stretch mb-12 space-y-8 md:space-y-0 md:space-x-8">
            <div className="flex flex-col justify-between border p-6 rounded-lg w-full md:w-1/4 flex-grow">
              <FaSmile className="text-5xl text-orange-500 mb-4 self-start border p-2 rounded-md bg-gray-100" />
              <div className="mt-auto">
                <p className="text-xl font-semibold">Customer Satisfaction</p>
                <span className="text-md tracking-wider text-gray-500">
                  Customer satisfaction is our top priority.
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between border p-6 rounded-lg w-full md:w-1/4 flex-grow">
              <FaLightbulb className="text-5xl text-orange-500 mb-4 self-start border p-2 rounded-md bg-gray-100" />
              <div className="mt-auto">
                <p className="text-xl font-semibold">Innovation</p>
                <span className="text-md tracking-wider text-gray-500">
                  We innovate to stay ahead.
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between border p-6 rounded-lg w-full md:w-1/4 flex-grow">
              <FaHandHoldingHeart className="text-5xl text-orange-500 mb-4 self-start border p-2 rounded-md bg-gray-100" />
              <div className="mt-auto">
                <p className="text-xl font-semibold">Integrity</p>
                <span className="text-md tracking-wider text-gray-500">
                  Honesty and integrity in all business interactions.
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between border p-6 rounded-lg w-full md:w-1/4 flex-grow">
              <FaMedal className="text-5xl text-orange-500 mb-4 self-start border p-2 rounded-md bg-gray-100" />
              <div className="mt-auto">
                <p className="text-xl font-semibold">Quality</p>
                <span className="text-md tracking-wider text-gray-500">
                  We strive to deliver the best quality.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Team or Company Overview Section */}
        <div className="mt-12">
          <h3 className="text-3xl font-semibold text-gray-900 text-center mb-8">
            Meet Our Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                className="mx-auto h-40 w-40 rounded-full object-cover mb-4"
                src="https://via.placeholder.com/150"
                alt="Team Member"
              />
              <h4 className="text-xl font-medium text-gray-900">John Doe</h4>
              <p className="text-gray-600">CEO & Founder</p>
            </div>

            <div className="text-center">
              <img
                className="mx-auto h-40 w-40 rounded-full object-cover mb-4"
                src="https://via.placeholder.com/150"
                alt="Team Member"
              />
              <h4 className="text-xl font-medium text-gray-900">Jane Smith</h4>
              <p className="text-gray-600">Chief Operations Officer</p>
            </div>

            <div className="text-center">
              <img
                className="mx-auto h-40 w-40 rounded-full object-cover mb-4"
                src="https://via.placeholder.com/150"
                alt="Team Member"
              />
              <h4 className="text-xl font-medium text-gray-900">
                Emily Johnson
              </h4>
              <p className="text-gray-600">Head of Marketing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

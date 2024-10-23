import React from "react";

const About = () => {
  return (
    <div className=" py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">About Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            Learn more about who we are and what we do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600">
              At SM Cars, our mission is to provide high-quality products and
              services that bring value to our customers. We believe in
              excellence, integrity, and innovation in everything we do.
            </p>
          </div>

          {/* Vision or Values Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Values
            </h3>
            <ul className=" list-inside text-gray-600 space-y-2 list-none">
              <li>Customer satisfaction is our top priority</li>
              <li>We innovate to stay ahead</li>
              <li>Honesty and integrity in all business interactions</li>
              <li>We strive to deliver the best quality</li>
            </ul>
          </div>
        </div>

        {/* Team or Company Overview Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">
            Meet Our Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                className="mx-auto h-40 w-40 rounded-full object-cover mb-4"
                src=""
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

import React from "react";
import { GoArrowUpRight } from "react-icons/go";

const BlogCard = () => {
  return (
    <div className="max-w-full px-6 mx-auto">
      <div className="py-16 px-2 flex items-center justify-between">
        <h3 className="text-2xl font-semibold">Latest Blog Posts</h3>
        <div>View All</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Blog Card 1 */}
        <div className="bg-white rounded-xl overflow-hidden">
          <img
            src="https://plus.unsplash.com/premium_photo-1682125840276-f47b511bf58c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D"
            alt="Blog Post"
            className="w-full h-60 object-cover rounded-lg"
          />
          <div className="py-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              5 Tips for Buying a Used Car
            </h3>
            <p className="text-gray-600 text-sm mb-4 truncate">
              Buying a used car can be tricky. Follow these 5 essential tips to
              make a smart purchase decision and avoid costly mistakes.
            </p>
          </div>
        </div>

        {/* Blog Card 2 */}
        <div className="bg-white rounded-xl overflow-hidden ">
          <img
            src="https://plus.unsplash.com/premium_photo-1682125840276-f47b511bf58c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D"
            alt="Blog Post"
            className="w-full h-60 object-cover rounded-lg"
          />
          <div className="py-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              5 Tips for Buying a Used Car
            </h3>
            <p className="text-gray-600 text-sm mb-4 truncate">
              Buying a used car can be tricky. Follow these 5 essential tips to
              make a smart purchase decision and avoid costly mistakes.
            </p>
          </div>
        </div>

        {/* Blog Card 3 */}
        <div className="bg-white rounded-xl overflow-hidden ">
          <img
            src="https://plus.unsplash.com/premium_photo-1682125840276-f47b511bf58c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D"
            alt="Blog Post"
            className="w-full h-60 object-cover rounded-lg"
          />
          <div className="py-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              5 Tips for Buying a Used Car
            </h3>
            <p className="text-gray-600 text-sm mb-4 truncate">
              Buying a used car can be tricky. Follow these 5 essential tips to
              make a smart purchase decision and avoid costly mistakes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

import React from "react";
import { GoArrowUpRight } from "react-icons/go";

const BlogCard = () => {
  // Sample data for blog posts
  const blogs = [
    {
      id: 1,
      title: "5 Tips for Buying a Used Car",
      description:
        "Buying a used car can be tricky. Follow these 5 essential tips to make a smart purchase decision and avoid costly mistakes.",
      date: "November 22, 2024",
      imageUrl:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "How to Maintain Your Car",
      description:
        "Regular maintenance is key to extending your car's life. Learn the basics of car upkeep.",
      date: "October 18, 2023",
      imageUrl:
        "https://images.unsplash.com/photo-1469285994282-454ceb49e63c?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "The Best Cars for Road Trips",
      description:
        "Planning a road trip? Discover the best cars to take on long journeys for comfort and efficiency.",
      date: "September 5, 2023",
      imageUrl:
        "https://images.unsplash.com/photo-1529369623266-f5264b696110?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      title: "Eco-Friendly Driving Tips",
      description:
        "Learn eco-friendly driving tips to save fuel, reduce emissions, and minimize your environmental impact.",
      date: "August 10, 2023",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1677675066333-ffe8b4435aab?q=80&w=1285&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="max-w-full px-6 mx-auto my-6 lg:my-12">
      <div className="py-16 px-2 flex items-center justify-between">
        <h3 className="text-md md:text-2xl font-semibold">Latest Blog Posts</h3>
        <button className="flex gap-2 items-center text-md">
          View All <GoArrowUpRight className="text-md md:text-2xl" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Render the first four blog posts */}
        {blogs.slice(0, 4).map((blog) => (
          <div key={blog.id} className="bg-white rounded-xl overflow-hidden">
            <img
              src={blog.imageUrl}
              alt="Blog Post"
              className="w-full h-60 object-cover rounded-lg"
            />
            <div className="flex justify-between tracking-wide text-gray-600 py-2">
              <span>Admin</span>
              <span>{blog.date}</span>
            </div>
            <div className="py-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 truncate">
                {blog.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCard;

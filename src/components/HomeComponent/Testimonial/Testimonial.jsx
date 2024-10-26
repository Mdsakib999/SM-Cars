import React from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper core and required modules
import { Navigation, Autoplay } from "swiper/modules"; // Import the Navigation module

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "./testimonial.css";

const testimonials = [
  {
    name: "John Doe",
    title: "CEO at Example Co.",
    quote:
      "This service has been excellent and has exceeded all my expectations!",
    image: "https://placehold.co/100x100",
  },
  {
    name: "Jane Smith",
    title: "Marketing Head at XYZ Inc.",
    quote:
      "A seamless experience from start to finish, highly recommend it to others.",
    image: "https://placehold.co/100x100",
  },
  {
    name: "Mark Wilson",
    title: "Product Manager at ABC Ltd.",
    quote: "Great product and outstanding customer support!",
    image: "https://placehold.co/100x100",
  },
  {
    name: "Emily Brown",
    title: "CTO at Example Tech",
    quote:
      "The professionalism and quality of service were remarkable, I recommend them.",
    image: "https://placehold.co/100x100",
  },
  {
    name: "Michael Lee",
    title: "COO at Innovations Inc.",
    quote:
      "Very happy with the result! The product met our expectations and more.",
    image: "https://placehold.co/100x100",
  },
];

const Testimonials = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 relative">
      <h2 className="text-center text-2xl font-bold mb-8">
        What our customers say
      </h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        className="m-10 pb-20"
        navigation
        breakpoints={{
          640: {
            slidesPerView: 1, // 1 card on mobile screens
          },
          768: {
            slidesPerView: 2, // 2 cards on tablets
          },
          1024: {
            slidesPerView: 3, // 3 cards on larger screens
          },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="text-center bg-white p-6 rounded-lg border h-100 mb-10">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="mx-auto rounded-full w-24 h-24 object-cover mb-4"
              />
              <blockquote className="italic text-md text-gray-600 mb-2">
                "{testimonial.quote}"
              </blockquote>
              <div className="text-lg font-semibold">{testimonial.name}</div>
              <div className="text-gray-500">{testimonial.title}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation buttons */}
      {/* <div className="custom-nav swiper-button-prev"></div>
      <div className="custom-nav swiper-button-next"></div> */}
    </div>
  );
};

export default Testimonials;

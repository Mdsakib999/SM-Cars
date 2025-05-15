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
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1361&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Jane Smith",
    title: "Marketing Head at XYZ Inc.",
    quote:
      "A seamless experience from start to finish, highly recommend it to others.",
    image:
      "https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Mark Wilson",
    title: "Product Manager at ABC Ltd.",
    quote: "Great product and outstanding customer support!",
    image:
      "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Emily Brown",
    title: "CTO at Example Tech",
    quote:
      "The professionalism and quality of service were remarkable, I recommend them.",
    image:
      "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?q=80&w=1312&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Michael Lee",
    title: "COO at Innovations Inc.",
    quote:
      "Very happy with the result! The product met our expectations and more.",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

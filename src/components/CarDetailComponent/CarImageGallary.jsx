import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const CarImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full">
        <img
          src="https://via.placeholder.com/300"
          alt="Placeholder"
          className="w-full"
        />
      </div>
    );
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative grid gap-4">
      <div className="relative">
        <img
          className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
          src={images[currentIndex].url}
          alt="Car"
        />
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-gray-800 p-2 text-white hover:bg-gray-600"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-gray-800 p-2 text-white hover:bg-gray-600"
        >
          <FaArrowRight />
        </button>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div key={image.public_id || index}>
            <img
              onClick={() => setCurrentIndex(index)}
              src={image.url}
              className={`h-20 max-w-full cursor-pointer rounded-lg object-cover object-center ${
                currentIndex === index ? "border-2 border-blue-500" : ""
              }`}
              alt={`Thumbnail ${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarImageGallery;

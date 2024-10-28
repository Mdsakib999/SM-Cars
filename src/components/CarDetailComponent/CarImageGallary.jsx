import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
const CarImageGallary = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = [
        {
          imgelink:
            "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        },
        {
          imgelink:
            "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        },
        {
          imgelink:
            "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        },
        {
          imgelink:
            "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        },
        {
          imgelink:
            "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        },
        {
          imgelink:
            "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        },
      ];
      setImages(data);
    };

    fetchData();
  }, []);
  return (
    <div className="relative grid gap-4">
      {images.length > 0 && (
        <>
          <div className="relative">
            <img
              className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
              src={images[currentIndex].imgelink}
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
            {images.map(({ imgelink }, index) => (
              <div key={index}>
                <img
                  onClick={() => setCurrentIndex(index)}
                  src={imgelink}
                  className={`h-20 max-w-full cursor-pointer rounded-lg object-cover object-center ${
                    currentIndex === index ? "border-2 border-blue-500" : ""
                  }`}
                  alt="gallery-thumbnail"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CarImageGallary;

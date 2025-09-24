import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

const images = [
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1600&q=80", // Laptop
  "https://images.unsplash.com/photo-1580910051077-0f362f74f472?auto=format&fit=crop&w=1600&q=80", // Headphones
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80", // Smartphone
  "https://images.unsplash.com/photo-1517430816045-df4b7de1d40e?auto=format&fit=crop&w=1600&q=80", // Tablet
  "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?auto=format&fit=crop&w=1600&q=80", // Smartwatch
  "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1600&q=80", // Camera
];

const BannerPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Autoplay every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentIndex((currentIndex + 1) % images.length);
  const prevSlide = () =>
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div
      {...handlers}
      className="relative w-full h-[900px] overflow-hidden"
    >
      {/* Images */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Prev & Next Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 z-10"
      >
        Prev
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 z-10"
      >
        Next
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full cursor-pointer transition-all ${
              currentIndex === index ? "bg-white scale-125" : "bg-gray-500"
            }`}
          ></span>
        ))}
      </div>

      {/* Optional Banner Text */}
      <div className="absolute bottom-20 left-10 text-white z-10">
        <h1 className="text-5xl font-bold">SALE UPTO 30% OFF</h1>
        <p className="text-xl mt-4">Grab your favorite products now!</p>
      </div>
    </div>
  );
};

export default BannerPage;

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const HeroSlider = ({ images, interval = 5000, showTextOverlay = true }) => { 
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const goToSlide = (index) => {
      if (index >= 0 && index < images.length) {
        setCurrentIndex(index);
      }
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, interval);
    return () => clearInterval(slideInterval);
  }, [interval, nextSlide]);

  if (!images || images.length === 0) {
    return <div className="h-screen bg-gray-300 flex items-center justify-center text-gray-500">No images provided</div>;
  }

  return (
    // Set height to full screen, remove margin bottom
    <section className="relative w-full h-screen overflow-hidden">
      {/* Image Container */}
      {images.map((imageSrc, index) => (
        <div
          key={imageSrc}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          aria-hidden={index !== currentIndex}
        >
          <img
            src={imageSrc}
            alt={`Hero background ${index + 1}`}
            className="w-full h-full object-cover" 
            loading={index === 0 ? 'eager' : 'lazy'}
          />
          {/* Dark overlay for text contrast */}
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
      ))}

       {/* Optional: Text Overlay */}
       {showTextOverlay && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-3 drop-shadow-lg animate-fade-in-down"> {/* Example animation */}
                     Experience the art of driving.
                </h1>
                <p className="text-lg md:text-2xl drop-shadow-md animate-fade-in-up delay-300"> {/* Example animation */}
                    where every curve whispers elegance and every mile feels like destiny.
                </p>
            </div>
       )}


      {/* Navigation Dots - Keep them above the optional text overlay */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2"> {/* Increased z-index */}
        {images.map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

// Update PropTypes if new props were added
HeroSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  interval: PropTypes.number,
  showTextOverlay: PropTypes.bool, // Added prop type
};

// Set default value for the new prop
HeroSlider.defaultProps = {
    showTextOverlay: true,
    interval: 5000,
};


export default HeroSlider;
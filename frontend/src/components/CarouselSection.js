import React from 'react';

const CarouselSection = ({ images, currentSlide, goToSlide, nextSlide, prevSlide, carouselType }) => (
  <section className={`relative h-[60vh] min-h-[400px] md:h-[70vh] lg:h-[80vh]${carouselType === 'second' ? ' my-10' : ''}`}>
    <div className="absolute inset-0 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={image}
            alt={`banner ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
    {/* Navigation arrows */}
    <button 
      onClick={() => prevSlide(carouselType)}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 hover:scale-110"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button 
      onClick={() => nextSlide(carouselType)}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 hover:scale-110"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
    {/* Dots indicator */}
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
      {images.map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index, carouselType)}
          className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white bg-opacity-50'}`}
        />
      ))}
    </div>
  </section>
);

export default CarouselSection;

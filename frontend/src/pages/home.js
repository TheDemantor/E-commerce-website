import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
// import { AppContext } from "./context/productContext";
// import { useProductContext as UPX} from "./context/productContext";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlide2, setCurrentSlide2] = useState(0);
  
  // First carousel images
  const carouselImages = [
    "images/SMbanners/1.png",
    "images/SMbanners/8.png",
    "images/SMbanners/6.png",
    "images/SMbanners/5.png",
    "images/SMbanners/4.png",
    "images/SMbanners/7.png",
    "images/SMbanners/2.png",
    "images/SMbanners/3.png"
  ];

  // Second carousel images
  const carouselImages2 = [
    "images/LGbanners/1.png",
    "images/LGbanners/2.png",
    "images/LGbanners/3.png",
    "images/LGbanners/4.png"
  ];

  // Auto-play functionality for first carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Auto-play functionality for second carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide2((prev) => (prev + 1) % carouselImages2.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages2.length]);

  const nextSlide = (carouselType) => {
    if (carouselType === 'first') {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    } else {
      setCurrentSlide2((prev) => (prev + 1) % carouselImages2.length);
    }
  };

  const prevSlide = (carouselType) => {
    if (carouselType === 'first') {
      setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    } else {
      setCurrentSlide2((prev) => (prev - 1 + carouselImages2.length) % carouselImages2.length);
    }
  };

  const goToSlide = (index, carouselType) => {
    if (carouselType === 'first') {
      setCurrentSlide(index);
    } else {
      setCurrentSlide2(index);
    }
  };

  // const { key } = Uc(AppContext);
  // const { key } =UPX();

  return (
    <div className="home">
      {/* <Container>
              {key} 
               {/* un commenting line 10 and this u will see that we can access the value passed as value from app provider */}
      {/* </Container> */}
      
      {/* First Carousel */}
      <section className="relative h-[60vh] min-h-[400px] md:h-[70vh] lg:h-[80vh]">
        <div className="absolute inset-0 overflow-hidden">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
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
          onClick={() => prevSlide('first')}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={() => nextSlide('first')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index, 'first')}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      <img className="w-full" src="images/Line-Design.svg" alt="divider"></img>

      <div className="py-10">
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-nowrap lg:overflow-x-auto gap-8 px-4">
          <li className="min-w-[18rem]">
            <div className="rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <Link to="/items/ctg/men">
                <img src="images/categories/1.png" className="w-full h-auto object-cover" alt="Men's Fashion"></img>
              </Link>
            </div>
          </li>
          <li className="min-w-[18rem]">
            <div className="rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <Link to="/items/ctg/women">
                <img src="images/categories/2.png" className="w-full h-auto object-cover" alt="Women's Fashion"></img>
              </Link>
            </div>
          </li>
          <li className="min-w-[18rem]">
            <div className="rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <Link to="/items/ctg/kids">
                <img src="images/categories/3.png" className="w-full h-auto object-cover" alt="Kids' Fashion"></img>
              </Link>
            </div>
          </li>
          <li className="min-w-[18rem]">
            <div className="rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <Link to="/items/ctg/women">
                <img src="images/categories/4.png" className="w-full h-auto object-cover" alt="Women's Fashion Accessories"></img>
              </Link>
            </div>
          </li>
          <li className="min-w-[18rem]">
            <div className="rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <Link to="/items/ctg/men">
                <img src="images/categories/5.png" className="w-full h-auto object-cover" alt="Men's Fashion Accessories"></img>
              </Link>
            </div>
          </li>
          <li className="min-w-[18rem]">
            <div className="rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <Link to="/items">
                <img src="images/categories/6.png" className="w-full h-auto object-cover" alt="Shop All"></img>
              </Link>
            </div>
          </li>
        </ul>
      </div>

      <img className="w-full" src="images/Line-Design.svg" alt="divider"></img>

      
      {/* FESTIVAL BANNERS - Second Carousel */}

      <section className="relative h-[60vh] min-h-[400px] md:h-[70vh] lg:h-[80vh] my-10">
        <div className="absolute inset-0 overflow-hidden">
          {carouselImages2.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide2 ? "opacity-100" : "opacity-0"
              }`}
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
          onClick={() => prevSlide('second')}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={() => nextSlide('second')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {carouselImages2.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index, 'second')}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentSlide2 ? 'bg-white scale-125' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

    </div>
  )
}

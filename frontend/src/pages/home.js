import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import CarouselSection from '../components/CarouselSection';
import CategoryGrid from '../components/CategoryGrid';
import Divider from '../components/Divider';
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
      {/* First Carousel */}
      <CarouselSection
        images={carouselImages}
        currentSlide={currentSlide}
        goToSlide={goToSlide}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        carouselType="first"
      />

      <Divider />

      <CategoryGrid />

      <Divider />

      {/* Festival Banners - Second Carousel */}
      <CarouselSection
        images={carouselImages2}
        currentSlide={currentSlide2}
        goToSlide={goToSlide}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        carouselType="second"
      />
    </div>
  )
}



import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './CarouselComponent.css'; // Import your custom CSS

// Correctly import images
import slide1 from '../components/Assets/1.jpg';
import slide2 from '../components/Assets/2.webp';
import slide3 from '../components/Assets/3.jpeg';

const CarouselComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    adaptiveHeight: true, // Adjust slide height dynamically
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div>
          <img src={slide1} alt="Slide 1"/>
        </div>
        <div>
          <img src={slide2} alt="Slide 2"/>
        </div>
        <div>
          <img src={slide3} alt="Slide 3"/>
        </div>
      </Slider>
    </div>
  );
};

export default CarouselComponent;

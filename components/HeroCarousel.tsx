"use client"
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

const heroImages = [
  {
    imgURL: '/amazon.png',
    alt: 'Amazon',
  },
  {
    imgURL: '/ebay.jpg',
    alt: 'Ebay',
  }
]
const HeroCarousel = () => {
  return (
    <Carousel
      showThumbs={false}
      autoPlay
      infiniteLoop
      showStatus={false}
      showArrows={false}
      interval={2000} 
    >
      {heroImages.map((image, index) => (
        <Image
          key={index}
          src={image.imgURL}
          alt={image.alt}
          width={484}
          height={484}
          className='object-contain'
        />
      ))}
  </Carousel>
  )
}

export default HeroCarousel

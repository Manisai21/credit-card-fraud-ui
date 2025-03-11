"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import React from "react";
import { Carousel } from "react-responsive-carousel";

const ImageCarousel = () => {
  const images = [
    "/images/img2.png",
    "/images/img3.jpg",
    "/images/img4.jpg",
    "/images/img5.jpg",
    "/images/img6.png",
  ];

  return (
    <div className="max-w-4xl mx-auto mt-8 perspective-1000 rounded-lg shadow-lg">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        interval={3000}
        showStatus={false}
        showArrows={true}
        infiniteLoop={true}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none z-10"
            >
              &#10094;
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none z-10"
            >
              &#10095;
            </button>
          )
        }
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="h-[500px] w-full flex items-center justify-center transform transition-transform duration-500 hover:scale-105 hover:rotate-y-3d"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateY(0deg)",
            }}
          >
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              width={800}
              height={500}
              className="object-cover w-full h-full shadow-2xl rounded-lg"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;

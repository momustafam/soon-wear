import React from "react";
import { Carousel } from "@material-tailwind/react";
import image1 from "../images/banners/banner_1.jpg";
import image2 from "../images/banners/banner_2.jpg";
import image3 from "../images/banners/banner_3.jpg";

function ProductCarousel() {
  return (
    <div className="h-screen my-0">
      <Carousel
        loop
        autoplay
        transition={{ duration: 0.5 }}
        className="rounded-xl"
      >
        <img src={image1} alt="image 1" className="h-full w-full object-fill" />
        <img src={image2} alt="image 2" className="h-full w-full object-fill" />
        <img src={image3} alt="image 3" className="h-full w-full object-fill" />
      </Carousel>
    </div>
  );
}

export default ProductCarousel;

import React from "react";
import { Carousel } from "@material-tailwind/react";
import image1 from "../images/banner1.jpg";
import image2 from "../images/banner2.jpg";

function ProductCarousel() {
  return (
    <div className="xl:h-80 my-5">
      <Carousel
        loop
        autoplay
        transition={{ duration: 0.5 }}
        className="rounded-xl"
      >
        <img src={image1} alt="image 1" className="h-full w-full object-fill" />
        <img src={image2} alt="image 2" className="h-full w-full object-fill" />
        <img src={image1} alt="image 3" className="h-full w-full object-fill" />
      </Carousel>
    </div>
  );
}

export default ProductCarousel;

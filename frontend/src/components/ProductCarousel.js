import React from "react";
import { Carousel } from "@material-tailwind/react";

function ProductCarousel({ banners }) {
  return (
    <div className="h-screen my-0">
      <Carousel
        loop
        autoplay
        transition={{ duration: 0.5 }}
        className="rounded-xl"
      >
        {banners &&
          banners.map((banner) => (
            <img
              key={banner.id}
              src={require(`../images/banners/banner_${banner.id}.jpg`)}
              alt={`banner image ${banner.id}`}
              className="h-full w-full object-fill"
            />
          ))}
      </Carousel>
    </div>
  );
}

export default ProductCarousel;

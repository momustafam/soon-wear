import React from "react";
import { Carousel } from "@material-tailwind/react";


function BannersCarousel({ banners }) {
  return (
    <div className="w-full">
      <Carousel
        loop
        autoplay
        transition={{ duration: 1 }}
        className="rounded-xl"
      >
        {banners &&
          banners.map((banner) => (
            <img
              key={banner.id}
              src={require(`../images/banners/${banner}`)}
              alt={`banner image`}
              className="w-full h-full object-fit rounded-xl"
              style={{ maxHeight: "70vh" }}
            />
          ))}
      </Carousel>
    </div>
  );
}

export default BannersCarousel;
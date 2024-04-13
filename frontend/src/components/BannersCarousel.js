import React from "react";
import { Carousel } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function BannersCarousel({ banners }) {
  return (
    <div className="w-full">
      <Carousel
        loop
        autoplay
        transition={{ duration: 1 }}
        className="rounded-xl"
      >
        {banners.map((banner) => (
          <Link to={banner.url} key={banner.image}>
            <img
              src={require(`../images${banner.image}`)}
              alt={`banner image`}
              className="w-full h-full object-fit rounded-xl"
              style={{ maxHeight: "70vh" }}
            />
          </Link>
        ))}
      </Carousel>
    </div>
  );
}

export default BannersCarousel;

import React from "react";
import Product from "../components/Product";
import SeeMoreButton from "./SeeMoreButton";
import { Link } from "react-router-dom";

function DisplayProducts({
  toggleShoppingCartVisibility,
  header,
  products,
  images,
  link,
}) {
  return (
    <div>
      {header && (
        <h1 className="text-center bg-darkWhite text-black font-bold text-3xl p-3 pt-6 pb-6 mt-10 mb-5">
          {header}
        </h1>
      )}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 m-5">
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
              toggleShoppingCartVisibility={toggleShoppingCartVisibility}
            />
          ))}
        </div>
        <SeeMoreButton link={link} />
        {images &&
          images.map((image) => (
            <Link key={image} to={image.url}>
              <img
                className="h-full w-full object-cover"
                src={require(`../images${image.image}`)}
                alt="Product"
              />
            </Link>
          ))}
      </div>
    </div>
  );
}

export default DisplayProducts;

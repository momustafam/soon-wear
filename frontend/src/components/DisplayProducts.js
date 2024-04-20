import React from "react";
import Product from "../components/Product";
import SeeMoreButton from "./SeeMoreButton";
import { Link } from "react-router-dom";

function DisplayProducts({
  product = null,
  toggleShoppingCartVisibility,
  header,
  products,
  images,
  link,
  seeMore,
  next,
}) {
  return (
    <div>
      {header && (
        <h1 className="text-center bg-darkWhite text-black font-bold text-3xl p-3 pt-6 pb-6 mt-10 mb-5">
          {header}
        </h1>
      )}
      <div>
        <div className="grid xs:grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-3 m-5">
          {product !== null
            ? products
                .filter((p) => p.id !== product.id)
                .slice(0, 4)
                .map((product) => (
                  <Product
                    key={product.id}
                    product={product}
                    toggleShoppingCartVisibility={toggleShoppingCartVisibility}
                  />
                ))
            : products.map((product) => (
                <Product
                  key={product.id}
                  product={product}
                  toggleShoppingCartVisibility={toggleShoppingCartVisibility}
                />
              ))}
        </div>
        <SeeMoreButton link={link} seeMore={seeMore} next={next} />
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

import React from "react";
import Product from "../components/Product";
import ProductCarousel from "../components/ProductCarousel";

function HomeScreen() {
  return (
    <div>
      <ProductCarousel />
      <h1 className="flex flex-row-reverse bg-darkWhite font-bold text-3xl my-2">
        اجدد المنتجات
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-5">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </div>
  );
}

export default HomeScreen;

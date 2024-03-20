import React from "react";
import Product from "../components/Product";
import ProductCarousel from "../components/ProductCarousel";
import { Link } from "react-router-dom";


function HomeScreen() {
  return (
    <div>
      <ProductCarousel />
      <h1 className="flex flex-row-reverse text-white bg-mainColor font-bold text-3xl p-5 my-3">
        التخفيضات
        <Link to="#" className="pr-3 font-normal hover:underline">
          (مشاهدة الكل)
        </Link>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-5">
        <Product />
        <Product />
        <Product />
      </div>
      <h1 className="flex flex-row-reverse text-white bg-mainColor font-bold text-3xl p-5 my-3">
        الأعلى مبيعاً
        <Link to="#" className="pr-3 font-normal hover:underline">
          (مشاهدة الكل)
        </Link>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-5">
        <Product />
        <Product />
        <Product />
      </div>
      <h1 className="flex flex-row-reverse text-white bg-mainColor font-bold text-3xl p-5 my-3">
        وصل حديثاً
        <Link to="#" className="pr-3 font-normal hover:underline">
          (مشاهدة الكل)
        </Link>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-5">
        <Product />
        <Product />
        <Product />
      </div>
    </div>
  );
}

export default HomeScreen;

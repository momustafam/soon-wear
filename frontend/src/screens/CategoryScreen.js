import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Product from "../components/Product";
import SeeMoreButton from "../components/SeeMoreButton";
import { getLandingPageData } from "../slices/landingPageSlice";
import { Spinner } from "@material-tailwind/react";

function CategoryScreen({ toggleShoppingCartVisibility }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  const products = useSelector((state) => state.landingPage.top_selling);
  const loading = useSelector((state) => state.landingPage.loading);

  useEffect(() => {
    dispatch(getLandingPageData());
  }, []);

  return loading ? (
    <div className="flex justify-center items-center">
      <Spinner className="h-[250px] w-[250px] mt-[3rem]" />
    </div>
  ) : (
    <div>
      <h1 className="text-center bg-darkWhite text-black font-bold text-3xl p-3 pt-6 pb-6 mt-10 mb-5">
        {category && category.replace("-", " ")}
      </h1>
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
        <SeeMoreButton />
      </div>
    </div>
  );
}

export default CategoryScreen;

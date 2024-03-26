import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getLandingPageData } from "../slices/landingPageSlice";
import { Spinner } from "@material-tailwind/react";
import DisplayProducts from "../components/DisplayProducts";

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
    DisplayProducts(toggleShoppingCartVisibility, "تيست", products)
  );
}

export default CategoryScreen;

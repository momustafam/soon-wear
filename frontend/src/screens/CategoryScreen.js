import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import DisplayProducts from "../components/DisplayProducts";
import { getProductByCategory } from "../slices/categorySlice";

function CategoryScreen({ toggleShoppingCartVisibility }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const category_id = queryParams.get("category") || null;
  const feature = queryParams.get("feature") || null;

  const products = useSelector((state) => state.category.categoryProducts);
  const loading = useSelector((state) => state.category.loading);

  useEffect(() => {
    dispatch(getProductByCategory({ category_id, feature }));
  }, [category_id, feature]);

  return loading ? (
    <div className="flex justify-center items-center">
      <Spinner className="h-[250px] w-[250px] mt-[3rem]" />
    </div>
  ) : (
    <DisplayProducts
      toggleShoppingCartVisibility={toggleShoppingCartVisibility}
      header={category_id || feature}
      products={products}
    />
  );
}

export default CategoryScreen;

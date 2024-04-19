import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import DisplayProducts from "../components/DisplayProducts";
import { getProductByCategory } from "../slices/categorySlice";
import CategoryFilter from "../components/CategoryFilter";

function CategoryScreen({ toggleShoppingCartVisibility }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const category_id = queryParams.get("category") || null;
  const feature = queryParams.get("feature") || null;
  const name = queryParams.get("name") || null;

  const products = useSelector((state) => state.category.categoryProducts);
  const loading = useSelector((state) => state.category.loading);
  const { next } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getProductByCategory({ category_id, feature, name }));
  }, [dispatch, category_id, feature, name]);

  return loading ? (
    <div className="flex justify-center items-center">
      <Spinner className="h-[250px] w-[250px] mt-[3rem]" />
    </div>
  ) : (
    <div>
      <CategoryFilter
        feature={feature}
        category_id={category_id}
        name={name}
        products={
          <DisplayProducts
            toggleShoppingCartVisibility={toggleShoppingCartVisibility}
            products={products}
            link={`?${queryParams}`}
            seeMore={true}
            next={next}
          />
        }
      />
    </div>
  );
}

export default CategoryScreen;

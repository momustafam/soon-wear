import { useEffect } from "react";
import Product from "../components/Product";
import ProductCarousel from "../components/ProductCarousel";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLandingPageData } from "../slices/landingPageSlice";
import { Spinner } from "@material-tailwind/react";

function HomeScreen() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.landingPage.categories);

  const top_selling = useSelector((state) => state.landingPage.top_selling);

  const discounts = useSelector((state) => state.landingPage.discounts);

  const recently_arrived = useSelector(
    (state) => state.landingPage.recently_arrived
  );

  const banners = useSelector((state) => state.landingPage.banners);

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
      <h1 className="flex flex-row-reverse text-white bg-mainColor font-bold text-3xl p-3 my-3">
        الرئيسية
      </h1>
      <ProductCarousel banners={banners} />
      <h1 className="flex flex-row-reverse text-white bg-mainColor font-bold text-3xl p-3 my-3">
        التخفيضات
        <Link to="#" className="pr-3 me-auto font-normal hover:underline">
          (مشاهدة الكل)
        </Link>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-5">
        {discounts &&
          discounts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </div>
      <h1 className="flex flex-row-reverse text-white bg-mainColor font-bold text-3xl p-3 my-3">
        الأعلى مبيعاً
        <Link to="#" className="pr-3 me-auto font-normal hover:underline">
          (مشاهدة الكل)
        </Link>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-5">
        {top_selling &&
          top_selling.map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </div>
      <h1 className="flex flex-row-reverse text-white bg-mainColor font-bold text-3xl p-3 my-3">
        وصل حديثاً
        <Link to="#" className="pr-3 me-auto font-normal hover:underline">
          (مشاهدة الكل)
        </Link>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-5">
        {recently_arrived &&
          recently_arrived.map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}

export default HomeScreen;

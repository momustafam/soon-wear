import { useEffect } from "react";
import BannersCarousel from "../components/BannersCarousel";
import DisplayProducts from "../components/DisplayProducts";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLandingPageData } from "../slices/landingPageSlice";
import { Spinner } from "@material-tailwind/react";
import ThankYou from "../components/ThankYou";
import { resetCartItems } from "../slices/cartSlice";
import { resetOrder } from "../slices/orderSlice";


function HomeScreen({ toggleShoppingCartVisibility }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.landingPage.loading);
  const top_selling = useSelector((state) => state.landingPage.top_selling);
  const discounts = useSelector((state) => state.landingPage.discounts);
  const recently_arrived = useSelector(
    (state) => state.landingPage.recently_arrived
  );

  // Start fetch Banners data
  // const mainBannersDynamic = useSelector((state, index) => state.landingPage.banners.main_dynamic_banner);
  // const mainBannersStatic = useSelector((state) => state.landingPage.banners.main_banner_static);
  // const topSellingBanner = useSelector((state) => state.landingPage.banners.top_selling_banner[0]);
  // const recentlyArrivedBanner = useSelector((state) => state.landingPage.banners.recently_selling_banner[0]);
  // const customersReviews = useSelector((state) => state.landingPage.banners.customer_review);
  // // End fetch Banners data

  const { success } = useSelector((state) => state.order);
  const landingPageProducts = {
    discounts: discounts,
    top_selling: top_selling,
    recently_arrived: recently_arrived,
  };




  useEffect(() => {
    dispatch(getLandingPageData());
  }, []);

  useEffect(() => {
    if (success === true) {
      dispatch(resetCartItems());
    }
  }, [success]);

  return loading ? (
    <div className="flex justify-center items-center">
      <Spinner className="h-[250px] w-[250px] mt-[3rem]" />
    </div>
  ) : (
    <div>
      {/* Thank You Message for order completion */}
      {success && <ThankYou />}
      {/* Start the upper banner */}
      {/* <BannersCarousel banners={mainBannersDynamic} /> */}
      {/* {mainBannersStatic.length > 0 && (
        <div className="grid grid-cols-3 gap-5 mt-5 ml-2 mr-2 ">
          {mainBannersStatic.map((banner) => (
            <Link key={banner.id} to={banner.url}>
              <img
                className="h-full w-full object-cover"
                src={require(`../images${banner.image}`)}
                alt="Banner Image"
                style={{ maxHeight: "70vh" }}
              />
            </Link>
          ))}
        </div>
      )} */}
      {/* End the upper banner */}

      {/* Start looping over featured products and display each one in a setion with an image or carousel*/}
      {Object.keys(landingPageProducts).map((feature) => {
        if (
          feature === "discounts" &&
          landingPageProducts[feature].length > 0
        ) {
          return DisplayProducts(
            toggleShoppingCartVisibility,
            "أقوى التخفيضات",
            landingPageProducts[feature],
            // topSellingBanner
          );
        } else if (
          feature === "top_selling" &&
          landingPageProducts[feature].length > 0
        ) {
          return DisplayProducts(
            toggleShoppingCartVisibility,
            "المنتجات الأكثر مبيعاً",
            landingPageProducts[feature],
            // recentlyArrivedBanner
          );
        } else if (
          feature === "recently_arrived" &&
          landingPageProducts[feature].length > 0
        ) {
          return DisplayProducts(
            toggleShoppingCartVisibility,
            "وصل حديثاً",
            landingPageProducts[feature]
          );
        }
        return null;
      })}

      {/* End looping over featured products*/}
      {/* {customersReviews.length > 0 && (
        <h1 className="text-center bg-darkWhite text-black font-bold text-3xl p-3 pt-6 pb-6 mt-10 mb-0">
          آراء عملائنا فى منتجاتنا
        </h1>
      )} */}
      {/* <BannersCarousel banners={customersReviews} /> */}

      {/* Start dispalying icons represents soon wear features that soon wear offers to its cusomters */}

      <div className="flex items-center m-auto mt-20 mb-20">
        <div className="ml-5 mr-5 text-center">
          <img
            className="mb-3 sm:w-4/5 lg:w-2/5 md:w-3/5 m-auto"
            src={require(`../images/features/cash-on-delivery.png`)}
          ></img>
          <span className="text-l text-center font-semibold inline-block m-auto">
            الدفع عند الإستلام
          </span>
        </div>
        <div className="ml-5 mr-5 text-center">
          <img
            className="mb-3 sm:w-4/5 lg:w-2/5 md:w-3/5 m-auto"
            src={require(`../images/features/fast-delivery.png`)}
          ></img>
          <span className="text-l text-center font-semibold inline-block m-auto">
            توصيل سريع
          </span>
        </div>
        <div className="ml-5 mr-5 text-center">
          <img
            className="mb-3 sm:w-4/5 lg:w-2/5 md:w-3/5 m-auto"
            src={require(`../images/features/24-hours-support.png`)}
          ></img>
          <span className="text-l font-semibold">خدمة 24/7</span>
        </div>
        <div className="ml-5 mr-5 text-center">
          <img
            className="mb-3 sm:w-4/5 lg:w-2/5 md:w-3/5 m-auto"
            src={require(`../images/features/campaign-optimization.png`)}
          ></img>
          <span className="text-l text-center font-semibold inline-block m-auto">
            عروض يومياً
          </span>
        </div>
      </div>
      {/* End dispalying icons represents soon wear features that soon wear offers to its cusomters */}
    </div>
  );
}

export default HomeScreen;

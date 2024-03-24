import { useEffect } from "react";
import Product from "../components/Product";
import BannersCarousel from "../components/BannersCarousel";
import SeeMoreButton from "../components/SeeMoreButton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLandingPageData } from "../slices/landingPageSlice";
import { Spinner } from "@material-tailwind/react";

function HomeScreen({ toggleShoppingCartVisibility }) {
  const dispatch = useDispatch();
  const top_selling = useSelector((state) => state.landingPage.top_selling);
  const discounts = useSelector((state) => state.landingPage.discounts);
  const recently_arrived = useSelector(
    (state) => state.landingPage.recently_arrived
  );
  const landingPageProducts = {
    discounts: discounts,
    top_selling: top_selling,
    recently_arrived: recently_arrived,
  };
  const loading = useSelector((state) => state.landingPage.loading);

  const dynamicBanners = ["banner_1.jpg", "banner_2.jpg", "banner_3.jpg"];
  const staticBanners = [
    "adds1.jpg",
    "adds2.jpg",
    "adds3.jpg",
    "add1.jpg",
    "add2.jpg",
    "add3.jpg",
  ];
  const customersReviews = [
    "customers_reviews1.jpg",
    "customers_reviews2.jpg",
    "customers_reviews3.jpg",
  ];
  const middleBanner = "banner_2.jpg";
  const lastBanner = "banner_3.jpg";

  useEffect(() => {
    dispatch(getLandingPageData());
  }, []);

  return loading ? (
    <div className="flex justify-center items-center">
      <Spinner className="h-[250px] w-[250px] mt-[3rem]" />
    </div>
  ) : (
    <div>
      {/* Start the upper banner */}
      <BannersCarousel banners={dynamicBanners} />
      <div className="grid grid-cols-3 gap-5 mt-5 ml-2 mr-2 ">
        {staticBanners.map((staticBanner) => (
          <Link to="#">
            <img
              className="h-full w-full object-cover"
              src={require(`../images/banners/${staticBanner}`)}
              alt="Banner Image"
              style={{ maxHeight: "70vh" }}
            />
          </Link>
        ))}
      </div>
      {/* End the upper banner */}

      {/* Start looping over featured products and display each one in a setion with an image or carousel*/}
      {Object.keys(landingPageProducts).map((feature) => {
        if (
          feature === "discounts" &&
          landingPageProducts[feature].length > 0
        ) {
          return (
            <div>
              <h1 className="text-center bg-darkWhite text-black font-bold text-3xl p-3 pt-6 pb-6 mt-10 mb-5">
                %تخفيضات تصل الى 50
              </h1>
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 m-5">
                  {landingPageProducts[feature].map((product) => (
                    <Product
                      key={product.id}
                      product={product}
                      toggleShoppingCartVisibility={
                        toggleShoppingCartVisibility
                      }
                    />
                  ))}
                </div>
                <SeeMoreButton />
                <img
                  className="h-full w-full object-cover"
                  src={require(`../images/banners/${middleBanner}`)}
                  alt="Product"
                />
              </div>
            </div>
          );
        } else if (
          feature === "top_selling" &&
          landingPageProducts[feature].length > 0
        ) {
          return (
            <div>
              <h1 className="text-center bg-darkWhite text-black font-bold text-3xl p-3 pt-6 pb-6 mt-10 mb-5">
                المنتجات الأكثر مبيعاً
              </h1>
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 m-5">
                  {landingPageProducts[feature].map((product) => (
                    <Product
                      key={product.id}
                      product={product}
                      toggleShoppingCartVisibility={
                        toggleShoppingCartVisibility
                      }
                    />
                  ))}
                </div>
                <SeeMoreButton />
                <img
                  className="h-full w-full object-cover"
                  src={require(`../images/banners/${lastBanner}`)}
                  alt="Product"
                />
              </div>
            </div>
          );
        } else if (
          feature === "recently_arrived" &&
          landingPageProducts[feature].length > 0
        ) {
          return (
            <div>
              <h1 className="text-center bg-darkWhite text-black font-bold text-3xl p-3 pt-6 pb-6 mt-10 mb-5">
                وصل حديثاً
              </h1>
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 m-5">
                  {landingPageProducts[feature].map((product) => (
                    <Product
                      key={product.id}
                      product={product}
                      toggleShoppingCartVisibility={
                        toggleShoppingCartVisibility
                      }
                    />
                  ))}
                </div>
                <SeeMoreButton />
              </div>
              <h1 className="text-center bg-darkWhite text-black font-bold text-3xl p-3 pt-6 pb-6 mt-10 mb-0">
                أراء عملائنا فى منتجاتنا
              </h1>
              <BannersCarousel banners={customersReviews} />
            </div>
          );
        }
        return null;
      })}
      {/* End looping over featured products*/}

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

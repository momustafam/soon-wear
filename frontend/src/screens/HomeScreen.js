import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@material-tailwind/react";
import { resetCartItems } from "../slices/cartSlice";
import { getLandingPageData } from "../slices/landingPageSlice";

import { BannersCarousel, DisplayProducts, ThankYou } from "../components";

function HomeScreen({ toggleShoppingCartVisibility }) {
  const dispatch = useDispatch();
  const banners = useSelector((state) => state.landingPage.banners);
  const loading = useSelector((state) => state.landingPage.loading);
  const top_selling = useSelector((state) => state.landingPage.top_selling);
  const discounts = useSelector((state) => state.landingPage.discounts);
  const recently_arrived = useSelector(
    (state) => state.landingPage.recently_arrived
  );

  const { success } = useSelector((state) => state.order);
  const landingPageProducts = {
    discounts: discounts,
    top_selling: top_selling,
    recently_arrived: recently_arrived,
  };

  useEffect(() => {
    dispatch(getLandingPageData());
  }, [dispatch]);

  useEffect(() => {
    if (success === true) {
      dispatch(resetCartItems());
    }
  }, [success, dispatch]);

  return loading ? (
    <div className="flex justify-center items-center">
      <Spinner className="h-[250px] w-[250px] mt-[3rem]" />
    </div>
  ) : (
    <div>
      {/* Thank You Message for order completion */}
      {success && <ThankYou />}

      {/* Start the upper banner */}
      {banners && banners.main_banner_dynamic && (
        <BannersCarousel
          banners={banners.main_banner_dynamic}
          key={"main_banner"}
        />
      )}
      {banners &&
        banners.main_banner_static &&
        banners.main_banner_static.length > 0 && (
          <div className="grid grid-cols-3 gap-5 mt-5 ml-2 mr-2 ">
            {banners.main_banner_static.map((banner) => (
              <Link key={`${banner.image}`} to={banner.url}>
                <img
                  className="h-full w-full object-cover"
                  src={require(`../images${banner.image}`)}
                  alt="Banner"
                  style={{ maxHeight: "70vh" }}
                />
              </Link>
            ))}
          </div>
        )}
      {/* End the upper banner */}

      {/* Start looping over featured products and display each one in a setion with an image or carousel*/}
      {Object.keys(landingPageProducts).map((feature) => {
        if (
          feature === "discounts" &&
          landingPageProducts[feature].length > 0
        ) {
          return (
            <DisplayProducts
              toggleShoppingCartVisibility={toggleShoppingCartVisibility}
              header="أقوى التخفيضات"
              products={landingPageProducts[feature]}
              images={banners.recently_arrived_banner}
              link={"/products?feature=top_discounts"}
              key={feature}
              seeMore={false}
              next={true}
            />
          );
        } else if (
          feature === "top_selling" &&
          landingPageProducts[feature].length > 0
        ) {
          return (
            <DisplayProducts
              toggleShoppingCartVisibility={toggleShoppingCartVisibility}
              header="المنتجات الأكثر مبيعاً"
              products={landingPageProducts[feature]}
              images={banners.top_selling_banner}
              link={"/products?feature=top_selling"}
              key={feature}
              seeMore={false}
              next={true}
            />
          );
        } else if (
          feature === "recently_arrived" &&
          landingPageProducts[feature].length > 0
        ) {
          return (
            <DisplayProducts
              toggleShoppingCartVisibility={toggleShoppingCartVisibility}
              header="وصل حديثاً"
              products={landingPageProducts[feature]}
              images={null}
              link={"/products?feature=recently_arrived"}
              key={feature}
              seeMore={false}
              next={true}
            />
          );
        }
        return null;
      })}
      {/* End looping over featured products*/}

      {/* Start Customer Reviews Section */}
      {banners &&
        banners.customer_review &&
        banners.customer_review.length > 0 && (
          <h1 className="text-center bg-darkWhite text-black font-bold text-3xl p-3 pt-6 pb-6 mt-10 mb-0">
            آراء عملائنا فى منتجاتنا
          </h1>
        )}
      {banners && banners.customer_review && (
        <BannersCarousel
          banners={banners.customer_review}
          key={"customer_review_banners"}
        />
      )}
      {/* End Customer Reviews Section */}

      {/* Start dispalying icons represents soon wear features that soon wear offers to its cusomters */}
      <div className="flex items-center m-auto mt-20 mb-20">
        <div className="ml-5 mr-5 text-center">
          <img
            className="mb-3 sm:w-4/5 lg:w-2/5 md:w-3/5 m-auto"
            src={require(`../images/features/cash-on-delivery.png`)}
            alt={"cash on delivery"}
          ></img>
          <span className="text-l text-center font-semibold inline-block m-auto">
            الدفع عند الإستلام
          </span>
        </div>
        <div className="ml-5 mr-5 text-center">
          <img
            className="mb-3 sm:w-4/5 lg:w-2/5 md:w-3/5 m-auto"
            src={require(`../images/features/fast-delivery.png`)}
            alt={"fast delivery"}
          ></img>
          <span className="text-l text-center font-semibold inline-block m-auto">
            توصيل سريع
          </span>
        </div>
        <div className="ml-5 mr-5 text-center">
          <img
            className="mb-3 sm:w-4/5 lg:w-2/5 md:w-3/5 m-auto"
            src={require(`../images/features/24-hours-support.png`)}
            alt={"customer support"}
          ></img>
          <span className="text-l font-semibold">خدمة 24/7</span>
        </div>
        <div className="ml-5 mr-5 text-center">
          <img
            className="mb-3 sm:w-4/5 lg:w-2/5 md:w-3/5 m-auto"
            src={require(`../images/features/campaign-optimization.png`)}
            alt={"campaign optimization"}
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

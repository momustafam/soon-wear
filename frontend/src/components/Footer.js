import footerLogo from "../images/logos/footer-logo.jpg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";

/**
 * @returns The standard footer of all pages of soon wear website
 */
function Footer() {
  // get the available products categories
  const { categories } = useSelector((state) => state.category);
  return (
    <footer className="bg-mainColor dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl pr-3 py-6 lg:py-8">
        {/* Start the footer logo and brand contact information column */}
        <div className="flex flex-row-reverse justify-between flex-wrap">
          <div className="mb-6 pl-20">
            <div className="flex justify-end">
              <Link to="/">
                <img
                  src={footerLogo}
                  className="h-[7rem] w-[10rem] me-3"
                  alt="Soon Wear Logo"
                />
              </Link>
            </div>
            <ul>
              <li className="text-right text-lg text-white">
                العنوان: <span>الأسكندرية - سيدى بشر قبلى</span>{" "}
                <i className="fa-solid fa-location-dot"></i>
              </li>
              <li className="text-right text-lg text-white">
                <span>cs@soonwear.com</span> :البريد{" "}
                <i className="fa-solid fa-envelope"></i>
              </li>
              <li className="text-right text-lg text-white">
                التليفون: <span>01200488281</span>{" "}
                <i className="fa-solid fa-phone"></i>
              </li>
              <li className="text-right text-2xl text-white mt-4">
                <div>
                  <Link
                    className="m-5"
                    to="https://www.facebook.com/Soonwear"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-facebook"></i>
                  </Link>
                  <Link
                    to="https://www.instagram.com/soonweareg/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          {/* End the footer logo and brand contact information column */}

          {/* Start categories column */}
          <div className="mb-5 pl-20">
            <h2 className="mb-6 text-right text-xl font-semibold text-white uppercase dark:text-white">
              التصنيفات
            </h2>
            <ul className="grid grid-col-1 gap-1 text-white text-right font-medium">
              {categories &&
                categories.map((category) => (
                  <li className="mt-1 mb-1" key={category.id}>
                    <Link
                      to={`/products?category=${category.name}`}
                      className="hover:underline"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          {/* End categories column */}

          {/* Start useful linkes column */}
          <div className="pl-20">
            <h2 className="mb-6 text-right text-xl font-semibold text-white uppercase dark:text-white">
              روابط مفيدة
            </h2>
            <ul className="text-white text-right dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link to="#" className="hover:underline">
                  طلباتي
                </Link>
              </li>
              <li className="mb-4">
                <Link to="#" className="hover:underline">
                  معلومات عنا
                </Link>
              </li>
              <li className="mb-4">
                <Link to="#" className="hover:underline">
                  تواصلى معنا
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  سياسة الاستبدال و الاسترجاع
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center pb-10 mt-4">
          <span className="text-sm text-white sm:text-center dark:text-gray-400">
            .كل الحقوق محفوظة
            <Link to="/" className="hover:underline">
              {" ."}
              Soon Wear™{" "}
            </Link>
            {new Date().getFullYear()} حقوق النشر ©
          </span>
        </div>
        {/* End useful linkes column */}
      </div>
    </footer>
  );
}

export default Footer;

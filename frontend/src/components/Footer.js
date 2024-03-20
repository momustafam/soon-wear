import React from "react";
import pageLogo from "../images/page-logo.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Footer() {
  const categories = useSelector((state) => state.category.categories);
  return (
    <footer className="bg-mainColor dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="flex flex-row-reverse justify-between flex-wrap">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img src={pageLogo} className="h-8 me-3" alt="FlowBite Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white dark:text-white">
                Soon Wear
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-2 text-right text-xl  font-semibold text-white uppercase dark:text-white">
                كل الفئات
              </h2>
              <ul className="grid  grid-cols-2 gap-3 text-white text-right dark:text-gray-400 font-medium">
                {categories &&
                  categories.map((category) => (
                    <li className="mt-4" key={category.id}>
                      <Link to="#" className="hover:underline">
                        {category.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-right text-xl font-semibold text-white uppercase dark:text-white">
                روابط سريعة
              </h2>
              <ul className="text-white text-right dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link to="https://flowbite.com/" className="hover:underline">
                    حسابي
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    طلباتي
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    تتبعي طلبك
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-right text-xl font-semibold text-white uppercase dark:text-white">
                معلومات
              </h2>
              <ul className="text-white text-right dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link to="#" className="hover:underline">
                    معلومات عنا{" "}
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="#" className="hover:underline">
                    تواصلى معانا
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    الاستبدال و الاسترجاع
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-white sm:text-center dark:text-gray-400">
            © {new Date().getFullYear()}{" "}
            <Link to="https://www.facebook.com/Soonwear" className="hover:underline">
              Soon Wear™
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <Link
              to="https://www.facebook.com/Soonwear"
              className="text-white hover:text-white dark:hover:text-white"
            >
              <svg
                className="w-8 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </Link>
            <Link
              to="https://www.facebook.com/Soonwear"
              className="text-white hover:text-white dark:hover:text-white"
            >
              <svg
                className="w-8 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </Link>
            <Link
              to="https://www.facebook.com/Soonwear"
              className="text-white hover:text-white dark:hover:text-white"
            >
              <svg
                className="w-8 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import React from "react";
import pageLogo from "../images/footer-logo.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Footer() {
  const categories = useSelector((state) => state.landingPage.categories);
  return (
    <footer className="bg-mainColor dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl pr-3 py-6 lg:py-8">
        <div className="flex flex-row-reverse justify-between flex-wrap">
          <div className="mb-6">
            <div className="flex justify-end">
              <Link to="/" >
                <img
                  src={pageLogo}
                  className="h-[7rem] w-[10rem] me-3"
                  alt="Soon Wear Logo"
                />
              </Link>
            </div>
            <ul>
              <li className="text-right text-lg text-white">
                العنوان: <span>الأسكندرية - سيدى بشر قبلى</span> <i className="fa-solid fa-location-dot"></i>
              </li>
              <li className="text-right text-lg text-white">
                {" "}
                <span>cs@soonwear.com</span> :البريد <i className="fa-solid fa-envelope"></i>
              </li>
              <li className="text-right text-lg text-white">
                التليفون: <span>01200488281</span> <i className="fa-solid fa-phone"></i>
              </li>

              <li className="text-right text-2xl text-white mt-4">
                <div>
                  <Link className="m-5" to="https://www.facebook.com/Soonwear" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-facebook"></i>
                  </Link>

                  <Link to="https://www.instagram.com/soonweareg/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          <div className="mb-5">
            <h2 className="mb-2 text-right text-xl  font-semibold text-white uppercase ">
              كل الفئات
            </h2>
            <ul className="grid grid-cols-2 gap-2 text-white text-right font-medium">
              {categories &&
                categories.map((category) => (
                  <li className="mt-1 mb-1" key={category.id}>
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
                <Link to="https://tailwindcss.com/" className="hover:underline">
                  طلباتي
                </Link>
              </li>
              <li>
                <Link to="https://tailwindcss.com/" className="hover:underline">
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
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="text-right">
          <span className="text-sm text-white sm:text-center dark:text-gray-400">
            .كل الحقوق محفوظة
            <Link
              to="/"
              className="hover:underline"
            >
              {" ."}
              Soon Wear™{" "}
            </Link>
            {new Date().getFullYear()} حقوق النشر ©
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

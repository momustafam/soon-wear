import React from "react";
import pageLogo from "../images/footer-logo.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Footer() {
  const categories = useSelector((state) => state.landingPage.categories);
  return (
    <footer className="bg-mainColor dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="flex flex-row-reverse justify-between flex-wrap">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img
                src={pageLogo}
                className="h-[7rem] w-[10rem] me-3"
                alt="Soon Wear Logo"
              />
            </Link>
            <ul>
              <li className="text-right text-lg text-white">
                العنوان <i className="fa-solid fa-location-dot"></i>
              </li>
              <li className="text-right text-lg text-white">
                {" "}
                البريد <i className="fa-solid fa-envelope"></i>
              </li>
              <li className="text-right text-lg text-white">
                التليفون <i className="fa-solid fa-phone"></i>
              </li>

              <li className="text-right text-2xl text-white mt-4">
                <div>
                  <Link className="m-10" to="https://www.facebook.com/Soonwear">
                    {" "}
                    <i className="fa-brands fa-facebook"></i>{" "}
                  </Link>

                  <Link to="https://www.facebook.com/Soonwear">
                    {" "}
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-2 text-right text-xl  font-semibold text-white uppercase ">
              كل الفئات
            </h2>
            <ul className="grid grid-cols-2 gap-3 mb-4  text-white text-right font-medium">
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
        <div className="flex flex-row-reverse">
          <span className="text-sm text-white sm:text-center dark:text-gray-400">
            .كل الحقوق محفوظة
            <Link
              to="https://www.facebook.com/Soonwear"
              className="hover:underline"
            >
              {" "}
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

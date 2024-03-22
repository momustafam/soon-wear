import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createRoot } from "react-dom/client";
import headerLogo from "../images/header-logo.jpg";
import ShoppingCart from "./ShoppingCart";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  IconButton,
  Badge,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useSelector, Provider } from "react-redux";
import store from "../store";

function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(0);
  const categories = useSelector((state) => state.landingPage.categories);
  const { cartItems } = useSelector((state) => state.cart);
  const navbarSearch = document.getElementById("navbar-search");

  console.log(window.innerWidth);

  useEffect(() => {
    if (navbarSearch) {
      navbarSearch.classList.add("active");
    }
    const handleResize = () => {
      if (navbarSearch) {
        if (window.innerWidth > 1024) {
          console.log("inside");

          navbarSearch.classList.remove("active");
          navbarSearch.classList.add("active");
        } else {
          navbarSearch.classList.remove("active");
        }
      }
    };
    window.addEventListener("resize", handleResize);
  }, [navbarSearch]);

  const handleClick = () => {
    const header = document.getElementById("page-header");

    const container = document.createElement("div");

    // Wrap the ShoppingCart component with a Provider component
    createRoot(container).render(
      <Provider store={store}>
        <ShoppingCart />
      </Provider>
    );

    header.appendChild(container);
  };

  const handleMenuClick = () => {
    // Toggle the 'active' class to control visibility
    if (navbarSearch) {
      navbarSearch.classList.toggle("active");
    }
  };

  const handleLiClick = (index) => {
    setClickedIndex(index);
  };

  return (
    <header id="page-header">
      <nav className="text-white border-gray-200 dark:bg-gray-900 pl-10 pb-0">
        <div className="max-w-screen-xl mt-1  flex flex-row-reverse flex-wrap items-center justify-between mx-auto p-0">
          <Link
            to="/"
            className="flex flex-col items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={headerLogo}
              className="h-[5rem] w-[8rem] lg:h-[7rem] lg:w-[10rem]"
              alt="Soon Wear Logo"
            />
          </Link>
          <div className="flex lg:order-2">
            <div className="relative hidden lg:block">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full mt-2 p-2 ps-10 text-sm text-end rounded-lg bg-mainColor placeholder-white"
                placeholder="...ابحثي عن ما تريدين"
              />
            </div>
            <button
              id="btn-hamburger"
              type="button"
              className="inline-flex items-center p-2 w-15 h-10 justify-center text-lg text-white rounded-lg lg:hidden bg-mainColor focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={handleMenuClick}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-10 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div className="flex items-center gap-4 fixed left-24 z-10">
              <Badge content={cartItems.length}>
                <IconButton variant="text" size="lg" onClick={handleClick}>
                  <i className="fa-solid fa-shopping-cart text-lg text-[#6f3e42]"></i>
                </IconButton>
              </Badge>
            </div>
          </div>
          <div
            className="items-center justify-between w-full lg:flex lg:w-auto lg:order-1"
            id="navbar-search"
          >
            <div className="relative mt-3 lg:hidden">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full mt-2 p-2 ps-10 text-sm text-white text-end border bg-mainColor border-darkWhite rounded-lg  focus:ring-blue-500 focus:border-blue-500 placeholder-white"
                placeholder="ابحثي عن ما تريدين..."
              />
            </div>
            <div className="flex flex-col">
              <ul className="flex flex-col mb-3 p-4 lg:p-0 mt-4 font-medium border border-gray-100 rounded-lg lg:space-x-4 lg:flex-row-reverse lg:mt-5 lg:border-0">
                <li className="m-auto">
                  <Menu open={openMenu} handler={setOpenMenu} allowHover>
                    <MenuHandler className="flex justify-center items-center text-white text-xl bg-mainColor hover:text-mainColor border-none ml-4">
                      <Button
                        variant="text"
                        className="flex items-center text-base font-normal tracking-normal group-hover:text-mainColor"
                      >
                        كل الفئات
                        <ChevronDownIcon
                          strokeWidth={2.5}
                          className={`h-3.5 w-3.5 transition-transform ${openMenu ? "rotate-180" : ""
                            }`}
                        />
                      </Button>
                    </MenuHandler>

                    {categories && (
                      <MenuList className="w-[10rem] overflow-visible">
                        {categories.map((category) => (
                          <MenuItem
                            className="text-right text-lg"
                            key={category.id}
                          >
                            {category.name}
                          </MenuItem>
                        ))}
                      </MenuList>
                    )}
                  </Menu>
                </li>
                <li>
                  <Link
                    to="#"
                    className={`block py-3 px-3 text-black text-end rounded hover:bg-gray-100 hover:text-mainColor ${clickedIndex === 0 ? "border-b-2 border-b-mainColor" : ""
                      } lg:pt-4 lg:pb-4`}
                    onClick={() => handleLiClick(0)}
                  >
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className={`block py-3 px-3 text-black text-end rounded hover:bg-gray-100 hover:text-mainColor ${clickedIndex === 1 ? "border-b-2 border-b-mainColor" : ""
                      } lg:pt-4 lg:pb-4`}
                    onClick={() => handleLiClick(1)}
                  >
                    التخفيضات
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className={`block py-3 px-3 text-black text-end rounded hover:bg-gray-100 hover:text-mainColor ${clickedIndex === 2 ? "border-b-2 border-b-mainColor" : ""
                      } lg:pt-4 lg:pb-4`}
                    onClick={() => handleLiClick(2)}
                  >
                    الأعلى مبيعاً
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className={`block py-3 px-3 text-black text-end rounded hover:bg-gray-100 hover:text-mainColor ${clickedIndex === 3 ? "border-b-2 border-b-mainColor" : ""
                      } lg:pt-4 lg:pb-4`}
                    onClick={() => handleLiClick(3)}
                  >
                    وصل حديثاً
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className={`block py-3 px-3 text-black text-end rounded hover:bg-gray-100 hover:text-mainColor ${clickedIndex === 4 ? "border-b-2 border-b-mainColor" : ""
                      } lg:pt-4 lg:pb-4`}
                    onClick={() => handleLiClick(4)}
                  >
                    تواصل معنا
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
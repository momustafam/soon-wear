import { ChevronDownIcon } from "@heroicons/react/24/outline";
import headerLogo from "../images/logos/header-logo.jpg";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  IconButton,
  Badge,
} from "@material-tailwind/react";
import { getCategories } from "../slices/categorySlice";

function Header({ toggleShoppingCartVisibility }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(
    localStorage.getItem("clickedIndex") || 0
  );

  const { categories } = useSelector((state) => state.category);
  const { cartItems } = useSelector((state) => state.cart);
  const navbarSearch = document.getElementById("navbar-search");
  const isLargescreen = window.innerWidth > 1024;

  useEffect(() => {
    // Store clickedIndex in localStorage
    localStorage.setItem("clickedIndex", clickedIndex);
  }, [clickedIndex]);

  useEffect(() => {
    if (navbarSearch && window.innerWidth >= 960) {
      navbarSearch.classList.add("active");
    }
    const handleResize = () => {
      if (navbarSearch) {
        if (isLargescreen) {
          navbarSearch.classList.remove("active");
          navbarSearch.classList.add("active");
        } else {
          navbarSearch.classList.remove("active");
        }
      }
    };
    window.addEventListener("resize", handleResize);
  }, [navbarSearch, isLargescreen]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleMenuClick = () => {
    // Toggle the 'active' class to control visibility
    if (navbarSearch) {
      navbarSearch.classList.toggle("active");
    }
  };

  const handleLiClick = (index) => {
    setClickedIndex(index);
  };

  const handleClick = () => {
    toggleShoppingCartVisibility();
  };

  const handleSearch = (e) => {
    // prevent default behaviour
    e.preventDefault();

    // get number of search nav bar
    const number = isLargescreen ? "" : "2";
    // get input field
    const input = document.getElementById(`search-navbar${number}`);

    // Get the value from the input field
    const productName = input.value;

    // navigate to path
    if (productName === "") navigate("/");
    else navigate(`/products?name=${productName}`);

    // reset input field
    input.value = "";
  };

  return (
    <header id="page-header">
      <nav className="text-white border-gray-200 dark:bg-gray-900 pl-10 pb-5">
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
              <div className="relative w-full">
                <form className="flex w-full" onSubmit={handleSearch}>
                  <input
                    type="text"
                    id="search-navbar"
                    className="block w-full p-2 text-sm text-end rounded-lg bg-mainColor placeholder-white pr-10"
                    placeholder="...ابحثي عن ما تريدين"
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 left-0 flex items-center justify-center px-3 text-white bg-mainColor rounded-l-lg"
                    aria-label="Search"
                  >
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
                  </button>
                </form>
              </div>
            </div>
            <button
              id="btn-hamburger"
              type="button"
              className="inline-flex items-center p-2 w-15 h-10 justify-center text-lg text-white rounded-lg lg:hidden xl:hidden 2xl:hidden bg-mainColor focus:outline-none focus:ring-2 focus:ring-gray-200"
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
            <div className="flex items-center gap-4">
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
              <div className="relative w-full">
                <form className="flex w-full" onSubmit={handleSearch}>
                  <input
                    type="text"
                    id="search-navbar2"
                    className="block w-full p-2 text-sm text-end rounded-lg bg-mainColor placeholder-white pr-10"
                    placeholder="...ابحثي عن ما تريدين"
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 left-0 flex items-center justify-center px-3 text-white bg-mainColor rounded-l-lg"
                    aria-label="Search"
                  >
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
                  </button>
                </form>
              </div>
            </div>
            <div className="flex flex-col">
              <ul className="flex flex-col mb-3 p-4 lg:p-0 mt-4 font-medium border border-gray-100 rounded-lg lg:space-x-4 lg:flex-row-reverse lg:mt-5 lg:border-0">
                {window.innerWidth > 940 && (
                  <li className="m-auto">
                    <Menu
                      open={openMenu}
                      handler={setOpenMenu}
                      allowHover={isLargescreen}
                    >
                      <MenuHandler className="flex justify-center items-center text-white text-xl bg-mainColor hover:text-mainColor border-none ml-4">
                        <Button
                          variant="text"
                          className="flex items-center text-base font-normal tracking-normal group-hover:text-mainColor"
                        >
                          التصنيفات
                          <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`h-3.5 w-3.5 transition-transform ${
                              openMenu ? "rotate-180" : ""
                            }`}
                          />
                        </Button>
                      </MenuHandler>
                      {categories && (
                        <MenuList className="w-[10rem] overflow-visible">
                          {categories.map((category) => (
                            <Link
                              to={`/products?category=${category.name}`}
                              key={category.id}
                            >
                              <MenuItem
                                className="text-right text-lg"
                                key={category.id}
                              >
                                {category.name}
                              </MenuItem>
                            </Link>
                          ))}
                        </MenuList>
                      )}
                    </Menu>
                  </li>
                )}
                <li>
                  <Link
                    to="/"
                    className={`block py-3 px-3 text-black text-end rounded hover:bg-gray-100 hover:text-mainColor ${
                      clickedIndex === 0 ? "border-b-2 border-b-mainColor" : ""
                    } lg:pt-4 lg:pb-4`}
                    onClick={() => handleLiClick(0)}
                  >
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products?feature=top_discounts"
                    className={`block py-3 px-3 text-black text-end rounded hover:bg-gray-100 hover:text-mainColor ${
                      clickedIndex === 1 ? "border-b-2 border-b-mainColor" : ""
                    } lg:pt-4 lg:pb-4`}
                    onClick={() => handleLiClick(1)}
                  >
                    التخفيضات
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products?feature=top_selling"
                    className={`block py-3 px-3 text-black text-end rounded hover:bg-gray-100 hover:text-mainColor ${
                      clickedIndex === 2 ? "border-b-2 border-b-mainColor" : ""
                    } lg:pt-4 lg:pb-4`}
                    onClick={() => handleLiClick(2)}
                  >
                    الأعلى مبيعاً
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products?feature=recently_arrived"
                    className={`block py-3 px-3 text-black text-end rounded hover:bg-gray-100 hover:text-mainColor ${
                      clickedIndex === 3 ? "border-b-2 border-b-mainColor" : ""
                    } lg:pt-4 lg:pb-4`}
                    onClick={() => handleLiClick(3)}
                  >
                    وصل حديثاً
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className={`block py-3 px-3 text-black text-end rounded hover:bg-gray-100 hover:text-mainColor ${
                      clickedIndex === 4 ? "border-b-2 border-b-mainColor" : ""
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

      {/* Start Bottom fixed navigation bar for small screens */}
      {window.innerWidth < 940 && (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200">
          <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
            <Link
              to="/"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600"
            >
              <svg
                className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-mainColor dark:group-hover:text-mainColor"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-mainColor">
                الرئيسية
              </span>
            </Link>
            <Menu open={openMenu} handler={setOpenMenu} allowHover>
              <MenuHandler>
                <button
                  type="button"
                  className="inline-flex flex-col items-center justify-center px-5 border-e border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600"
                >
                  <svg
                    className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-mainColor dark:group-hover:text-mainColor"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <line x1="8" y1="6" x2="23" y2="6" />{" "}
                    <line x1="8" y1="12" x2="23" y2="12" />{" "}
                    <line x1="8" y1="18" x2="23" y2="18" />{" "}
                    <line x1="3" y1="6" x2="3.01" y2="6" />{" "}
                    <line x1="3" y1="12" x2="3.01" y2="12" />{" "}
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                  <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-mainColor dark:group-hover:text-mainColor">
                    التصنيفات
                  </span>
                </button>
              </MenuHandler>
              {categories && (
                <MenuList className="w-[10rem] overflow-visible">
                  {categories.map((category) => (
                    <Link
                      onClick={() => window.scrollTo(0, 0)}
                      to={`/products?category=${category.name}`}
                      key={category.id}
                    >
                      <MenuItem
                        className="text-right text-lg"
                        key={category.id}
                      >
                        {category.name}
                      </MenuItem>
                    </Link>
                  ))}
                </MenuList>
              )}
            </Menu>
            <div className="inline-flex flex-col items-center justify-center px-5 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 group border-x dark:border-gray-600">
              <Badge content={cartItems.length}>
                <button
                  type="button"
                  onClick={handleClick}
                  className="focus:outline-none"
                >
                  <i className="fa-solid fa-shopping-cart w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-mainColor dark:group-hover:text-mainColor"></i>
                </button>
              </Badge>
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-mainColor dark:group-hover:text-mainColor">
                سلتى
              </span>
            </div>
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 group border-x dark:border-gray-600"
            >
              <svg
                className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-mainColor dark:group-hover:text-mainColor"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-mainColor dark:group-hover:text-mainColor">
                حسابى
              </span>
            </button>
          </div>
        </div>
      )}
      {/* End Bottom fixed navigation bar for small screens */}
    </header>
  );
}

export default Header;

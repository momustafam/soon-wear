import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getColors } from "../slices/colorSlice";
import { getSizes } from "../slices/sizeSlice";
import { getCategories, getProductByCategory } from "../slices/categorySlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CategoryFilter({ products, feature, category_id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const initialQuery = "";
  const [query, setQuery] = useState(initialQuery);

  const { colors } = useSelector((state) => state.color);
  const { sizes } = useSelector((state) => state.size);
  const { categories } = useSelector((state) => state.category);

  const filters = [
    {
      id: "color",
      name: "اللون",
      options: colors,
    },
    {
      id: "category",
      name: "الفئات",
      options: categories,
    },
    {
      id: "size",
      name: "المقاس",
      options: sizes,
    },
  ];

  const sortOptions = [
    {
      name: "احسن تقييم",
      onClick: () => {
        const updatedQuery = updateQuery("ordering", "-rating");
        setQuery(updatedQuery);
      },
    },
    {
      name: "التخفيضات",
      onClick: () => {
        const updatedQuery = updateQuery("ordering", "-discounts");
        setQuery(updatedQuery);
      },
    },
    {
      name: "السعر: المنخفض الى الاعلى",
      onClick: () => {
        const updatedQuery = updateQuery("ordering", "price");
        setQuery(updatedQuery);
      },
    },
    {
      name: "السعر: الاعلى الى المنخفض",
      onClick: () => {
        const updatedQuery = updateQuery("ordering", "-price");
        setQuery(updatedQuery);
      },
    },
  ];

  useEffect(() => {
    if (colors.length === 0) dispatch(getColors());
    if (sizes.length === 0) dispatch(getSizes());

    if (categories.length === 0) {
      dispatch(getCategories());
    }
  }, []);

  const addQueryParam = () => {
    // Get current query parameters
    const queryParams = new URLSearchParams(location.search);

    // Add or update a query parameter
    queryParams.set("key", "value");

    // Replace current query string with updated one
    navigate.push({
      pathname: location.pathname,
      search: `?${queryParams.toString()}`,
    });
  };

  const updateQuery = (paramKey, paramValue) => {
    // Check if the current query already contains the specified parameter
    const existingParamIndex = query.indexOf(`${paramKey}=`);
    if (existingParamIndex !== -1) {
      // Extract the current value of the parameter
      const startIndex = existingParamIndex + paramKey.length + 1;
      const endIndex = query.indexOf("&", startIndex);
      const currentValue = query.substring(
        startIndex,
        endIndex !== -1 ? endIndex : undefined
      );

      // Replace the current parameter value with the new value
      return query.replace(
        `${paramKey}=${currentValue}`,
        `${paramKey}=${paramValue}`
      );
    } else {
      // Append the new parameter and its value to the current query
      return query
        ? `${query}&${paramKey}=${paramValue}`
        : `${paramKey}=${paramValue}`;
    }
  };

  const handleFilterSelelection = (e) => {
    const value = e.target.value;
    const type = e.target.name;
    const checked = e.target.checked;

    // Update the query based on the selected filter
    setQuery((prevQuery) => {
      if (checked) {
        // Add the selected filter to the query
        return prevQuery ? `${prevQuery}&${type}=${value}` : `${type}=${value}`;
      } else {
        // Remove the deselected filter from the query
        const updatedQuery = prevQuery
          .replace(`${type}=${value}`, "")
          .replace("&&", "&");
        return updatedQuery.startsWith("&")
          ? updatedQuery.substring(1)
          : updatedQuery;
      }
    });
  };

  const handleFilter = () => {};
  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.id}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}`}
                                      defaultValue={option.name}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      onChange={handleFilterSelelection}
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.name}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                  <button
                    className="text-white bg-mainColor py-2 px-4 rounded-full font-bold mr-2 hover:bg-mainColor/90"
                    onClick={handleFilter}
                  >
                    Filter
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {/* Sorting options */}
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              onClick={option.onClick}
                              className={classNames(
                                "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10">
              {/* Product grid */}
              <div className="lg:col-span-3">{products}</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

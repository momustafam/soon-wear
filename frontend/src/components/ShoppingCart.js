import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addKeyToCart } from "../slices/cartSlice";
import { Alert, Select, Option } from "@material-tailwind/react";

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(true);

  const discountTotal = cartItems
    .reduce(
      (acc, item) => acc + item.qty * parseFloat(item.price - item.discount),
      0
    )
    .toFixed(2);
  const total = cartItems
    .reduce((acc, item) => acc + item.qty * parseFloat(item.price), 0)
    .toFixed(2);

  const handleRemoveFromCart = (id, size) => {
    dispatch(removeFromCart({ id, size }));
  };

  const handleChangeQty = (id, val, size) => {
    dispatch(addKeyToCart({ id, size, key: "qty", value: parseInt(val) }));
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          سلة التسوق
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {cartItems.length === 0 ? (
                        <Alert
                          className="flex flex-row-reverse mt-5 bg-mainColor"
                          color=""
                          icon={<Icon />}
                        >
                          السلة فارغة
                        </Alert>
                      ) : (
                        <div className="mt-5">
                          <div className="flow-root">
                            <ul className="-my-6 divide-y divide-gray-200">
                              {cartItems.map((product) => (
                                <li
                                  key={`${product.id}-${product.size}`}
                                  className="flex py-6"
                                >
                                  <div className="h-30 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={require(`../images/products/product_${product.id}.jpg`)}
                                      alt="Product"
                                      className="h-full w-full object-fill object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={`/product/${product.id}`}>
                                            {product.name}
                                          </a>
                                        </h3>
                                        <p className="ml-4">
                                          {product.discount > 0 ? (
                                            <span className="text-lg font-bold text-gray-90">
                                              £
                                              {(product.price -
                                                product.discount) *
                                                product.qty}
                                              <span className="text-sm font-bold text-gray-900 line-through decoration-red-900 decoration-2 decoration-solid ms-4">
                                                £{product.price * product.qty}
                                              </span>
                                            </span>
                                          ) : (
                                            <span className="text-lg font-bold text-gray-90">
                                              £{product.price * product.qty}
                                            </span>
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                    <span className="m0 text-black text-sm">
                                      size: {product.size.toUpperCase()}
                                    </span>
                                    <div className="flex flex-1 items-center h-auto justify-between text-sm">
                                      <p className="text-black">
                                        الكمية: {product.qty}
                                      </p>
                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-red-900 hover:text-red-500"
                                          onClick={() =>
                                            handleRemoveFromCart(
                                              product.id,
                                              product.size
                                            )
                                          }
                                        >
                                          <XMarkIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                          />
                                        </button>
                                      </div>

                                    </div>
                                    <div className="w-1 mt-5">
                                      <Select
                                        size="md"
                                        label="اضغط هنا لتعديل الكمية"
                                        value={product.qty}
                                        onChange={(val) => {
                                          handleChangeQty(
                                            product.id,
                                            val,
                                            product.size
                                          );
                                        }}
                                      >
                                        {[
                                          ...Array(product.countInStock).keys(),
                                        ].map((i) => (
                                          <Option
                                            key={i + 1}
                                            value={(i + 1).toString()}
                                          >
                                            {i + 1}
                                          </Option>
                                        ))}
                                      </Select>
                                    </div>
                                  </div>
                                </li>
                              ))}
                              <hr />
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex flex-row-reverse justify-between text-base font-medium text-gray-900">
                        <p>الاجمالي</p>
                        <p className="font-bold">
                          <span>£{discountTotal}</span>

                          {total !== discountTotal && (
                            <span className="text-sm font-bold text-gray-900 line-through decoration-red-900 decoration-2 decoration-solid ms-4">
                              £{total}
                            </span>
                          )}
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        مصاريف الشحن تحسب عند تأكيد الطلب
                      </p>
                      <div className="mt-6">
                        <button className="flex items-center justify-center rounded-md border border-transparent bg-mainColor px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-mainColor/90">
                          تأكيد الطلب
                        </button>
                      </div>
                      <div className="mt-3 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          <button
                            type="button"
                            className="font-medium text-mainColor hover:text-mainColor/90"
                            onClick={() => setOpen(false)}
                          >
                            تكملة التصفح
                            <span aria-hidden="true"> &larr;</span>
                          </button>
                          او{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>
  );
}

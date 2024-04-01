import { useEffect, useState } from "react";
import {
  Input,
  Typography,
  Select,
  Option,
  Alert,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

import { TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { addKeyToCart, removeFromCart } from "../slices/cartSlice";
import { createOrder } from "../slices/orderSlice";

const paymentMethods = [
  { id: "cash", title: "كاش" },
  { id: "visa", title: "فيزا" },
  { id: "paypal", title: "باي بال" },
];

export default function PlaceOrderScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const discountTotal = parseFloat(
    cartItems
      .reduce(
        (acc, item) => acc + item.qty * parseFloat(item.price - item.discount),
        0
      )
      .toFixed(2)
  );

  const total = parseFloat(
    cartItems
      .reduce((acc, item) => acc + item.qty * parseFloat(item.price), 0)
      .toFixed(2)
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    homeNumber: "",
    streetAddress: "",
    city: "",
    phoneNumber: "",
    district: "",
  });
  const [errors, setErrors] = useState({});

  const shippingPrice = 20;
  const cities = [
    "القاهرة",
    "الإسكندرية",
    "الجيزة",
    "الشرقية",
    "الدقهلية",
    "القليوبية",
    "كفر الشيخ",
    "الغربية",
    "المنوفية",
    "دمياط",
    "البحيرة",
    "الفيوم",
    "المنيا",
    "أسيوط",
    "سوهاج",
    "قنا",
    "أسوان",
    "الأقصر",
    "البحر الأحمر",
    "مطروح",
    "الوادي الجديد",
    "شمال سيناء",
    "جنوب سيناء",
  ];

  // Define an array for form fields and errors
  const formFields = [
    {
      label: "اسم العائلة",
      placeholder: "ادخل اسم العائلة",
      name: "lastName",
      error: errors.lastName,
      required: true,
    },
    {
      label: "الأسم الاول",
      placeholder: "ادخل اسمك الاول",
      name: "firstName",
      error: errors.firstName,
      required: true,
    },
    {
      label: "المنطقة",
      placeholder: "اختر المنطقة",
      name: "district",
      error: errors.district,
      select: true,
      required: true,
    },
    {
      label: "مدينة",
      placeholder: "اختر المدينة",
      name: "city",
      error: errors.city,
      select: true,
      required: true,
    },
    {
      label: "عنوان الشارع",
      placeholder: "ادخل عنوانك",
      name: "streetAddress",
      error: errors.streetAddress,
      required: true,
    },
    {
      label: "رقم الهاتف",
      placeholder: "ادخل رقم الهاتف",
      name: "phoneNumber",
      error: errors.phoneNumber,
      required: true,
    },
    {
      label: "رقم المنزل / الشقة",
      placeholder: "ادخل رقم المنزل / الشقة",
      name: "homeNumber",
      error: errors.homeNumber,
      required: false,
    },
  ];

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, [cartItems]);

  const validateForm = (e) => {
    e.preventDefault();

    // Perform validation checks
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "الرجاء إدخال الاسم الأول";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "الرجاء إدخال اسم العائلة";
    }
    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = "الرجاء إدخال عنوان الشارع";
    }
    if (!formData.city) {
      newErrors.city = "الرجاء تحديد المدينة";
    }
    if (!formData.district) {
      newErrors.district = "الرجاء تحديد المنظقة";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "الرجاء إدخال رقم الهاتف";
    } else if (!/^(01)\d{9}/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "الرجاء إدخال رقم الهاتف صحيح";
    }

    // Update errors state
    setErrors(newErrors);

    // If there are validation errors, prevent form submission
    if (Object.keys(newErrors).length === 0) {
      // Form is valid, submit the form
      navigate("/");
      dispatch(createOrder(formData));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeSelect = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeQty = (id, val, size) => {
    dispatch(addKeyToCart({ id, size, key: "qty", value: parseInt(val) }));
  };

  const handleRemove = (id, size) => {
    dispatch(removeFromCart({ id, size }));
  };

  return (
    <div className="bg-gray-50">
      <main className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <h1 className="sr-only">Checkout</h1>

          <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 mt-0">
            <div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 text-right">
                  بيانات الشحن
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-4">
                  {formFields.map((field, index) => (
                    <div
                      key={index}
                      className={
                        field.name === "streetAddress" ? "col-span-2" : ""
                      }
                    >
                      <label
                        htmlFor={field.name}
                        className="block text-right text-sm font-medium text-gray-700"
                      >
                        {field.required && (
                          <span className="text-red-500">* </span>
                        )}
                        {field.label}
                      </label>
                      {field.select ? (
                        <div className="mt-1">
                          <Select
                            id={field.name}
                            size="lg"
                            onChange={(val) =>
                              handleChangeSelect(field.name, val)
                            }
                            name={field.name}
                            value={formData[field.name]}
                            error={!!field.error}
                          >
                            {cities.map((city, i) => (
                              <Option
                                className="text-right font-semibold text-black"
                                key={i + 1}
                                value={city}
                              >
                                <span className="w-full text-right">
                                  {city}
                                </span>
                              </Option>
                            ))}
                          </Select>
                          {field.error && (
                            <Typography className="text-right font-semibold text-red-500">
                              {field.error}
                            </Typography>
                          )}
                        </div>
                      ) : (
                        <div className="mt-1">
                          <Input
                            type="text"
                            id={field.name}
                            size="lg"
                            placeholder={field.placeholder}
                            className="text-right"
                            labelProps={{
                              className:
                                "before:content-none after:content-none",
                            }}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            error={!!field.error}
                          />
                          {field.error && (
                            <Typography className="text-right font-semibold text-red-500">
                              {field.error}
                            </Typography>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Method
              <div className="mt-10 border-t border-gray-200 pt-10">
                <RadioGroup
                  value={selectedDeliveryMethod}
                  onChange={setSelectedDeliveryMethod}
                >
                  <RadioGroup.Label className="text-lg font-medium text-gray-900">
                    Delivery method
                  </RadioGroup.Label>

                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    {deliveryMethods.map((deliveryMethod) => (
                      <RadioGroup.Option
                        key={deliveryMethod.id}
                        value={deliveryMethod}
                        className={({ checked, active }) =>
                          classNames(
                            checked ? "border-transparent" : "border-gray-300",
                            active ? "ring-2 ring-indigo-500" : "",
                            "relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"
                          )
                        }
                      >
                        {({ checked, active }) => (
                          <>
                            <div className="flex-1 flex">
                              <div className="flex flex-col">
                                <RadioGroup.Label
                                  as="span"
                                  className="block text-sm font-medium text-gray-900"
                                >
                                  {deliveryMethod.title}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as="span"
                                  className="mt-1 flex items-center text-sm text-gray-500"
                                >
                                  {deliveryMethod.turnaround}
                                </RadioGroup.Description>
                                <RadioGroup.Description
                                  as="span"
                                  className="mt-6 text-sm font-medium text-gray-900"
                                >
                                  {deliveryMethod.price}
                                </RadioGroup.Description>
                              </div>
                            </div>
                            {checked ? (
                              <CheckCircleIcon
                                className="h-5 w-5 text-indigo-600"
                                aria-hidden="true"
                              />
                            ) : null}
                            <div
                              className={classNames(
                                active ? "border" : "border-2",
                                checked
                                  ? "border-indigo-500"
                                  : "border-transparent",
                                "absolute -inset-px rounded-lg pointer-events-none"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
                              </div> */}
            </div>

            {/* Order summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg text-right font-medium text-gray-900">
                ملخص الطلب
              </h2>

              <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <ul role="list" className="divide-y divide-gray-200">
                  {cartItems.map((product) => (
                    <li key={product.id} className="flex py-6 px-4 sm:px-6">
                      <div className="flex-shrink-0">
                        <Link to={`/products/${product.id}`}>
                          <img
                            src={require(`../images/${
                              product.images[product.color][0]
                            }`)}
                            alt="product image"
                            className="w-20 rounded-md"
                          />
                        </Link>
                      </div>

                      <div className="ml-6 flex-1 flex flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm">
                              <Link
                                to={`/products/${product.id}`}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {product.name}
                              </Link>
                            </h4>

                            <p className="mt-1 text-sm text-gray-500">
                              {product.size}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                              {product.color}
                            </p>
                          </div>

                          <div className="ml-4 flex-shrink-0 flow-root">
                            <button
                              type="button"
                              className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                              onClick={() =>
                                handleRemove(product.id, product.size)
                              }
                            >
                              <span className="sr-only">Remove</span>
                              <TrashIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="flex-1 pt-2 flex items-end justify-between">
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            £{(product.price - product.discount) * product.qty}{" "}
                            {product.price !==
                              product.price - product.discount && (
                              <span className="text-sm font-bold text-gray-900 line-through decoration-red-900 decoration-2 decoration-solid ms-4">
                                {product.price}
                              </span>
                            )}
                          </p>

                          <div className="ml-4">
                            <label htmlFor="quantity" className="sr-only">
                              الكمية
                            </label>
                            <div>
                              <Select
                                className="rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-mainColor sm:text-sm"
                                label="الكمية"
                                value={product.qty.toString()}
                                onChange={(val) => {
                                  handleChangeQty(
                                    product.id,
                                    val,
                                    product.size
                                  );
                                }}
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  (i) => (
                                    <Option
                                      key={i + 1}
                                      value={(i + 1).toString()}
                                    >
                                      {i + 1}
                                    </Option>
                                  )
                                )}
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                  <div className="flex flex-row-reverse items-center justify-between">
                    <dt className="text-sm">المجموع الفرعي</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      £{discountTotal}{" "}
                    </dd>
                  </div>
                  <div className="flex flex-row-reverse items-center justify-between">
                    <dt className="text-sm">شحن</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      £{shippingPrice}
                    </dd>
                  </div>

                  <div className="flex flex-row-reverse items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">المجموع الكلي</dt>
                    <dd className="text-base font-medium text-gray-900">
                      £{discountTotal + shippingPrice}{" "}
                      {total !== discountTotal && (
                        <span className="text-sm font-bold text-gray-900 line-through decoration-red-900 decoration-2 decoration-solid ms-4">
                          £{total + shippingPrice}
                        </span>
                      )}
                    </dd>
                  </div>

                  {/* Payment */}
                  <div className="mt-10 border-t border-gray-200 pt-10">
                    <h2 className="text-lg text-right font-medium text-gray-900">
                      طريقة الدفع
                    </h2>

                    <fieldset className="mt-4">
                      <legend className="sr-only">Payment type</legend>
                      <div className="grid grid-cols-3">
                        {paymentMethods.map(
                          (paymentMethod, paymentMethodIdx) => (
                            <div
                              key={paymentMethod.id}
                              className="flex items-center flex-row-reverse"
                            >
                              {paymentMethodIdx === 0 ? (
                                <input
                                  id={paymentMethod.id}
                                  name="payment-type"
                                  type="radio"
                                  defaultChecked
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 ms-2"
                                />
                              ) : (
                                <input
                                  id={paymentMethod.id}
                                  name="payment-type"
                                  type="radio"
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300  ms-2"
                                />
                              )}

                              <label
                                htmlFor={paymentMethod.id}
                                className="ml-3 block text-sm font-medium text-gray-700  ms-2"
                              >
                                {paymentMethod.title}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </fieldset>
                  </div>
                </dl>

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <button
                    type="submit"
                    className="w-full bg-mainColor border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-mainColor/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-mainColor"
                    onClick={validateForm}
                  >
                    طلب
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

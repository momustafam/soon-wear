import { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function PlaceOrderScreen() {
  const { cartItems } = useSelector((state) => state.cart);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    streetAddress: "",
    city: "",
    phoneNumber: "",
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
      label: "الأسم الاول",
      placeholder: "ادخل اسمك الاول",
      name: "firstName",
      error: errors.firstName,
      required: true,
    },
    {
      label: "اسم العائلة",
      placeholder: "ادخل اسم العائلة",
      name: "lastName",
      error: errors.lastName,
      required: true,
    },
    {
      label: "شركة",
      placeholder: "ادخل اسم الشركة",
      name: "company",
      error: errors.company,
      required: false,
    },
    {
      label: "عنوان الشارع",
      placeholder: "ادخل عنوانك",
      name: "streetAddress",
      error: errors.streetAddress,
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
      label: "رقم الهاتف",
      placeholder: "ادخل رقم الهاتف",
      name: "phoneNumber",
      error: errors.phoneNumber,
      required: true,
    },
  ];

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
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "الرجاء إدخال رقم الهاتف";
    } else if (!/^(01)\d{9}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "الرجاء إدخال رقم الهاتف صحيح";
    }

    // Update errors state
    setErrors(newErrors);

    // If there are validation errors, prevent form submission
    if (Object.keys(newErrors).length === 0) {
      // Form is valid, submit the form
      console.log("Form is valid, submitting...");
    }
  };

  const handleChange = (e) => {
    // if change is not from the select dropdown
    if (e.target) {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        city: e,
      }));
    }
  };
  return (
    <div className="grid grid-col-1 lg:grid-cols-2 gap-4 mx-6">
      {/* User Delivery information*/}
      <div>
        <div className="flex justify-center items-center">
          <Card color="transparent" shadow={false}>
            <Typography
              className="text-right font-bold"
              variant="h4"
              color="blue-gray"
            >
              عنوان الشحن
            </Typography>
            <hr className="my-2" />
            <form
              onSubmit={validateForm}
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            >
              <div className="mb-1 flex flex-col gap-6">
                {/* Map over the formFields array to render form fields */}
                {formFields.map((field, index) => (
                  <div key={index}>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="mb-2 text-right"
                    >
                      {field.required && (
                        <span className="text-red-900">* </span>
                      )}
                      {field.label}
                    </Typography>
                    {field.select ? (
                      <div>
                        <Select
                          size="lg"
                          onChange={handleChange}
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
                              <span className="w-full text-right">{city}</span>
                            </Option>
                          ))}
                        </Select>
                        {field.error && (
                          <Typography className="text-right font-bold text-red-900">
                            {field.error}
                          </Typography>
                        )}
                      </div>
                    ) : (
                      <div>
                        <Input
                          size="lg"
                          placeholder={field.placeholder}
                          className="text-right"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          error={!!field.error}
                        />
                        {field.error && (
                          <Typography className="text-right font-bold text-red-900">
                            {field.error}
                          </Typography>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Button
                className="bg-mainColor hover:bg-mainColor/90 mt-6"
                type="submit"
                fullWidth
              >
                طلب
              </Button>
            </form>
          </Card>
        </div>
      </div>

      {/* Order Summary Column*/}
      <div>
        <Typography
          className="text-right font-bold"
          variant="h4"
          color="blue-gray"
        >
          ملخص الطلب{" "}
        </Typography>
        <hr className="my-2" />

        {/* Order Items */}
        <div className="flex flex-col border">
          {cartItems &&
            cartItems.map((item) => (
              <div key={item.id} className="grid grid-cols-3">
                <div className="h-30 w-24 lg:flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={require(`../images/products/product_${item.id}.jpg`)}
                    alt="Product"
                    className="h-full w-full object-fill object-center"
                  />
                </div>

                <div className="flex justify-center items-center underline font-semibold text-lg">
                  <Link to={`/products/${item.id}`}>{item.name} </Link>
                </div>
                <div className="flex justify-center items-center font-semibold text-lg">
                  {item.qty} X £{item.price} = £
                  {(item.qty * item.price).toFixed(2)}
                </div>
                <hr />
              </div>
            ))}
          {/* Order Summary*/}

          <div className="flex flex-row-reverse justify-between text-base font-medium text-gray-900">
            <span className="text-lg"> :مصاريف الشحن</span>
            <p className="font-bold">
              <span className="text-sm font-bold text-gray-900  ms-4">
                £{shippingPrice}
              </span>
            </p>
          </div>

          <div className="flex flex-row-reverse justify-between text-base font-medium text-gray-900">
            <span className="text-2xl font-bold">:الاجمالي</span>
            <p className="font-bold">
              <span className="text-sm font-bold text-gray-900  ms-4">
                £
                {parseFloat(
                  cartItems
                    .reduce(
                      (acc, item) => acc + item.qty * parseFloat(item.price),
                      0
                    )
                    .toFixed(2)
                ) + shippingPrice}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;

import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../slices/productDetailsSlice";
import { Button, ButtonGroup, Typography } from "@material-tailwind/react";

function ProductDetailsScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const [selectedSize, setSelectedSize] = useState(null);
  const [colorSelected, setColorSelected] = useState(null);
  const [countInStock, setCountInStock] = useState(0);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  return loading ? (
    <div className="flex justify-center items-center">
      <Spinner className="h-[250px] w-[250px] mt-[3rem]" />
    </div>
  ) : (
    <div className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row-reverse -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img
                className="w-full h-full object-cover"
                src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
                alt="Product Image"
              />
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-full px-2">
                <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                  أضف الى السلة
                </button>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 text-right">
              {product.name}
            </h2>

            <div className="mb-4 text-right">
              <span className="font-bold text-gray-700 dark:text-gray-300 text-right">
                وصف المنتج
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {product.description}
              </p>
            </div>

            <div className="flex flex-row-reverse mb-4">
              <div className="ms-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  السعر:{" "}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  £{product.price}
                </span>
              </div>
              {/* <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Availability:
                </span>
                <span className="text-gray-600 dark:text-gray-300">In Stock</span>
              </div> */}
            </div>

            <div className="mb-4 text-right">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                اختر المقاس:
              </span>
              <div className="flex flex-row-reverse items-center mt-2">
                <ButtonGroup variant="outlined" color="black" size="sm">
                  {product &&
                    product.stocks &&
                    Object.keys(product.stocks).map((size) => (
                      <Button
                        className={
                          selectedSize === size
                            ? "text-white bg-mainColor py-2 px-4 rounded-full font-bold mr-2 hover:bg-mainColor/90"
                            : "text-black  py-2 px-4 rounded-full font-bold mr-2 hover:bg-mainColor hover:text-white "
                        }
                        key={size}
                        onClick={() => {
                          setSelectedSize(size);
                        }}
                      >
                        {size}
                      </Button>
                    ))}
                </ButtonGroup>
              </div>
            </div>
            {selectedSize && (
              <div className="mb-4 text-right">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  اختر اللون:
                </span>
                {/* <div className="flex flex-row-reverse items-center mt-2">
                <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
              </div> */}
                <div className="flex flex-row-reverse items-center mt-2">
                  <ButtonGroup variant="outlined" color="black" size="sm">
                    {product.stocks[selectedSize].map((color) =>
                      color.quantity > 0 ? (
                        <Button
                          className={
                            colorSelected === color.color_name
                              ? "text-white bg-mainColor py-2 px-4 rounded-full font-bold mr-2 hover:bg-mainColor/90"
                              : "text-black  py-2 px-4 rounded-full font-bold mr-2 hover:bg-mainColor hover:text-white "
                          }
                          key={color.color_name}
                          onClick={() => {
                            setColorSelected(color.color_name);
                            setCountInStock(color.quantity);
                          }}
                        >
                          {color.color_name}
                        </Button>
                      ) : (
                        <Button
                          className="text-black line-through decoration-red-900 decoration-2 decoration-solid  py-2 px-4 rounded-full font-bold mr-2"
                          disabled
                          key={color.color_name}
                        >
                          {color.color_name}
                        </Button>
                      )
                    )}
                  </ButtonGroup>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsScreen;

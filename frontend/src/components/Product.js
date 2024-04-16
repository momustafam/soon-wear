import { Button, ButtonGroup, Typography } from "@material-tailwind/react";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Rating, Stack } from "@mui/material";
import Alert from "./AlertError";

function Product({ product, toggleShoppingCartVisibility }) {
  const dispatch = useDispatch();

  const [countInStock, setCountInStock] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [colorSelected, setColorSelected] = useState(null);
  const [changeSize, setChangeSize] = useState(false);

  const [noColorSelected, setNoColorSelected] = useState(false);
  const [noSizeSelected, setNoSizeSelected] = useState(false);

  const handleAddToCart = () => {
    if (selectedSize && colorSelected) {
      toggleShoppingCartVisibility();
      dispatch(
        addToCart({
          product,
          size: selectedSize,
          color: colorSelected,
          countInStock,
        })
      );
      setNoColorSelected(false);
      setNoSizeSelected(false);
    }
    if (!selectedSize) setNoSizeSelected(true);
    if (!colorSelected) setNoColorSelected(true);
  };

  return (
    product && (
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link to={`/products/${product.id}`} className="m-auto">
          <img
            className="h-[35rem] w-full object-cover p-4 pb-1 rounded-2xl"
            src={(() => {
              try {
                // Attempt to load the image dynamically
                if (changeSize) {
                  return require(`../images/${product.main_img}`);
                } else if (colorSelected) {
                  return require(`../images/${product.images[colorSelected][0]}`);
                } else {
                  return require(`../images/${product.main_img}`);
                }
              } catch (error) {
                // Return a placeholder image or handle the error case
                return ""; // return empty image
              }
            })()}
            alt="Product"
          />
        </Link>

        <div className="px-5 pb-5">
          <div className="flex items-center gap-2 mt-2 mb-2 font-bold">
            <Stack spacing={1}>
              <Rating
                name="half-rating"
                defaultValue={parseFloat(product.rating)}
                precision={0.5}
                readOnly
              />
            </Stack>
            <Typography
              color="blue-gray"
              className="text-sm font-semibold text-blue-gray-500"
            >
              ({product.reviews_count})
            </Typography>
            <Link to={`/products/${product.id}`} className="ml-auto">
              <h5 className="text-l font-semibold tracking-tight text-gray-900 dark:text-white">
                {product.name}
              </h5>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {selectedSize && (
              <div className="ml-auto">
                <ButtonGroup
                  className="flex flex-wrap"
                  variant="outlined"
                  color="black"
                  size="sm"
                >
                  {product.stocks[selectedSize].map((color) =>
                    color.quantity > 0 ? (
                      <Button
                        className={
                          colorSelected === color.color_name
                            ? "text-white bg-mainColor"
                            : "text-black bg-white"
                        }
                        key={color.color_name}
                        onClick={() => {
                          setColorSelected(color.color_name);
                          setCountInStock(color.quantity);
                          setChangeSize(false);
                        }}
                      >
                        {color.color_name}
                      </Button>
                    ) : (
                      <Button
                        className="text-black line-through decoration-red-900 decoration-2 decoration-solid"
                        disabled
                        key={color.color_name}
                      >
                        {color.color_name}
                      </Button>
                    )
                  )}
                </ButtonGroup>
              </div>
            )}

            <div className="ml-auto">
              <ButtonGroup
                className="flex flex-wrap-reverse"
                variant="outlined"
                color="black"
                size="sm"
              >
                {Object.keys(product.stocks).map((size) => (
                  <Button
                    className={
                      selectedSize === size
                        ? "text-white bg-mainColor"
                        : "text-black bg-white"
                    }
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setChangeSize(true);
                      setColorSelected(null);
                    }}
                  >
                    {size}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
          </div>

          <div className="my-3">
            {noSizeSelected && !selectedSize && (
              <Alert
                className="flex flex-row-reverse mt-5 bg-red-700 ms-auto font-bold"
                color="red"
                message="الرجاء اختيار مقاس"
              />
            )}
          </div>
          <div className="my-3">
            {noColorSelected && !colorSelected && (
              <Alert
                className="flex flex-row-reverse mt-5 bg-red-700 ms-auto font-bold"
                color="red"
                message="الرجاء اختيار اللون"
              />
            )}
          </div>
          <div className="flex items-center justify-between">
            {product.discount > 0 ? (
              <span className="text-2xl font-bold text-gray-90">
                £{product.price - product.discount}
                <span className="text-sm font-bold text-gray-900 line-through decoration-red-900 decoration-2 decoration-solid ms-3">
                  £{product.price}
                </span>
              </span>
            ) : (
              <span className="text-2xl font-semibold text-gray-90">
                £{product.price}
              </span>
            )}
            <button
              className="text-white font-bold bg-mainColor focus:outline-none focus:bg-mainColor  rounded-lg text-l px-3 py-3 text-center"
              onClick={() => {
                handleAddToCart();
                setSelectedSize(null);
                setColorSelected(null);
                setChangeSize(false);
              }}
            >
              اضف الى السلة
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default Product;

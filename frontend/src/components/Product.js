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

  const getImageSource = () => {
    try {
      if (changeSize) {
        return require(`../images/${product.main_img}`);
      } else if (colorSelected && product.images[colorSelected]) {
        const imagesExist = product.images[colorSelected].length > 0;
        if (imagesExist)
          return require(`../images/${product.images[colorSelected][0]}`); // if there an image for the color
        else return require(`../images/${product.main_img}`); // if there is no image for the color show main image
      } else {
        return require(`../images/${product.main_img}`);
      }
    } catch (error) {
      // Handle error case (e.g., log the error or return a placeholder image)
      console.error("Error loading image:", error);
      return ""; // Return an empty image source or a placeholder
    }
  };

  return (
    product && (
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link to={`/products/${product.id}`} className="m-auto">
          <img
            className="h-[35rem] w-full object-cover p-4 pb-1 rounded-2xl"
            src={getImageSource()}
            alt="Product"
          />
        </Link>

        <div className="px-5 pb-5">
          <div className="flex items-center gap-2 mt-2 mb-2 font-bold">
            {/* <Stack spacing={1}>
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
            </Typography> */}
            <Link to={`/products/${product.id}`} className="ml-auto">
              <h5 className="text-l font-semibold tracking-tight text-gray-900 dark:text-white">
                {product.name}
              </h5>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="ml-auto">
              <ButtonGroup
                className="flex justify-end flex-wrap"
                variant="outlined"
                color="black"
                size="sm"
              >
                {Object.keys(product.stocks).map((size) => (
                  <Button
                    className={
                      selectedSize === size
                        ? "text-white bg-mainColor hover:bg-mainColor/90"
                        : "text-black bg-white hover:bg-white/5"
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
          {selectedSize && (
            <div className="ml-auto mt-1">
              <ButtonGroup
                className="flex justify-end flex-wrap"
                variant="outlined"
                color="black"
                size="sm"
              >
                {product.stocks[selectedSize].map((color) =>
                  color.quantity > 0 ? (
                    <Button
                      className={
                        colorSelected === color.color_name
                          ? "text-white bg-mainColor hover:bg-mainColor/90"
                          : "text-black bg-white hover:bg-white/5"
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
          <div className="my-3">
            {((noSizeSelected && !selectedSize) ||
              (noColorSelected && !colorSelected)) && (
              <Alert
                className="flex flex-row-reverse mt-5 bg-red-700 ms-auto font-bold"
                color="red"
                message="يجب اختيار اللون و المقاس"
              />
            )}
          </div>
          <div className="flex flex-wrap gap-3 items-center justify-between">
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
              className="bg-mainColor text-white py-2 px-4 rounded-full font-bold hover:bg-mainColor/90 active:bg-mainColor/80"
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

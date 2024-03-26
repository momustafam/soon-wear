import { Button, ButtonGroup, Typography } from "@material-tailwind/react";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Rating, Stack } from "@mui/material";
import Alert from "./AlertError";

function Product({ product, toggleShoppingCartVisibility }) {
  const dispatch = useDispatch();

  const [size, setSize] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [noSizeSelected, setNoSizeSelected] = useState(false);

  const handleAddToCart = () => {
    if (size === "") {
      setNoSizeSelected(true);
    } else {
      toggleShoppingCartVisibility();
      dispatch(addToCart({ product, size, countInStock }));
      setSize("");
      setNoSizeSelected(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {product.images.length > 0 && (
        <Link to="#" className="m-auto">
          <img
            className="h-[35rem] w-full object-cover p-4 pb-1 rounded-2xl"
            src={require(`../images${product.images[0]}`)}
            alt="Product"
          />
        </Link>
      )}

      <div className="px-5 pb-5">
        <Link to="#">
          <h5 className="text-l text-right font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h5>
        </Link>
        <div className="flex w-max gap-4 mt-2 ms-auto">
          <ButtonGroup variant="outlined" color="black" size="sm">
            {product.sizes.map((size) =>
              size.quantity > 0 ? (
                <Button
                  className={
                    selectedSize === size.name
                      ? "text-white bg-mainColor"
                      : "text-black"
                  }
                  key={size.name}
                  onClick={() => {
                    setSize(size.name);
                    setCountInStock(size.quantity);
                    setSelectedSize(size.name);
                  }}
                >
                  {size.name}
                </Button>
              ) : (
                <Button
                  className="text-black line-through decoration-red-900 decoration-2 decoration-solid"
                  disabled
                  key={size.name}
                >
                  {size.name}
                </Button>
              )
            )}
          </ButtonGroup>
        </div>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center gap-2 font-bold text-blue-gray-500">
            <Stack spacing={1}>
              <Rating
                name="half-rating"
                defaultValue={product.rating}
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
          </div>
        </div>
        <div className="my-3">
          {noSizeSelected && (
            <Alert
              className="flex flex-row-reverse mt-5 bg-red-700 ms-auto font-bold"
              color=""
              message="الرجاء اختيار مقاس"
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
              setSelectedSize("");
            }}
          >
            اضف الى السلة
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;

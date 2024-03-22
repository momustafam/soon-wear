import {
  Button,
  ButtonGroup,
  Typography,
} from "@material-tailwind/react";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { createRoot } from "react-dom/client";
import store from "../store";
import { Provider } from "react-redux";
import ShoppingCart from "./ShoppingCart";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';


function Product({ product }) {
  const dispatch = useDispatch();

  const [size, setSize] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleAddToCart = () => {
    if (size === "") {
      window.alert("الرجاء اختيار مقاس");
    } else {
      const header = document.getElementById("page-header");
      const container = document.createElement("div");
      // Wrap the ShoppingCart component with a Provider component
      createRoot(container).render(
        <Provider store={store}>
          <ShoppingCart />
        </Provider>
      );
      header.appendChild(container);
      dispatch(addToCart({ product, size, countInStock }));
      setSize("");
    }
  };
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link href="#">
        <img
          className="p-8 h-[30rem] w-[30rem] object-fill rounded-t-lg"
          src={require(`../images/products/product_${product.id}.jpg`)}
          alt="Product"
        />
      </Link>
      <div className="px-5 pb-5">
        <Link href="#">
          <h5 className="text-xl text-right font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h5>
        </Link>
        <div className="flex w-max flex-col gap-4 mt-2 ms-auto">
          <ButtonGroup variant="outlined" color="black" size="sm">
            {Object.entries(product.quantity).map(([size, count]) =>
              count > 0 ? (
                <Button
                  className={selectedSize === size ? 'text-white bg-mainColor' : 'text-black'}
                  key={size}
                  onClick={() => {
                    setSize(size);
                    setCountInStock(count);
                    setSelectedSize(size);
                  }}
                >
                  {size}
                </Button>
              ) : (
                <Button
                  className="text-black line-through decoration-red-900 decoration-2 decoration-solid"
                  disabled
                  key={size}
                >
                  {size}
                </Button>
              )
            )}
          </ButtonGroup>
        </div>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center gap-2 font-bold text-blue-gray-500">
            <Stack spacing={1}>
              <Rating name="half-rating" defaultValue={product.rating} precision={0.5} readOnly />
            </Stack>
            <Typography
              color="blue-gray"
              className="font-bold text-blue-gray-500"
            >
              {product.reviews_count} Reviews
            </Typography>
          </div>
        </div>
        <div className="flex items-center justify-between">
          {product.discount > 0 ? (
            <span className="text-3xl font-bold text-gray-90">
              £{product.price - product.discount}
              <span className="text-lg font-bold text-gray-900 line-through decoration-red-900 decoration-2 decoration-solid ms-4">
                £{product.price}
              </span>
            </span>
          ) : (
            <span className="text-3xl font-bold text-gray-90">
              £{product.price}
            </span>
          )}
          <button
            className="text-white font-bold bg-mainColor focus:outline-none focus:bg-mainColor  rounded-lg text-lg px-6 py-4 text-center"
            onClick={() => {
              handleAddToCart();
              setSelectedSize('');
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

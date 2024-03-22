import {
  Rating,
  Button,
  ButtonGroup,
  Typography,
} from "@material-tailwind/react";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

function Product({ product }) {
  const dispatch = useDispatch();

  const [size, setSize] = useState("");
  const [countInStock, setCountInStock] = useState(0);

  const handleAddToCart = () => {
    if (size === "") {
      window.alert("الرجاء اختيار مقاس");
    } else {
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
                  className="text-black"
                  key={size}
                  onClick={() => {
                    setSize(size);
                    setCountInStock(count);
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
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
              {product.rating}
            </span>
            <Rating value={Math.floor(product.rating)} readonly />
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
            className="text-white font-bold bg-mainColor hover:bg-mainColor/50  focus:outline-none focus:bg-mainColor  rounded-lg text-lg px-6 py-4 text-center"
            onClick={handleAddToCart}
          >
            اضف الى السلة
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;

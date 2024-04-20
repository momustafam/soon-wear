import { useCallback, useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../slices/productDetailsSlice";
import { Button, ButtonGroup, Typography } from "@material-tailwind/react";
import { Rating, Stack } from "@mui/material";
import { addToCart } from "../slices/cartSlice";
import Alert from "../components/AlertError";
import DisplayProducts from "../components/DisplayProducts";
import { getCategory, getProductByCategory } from "../slices/categorySlice";

function ProductDetailsScreen({ toggleShoppingCartVisibility }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading } = useSelector((state) => state.productDetails);
  const { category, categoryProducts } = useSelector((state) => state.category);

  const [countInStock, setCountInStock] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [prevSelectedSize, setPrevSelectedSize] = useState(null);

  const [colorSelected, setColorSelected] = useState(null);
  const [changeSize, setChangeSize] = useState(false);

  const [noColorSelected, setNoColorSelected] = useState(false);
  const [noSizeSelected, setNoSizeSelected] = useState(false);

  const [mainImage, setMainImage] = useState(product.main_img);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product.category_id) {
      dispatch(getCategory(product.category_id));
    }
  }, [dispatch, product]);

  useEffect(() => {
    if (category !== "")
      dispatch(
        getProductByCategory({
          category_id: category,
          feature: null,
          name: null,
        })
      );
  }, [dispatch, category]);

  useEffect(() => {
    // Check if selectedSize has changed
    if (selectedSize !== prevSelectedSize) {
      setPrevSelectedSize(selectedSize); // Update prevSelectedSize
    }
  }, [selectedSize, prevSelectedSize]);

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

  const handleMainImage = useCallback(() => {
    let src = "";
    if (Object.keys(product).length !== 0) {
      if (changeSize || selectedSize !== prevSelectedSize) {
        src = require(`../images/${product.main_img}`);
      } else if (colorSelected && product.images[colorSelected]) {
        const imagesExist = product.images[colorSelected].length > 0;
        if (imagesExist)
          src = require(`../images/${product.images[colorSelected][0]}`); // if there an image for the color
        else src = require(`../images/${product.main_img}`); // if there is no image for the color show main image
      } else {
        src = require(`../images/${product.main_img}`);
      }
    }
    setMainImage(src);
  }, [product, changeSize, selectedSize, prevSelectedSize, colorSelected]);

  useEffect(() => {
    handleMainImage();
  }, [handleMainImage]);

  return loading ? (
    <div className="flex justify-center items-center">
      <Spinner className="h-[250px] w-[250px] mt-[3rem]" />
    </div>
  ) : (
    <div className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row-reverse -mx-4">
          <div className="md:flex-1 px-4">
            <div className="rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              {/* Main Product Image */}
              <img
                className="w-full h-full object-fill rounded-lg"
                src={mainImage}
                alt="main"
              />

              {/* Additional Images */}
              <div className="flex mt-2 overflow-x-auto">
                {/* Map and render additional images */}
                {Object.keys(product).length !== 0 &&
                  product.images &&
                  product.images[colorSelected] &&
                  product.images[colorSelected].map((image, index) => (
                    <img
                      key={index}
                      className="w-20 h-20 object-cover rounded-lg mr-2"
                      src={require(`../images/${image}`)}
                      alt={`${product.name} - ${index}`}
                      onClick={() =>
                        setMainImage(require(`../images/${image}`))
                      }
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-5 text-right">
              {product.name}
            </h2>

            <div className="flex justify-end items-center gap-2 mt-2 mb-2 font-bold">
              <Stack spacing={1}>
                <Rating
                  name="controlled-rating"
                  value={parseFloat(product.rating)}
                  precision={0.5}
                  readOnly
                />
              </Stack>
              <Typography
                color="blue-gray"
                className="text-lg font-semibold text-blue-gray-500"
              >
                ({product.reviews_count})
              </Typography>
            </div>

            <div className="flex flex-row-reverse mb-4 mt-10">
              <div className="ms-4">
                <span className="font-bold text-2xl text-gray-700 dark:text-gray-300">
                  السعر:{" "}
                </span>
                <span className="text-2xl text-gray-600 dark:text-gray-300">
                  £{product.price}
                </span>
              </div>
            </div>

            <div className="mb-4 mt-10 text-right">
              <span className="font-bold text-2xl text-gray-700 dark:text-gray-300 text-right">
                وصف المنتج
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {product.description}
              </p>
            </div>

            <div className="mb-4 mt-10 text-right">
              <span className="font-bold text-2xl text-gray-700 dark:text-gray-300">
                اختر المقاس:
              </span>
              <div className="flex flex-row-reverse items-center mt-2">
                {product && product.stocks && (
                  <ButtonGroup variant="outlined" color="black" size="lg">
                    {Object.keys(product.stocks).map((size) => (
                      <Button
                        className={
                          selectedSize === size
                            ? "text-white bg-mainColor py-2 px-4 rounded-full font-bold mr-2 hover:bg-mainColor/90"
                            : "text-black  py-2 px-4 rounded-full font-bold mr-2 hover:bg-mainColor hover:text-white "
                        }
                        key={size}
                        onClick={() => {
                          setSelectedSize(size);
                          setColorSelected(null);
                        }}
                      >
                        {size}
                      </Button>
                    ))}
                  </ButtonGroup>
                )}
              </div>
            </div>
            {selectedSize && (
              <div className="mb-4 mt-5 text-right">
                <span className="font-bold text-2xl text-gray-700 dark:text-gray-300">
                  اختر اللون:
                </span>
                {/* <div className="flex flex-row-reverse items-center mt-2">
                <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
              </div> */}
                <div className="flex flex-row-reverse items-center mt-2">
                  <ButtonGroup variant="outlined" color="black" size="lg">
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
            <div className="flex -mx-2 mb-4">
              <div className="w-full px-2 mt-10">
                <button
                  className="w-full text-2xl bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                  onClick={() => {
                    handleAddToCart();
                    setSelectedSize(null);
                    setColorSelected(null);
                    setChangeSize(false);
                  }}
                >
                  أضف الى السلة
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <DisplayProducts
            product={product}
            toggleShoppingCartVisibility={toggleShoppingCartVisibility}
            header={categoryProducts.length > 1 && "المنتجات المشابهة"}
            products={categoryProducts}
            link={`/products?category=${category}`}
            key={category}
            seeMore={false}
            next={categoryProducts.length > 1}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsScreen;

import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import CategoryScreen from "./screens/CategoryScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ShoppingCart from "./components/ShoppingCart";
import { useState } from "react";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";

function App() {
  const [isShoppingCartVisible, setShoppingCartVisible] = useState(false);

  const toggleShoppingCartVisibility = () => {
    setShoppingCartVisible((prevVisible) => !prevVisible);
  };
  return (
    <Router>
      <Header toggleShoppingCartVisibility={toggleShoppingCartVisibility} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomeScreen
                toggleShoppingCartVisibility={toggleShoppingCartVisibility}
              />
            }
            exact
          />
          <Route
            path="/products"
            element={
              <CategoryScreen
                toggleShoppingCartVisibility={toggleShoppingCartVisibility}
              />
            }
          />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/products/:id" element={<ProductDetailsScreen />} />
        </Routes>
      </main>
      <Footer />
      {isShoppingCartVisible && (
        <ShoppingCart
          toggleShoppingCartVisibility={toggleShoppingCartVisibility}
        />
      )}
    </Router>
  );
}

export default App;

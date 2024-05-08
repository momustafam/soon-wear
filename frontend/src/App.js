import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Footer, ShoppingCart, ScrollToTop } from "./components";
import {
  HomeScreen,
  CategoryScreen,
  PlaceOrderScreen,
  ProductDetailsScreen,
} from "./screens";

function App() {
  const [isShoppingCartVisible, setShoppingCartVisible] = useState(false);

  const toggleShoppingCartVisibility = () => {
    setShoppingCartVisible((prevVisible) => !prevVisible);
  };
  return (
    <Router>
      <ScrollToTop />
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
          <Route
            path="/products/:id"
            element={
              <ProductDetailsScreen
                toggleShoppingCartVisibility={toggleShoppingCartVisibility}
              />
            }
          />
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

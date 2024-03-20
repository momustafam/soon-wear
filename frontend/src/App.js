import Footer from "./components/Footer";
import Header from "./components/Header";
import Product from "./components/Product";
import ProductCarousel from "./components/ProductCarousel";
import ShoppingCart from "./components/ShoppingCart";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} exact />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

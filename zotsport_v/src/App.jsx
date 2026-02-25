import "./assets/css/main.css";
import "./assets/css/animations.css";
import "./assets/css/fonts.css";
import { Outlet } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <CartProvider>
      <Header />
      <div className="content-wrapper">
        <Outlet />
      </div>
      <Footer />
    </CartProvider>
  );
}

export default App;

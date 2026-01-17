import { Link } from "react-router-dom";
import { useContext } from "react";
import logo from "../assets/images/logo.png";
import cart_icon from "../assets/images/cart-icon.png";
import { CartContext } from "../context/CartContext";

function Header() {
  const { cart } = useContext(CartContext);
  const cartCount = Object.keys(cart).length;

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="ЗотСпорт" />
        </Link>
      </div>

      <nav className="top">
        <ul>
          <li>
            <Link to="/catalog/food" className="top_ref">
              Спортивное питание
            </Link>
          </li>
          <li>
            <Link to="/catalog/balls" className="top_ref">
              Футбольные мячи
            </Link>
          </li>
          <li>
            <Link to="#" className="top_ref">
              Одежда и обувь
            </Link>
            <ul className="drop">
              <li>
                <Link to="/catalog/boots" className="top_ref">
                  Бутсы
                </Link>
              </li>
              <li>
                <Link to="/catalog/shirts" className="top_ref">
                  Футболки
                </Link>
              </li>
              <li>
                <Link to="/catalog/shorts" className="top_ref">
                  Шорты
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <div className="cart-icon">
        <Link to="/cart">
          <img src={cart_icon} alt="Корзина" className="cart-img" /> (
          {cartCount})
        </Link>
      </div>
    </header>
  );
}

export default Header;

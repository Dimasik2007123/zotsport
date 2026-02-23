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
      <div className="header__logo">
        <Link to="/">
          <img className="header__logo-image" src={logo} alt="ЗотСпорт" />
        </Link>
      </div>

      <nav className="header__nav">
        <ul className="header__menu">
          <li className="header__menu-item">
            <Link to="/catalog/food" className="header__menu-link">
              Спортивное питание
            </Link>
          </li>
          <li className="header__menu-item">
            <Link to="/catalog/balls" className="header__menu-link">
              Футбольные мячи
            </Link>
          </li>
          <li className="header__menu-item">
            <Link to="#" className="header__menu-link">
              Одежда и обувь
            </Link>
            <ul className="header__submenu">
              <li className="header__submenu-item">
                <Link to="/catalog/boots" className="header__submenu-link">
                  Бутсы
                </Link>
              </li>
              <li className="header__submenu-item">
                <Link to="/catalog/shirts" className="header__submenu-link">
                  Футболки
                </Link>
              </li>
              <li className="header__submenu-item">
                <Link to="/catalog/shorts" className="header__submenu-link">
                  Шорты
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <div className="header__cart-icon">
        <Link to="/cart" className="header__cart-link">
          <img src={cart_icon} alt="Корзина" className="header__cart-img" /> (
          {cartCount})
        </Link>
      </div>
    </header>
  );
}

export default Header;

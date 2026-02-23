import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__links">
          <Link to="/" className="footer__link">
            О магазине
          </Link>
          <Link to="/contacts" className="footer__link">
            Контакты
          </Link>
          <Link to="/delivery" className="footer__link">
            Доставка и оплата
          </Link>
          <Link to="/admin_enter" className="footer__link">
            Вход для администратора
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

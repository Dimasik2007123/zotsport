import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer_container">
        <div className="footer_links">
          <Link to="/" className="footer_link">
            О магазине
          </Link>
          <Link to="/contacts" className="footer_link">
            Контакты
          </Link>
          <Link to="/delivery" className="footer_link">
            Доставка и оплата
          </Link>
          <Link to="/admin_enter" className="footer_link">
            Вход для администратора
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

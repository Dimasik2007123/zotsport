import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AdminChoice() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "ЗотСпорт. Панель администратора";
  });

  useEffect(() => {
    if (localStorage.getItem("adm") !== "1") {
      navigate("/admin_enter");
    }
  }, [navigate]);

  return (
    <main className="content">
      <h1 className="content__title">Панель администратора</h1>
      <div className="admin-menu">
        <Link className="admin-menu__link" to="/admin_add">
          Добавить товар
        </Link>
        <Link className="admin-menu__link" to="/admin_red">
          Редактировать товар
        </Link>
        <Link className="admin-menu__link" to="/admin_del">
          Удалить товар
        </Link>
        <Link className="admin-menu__link" to="/admin_out">
          Выход
        </Link>
      </div>
    </main>
  );
}

export default AdminChoice;

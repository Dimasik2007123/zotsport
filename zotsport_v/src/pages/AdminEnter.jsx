import { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function AdminEnter() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useContext(CartContext);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "ЗотСпорт. Вход администратора";
  });

  useEffect(() => {
    const isAdmin = localStorage.getItem("adm") === "1";

    if (isAdmin) {
      navigate("/admin_choice", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const response = await fetch("/backend/admin_enter.php", {
      method: "POST",
      body: formData,
    });

    const ans = await response.json();
    if (ans.success) {
      logIn();
      navigate("/admin_choice");
    } else {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <main className="content">
      <div className="admin_block">
        <h1 style={{ textAlign: "center" }}>Вход администратора</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form className="admin_form" onSubmit={handleSubmit}>
          <fieldset>
            <p>
              <label htmlFor="login">Логин </label>
              <input
                type="text"
                id="login"
                placeholder="Логин"
                name="login"
                required
                value={login}
                onChange={(event) => setLogin(event.target.value)}
              />
            </p>

            <p>
              <label htmlFor="password">Пароль </label>
              <input
                type="password"
                id="pass"
                placeholder="Пароль"
                name="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </p>
          </fieldset>
          <input type="submit" className="btn admin_btn" value="Войти!" />
        </form>
      </div>
    </main>
  );
}

export default AdminEnter;

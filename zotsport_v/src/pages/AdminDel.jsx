import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDel() {
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "ЗотСпорт. Удаление товара";
  });

  useEffect(() => {
    if (localStorage.getItem("adm") !== "1") {
      navigate("/admin_enter");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const response = await fetch("/backend/del.php", {
      method: "POST",
      body: formData,
    });

    const ans = await response.json();
    if (ans.success) {
      setMessage("Товар удален");
      event.target.reset();
    } else {
      setMessage("Ошибка при удалении товара");
    }
  };

  return (
    <main className="content">
      <h1 style={{ textAlign: "center" }}>Удаление товара</h1>
      {message && <p>{message}</p>}

      <form
        className="order-form"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <fieldset>
          <legend>Данные товара</legend>
          <p>
            <label htmlFor="category">Категория товара </label>
            <select name="category" id="cat" required>
              <option value="Спортивное питание">Спортивное питание</option>
              <option value="Мячи">Мячи</option>
              <option value="Бутсы">Бутсы</option>
              <option value="Футболки">Футболки</option>
              <option value="Шорты">Шорты</option>
            </select>
          </p>

          <p>
            <label htmlFor="name">Название товара </label>
            <input
              type="text"
              id="name"
              placeholder="Название"
              name="name"
              required
            />
          </p>
        </fieldset>
        <br />
        <input type="submit" className="btn" value="Удалить товар" />
      </form>
    </main>
  );
}

export default AdminDel;

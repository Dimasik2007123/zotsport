import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminAdd() {
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "ЗотСпорт. Добавление товара";
  });

  useEffect(() => {
    if (localStorage.getItem("adm") !== "1") {
      navigate("/admin_enter");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const response = await fetch("/backend/add.php", {
      method: "POST",
      body: formData,
    });

    const ans = await response.json();
    if (ans.success) {
      setMessage("Товар успешно добавлен");
      event.target.reset();
    } else {
      setMessage("Ошибка при добавлении товара");
    }
  };

  return (
    <main className="content">
      <h1 style={{ textAlign: "center" }}>Добавление товара</h1>
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

          <p>
            <label htmlFor="old_price">Старая цена </label>
            <input
              type="number"
              id="old_price"
              placeholder="Старая цена"
              name="old_price"
              required
            />
          </p>

          <p>
            <label htmlFor="sale">Скидка (%) </label>
            <input
              type="number"
              id="sale"
              placeholder="Скидка"
              value={0}
              name="sale"
              min="0"
              max="100"
              required
            />
          </p>

          <p>
            <label htmlFor="image">Фото товара </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg, image/jpg"
              required
            />
          </p>

          <p>
            <label htmlFor="brand">Бренд (необязательно) </label>
            <input type="text" id="brand" placeholder="Бренд" name="brand" />
          </p>

          <p>
            <label htmlFor="av">Наличие </label>
            <input type="checkbox" id="av" name="av" defaultChecked />
          </p>
        </fieldset>
        <br />
        <input type="submit" className="btn" value="Добавить товар" />
      </form>
    </main>
  );
}

export default AdminAdd;

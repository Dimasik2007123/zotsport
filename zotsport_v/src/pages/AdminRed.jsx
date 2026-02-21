import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminRed() {
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "ЗотСпорт. Редактирование товаров";
  });

  useEffect(() => {
    if (localStorage.getItem("adm") !== "1") {
      navigate("/admin_enter");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const response = await fetch("/backend/red.php", {
      method: "POST",
      body: formData,
    });

    const ans = await response.json();
    if (ans.success) {
      setMessage("Данные о товаре успешно обновлены");
      event.target.reset();
    } else if (ans.message.includes("Ошибка")) {
      setMessage("Ошибка при обновлении данных");
    } else {
      setMessage("Товар не найден");
    }
  };

  return (
    <main className="content">
      <h1 style={{ textAlign: "center" }}>Редактирование товара</h1>
      {message && <p>{message}</p>}

      <div className="cart">
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
                defaultValue={0}
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
          <input type="submit" className="btn" value="Изменить товар" />
        </form>
      </div>
    </main>
  );
}

export default AdminRed;

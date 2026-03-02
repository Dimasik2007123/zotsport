import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminRed() {
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "ЗотСпорт. Редактирование товаров";
  }, []);

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
      <h1 className="content__title">Редактирование товара</h1>
      {message && <p>{message}</p>}
      <form
        className="form"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <fieldset className="form__section">
          <legend>Данные товара</legend>
          <div className="form__field">
            <label htmlFor="category">Категория товара </label>
            <select className="form__select" name="category" id="cat" required>
              <option value="Спортивное питание">Спортивное питание</option>
              <option value="Мячи">Мячи</option>
              <option value="Бутсы">Бутсы</option>
              <option value="Футболки">Футболки</option>
              <option value="Шорты">Шорты</option>
            </select>
          </div>

          <div className="form__field">
            <label htmlFor="name">Название товара </label>
            <input
              className="form__input"
              type="text"
              id="name"
              placeholder="Название"
              name="name"
              required
            />
          </div>

          <div className="form__field">
            <label htmlFor="old_price">Старая цена </label>
            <input
              className="form__input"
              type="number"
              id="old_price"
              placeholder="Старая цена"
              name="old_price"
              required
            />
          </div>

          <div className="form__field">
            <label htmlFor="sale">Скидка (%) </label>
            <input
              className="form__input"
              type="number"
              id="sale"
              placeholder="Скидка"
              defaultValue={0}
              name="sale"
              min="0"
              max="100"
              required
            />
          </div>

          <div className="form__field">
            <label htmlFor="image">Фото товара </label>
            <input
              className="form__input form__input--file"
              type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg, image/jpg"
              required
            />
          </div>

          <div className="form__field">
            <label htmlFor="brand">Бренд (необязательно) </label>
            <input
              className="form__input"
              type="text"
              id="brand"
              placeholder="Бренд"
              name="brand"
            />
          </div>

          <div className="form__field form__field--checkbox">
            <label htmlFor="av">Наличие </label>
            <input
              className="form__input form__input--checkbox"
              type="checkbox"
              id="av"
              name="av"
              defaultChecked
            />
          </div>
        </fieldset>
        <br />
        <input type="submit" className="form__btn" value="Изменить товар" />
      </form>
    </main>
  );
}

export default AdminRed;

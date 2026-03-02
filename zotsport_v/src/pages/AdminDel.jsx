import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function AdminDel() {
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const { deleteFromCart } = useContext(CartContext);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "ЗотСпорт. Удаление товара";
  }, []);

  useEffect(() => {
    fetch("/backend/start.php")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Ошибка загрузки товаров:", error));
  }, []);

  useEffect(() => {
    if (localStorage.getItem("adm") !== "1") {
      navigate("/admin_enter");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const productName = formData.get("name");
    const response = await fetch("/backend/del.php", {
      method: "POST",
      body: formData,
    });

    const ans = await response.json();
    if (ans.success) {
      setMessage("Товар удален");
      event.target.reset();
      const product = products.find((p) => p.name === productName);
      if (product) {
        deleteFromCart(product.id);
      }
    } else {
      setMessage("Ошибка при удалении товара");
    }
  };

  return (
    <main className="content">
      <h1 className="content__title">Удаление товара</h1>
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
        </fieldset>
        <br />
        <input type="submit" className="form__btn" value="Удалить товар" />
      </form>
    </main>
  );
}

export default AdminDel;

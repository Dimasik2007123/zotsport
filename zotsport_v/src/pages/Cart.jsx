import { useContext, useRef, useEffect, useState, useCallback } from "react";
import { useNavigate, useBeforeUnload } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, deleteFromCart, clearCart } = useContext(CartContext);
  const formRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState(() => localStorage.getItem("name") || "");
  const [surname, setSurname] = useState(
    () => localStorage.getItem("surname") || "",
  );
  const [city, setCity] = useState(() => localStorage.getItem("city") || "");
  const [phone, setPhone] = useState(() => localStorage.getItem("phone") || "");
  const [mail, setMail] = useState(() => localStorage.getItem("mail") || "");
  const [connect, setConnect] = useState(
    () => localStorage.getItem("connect") || "",
  );

  const navigate = useNavigate();

  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.classList.add("form__error--active");
    }
  };

  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (errorElement) {
      errorElement.classList.remove("form__error--active");
      errorElement.textContent = "";
    }
  };

  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  };

  const toggleButtonState = (buttonElement) => {
    if (!formRef.current) return;

    const inputList = Array.from(
      formRef.current.querySelectorAll(".form__input"),
    );
    const radioButtons = formRef.current.querySelectorAll(
      'input[name="connect"]',
    );
    const isRadioSelected = Array.from(radioButtons).some(
      (radio) => radio.checked,
    );

    const hasErrors =
      hasInvalidInput(inputList) || !isRadioSelected || products.length === 0;

    if (hasErrors) {
      buttonElement.style.opacity = 0.5;
      buttonElement.disabled = true;
    } else {
      buttonElement.style.opacity = 1;
      buttonElement.disabled = false;
    }
  };

  const validateForm = () => {
    if (!formRef.current) return false;

    const formElement = formRef.current;
    const inputList = Array.from(formElement.querySelectorAll(".form__input"));
    const radioButtons = formElement.querySelectorAll('input[name="connect"]');
    const isRadioSelected = Array.from(radioButtons).some(
      (radio) => radio.checked,
    );

    let isValid = true;

    inputList.forEach((inputElement) => {
      if (inputElement.required && !inputElement.validity.valid) {
        checkInputValidity(formElement, inputElement);
        isValid = false;
      }
    });

    if (!isRadioSelected || products.length === 0) {
      isValid = false;
    }

    return isValid;
  };

  useEffect(() => {
    if (!formRef.current) return;

    const formElement = formRef.current;
    const inputList = Array.from(formElement.querySelectorAll(".form__input"));
    const buttonElement = formElement.querySelector(".form__btn");

    toggleButtonState(buttonElement);

    inputList.forEach((inputElement) => {
      const handleInput = () => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(buttonElement);
      };

      const handleBlur = () => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(buttonElement);
      };

      inputElement.addEventListener("input", handleInput);
      inputElement.addEventListener("blur", handleBlur);
    });

    //toggleButtonState(buttonElement);

    return () => {
      inputList.forEach((inputElement) => {
        inputElement.removeEventListener("input", () => {});
        inputElement.removeEventListener("blur", () => {});
      });
    };
  }, [connect, products]);

  const handleConnectChange = (value) => {
    setConnect(value);

    const phoneInput = formRef.current?.querySelector("#phone");
    const emailInput = formRef.current?.querySelector("#email");

    if (phoneInput && emailInput) {
      if (value === "Телефон") {
        phoneInput.required = true;
        emailInput.required = false;
      } else if (value === "Почта") {
        phoneInput.required = false;
        emailInput.required = true;
      }

      const buttonElement = formRef.current.querySelector(".form__btn");
      if (buttonElement) toggleButtonState(buttonElement);
    }
  };

  useEffect(() => {
    fetch("/backend/start.php")
      .then((response) => response.json())
      .then((data) => {
        let st = 0;
        const cartProducts = Object.keys(cart)
          .map((key) => {
            const product = data.find((p) => p.id == key);
            if (product) {
              st += cart[key] * product.price;
              return { ...product, quantity: cart[key] };
            }
            return null;
          })
          .filter(Boolean);

        setProducts(cartProducts);
        setTotal(st);
      });
  }, [cart]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    window.localStorage.removeItem("name");
    window.localStorage.removeItem("surname");
    window.localStorage.removeItem("city");
    window.localStorage.removeItem("phone");
    window.localStorage.removeItem("mail");
    window.localStorage.removeItem("connect");

    const productText =
      products
        .map(
          (product) =>
            `Артикул ${product.id}\nНазвание ${product.name}\nЦена ${product.price}\nКоличество ${product.quantity}\n\n`,
        )
        .join("") + `Итого ${total} руб.`;

    const formData = new FormData(event.target);
    formData.append("product_list", productText);

    await fetch("/backend/send.php", {
      method: "POST",
      body: formData,
    });

    setIsSubmitting(false);

    clearCart();
    setIsSubmitted(true);

    setTimeout(() => navigate("/"), 4000);
  };

  useEffect(() => {
    localStorage.setItem("name", name);
    localStorage.setItem("surname", surname);
    localStorage.setItem("city", city);
    localStorage.setItem("phone", phone);
    localStorage.setItem("mail", mail);
    localStorage.setItem("connect", connect);
  }, [name, surname, city, phone, mail, connect]);

  useBeforeUnload(
    useCallback(() => {
      localStorage.setItem("name", name);
      localStorage.setItem("surname", surname);
      localStorage.setItem("city", city);
      localStorage.setItem("phone", phone);
      localStorage.setItem("mail", mail);
      localStorage.setItem("connect", connect);
    }, [name, surname, city, phone, mail, connect]),
  );

  useEffect(() => {
    document.title = "ЗотСпорт. Корзина";
  });

  if (isSubmitted) {
    return (
      <main className="content">
        <p>
          Спасибо за заказ! В ближайшее время с Вами свяжется менеждер для
          подтверждения заказа!
        </p>
      </main>
    );
  }

  return (
    <main className="content">
      <div className="cart">
        <table className="cart__table">
          <thead className="cart__header">
            <tr className="cart__header-row" width="100%">
              <th className="cart__header-cell" width="5%">
                Удалить
              </th>
              <th className="cart__header-cell" width="10%">
                Артикул
              </th>
              <th className="cart__header-cell" width="35%">
                Наименование
              </th>
              <th className="cart__header-cell" width="15%">
                Цена
              </th>
              <th className="cart__header-cell" width="10%">
                Количество
              </th>
              <th className="cart__header-cell" width="20%">
                Стоимость
              </th>
            </tr>
          </thead>

          {products.length === 0 ? (
            <tbody>
              <tr className="cart__row">
                <td className="cart__cell" colSpan="6">
                  Корзина пуста
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {products.map((product) => (
                <tr className="cart__row" key={product.id}>
                  <td className="cart__cell" width="5%">
                    <button
                      className="cart__delete-btn"
                      title="Удалить товар"
                      onClick={() => deleteFromCart(product.id)}
                    >
                      x
                    </button>
                  </td>
                  <td className="cart__cell" width="10%">
                    {product.id}
                  </td>
                  <td className="cart__cell" width="35%">
                    {product.name}
                  </td>
                  <td className="cart__cell" width="15%">
                    {product.price}
                  </td>
                  <td className="cart__cell" width="10%">
                    {product.quantity}
                  </td>
                  <td className="cart__cell" width="20%">
                    {product.price * product.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        <div className="cart__total">
          <p className="cart__total-text">Итого: {total} руб.</p>
        </div>
      </div>

      <form
        className="form"
        method="POST"
        onSubmit={handleSubmit}
        noValidate
        ref={formRef}
      >
        <fieldset className="form__section">
          <legend>Данные покупателя</legend>

          <div className="form__field">
            <label htmlFor="name">Имя </label>
            <input
              className="form__input"
              type="text"
              id="name"
              placeholder="Ваше имя"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="form__error" id="name-error"></span>
          </div>

          <div className="form__field">
            <label htmlFor="surname">Фамилия </label>
            <input
              className="form__input"
              type="text"
              id="surname"
              placeholder="Ваша фамилия"
              name="surname"
              required
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <span className="form__error" id="surname-error"></span>
          </div>

          <div className="form__field">
            <label htmlFor="city">Адрес доставки (город, улица, дом) </label>
            <input
              className="form__input"
              type="text"
              id="city"
              placeholder="Адрес"
              name="city"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <span className="form__error" id="city-error"></span>
          </div>

          <div className="form__field form__field--radio">
            <label htmlFor="connect">Способ связи</label>
            <br />
            <input
              className="form__input form__input--radio"
              type="radio"
              name="connect"
              id="p1"
              value="Телефон"
              checked={connect === "Телефон"}
              onChange={(e) => handleConnectChange(e.target.value)}
            />
            Телефон
            <br />
            <input
              className="form__input form__input--radio"
              type="radio"
              name="connect"
              id="p2"
              value="Почта"
              checked={connect === "Почта"}
              onChange={(e) => handleConnectChange(e.target.value)}
            />
            Электронная почта
            <br />
            <span className="form__error" id="connect-error"></span>
          </div>

          <div className="form__field">
            <label htmlFor="phone">Телефон </label>
            <input
              className="form__input"
              type="tel"
              id="phone"
              placeholder="Номер телефона"
              name="phone"
              value={phone}
              pattern="^\+?\d{5,15}$"
              onChange={(e) => setPhone(e.target.value)}
              required={connect === "Телефон"}
            />
            <span className="form__error" id="phone-error"></span>
          </div>

          <div className="form__field">
            <label htmlFor="email">Электронная почта </label>
            <input
              className="form__input"
              type="email"
              id="email"
              placeholder="Электронная почта"
              name="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              required={connect === "Почта"}
            />
            <span className="form__error" id="email-error"></span>
          </div>
        </fieldset>
        <br />

        <input
          type="submit"
          className={`form__btn ${isSubmitting ? "form__btn--loading" : ""}`}
          value={isSubmitting ? "Оформляем..." : "Оформить заказ!"}
          disabled={isSubmitting}
        />
      </form>
    </main>
  );
}

export default Cart;

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import sale1 from "../assets/images/sale1.png";
import sale2 from "../assets/images/sale2.png";

function Home() {
  const calculateAge = () => {
    const today = new Date();
    const bornDate = new Date(2022, 11, 25);

    let age = today.getFullYear() - bornDate.getFullYear();

    if (
      today.getMonth() < bornDate.getMonth() ||
      (today.getMonth() === bornDate.getMonth() &&
        today.getDate() < bornDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const [age] = useState(calculateAge());

  useEffect(() => {
    document.title = "ЗотСпорт. Главная";
  }, []);

  return (
    <main className="content">
      <div className="ad">
        <div id="ad_1">
          <Link to="/catalog/balls">
            <img src={sale1} alt="Реклама мячей" />
          </Link>
        </div>
        <div id="ad_2">
          <Link to="/catalog/boots">
            <img src={sale2} alt="Реклама бутсов" />
          </Link>
        </div>
      </div>
      <h3>О магазине</h3>
      <p>
        ЗотСпорт - магазин качественных товаров для тех, кто ведёт активный
        образ жизни. Мы работаем с 2022 года и продолжаем радовать наших
        покупателей на протяжении {age} лет. Ассортимент нашего магазина
        включает такие категории товаров: спортивное питание, футбольные мячи,
        одежда и обувь для занятий футболом.
      </p>
      <p>
        Все товары прошли необходимую сертификацию и проверены нашими
        экспертами.
      </p>
      <p>
        Чтобы приобрести необходимый товар в нашем магазине, добавьте его в
        корзину и сделайте заказ. Наши менеджеры свяжутся с вами в течение
        нескольких минут и подтвердят наличие товара.
      </p>
      <p>Удачных Вам покупок!</p>
    </main>
  );
}

export default Home;

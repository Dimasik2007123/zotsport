import { useEffect } from "react";

function Contacts() {
  useEffect(() => {
    document.title = "ЗотСпорт. Контакты";
  });

  return (
    <main className="content">
      <h3>Контакты</h3>
      <p>
        Телефон горячей линии: <i>+7 (800) 123-45-67</i> (звонок бесплатный по
        РФ)
      </p>
      <p>
        Московский отдел: <i>+7 (495) 347-31-93</i>
      </p>
      <h3>Вы также можете связаться с нами по электронной почте!</h3>
      <p>
        Для вопросов и пожеланий по работе магазина:{" "}
        <i>vanya.sergeev.8787@mail.ru</i>
      </p>
      <h4>Адрес нашего склада</h4>
      <iframe
        title="Адрес склада"
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A633c6126e32ccc3b519d5fa970b206f9812e5669a452a039c12e613d4887917e&amp;source=constructor"
        width="80%"
        height="450px"
        frameborder="0"
      ></iframe>
    </main>
  );
}

export default Contacts;

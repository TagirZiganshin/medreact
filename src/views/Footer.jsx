import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" text-white py-8 px-10">
      <div className="w-full mx-auto text-center space-y-2 border-t border-blue-400 pt-6">
        <p className="text-lg font-semibold">
          © Все права защищены 2025 Тагир Зиганшин
        </p>
        <p className="text-sm font-semibold w-90 mx-auto mt-2 max-[28rem]:max-w-[100%]">
          Информация, предоставляемая на данном сайте, носит исключительно
          ознакомительный характер и не заменяет профессиональной медицинской
          консультации, диагностики или лечения.
        </p>
        <p className="text-sm">
          Почта:{" "}
          <Link
            to="mailto:example@mail.ru"
            className="underline hover:text-blue-300 transition"
          >
            example@mail.ru
          </Link>
        </p>
        <p className="text-sm">
          Телеграм:{" "}
          <Link
            to="https://t.me/Tagirfeed"
            className="underline hover:text-blue-300 transition"
          >
            @Tagirfeed
          </Link>
        </p>
        <p className="text-sm">
          WhatsApp:{" "}
          <Link
            to="tel:+79883321343"
            className="underline hover:text-blue-300 transition"
          >
            +7 (912) 345-67-89
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

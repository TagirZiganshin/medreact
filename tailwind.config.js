export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    // Отключаем modern-фичи для старых браузеров
    backdropOpacity: false,
    ringOpacity: false,
    borderOpacity: false,
    transform: false, // Переносим из Vite конфига
    float: false, // Переносим из Vite конфига
    objectFit: false, // Переносим из Vite конфига
  },
  future: {
    removeDeprecatedGapUtilities: true,
  },
};

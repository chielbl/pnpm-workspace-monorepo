const { defineConfig } = require("pollen-css/utils");

module.exports = defineConfig((pollen) => ({
  modules: {
    color: {
      "primary": "#97E7E1",
      "primary-content": "#1b5154",
      "secondary": "#6AD4DD",
      "secondary-content": "#224a57",
      "accent": "#5880d9",
      "accent-content": "#e0e9f9",
      "base-100": "#F8F6E3",
      "base-200": "#f4f1cd",
      "base-300": "#eae19e",
      "base-content": "#614022",
    },
    ease: false,
  },
}));

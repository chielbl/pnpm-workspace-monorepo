const { defineConfig } = require("pollen-css/utils");

module.exports = defineConfig((pollen) => ({
  modules: {
    color: {
      "primary-100": "#e2eff7",
      "primary-200": "#cbe3f2",
      "primary-300": "#a8d1e8",
      "primary-400": "#7eb8dc",
      "primary-500": "#5f9fd2",
      "primary-600": "#4a85c4",
      "primary-700": "#4173b4",
      "primary-800": "#3a5e93",
      "primary-900": "#334f75",
    },
    ease: false,
  },
}));
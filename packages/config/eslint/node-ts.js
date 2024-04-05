module.exports = {
  extends: ["airbnb-base", "airbnb-typescript/base", "prettier"],
  env: {
    node: true,
  },
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    sourceType: "module",
    ecmaVersion: 2022,
  },
  rules: {
    "import/prefer-default-export": "off",
    "import/extensions": "off",
  },
};

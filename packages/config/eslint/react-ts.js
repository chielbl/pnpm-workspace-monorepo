module.exports = {
  extends: ["airbnb", "airbnb/hooks", "airbnb-typescript", "prettier"],
  env: {
    browser: true,
  },
  ignorePatterns: [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/coverage/**",
    ".eslintrc.cjs",
  ],
  plugins: ["react-refresh"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    sourceType: "module",
    ecmaVersion: 2022,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/react-in-jsx-scope": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
  },
};

// import { ECMA_VERSION, JAVASCRIPT_FILES } from "./constants.js";

// This file contains the base ESLint configuration for all projects.
module.exports = {
  extends: ["eslint:recommended", "plugin:import/recommended" /*, "prettier" */],
  env: {
    [`es2021`]: true,
  },
  // Report unused `eslint-disable` comments.
  reportUnusedDisableDirectives: true,
  // Tell ESLint not to ignore dot-files, which are ignored by default.
  ignorePatterns: ["!.*.js"],
  // Global settings used by all overrides.
  settings: {
    // Use the Node resolver by default.
    "import/resolver": { node: {} },
  },
  // Global parser options.
  parserOptions: {
    ecmaVersion: "2021",
    sourceType: "module",
  },
  overrides: [
    {
      files: ["*.js?(x)", "*.mjs"],
      parser: "@babel/eslint-parser",
      parserOptions: {
        requireConfigFile: false,
      },
    },
  ],
};

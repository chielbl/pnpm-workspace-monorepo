module.exports = {
  extends: [require.resolve("@repo/config/eslint/react-ts")],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
};

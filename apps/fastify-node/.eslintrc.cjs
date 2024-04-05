module.exports = {
  extends: [require.resolve("@repo/config/eslint/node-ts")],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
};

module.exports = {
  extends:['@repo/base.js','@repo/typescript.js' ,'@repo/browser.js', '@repo/react.js'],
  root: true,
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}

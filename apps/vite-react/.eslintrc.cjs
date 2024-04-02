module.exports = {
 // extends:['@repo/config/eslint/base.js','@repo/tconfig/eslin/typescript.js' ,'@repo/tconfig/eslin/browser.js', '@repo/tconfig/eslin/react.js'],
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

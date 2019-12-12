module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ["airbnb-base", "plugin:prettier/recommended", "eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2018
  },
  plugins: ["prettier"],
  rules: { "no-param-reassign": 0 }
};

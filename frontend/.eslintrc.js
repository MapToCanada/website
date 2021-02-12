module.exports = {
  parser: "babel-eslint",
  globals: {
    API_HOST: "readonly",
    API_PREFIX: "readonly",
    NODE_ENV: "readonly",
    PATH_PREFIX: "readonly",
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "eslint:recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    quotes: ["error", "double"],
    "react/prop-types": "off"
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};

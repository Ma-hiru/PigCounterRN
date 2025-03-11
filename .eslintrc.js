// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: "expo",
  plugins: ["eslint-plugin-react-compiler"],
  ignorePatterns: ["/dist/*"],
  rules: {
    "react-compiler/react-compiler": "error"
  }
};

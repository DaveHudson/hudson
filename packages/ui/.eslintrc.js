module.exports = {
  extends: ["@repo/eslint-config/react.js", "plugin:storybook/recommended"],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "no-console": "off",
  }
};

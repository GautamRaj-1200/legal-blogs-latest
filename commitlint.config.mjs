export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-empty": [2, "never"], // This ensures that the scope is mandatory.
  },
};

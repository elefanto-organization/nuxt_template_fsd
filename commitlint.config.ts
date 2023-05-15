import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  helpUrl:
    "https://github.com/conventional-changelog/commitlint/#what-is-commitlint",
  rules: {
    "body-case": [2, "always", "sentence-case"],
    "body-max-line-length": [1, "always", 72],
    "header-max-length": [1, "always", 52],
    "type-case": [2, "always", "lower-case"],
    "scope-empty": [2, "never"],
    "subject-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        "build",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
        "config",
      ],
    ],
  },
};
module.exports = config;

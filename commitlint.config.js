import conventional from "@commitlint/config-conventional";

/**
 * Conventional types plus the `deps` / `deps-dev` prefixes Dependabot uses
 * (see .github/dependabot.yml), which release-please also maps to changelog
 * sections in release-please-config.json.
 */
const [level, applicable, types] = conventional.rules["type-enum"];

/**
 * The conventional header pattern matches types with `\w*`, which rejects
 * hyphenated types like `deps-dev`. Allow hyphens; everything else about the
 * header (optional scope, `!` breaking marker, `: ` separator) is unchanged.
 */
const type = String.raw`[\w-]*`;

/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ["@commitlint/config-conventional"],
  parserPreset: {
    parserOpts: {
      headerPattern: new RegExp(`^(${type})(?:\\((.*)\\))?!?: (.*)$`),
      breakingHeaderPattern: new RegExp(`^(${type})(?:\\((.*)\\))?!: (.*)$`),
      headerCorrespondence: ["type", "scope", "subject"],
    },
  },
  rules: {
    "type-enum": [level, applicable, [...types, "deps", "deps-dev"]],
  },
};

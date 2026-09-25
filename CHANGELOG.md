# Changelog

## [3.0.0](https://github.com/sustanza/stargarden/compare/v2.0.0...v3.0.0) (2026-09-25)


### ⚠ BREAKING CHANGES

* requires Astro 7. Custom .astro markup must be valid HTML for the Rust compiler, whitespace between inline elements is collapsed unless written as {" "}, and search styling now uses Pagefind Component UI --pf-* variables instead of the .pagefind-ui__* classes.

### Features

* upgrade to Astro 7 and update all dependencies ([#121](https://github.com/sustanza/stargarden/issues/121)) ([4c03e52](https://github.com/sustanza/stargarden/commit/4c03e52e5ea96a27f5786ea51abf8ce6e0530963))


### Dependencies

* **deps:** bump actions/checkout from 6.0.2 to 6.0.3 in the actions-minor-and-patch group ([#80](https://github.com/sustanza/stargarden/issues/80)) ([aa894a5](https://github.com/sustanza/stargarden/commit/aa894a54080ab25a874d842609a8e17c5152290a))
* **deps:** bump actions/checkout from 6.0.3 to 7.0.1 ([#96](https://github.com/sustanza/stargarden/issues/96)) ([9ed9477](https://github.com/sustanza/stargarden/commit/9ed9477df537cfdcc6bb19818492407c894619b8))
* **deps:** bump actions/setup-node from 6.4.0 to 7.0.0 ([#91](https://github.com/sustanza/stargarden/issues/91)) ([cd0da85](https://github.com/sustanza/stargarden/commit/cd0da85d5686c1c7150a2a7a308adabd379b2ea4))
* **deps:** bump astro from 6.4.2 to 6.4.8 in the npm-security group across 1 directory ([#82](https://github.com/sustanza/stargarden/issues/82)) ([0bfba2e](https://github.com/sustanza/stargarden/commit/0bfba2e771b3cec2a2fb3d373e17bcdfe3c0effb))
* **deps:** bump daisyui from 5.7.14 to 5.7.16 in the npm-minor-and-patch group ([#105](https://github.com/sustanza/stargarden/issues/105)) ([9b48dfa](https://github.com/sustanza/stargarden/commit/9b48dfa5eea38d5ecd5f31042918e4d42679557e))
* **deps:** bump daisyui from 5.7.21 to 5.7.22 in the npm-minor-and-patch group ([#111](https://github.com/sustanza/stargarden/issues/111)) ([aa08ead](https://github.com/sustanza/stargarden/commit/aa08ead0c24588c5035050b8d75cd98a711fc1ee))
* **deps:** bump daisyui from 5.7.28 to 5.7.37 in the npm-minor-and-patch group ([#117](https://github.com/sustanza/stargarden/issues/117)) ([fbd52e0](https://github.com/sustanza/stargarden/commit/fbd52e0fafb1eef33743b7b017332a645912dd9d))
* **deps:** bump the npm-minor-and-patch group across 1 directory with 10 updates ([#90](https://github.com/sustanza/stargarden/issues/90)) ([dadb1dc](https://github.com/sustanza/stargarden/commit/dadb1dcad5f51eccba2abfcf723560e5a9f66e5d))
* **deps:** bump the npm-minor-and-patch group across 1 directory with 9 updates ([#86](https://github.com/sustanza/stargarden/issues/86)) ([449df28](https://github.com/sustanza/stargarden/commit/449df284e25f82ed93ae24c4f1302100464d3e0d))
* **deps:** bump the npm-minor-and-patch group with 2 updates ([#109](https://github.com/sustanza/stargarden/issues/109)) ([de7a2c9](https://github.com/sustanza/stargarden/commit/de7a2c936aa3a6ec395071f6331dd39ed0dd7ca7))
* **deps:** bump the npm-minor-and-patch group with 3 updates ([#101](https://github.com/sustanza/stargarden/issues/101)) ([d4e7103](https://github.com/sustanza/stargarden/commit/d4e710357ba0bb2eac196d221e262b37fd085273))
* **deps:** bump the npm-minor-and-patch group with 3 updates ([#97](https://github.com/sustanza/stargarden/issues/97)) ([52fc2dc](https://github.com/sustanza/stargarden/commit/52fc2dc316466d42ed7f0f0a8a58afa2ac553452))
* **deps:** bump the npm-minor-and-patch group with 4 updates ([#107](https://github.com/sustanza/stargarden/issues/107)) ([60b25a7](https://github.com/sustanza/stargarden/commit/60b25a7ddb8cde2b744eb8aa64478212f9e2b9ea))
* **deps:** bump the npm-minor-and-patch group with 4 updates ([#114](https://github.com/sustanza/stargarden/issues/114)) ([7bba329](https://github.com/sustanza/stargarden/commit/7bba32921df8adb3fec80df34897dacbfacbf128))
* **deps:** bump the npm-minor-and-patch group with 4 updates ([#78](https://github.com/sustanza/stargarden/issues/78)) ([5287820](https://github.com/sustanza/stargarden/commit/52878209442f61efc01640cd8accaaf5d99b8c27))
* **deps:** bump the npm-minor-and-patch group with 4 updates ([#79](https://github.com/sustanza/stargarden/issues/79)) ([ef5d234](https://github.com/sustanza/stargarden/commit/ef5d234f973fe867c6f53ecb200194f16ba4e453))
* **deps:** bump the npm-minor-and-patch group with 4 updates ([#99](https://github.com/sustanza/stargarden/issues/99)) ([6c2fee5](https://github.com/sustanza/stargarden/commit/6c2fee58be9131f772e7b0caa4434cca901df70c))
* **deps:** bump the npm-minor-and-patch group with 5 updates ([#92](https://github.com/sustanza/stargarden/issues/92)) ([c93ec2e](https://github.com/sustanza/stargarden/commit/c93ec2ee80213e5bf78b7b70647e9f55ff4daa37))
* **deps:** bump the npm-security group across 1 directory with 2 updates ([#83](https://github.com/sustanza/stargarden/issues/83)) ([2a1fec0](https://github.com/sustanza/stargarden/commit/2a1fec0e39d20e95f718ccaf3da1213fd462d823))

## [2.0.0](https://github.com/sustanza/stargarden/compare/v1.8.2...v2.0.0) (2026-05-17)


### ⚠ BREAKING CHANGES

* honor prefers-color-scheme and pair light/dark expressive-code themes ([#73](https://github.com/sustanza/stargarden/issues/73))
* migrate standalone markdown pages to content collection ([#72](https://github.com/sustanza/stargarden/issues/72))
* drop React stack in favor of inline SVG icons ([#67](https://github.com/sustanza/stargarden/issues/67))
* replace astro-seo with BaseHead component + src/consts.ts ([#66](https://github.com/sustanza/stargarden/issues/66))

### Features

* add dynamic robots.txt endpoint ([#70](https://github.com/sustanza/stargarden/issues/70)) ([b88233e](https://github.com/sustanza/stargarden/commit/b88233efdab1bec4a9ee5a68b15d7791b01b6d9d))
* add Prettier with Astro and Tailwind plugins ([#63](https://github.com/sustanza/stargarden/issues/63)) ([85234c4](https://github.com/sustanza/stargarden/commit/85234c4c52f8971453e46cce486c8a72b6adf774))
* add reading time and heading anchors to posts ([#68](https://github.com/sustanza/stargarden/issues/68)) ([13a641a](https://github.com/sustanza/stargarden/commit/13a641a69c73b4f0d7d267f0884adc3fdf45fb0f))
* enable view transitions (ClientRouter) and link prefetch ([#74](https://github.com/sustanza/stargarden/issues/74)) ([3d504e4](https://github.com/sustanza/stargarden/commit/3d504e4fd503b764a787557c13bbc4b10e3d47d9))
* include full post content and cover enclosure in RSS feed ([#69](https://github.com/sustanza/stargarden/issues/69)) ([2cdb02e](https://github.com/sustanza/stargarden/commit/2cdb02e7b63fb2ba3321d4d42879b101fafabff2))
* migrate standalone markdown pages to content collection ([#72](https://github.com/sustanza/stargarden/issues/72)) ([679ca0e](https://github.com/sustanza/stargarden/commit/679ca0e86f4655c5325aadedc48d9810b069b680))
* replace astro-seo with BaseHead component + src/consts.ts ([#66](https://github.com/sustanza/stargarden/issues/66)) ([3bc1895](https://github.com/sustanza/stargarden/commit/3bc189506b21979162840ea1e9a0c5405aeb5d70))


### Bug Fixes

* honor prefers-color-scheme and pair light/dark expressive-code themes ([#73](https://github.com/sustanza/stargarden/issues/73)) ([2aa3dea](https://github.com/sustanza/stargarden/commit/2aa3dea9a3c4d0efacbad1c003b4e81a7b4f203d))


### Code Refactoring

* drop React stack in favor of inline SVG icons ([#67](https://github.com/sustanza/stargarden/issues/67)) ([0bb510b](https://github.com/sustanza/stargarden/commit/0bb510b12a77c59b9b8a73d2b1943721253c9511))

## [1.8.2](https://github.com/sustanza/stargarden/compare/v1.8.1...v1.8.2) (2026-05-17)


### Bug Fixes

* **ci:** drop unsupported semver-days from github-actions cooldown ([#35](https://github.com/sustanza/stargarden/issues/35)) ([264fa24](https://github.com/sustanza/stargarden/commit/264fa241b387225431ba7c7ac6697450fc4ccf68))

## [1.8.1](https://github.com/sustanza/stargarden/compare/v1.8.0...v1.8.1) (2026-03-11)


### Bug Fixes

* maintenance patch — draft filtering, dep updates, dead code ([#22](https://github.com/sustanza/stargarden/issues/22)) ([17b5a09](https://github.com/sustanza/stargarden/commit/17b5a096cb11b4c392cb4b662b5da0efb3e48399))

## [1.8.0](https://github.com/sustanza/stargarden/compare/v1.7.0...v1.8.0) (2026-01-31)


### Features

* **seo:** add OpenGraph metadata and improve SEO usage ([#20](https://github.com/sustanza/stargarden/issues/20)) ([dac1753](https://github.com/sustanza/stargarden/commit/dac17531bf270d9041be802d00fe4dc613b77ea7))

## [1.7.0](https://github.com/sustanza/stargarden/compare/v1.6.0...v1.7.0) (2025-12-27)


### Features

* add github link to footer ([3bfbd00](https://github.com/sustanza/stargarden/commit/3bfbd00b40a0f4ce35289146edce07624fb6743a))

## [1.6.0](https://github.com/sustanza/stargarden/compare/v1.5.0...v1.6.0) (2025-12-27)


### Features

* **rss:** add RSS feed for blog subscriptions ([1da4879](https://github.com/sustanza/stargarden/commit/1da487928761956957d8e6cbc1a1240c0d40d24d))

## [1.5.0](https://github.com/sustanza/stargarden/compare/v1.4.0...v1.5.0) (2025-10-22)


### Features

* **e2e:** add playwright smoke suite and refresh deps ([#14](https://github.com/sustanza/stargarden/issues/14)) ([9fb4cba](https://github.com/sustanza/stargarden/commit/9fb4cba3262e7f312eeba578588cfccce7d595fb))

## [1.4.0](https://github.com/sustanza/stargarden/compare/v1.3.0...v1.4.0) (2025-09-13)


### Features

* add custom 404 and fix vitest; tailwind & links cleanups ([#11](https://github.com/sustanza/stargarden/issues/11)) ([371cd68](https://github.com/sustanza/stargarden/commit/371cd6821eef6df22efe8f3a7d521b7cd88e4e07))

## [1.3.0](https://github.com/sustanza/stargarden/compare/v1.2.0...v1.3.0) (2025-06-09)


### Features

* persistent dark mode toggle ([#9](https://github.com/sustanza/stargarden/issues/9)) ([834d020](https://github.com/sustanza/stargarden/commit/834d02099c1fa5e2da0e013058a025154ceebf2b))

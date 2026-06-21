## [1.1.1](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/compare/v1.1.0...v1.1.1) (2026-06-21)

### 🐛 Bug Fixes

* **site:** reworked directory per review feedback ([f91fcba](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/commit/f91fcbad34d7b4334ee10a4889b6121477a07e4b))

## [1.1.0](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/compare/v1.0.0...v1.1.0) (2026-06-21)

### 🚀 Features

* **site:** added GitHub Pages integrations directory ([eb49499](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/commit/eb49499caca650b69f26a41ceafd8abcf5d89994))

## [1.0.0](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/compare/v0.0.0...v1.0.0) (2026-06-21)

### ⚠ BREAKING CHANGES

* **workspace:** Integration-Pakete müssen ab jetzt eigenständig
installiert werden (cd integrations/js/<name> && pnpm install). Konsumenten
aus dem Registry sind nicht betroffen — @bauer-group/accessibility-widget
wird über Caret-Version referenziert statt workspace:*.
* **naming:** renamed all BFSG identifiers to AccessibilityWidget

### 🚀 Features

* add initial configuration files for GitHub workflows and CODEOWNERS ([48f1478](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/commit/48f1478402321430a17ef98c8d4f00fff6b56972))
* **cdn:** added R2 hosting and release pipeline ([0d614b1](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/commit/0d614b1f6e73e4b9986ab5e5349dc6b0c3587a4e))
* **embed:** defaulted all integrations to the CDN v1 tag ([58f44b6](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/commit/58f44b6492ee87f066542f28d419a67f7ea8d3b7))
* **monorepo:** scaffolded accessibility widget repository ([2324c49](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/commit/2324c498140bd56354511d8e53cdd6af9868b7ba))

### 🐛 Bug Fixes

* **ci:** made cold builds robust (build before typecheck, clean drops tsbuildinfo) ([e7bac3f](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/commit/e7bac3f87b8a9b5ad78485880d91162a12258748))
* corrected stale MIT license notices to AGPL ([dc1d73a](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/commit/dc1d73a6864aa65f4293d343b2e90329def34580))
* **integrations:** completed BFSG→AccessibilityWidget rename ([4360e37](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/commit/4360e379c1cba84408630bbd9490c1ff7fc20606))
* updated author email format across multiple package and composer files ([d903a5a](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/commit/d903a5a5daab58de82d46a7d49800113fe650ade))

### ⏪ Reverts

* kept the SaaS-AccessibilityWidget repo URL ([dd488e4](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/commit/dd488e4fa24937f2c3a944de23863d8b71687fc1))

### ♻️ Refactoring

* **monorepo:** decoupled integrations from core dev/release path ([ffcd5d7](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/commit/ffcd5d7c6e733cd73189c9d9f293720334866719))
* **naming:** renamed all BFSG identifiers to AccessibilityWidget ([e7844e7](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/commit/e7844e745bb658c083dde00f669d3bca60d1f64f))
* **naming:** renamed npm packages bfsg-widget to accessibility-widget ([af94d37](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/commit/af94d372bb664a715fb4f7d3276b6cc4d3409cd3))
* **structure:** consolidated integrations under packages/ ([6323a51](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/commit/6323a51bfda4201f9448c7b5a954176479001cbc))
* **workspace:** detached integrations from pnpm workspace ([a0de352](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/commit/a0de3523dd59cf8152e0a6e47e76c4c1d51cad4f))

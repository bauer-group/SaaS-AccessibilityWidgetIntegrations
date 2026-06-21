# @bauer-group/accessibility-widget-integrations

<a id="english"></a>

> Framework, CMS and shop integrations for the **[BAUER GROUP Accessibility Widget](https://github.com/bauer-group/SaaS-AccessibilityWidget)** — BFSG · EN 301 549 · WCAG 2.2 AA.

**🇬🇧 English** · [🇩🇪 Deutsch](#-deutsch)

This repository bundles the ready-to-use **integrations**. The widget **core** (loader + core bundles, 28 locales, zero runtime dependencies) lives in its own repository and is delivered via **CDN (preferred)** or **npm**:

|                                                              |                                                                          |
| ------------------------------------------------------------ | ------------------------------------------------------------------------ |
| 🧩 **Core repo & docs**                                      | <https://github.com/bauer-group/SaaS-AccessibilityWidget>                |
| 📖 **Integration guide** (CDN, npm, versioning, SRI, config) | <https://github.com/bauer-group/SaaS-AccessibilityWidget/tree/main/docs> |
| 🌐 **CDN**                                                   | `https://widgets.professional-hosting.com/accessibility-widget/…`        |

> Each integration here is a **thin wrapper** that loads the same CDN-hosted core — the widget is **not** re-bundled. Version pinning + SRI per the [versioning docs](https://github.com/bauer-group/SaaS-AccessibilityWidget/tree/main/docs).

## Contents

### JS/TS frameworks (`packages/js/*` — pnpm workspace, published to npm)

| Package                                                               | Framework          |
| --------------------------------------------------------------------- | ------------------ |
| [`@bauer-group/accessibility-widget-react`](./packages/js/react/)     | React ≥ 18         |
| [`@bauer-group/accessibility-widget-vue`](./packages/js/vue/)         | Vue ≥ 3.3          |
| [`@bauer-group/accessibility-widget-angular`](./packages/js/angular/) | Angular ≥ 19       |
| [`@bauer-group/accessibility-widget-svelte`](./packages/js/svelte/)   | Svelte ≥ 5         |
| [`@bauer-group/accessibility-widget-nextjs`](./packages/js/nextjs/)   | Next.js App Router |
| [`@bauer-group/accessibility-widget-nuxt`](./packages/js/nuxt/)       | Nuxt 3             |
| [`@bauer-group/accessibility-widget-astro`](./packages/js/astro/)     | Astro ≥ 5          |

The wrappers consume the core as a **published dependency** (`@bauer-group/accessibility-widget` ≥ 1.0.5) and import **types only** — at runtime the loader fetches the CDN bundles.

### CMS & shops (`packages/cms/*`, `packages/shop/*` — separate ecosystems, not in the npm workspace)

| Folder                                                | System           | Language |
| ----------------------------------------------------- | ---------------- | -------- |
| [`packages/cms/wordpress`](./packages/cms/wordpress/) | WordPress 6.x    | PHP      |
| [`packages/cms/typo3`](./packages/cms/typo3/)         | TYPO3 13         | PHP      |
| [`packages/cms/drupal`](./packages/cms/drupal/)       | Drupal 10/11     | PHP      |
| [`packages/shop/shopify`](./packages/shop/shopify/)   | Shopify (OS 2.0) | Liquid   |
| [`packages/shop/shopware`](./packages/shop/shopware/) | Shopware 6       | PHP      |
| [`packages/shop/magento`](./packages/shop/magento/)   | Magento 2.4      | PHP      |

## Development (JS wrappers)

```bash
pnpm install
pnpm build       # builds all packages/js/* wrappers (tsc)
pnpm test        # vitest per wrapper
pnpm typecheck
pnpm lint
```

Each wrapper has its own README with usage examples — e.g. [`packages/js/react/README.md`](./packages/js/react/README.md).

## Embedding the widget (short version)

The **CDN one-liner integration** is preferred (automatic patch/minor updates within a major):

```html
<script
  src="https://widgets.professional-hosting.com/accessibility-widget/v1/accessibility-widget-loader.min.js"
  defer
></script>
```

For production, **pin an immutable version + secure it via SRI**. The full guide — CDN vs. npm, the immutable/floating path scheme, SRI pinning, the `window.AccessibilityWidgetConfig` API and how versioning works — is in the **[core repo under `docs/`](https://github.com/bauer-group/SaaS-AccessibilityWidget/tree/main/docs)**.

## Contributing

Integrations here are maintained by the team and the community. They are **MIT-licensed** (the Drupal module GPL-2.0-or-later), so contributions follow the standard **inbound = outbound** model — just sign off your commits per the [DCO](./CLA.md) (`git commit -s`). Conventional Commits (past tense), tests for new wrappers.

## License

**MIT** ([LICENSE](./LICENSE)) — the Drupal module is GPL-2.0-or-later (Drupal.org requirement). The Accessibility Widget loaded at runtime is a **separate work**, licensed AGPL-3.0-only or commercially. See [LICENSING.md](./LICENSING.md).

---

<a id="-deutsch"></a>

## 🇩🇪 Deutsch

> Framework-, CMS- und Shop-Integrationen für das **[BAUER GROUP Accessibility Widget](https://github.com/bauer-group/SaaS-AccessibilityWidget)** — BFSG · EN 301 549 · WCAG 2.2 AA.

[🇬🇧 English](#english) · **🇩🇪 Deutsch**

Dieses Repository bündelt die einsatzfertigen **Integrationen**. Der **Core** des Widgets (Loader + Core-Bundles, 28 Locales, zero Runtime-Dependencies) lebt in einem eigenen Repository und wird per **CDN (bevorzugt)** oder **npm** ausgeliefert:

|                                                                      |                                                                          |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 🧩 **Core-Repo & Doku**                                              | <https://github.com/bauer-group/SaaS-AccessibilityWidget>                |
| 📖 **Integrations-Leitfaden** (CDN, npm, Versionierung, SRI, Config) | <https://github.com/bauer-group/SaaS-AccessibilityWidget/tree/main/docs> |
| 🌐 **CDN**                                                           | `https://widgets.professional-hosting.com/accessibility-widget/…`        |

> Jede Integration hier ist ein **dünner Wrapper**, der denselben CDN-gehosteten Core lädt — das Widget wird **nicht** neu gebündelt. Versions-Pinning + SRI gemäß den [Versionierungs-Docs](https://github.com/bauer-group/SaaS-AccessibilityWidget/tree/main/docs).

### Inhalt

#### JS-/TS-Frameworks (`packages/js/*` — pnpm-Workspace, npm-publiziert)

| Paket                                                                 | Framework          |
| --------------------------------------------------------------------- | ------------------ |
| [`@bauer-group/accessibility-widget-react`](./packages/js/react/)     | React ≥ 18         |
| [`@bauer-group/accessibility-widget-vue`](./packages/js/vue/)         | Vue ≥ 3.3          |
| [`@bauer-group/accessibility-widget-angular`](./packages/js/angular/) | Angular ≥ 19       |
| [`@bauer-group/accessibility-widget-svelte`](./packages/js/svelte/)   | Svelte ≥ 5         |
| [`@bauer-group/accessibility-widget-nextjs`](./packages/js/nextjs/)   | Next.js App Router |
| [`@bauer-group/accessibility-widget-nuxt`](./packages/js/nuxt/)       | Nuxt 3             |
| [`@bauer-group/accessibility-widget-astro`](./packages/js/astro/)     | Astro ≥ 5          |

Die Wrapper konsumieren den Core als **veröffentlichte Abhängigkeit** (`@bauer-group/accessibility-widget` ≥ 1.0.5) und importieren nur **Typen** — zur Laufzeit lädt der Loader die CDN-Bundles.

#### CMS & Shops (`packages/cms/*`, `packages/shop/*` — eigene Ökosysteme, nicht im npm-Workspace)

| Ordner                                                | System           | Sprache |
| ----------------------------------------------------- | ---------------- | ------- |
| [`packages/cms/wordpress`](./packages/cms/wordpress/) | WordPress 6.x    | PHP     |
| [`packages/cms/typo3`](./packages/cms/typo3/)         | TYPO3 13         | PHP     |
| [`packages/cms/drupal`](./packages/cms/drupal/)       | Drupal 10/11     | PHP     |
| [`packages/shop/shopify`](./packages/shop/shopify/)   | Shopify (OS 2.0) | Liquid  |
| [`packages/shop/shopware`](./packages/shop/shopware/) | Shopware 6       | PHP     |
| [`packages/shop/magento`](./packages/shop/magento/)   | Magento 2.4      | PHP     |

### Entwicklung (JS-Wrapper)

```bash
pnpm install
pnpm build       # baut alle js/*-Wrapper (tsc)
pnpm test        # vitest je Wrapper
pnpm typecheck
pnpm lint
```

Jeder Wrapper hat eine eigene README mit Nutzungsbeispielen — z. B. [`packages/js/react/README.md`](./packages/js/react/README.md).

### Das Widget einbinden (Kurzfassung)

Bevorzugt ist die **CDN-Einzeiler-Integration** (automatische Patch/Minor-Updates innerhalb eines Majors):

```html
<script
  src="https://widgets.professional-hosting.com/accessibility-widget/v1/accessibility-widget-loader.min.js"
  defer
></script>
```

Für Produktion eine **unveränderliche Version pinnen + per SRI absichern**. Die vollständige Anleitung — CDN vs. npm, das immutable/floating-Pfadschema, SRI-Pinning, die `window.AccessibilityWidgetConfig`-API und wie die Versionierung funktioniert — steht im **[Core-Repo unter `docs/`](https://github.com/bauer-group/SaaS-AccessibilityWidget/tree/main/docs)**.

### Mitwirken

Integrationen werden hier vom Team und der Community gepflegt. Sie sind **MIT-lizenziert** (das Drupal-Modul GPL-2.0-or-later), daher folgen Beiträge dem Standardmodell **inbound = outbound** — signiere einfach deine Commits gemäß [DCO](./CLA.md) (`git commit -s`). Conventional Commits (Past Tense), Tests für neue Wrapper.

### Lizenz

**MIT** ([LICENSE](./LICENSE)) — das Drupal-Modul steht unter GPL-2.0-or-later (Drupal.org-Vorgabe). Das zur Laufzeit geladene Accessibility Widget ist ein **separates Werk**, lizenziert unter AGPL-3.0-only oder kommerziell. Siehe [LICENSING.md](./LICENSING.md).

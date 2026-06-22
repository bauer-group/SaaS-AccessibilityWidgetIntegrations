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

The wrappers are **dependency-free** and load the widget from the **CDN (floating `v1` tag)** by default — the integration may age, the widget stays current. Self-hosting is an optional override.

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

Each wrapper has its own README with usage examples — e.g. [`packages/js/react/README.md`](./packages/js/react/README.md). How releases reach npm, Packagist and the plugin marketplaces is documented in [`docs/distribution.md`](./docs/distribution.md).

## Embedding the widget (short version)

The **CDN one-liner integration** is preferred (automatic patch/minor updates within a major):

```html
<script
  src="https://widgets.professional-hosting.com/accessibility-widget/v1/accessibility-widget-loader.min.js"
  defer
></script>
```

All integrations use this CDN `v1` path by default (no SRI — the floating tag changes on every widget release, which is incompatible with a pinned hash). The full guide — the `window.AccessibilityWidgetConfig` API, the immutable/floating path scheme, and self-hosting — is in the **[core repo under `docs/`](https://github.com/bauer-group/SaaS-AccessibilityWidget/tree/main/docs)**.

### Configuration

Every integration exposes the **full** widget configuration surface — appearance, behaviour, content, the 15 accessibility features, and advanced self-hosting (`corePath`/`cssPath` + SRI). The CMS/shop admin UIs ship **bilingual (EN + DE)** and render in the backend's language. All options are defined once in [`config/widget-config.mjs`](./config/widget-config.mjs) and the native settings (WordPress fields, TYPO3 Extension Configuration, Drupal form, Magento `system.xml`, Shopware `config.xml`, Shopify app block) plus the typed `WidgetConfig` TS surface are generated from it via `pnpm generate-config` (CI guards drift with `generate-config:check`). See the generated **[configuration reference](./docs/configuration.md)**.

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

Die Wrapper sind **abhängigkeitsfrei** und laden das Widget standardmäßig vom **CDN (floating `v1`-Tag)** — die Integration darf veralten, das Widget bleibt aktuell. Self-Hosting ist ein optionaler Override.

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
pnpm build       # baut alle packages/js/*-Wrapper (tsc)
pnpm test        # vitest je Wrapper
pnpm typecheck
pnpm lint
```

Jeder Wrapper hat eine eigene README mit Nutzungsbeispielen — z. B. [`packages/js/react/README.md`](./packages/js/react/README.md). Wie Releases zu npm, Packagist und den Plugin-Marktplätzen gelangen, steht in [`docs/distribution.md`](./docs/distribution.md).

### Das Widget einbinden (Kurzfassung)

Bevorzugt ist die **CDN-Einzeiler-Integration** (automatische Patch/Minor-Updates innerhalb eines Majors):

```html
<script
  src="https://widgets.professional-hosting.com/accessibility-widget/v1/accessibility-widget-loader.min.js"
  defer
></script>
```

Alle Integrationen nutzen standardmäßig diesen CDN-`v1`-Pfad (kein SRI — der floating Tag ändert sich bei jedem Widget-Release, was mit einem gepinnten Hash unvereinbar ist). Die vollständige Anleitung — die `window.AccessibilityWidgetConfig`-API, das immutable/floating-Pfadschema und Self-Hosting — steht im **[Core-Repo unter `docs/`](https://github.com/bauer-group/SaaS-AccessibilityWidget/tree/main/docs)**.

### Konfiguration

Jede Integration bildet die **vollständige** Widget-Konfiguration ab — Darstellung, Verhalten, Inhalt, die 15 Barrierefreiheits-Funktionen und erweitertes Self-Hosting (`corePath`/`cssPath` + SRI). Die CMS-/Shop-Oberflächen sind **zweisprachig (EN + DE)** und zeigen die Sprache des Backends. Alle Optionen werden einmalig in [`config/widget-config.mjs`](./config/widget-config.mjs) definiert; die nativen Einstellungen (WordPress-Felder, TYPO3 Extension Configuration, Drupal-Formular, Magento `system.xml`, Shopware `config.xml`, Shopify App-Block) sowie das typisierte `WidgetConfig`-TS-Interface werden daraus per `pnpm generate-config` generiert (CI prüft Drift mit `generate-config:check`). Siehe die generierte **[Konfigurations-Referenz](./docs/configuration.md)**.

### Mitwirken

Integrationen werden hier vom Team und der Community gepflegt. Sie sind **MIT-lizenziert** (das Drupal-Modul GPL-2.0-or-later), daher folgen Beiträge dem Standardmodell **inbound = outbound** — signiere einfach deine Commits gemäß [DCO](./CLA.md) (`git commit -s`). Conventional Commits (Past Tense), Tests für neue Wrapper.

### Lizenz

**MIT** ([LICENSE](./LICENSE)) — das Drupal-Modul steht unter GPL-2.0-or-later (Drupal.org-Vorgabe). Das zur Laufzeit geladene Accessibility Widget ist ein **separates Werk**, lizenziert unter AGPL-3.0-only oder kommerziell. Siehe [LICENSING.md](./LICENSING.md).

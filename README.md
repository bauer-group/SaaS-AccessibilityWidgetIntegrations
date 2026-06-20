# @bauer-group/accessibility-widget-integrations

> Framework-, CMS- und Shop-Integrationen für das **[BAUER GROUP Accessibility Widget](https://github.com/bauer-group/SaaS-AccessibilityWidget)** — BFSG · EN 301 549 · WCAG 2.2 AA.

Dieses Repository bündelt die einsatzfertigen **Integrationen**. Der **Core** des Widgets (Loader + Core-Bundles, 28 Locales, zero Runtime-Dependencies) lebt in einem eigenen Repository und wird per **CDN (bevorzugt)** oder **npm** ausgeliefert:

|                                                                      |                                                                          |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 🧩 **Core-Repo & Doku**                                              | <https://github.com/bauer-group/SaaS-AccessibilityWidget>                |
| 📖 **Integrations-Leitfaden** (CDN, npm, Versionierung, SRI, Config) | <https://github.com/bauer-group/SaaS-AccessibilityWidget/tree/main/docs> |
| 🌐 **CDN**                                                           | `https://widgets.professional-hosting.com/accessibility-widget/…`        |

> Jede Integration hier ist ein **dünner Wrapper**, der denselben CDN-gehosteten Core lädt — das Widget wird **nicht** neu gebündelt. Versions-Pinning + SRI gemäß den [Versionierungs-Docs](https://github.com/bauer-group/SaaS-AccessibilityWidget/tree/main/docs).

## Inhalt

### JS-/TS-Frameworks (`js/*` — pnpm-Workspace, npm-publiziert)

| Paket                                                        | Framework          |
| ------------------------------------------------------------ | ------------------ |
| [`@bauer-group/accessibility-widget-react`](./js/react/)     | React ≥ 18         |
| [`@bauer-group/accessibility-widget-vue`](./js/vue/)         | Vue ≥ 3.3          |
| [`@bauer-group/accessibility-widget-angular`](./js/angular/) | Angular ≥ 19       |
| [`@bauer-group/accessibility-widget-svelte`](./js/svelte/)   | Svelte ≥ 5         |
| [`@bauer-group/accessibility-widget-nextjs`](./js/nextjs/)   | Next.js App Router |
| [`@bauer-group/accessibility-widget-nuxt`](./js/nuxt/)       | Nuxt 3             |
| [`@bauer-group/accessibility-widget-astro`](./js/astro/)     | Astro ≥ 5          |

Die Wrapper konsumieren den Core als **veröffentlichte Abhängigkeit** (`@bauer-group/accessibility-widget` ≥ 1.0.3) und importieren nur **Typen** — zur Laufzeit lädt der Loader die CDN-Bundles.

### CMS & Shops (`cms/*`, `shops/*` — eigene Ökosysteme, nicht im npm-Workspace)

| Ordner                                | System           | Sprache |
| ------------------------------------- | ---------------- | ------- |
| [`cms/wordpress`](./cms/wordpress/)   | WordPress 6.x    | PHP     |
| [`cms/typo3`](./cms/typo3/)           | TYPO3 13         | PHP     |
| [`cms/drupal`](./cms/drupal/)         | Drupal 10/11     | PHP     |
| [`shops/shopify`](./shops/shopify/)   | Shopify (OS 2.0) | Liquid  |
| [`shops/shopware`](./shops/shopware/) | Shopware 6       | PHP     |
| [`shops/magento`](./shops/magento/)   | Magento 2.4      | PHP     |

## Entwicklung (JS-Wrapper)

```bash
pnpm install
pnpm build       # baut alle js/*-Wrapper (tsc)
pnpm test        # vitest je Wrapper
pnpm typecheck
pnpm lint
```

Jeder Wrapper hat eine eigene README mit Nutzungsbeispielen — z. B. [`js/react/README.md`](./js/react/README.md).

## Das Widget einbinden (Kurzfassung)

Bevorzugt ist die **CDN-Einzeiler-Integration** (automatische Patch/Minor-Updates innerhalb eines Majors):

```html
<script
  src="https://widgets.professional-hosting.com/accessibility-widget/v1/accessibility-widget-loader.min.js"
  defer
></script>
```

Für Produktion eine **unveränderliche Version pinnen + per SRI absichern**. Die vollständige Anleitung — CDN vs. npm, das immutable/floating-Pfadschema, SRI-Pinning, die `window.AccessibilityWidgetConfig`-API und wie die Versionierung funktioniert — steht im **[Core-Repo unter `docs/`](https://github.com/bauer-group/SaaS-AccessibilityWidget/tree/main/docs)**.

## Mitwirken

Integrationen werden hier vom Team und der Community gepflegt. Weil das Projekt **dual-lizenziert** ist (AGPL-3.0 / kommerziell), ist vor dem Merge eine **[CLA](./CLA.md)**-Signatur nötig — der CLA-Bot fordert im Pull Request automatisch dazu auf. Conventional Commits (Past Tense), Tests für neue Wrapper.

## Lizenz

Dual-lizenziert: **GNU AGPL-3.0-only** ([LICENSE](./LICENSE)) **oder** kommerziell (`info@bauer-group.com`) — siehe [LICENSING.md](./LICENSING.md).

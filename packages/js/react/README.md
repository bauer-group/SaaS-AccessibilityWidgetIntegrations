# @bauer-group/accessibility-widget-react

<a id="english"></a>

> React wrapper for the BAUER GROUP Accessibility Widget (BFSG / EN 301 549 / WCAG 2.2 AA).

**🇬🇧 English** · [🇩🇪 Deutsch](#-deutsch)

## Installation

```bash
npm install @bauer-group/accessibility-widget-react
```

**No assets to host:** by default the widget loads from the BAUER GROUP CDN (the floating `v1` tag) and **stays current automatically** — the integration may age, the widget never does.

## Usage

Zero-config — drop the component in once (e.g. in your root layout):

```tsx
import {
  AccessibilityWidget,
  openAccessibilityWidget,
} from '@bauer-group/accessibility-widget-react';

export function App() {
  return (
    <>
      <AccessibilityWidget />
      <button onClick={() => openAccessibilityWidget()}>Accessibility</button>
    </>
  );
}
```

## Configuration

The `config` prop is fully typed (`WidgetConfig`) and accepts **every** option of `window.AccessibilityWidgetConfig` — appearance (`position`, `offset`, `zIndex`, `primaryColor`, `locale`, `buttonLabel`), behaviour (`draggableFab`, `keyboardShortcut`, `respectReducedMotion`, …), content (`statementUrl`, `disclaimer`) and the 15 accessibility features via `initialFeatures` / `disabledFeatures`. Unknown keys pass straight through, so newer widget options work without a wrapper update.

```tsx
<AccessibilityWidget
  config={{
    position: 'bottom-left',
    primaryColor: '#0058a3',
    locale: 'de',
    offset: { x: 24, y: 24 },
    initialFeatures: { contrast: true },
    disabledFeatures: ['tts'],
    statementUrl: '/accessibility',
  }}
/>
```

Full option list (types, defaults, EN/DE descriptions): **[configuration reference](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/blob/main/docs/configuration.md)**. The exported types `WidgetConfig`, `WidgetPosition`, `WidgetLocale` and `FeatureId` give you autocomplete for every value.

### Imperative API

Drive the widget from code — every helper is a safe no-op until the core has loaded:

```ts
import {
  openAccessibilityWidget,
  setAccessibilityWidgetFeature,
  getAccessibilityWidgetState,
} from '@bauer-group/accessibility-widget-react';

setAccessibilityWidgetFeature('contrast', true); // e.g. from your own "high contrast" button
const state = getAccessibilityWidgetState();
```

Also available: `closeAccessibilityWidget` and `resetAccessibilityWidget`. The full surface is the typed `WidgetApi`.

### Self-hosting (optional escape hatch)

Only if you must avoid the third-party CDN (strict CSP, air-gapped, …): host the three assets yourself and point the wrapper at them. No SRI is used on the floating `v1` path.

```tsx
<AccessibilityWidget
  loaderSrc="/accessibility-widget/accessibility-widget-loader.min.js"
  coreSrc="/accessibility-widget/accessibility-widget-core.min.js"
  cssHref="/accessibility-widget/accessibility-widget.min.css"
/>
```

## Development

```bash
cd packages/js/react
pnpm install
pnpm build
pnpm test
```

Smoke tests (Vitest + happy-dom) in [`test/AccessibilityWidget.test.tsx`](./test/AccessibilityWidget.test.tsx) are the reference pattern for the other wrappers (Vue, Svelte, Angular, …) — the dedupe mechanism (`data-aw-loader`, `data-aw-css`) is identical.

## License

MIT · © 2026 BAUER GROUP — the widget loaded at runtime is separately licensed (AGPL-3.0-only or commercial).

---

<a id="-deutsch"></a>

## 🇩🇪 Deutsch

> React-Wrapper für das BAUER GROUP Accessibility Widget (BFSG / EN 301 549 / WCAG 2.2 AA).

[🇬🇧 English](#english) · **🇩🇪 Deutsch**

### Installation

```bash
npm install @bauer-group/accessibility-widget-react
```

**Keine Assets zu hosten:** Standardmäßig lädt das Widget vom BAUER GROUP CDN (floating `v1`-Tag) und **bleibt automatisch aktuell** — die Integration darf veralten, das Widget nie.

### Nutzung

Zero-Config — die Komponente einmal einbinden (z. B. im Root-Layout):

```tsx
import {
  AccessibilityWidget,
  openAccessibilityWidget,
} from '@bauer-group/accessibility-widget-react';

export function App() {
  return (
    <>
      <AccessibilityWidget />
      <button onClick={() => openAccessibilityWidget()}>Barrierefreiheit</button>
    </>
  );
}
```

### Konfiguration

Die `config`-Prop ist vollständig typisiert (`WidgetConfig`) und akzeptiert **jede** Option von `window.AccessibilityWidgetConfig` — Darstellung (`position`, `offset`, `zIndex`, `primaryColor`, `locale`, `buttonLabel`), Verhalten (`draggableFab`, `keyboardShortcut`, `respectReducedMotion`, …), Inhalt (`statementUrl`, `disclaimer`) und die 15 Barrierefreiheits-Funktionen über `initialFeatures` / `disabledFeatures`. Unbekannte Schlüssel werden durchgereicht — neue Widget-Optionen funktionieren also ohne Wrapper-Update.

```tsx
<AccessibilityWidget
  config={{
    position: 'bottom-left',
    primaryColor: '#0058a3',
    locale: 'de',
    offset: { x: 24, y: 24 },
    initialFeatures: { contrast: true },
    disabledFeatures: ['tts'],
    statementUrl: '/barrierefreiheit',
  }}
/>
```

Komplette Optionsliste (Typen, Defaults, EN/DE-Beschreibungen): **[Konfigurations-Referenz](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/blob/main/docs/configuration.md)**. Die exportierten Typen `WidgetConfig`, `WidgetPosition`, `WidgetLocale` und `FeatureId` liefern Autovervollständigung für jeden Wert.

### Imperative API

Das Widget per Code steuern — jeder Helfer ist ein sicherer No-op, bis der Core geladen ist:

```ts
import {
  openAccessibilityWidget,
  setAccessibilityWidgetFeature,
  getAccessibilityWidgetState,
} from '@bauer-group/accessibility-widget-react';

setAccessibilityWidgetFeature('contrast', true); // z. B. aus eigenem „Hoher Kontrast"-Button
const state = getAccessibilityWidgetState();
```

Ebenfalls verfügbar: `closeAccessibilityWidget` und `resetAccessibilityWidget`. Die komplette Fläche ist der typisierte `WidgetApi`.

### Self-Hosting (optionaler Notausgang)

Nur falls das Drittanbieter-CDN vermieden werden muss (strikte CSP, Air-Gap usw.): die drei Assets selbst hosten und den Wrapper darauf zeigen lassen. Auf dem floating `v1`-Pfad wird kein SRI verwendet.

```tsx
<AccessibilityWidget
  loaderSrc="/accessibility-widget/accessibility-widget-loader.min.js"
  coreSrc="/accessibility-widget/accessibility-widget-core.min.js"
  cssHref="/accessibility-widget/accessibility-widget.min.css"
/>
```

### Entwicklung

```bash
cd packages/js/react
pnpm install
pnpm build
pnpm test
```

Smoke-Tests (Vitest + happy-dom) in [`test/AccessibilityWidget.test.tsx`](./test/AccessibilityWidget.test.tsx) sind das Referenz-Pattern für die anderen Wrapper (Vue, Svelte, Angular, …) — das Dedupe-Muster (`data-aw-loader`, `data-aw-css`) ist identisch.

### Lizenz

MIT · © 2026 BAUER GROUP — das zur Laufzeit geladene Widget ist separat lizenziert (AGPL-3.0-only oder kommerziell).

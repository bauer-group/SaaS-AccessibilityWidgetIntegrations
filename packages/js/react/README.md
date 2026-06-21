# @bauer-group/accessibility-widget-react

<a id="english"></a>

> React wrapper for the BAUER GROUP Accessibility Widget (BFSG / EN 301 549 / WCAG 2.2 AA).

**🇬🇧 English** · [🇩🇪 Deutsch](#-deutsch)

## Installation

```bash
npm install @bauer-group/accessibility-widget-react
```

No assets to host: by default the widget loads from the BAUER GROUP CDN (the floating `v1` tag) and **stays current automatically** — the integration may age, the widget never does.

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
      <AccessibilityWidget
        config={{ position: 'bottom-right', locale: 'auto', primaryColor: '#0058a3' }}
      />
      <button onClick={() => openAccessibilityWidget()}>Accessibility</button>
    </>
  );
}
```

### Self-hosting (optional escape hatch)

Only if you must avoid the third-party CDN (strict CSP, air-gapped, etc.): host the three assets yourself and point the wrapper at them. No SRI is used on the floating `v1` path.

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

> React Wrapper für das BAUER GROUP Accessibility Widget (BFSG / EN 301 549 / WCAG 2.2 AA).

[🇬🇧 English](#english) · **🇩🇪 Deutsch**

### Installation

```bash
npm install @bauer-group/accessibility-widget-react
```

Keine Assets zu hosten: Standardmäßig lädt das Widget vom BAUER GROUP CDN (floating `v1`-Tag) und **bleibt automatisch aktuell** — die Integration darf veralten, das Widget nie.

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
      <AccessibilityWidget
        config={{ position: 'bottom-right', locale: 'auto', primaryColor: '#0058a3' }}
      />
      <button onClick={() => openAccessibilityWidget()}>Barrierefreiheit</button>
    </>
  );
}
```

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

MIT · © 2026 BAUER GROUP — the widget loaded at runtime is separately licensed (AGPL-3.0-only or commercial).

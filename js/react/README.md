# @bauer-group/accessibility-widget-react

<a id="english"></a>

> React wrapper for the BAUER GROUP Accessibility Widget (BFSG / EN 301 549 / WCAG 2.2 AA).

**🇬🇧 English** · [🇩🇪 Deutsch](#-deutsch)

## Installation

```bash
npm install @bauer-group/accessibility-widget-react
```

And place the widget assets (`accessibility-widget-loader.min.js`, `accessibility-widget-core.min.js`, `accessibility-widget.min.css`) under `/public/accessibility-widget/`.

## Usage

```tsx
import {
  AccessibilityWidget,
  openAccessibilityWidget,
} from '@bauer-group/accessibility-widget-react';

export function App() {
  return (
    <>
      <AccessibilityWidget
        loaderSrc="/accessibility-widget/accessibility-widget-loader.min.js"
        cssHref="/accessibility-widget/accessibility-widget.min.css"
        config={{ position: 'bottom-right', locale: 'auto', primaryColor: '#0058a3' }}
        sri={{
          loader: 'sha384-…', // from dist/integrity.txt
          core: 'sha384-…',
          css: 'sha384-…',
        }}
      />
      <button onClick={() => openAccessibilityWidget()}>Accessibility</button>
    </>
  );
}
```

## Development

This package is **not** part of the pnpm root workspace. Dependencies are installed directly in the package folder:

```bash
cd integrations/js/react
pnpm install
pnpm build
pnpm test
```

Smoke tests (Vitest + happy-dom) in [`test/AccessibilityWidget.test.tsx`](./test/AccessibilityWidget.test.tsx) serve as a reference pattern for further integrations (Vue, Svelte, Angular, …) — the dedupe mechanism (`data-aw-loader`, `data-aw-css`) is identical.

## License

AGPL-3.0-only or commercial · © 2026 BAUER GROUP

---

<a id="-deutsch"></a>

## 🇩🇪 Deutsch

> React Wrapper für das BAUER GROUP Accessibility Widget (BFSG / EN 301 549 / WCAG 2.2 AA).

[🇬🇧 English](#english) · **🇩🇪 Deutsch**

### Installation

```bash
npm install @bauer-group/accessibility-widget-react
```

Und die Widget-Assets (`accessibility-widget-loader.min.js`, `accessibility-widget-core.min.js`, `accessibility-widget.min.css`) unter `/public/accessibility-widget/` ablegen.

### Nutzung

```tsx
import {
  AccessibilityWidget,
  openAccessibilityWidget,
} from '@bauer-group/accessibility-widget-react';

export function App() {
  return (
    <>
      <AccessibilityWidget
        loaderSrc="/accessibility-widget/accessibility-widget-loader.min.js"
        cssHref="/accessibility-widget/accessibility-widget.min.css"
        config={{ position: 'bottom-right', locale: 'auto', primaryColor: '#0058a3' }}
        sri={{
          loader: 'sha384-…', // aus dist/integrity.txt
          core: 'sha384-…',
          css: 'sha384-…',
        }}
      />
      <button onClick={() => openAccessibilityWidget()}>Barrierefreiheit</button>
    </>
  );
}
```

### Entwicklung

Dieses Paket ist **nicht** Teil des pnpm-Root-Workspace. Dependencies werden direkt im Paketordner installiert:

```bash
cd integrations/js/react
pnpm install
pnpm build
pnpm test
```

Smoke-Tests (Vitest + happy-dom) in [`test/AccessibilityWidget.test.tsx`](./test/AccessibilityWidget.test.tsx) dienen als Referenz-Pattern für weitere Integrationen (Vue, Svelte, Angular, …) — das Dedupe-Muster (`data-aw-loader`, `data-aw-css`) ist identisch.

### Lizenz

AGPL-3.0-only or commercial · © 2026 BAUER GROUP

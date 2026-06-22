# @bauer-group/accessibility-widget-nextjs

<a id="english"></a>

> Next.js App Router wrapper with the `'use client'` directive.

**🇬🇧 English** · [🇩🇪 Deutsch](#-deutsch)

## Installation

```bash
npm install @bauer-group/accessibility-widget-nextjs
```

**No assets to host** — the widget loads from the BAUER GROUP CDN (floating `v1` tag) and stays current automatically.

## Usage

Zero-config — drop the client component into your root layout:

```tsx
// app/layout.tsx
import { AccessibilityWidgetClient } from '@bauer-group/accessibility-widget-nextjs';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        {children}
        <AccessibilityWidgetClient />
      </body>
    </html>
  );
}
```

## Configuration

`AccessibilityWidgetClient` forwards the React wrapper's props; the `config` prop is fully typed (`WidgetConfig`) and accepts **every** option of `window.AccessibilityWidgetConfig` — appearance, behaviour, content and the 15 accessibility features (`initialFeatures` / `disabledFeatures`). Full list (types, defaults, EN/DE): **[configuration reference](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/blob/main/docs/configuration.md)**.

```tsx
<AccessibilityWidgetClient
  config={{ position: 'bottom-left', locale: 'de', initialFeatures: { contrast: true } }}
/>
```

To self-host instead of the CDN, set `loaderSrc`, `coreSrc` and `cssHref` to your own asset URLs (e.g. under `public/accessibility-widget/*`).

## License

MIT · © 2026 BAUER GROUP — the widget loaded at runtime is separately licensed (AGPL-3.0-only or commercial).

---

<a id="-deutsch"></a>

## 🇩🇪 Deutsch

> Next.js-App-Router-Wrapper mit `'use client'`-Direktive.

[🇬🇧 English](#english) · **🇩🇪 Deutsch**

### Installation

```bash
npm install @bauer-group/accessibility-widget-nextjs
```

**Keine Assets zu hosten** — das Widget lädt vom BAUER GROUP CDN (floating `v1`-Tag) und bleibt automatisch aktuell.

### Nutzung

Zero-Config — die Client-Komponente ins Root-Layout einbinden:

```tsx
// app/layout.tsx
import { AccessibilityWidgetClient } from '@bauer-group/accessibility-widget-nextjs';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        {children}
        <AccessibilityWidgetClient />
      </body>
    </html>
  );
}
```

### Konfiguration

`AccessibilityWidgetClient` reicht die Props des React-Wrappers durch; die `config`-Prop ist vollständig typisiert (`WidgetConfig`) und akzeptiert **jede** Option von `window.AccessibilityWidgetConfig` — Darstellung, Verhalten, Inhalt und die 15 Barrierefreiheits-Funktionen (`initialFeatures` / `disabledFeatures`). Komplette Liste (Typen, Defaults, EN/DE): **[Konfigurations-Referenz](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/blob/main/docs/configuration.md)**.

```tsx
<AccessibilityWidgetClient
  config={{ position: 'bottom-left', locale: 'de', initialFeatures: { contrast: true } }}
/>
```

Zum Self-Hosting statt CDN `loaderSrc`, `coreSrc` und `cssHref` auf eigene Asset-URLs setzen (z. B. unter `public/accessibility-widget/*`).

### Lizenz

MIT · © 2026 BAUER GROUP — das zur Laufzeit geladene Widget ist separat lizenziert (AGPL-3.0-only oder kommerziell).

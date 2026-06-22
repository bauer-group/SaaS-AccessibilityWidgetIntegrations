# @bauer-group/accessibility-widget-astro

<a id="english"></a>

> Astro component for the BAUER GROUP Accessibility Widget.

**🇬🇧 English** · [🇩🇪 Deutsch](#-deutsch)

## Installation

```bash
npm install @bauer-group/accessibility-widget-astro
```

**No assets to host** — the widget loads from the BAUER GROUP CDN (floating `v1` tag) and stays current automatically.

## Usage

Zero-config — place the component once in your base layout:

```astro
---
import AccessibilityWidget from '@bauer-group/accessibility-widget-astro/src/AccessibilityWidget.astro';
---

<html lang="de">
  <body>
    <slot />
    <AccessibilityWidget />
  </body>
</html>
```

## Configuration

The `config` prop is fully typed (`WidgetConfig`) and accepts **every** option of `window.AccessibilityWidgetConfig` — appearance, behaviour, content and the 15 accessibility features (`initialFeatures` / `disabledFeatures`). Full list (types, defaults, EN/DE): **[configuration reference](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/blob/main/docs/configuration.md)**.

```astro
<AccessibilityWidget
  config={{ position: 'bottom-left', locale: 'de', initialFeatures: { contrast: true } }}
/>
```

To self-host instead of the CDN, set `loaderSrc`, `coreSrc` and `cssHref` to your own asset URLs.

## License

MIT · © 2026 BAUER GROUP — the widget loaded at runtime is separately licensed (AGPL-3.0-only or commercial).

---

<a id="-deutsch"></a>

## 🇩🇪 Deutsch

> Astro-Komponente für das BAUER GROUP Accessibility Widget.

[🇬🇧 English](#english) · **🇩🇪 Deutsch**

### Installation

```bash
npm install @bauer-group/accessibility-widget-astro
```

**Keine Assets zu hosten** — das Widget lädt vom BAUER GROUP CDN (floating `v1`-Tag) und bleibt automatisch aktuell.

### Nutzung

Zero-Config — die Komponente einmal im Basis-Layout platzieren:

```astro
---
import AccessibilityWidget from '@bauer-group/accessibility-widget-astro/src/AccessibilityWidget.astro';
---

<html lang="de">
  <body>
    <slot />
    <AccessibilityWidget />
  </body>
</html>
```

### Konfiguration

Die `config`-Prop ist vollständig typisiert (`WidgetConfig`) und akzeptiert **jede** Option von `window.AccessibilityWidgetConfig` — Darstellung, Verhalten, Inhalt und die 15 Barrierefreiheits-Funktionen (`initialFeatures` / `disabledFeatures`). Komplette Liste (Typen, Defaults, EN/DE): **[Konfigurations-Referenz](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/blob/main/docs/configuration.md)**.

```astro
<AccessibilityWidget
  config={{ position: 'bottom-left', locale: 'de', initialFeatures: { contrast: true } }}
/>
```

Zum Self-Hosting statt CDN `loaderSrc`, `coreSrc` und `cssHref` auf eigene Asset-URLs setzen.

### Lizenz

MIT · © 2026 BAUER GROUP — das zur Laufzeit geladene Widget ist separat lizenziert (AGPL-3.0-only oder kommerziell).

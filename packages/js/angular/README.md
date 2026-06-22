# @bauer-group/accessibility-widget-angular

<a id="english"></a>

> Angular 19 standalone component (SSR-safe) for the BAUER GROUP Accessibility Widget.

**🇬🇧 English** · [🇩🇪 Deutsch](#-deutsch)

## Installation

```bash
npm install @bauer-group/accessibility-widget-angular
```

**No assets to host** — the widget loads from the BAUER GROUP CDN (floating `v1` tag) and stays current automatically.

## Usage

Zero-config — import the standalone component and place it once:

```ts
import { Component } from '@angular/core';
import { AccessibilityWidgetComponent } from '@bauer-group/accessibility-widget-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccessibilityWidgetComponent],
  template: `<accessibility-widget />`,
})
export class AppComponent {}
```

## Configuration

The `[config]` input is fully typed (`WidgetConfig`) and accepts **every** option of `window.AccessibilityWidgetConfig` — appearance, behaviour, content and the 15 accessibility features (`initialFeatures` / `disabledFeatures`). Full list (types, defaults, EN/DE): **[configuration reference](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/blob/main/docs/configuration.md)**.

```ts
template: `<accessibility-widget
  [config]="{ position: 'bottom-left', locale: 'de', initialFeatures: { contrast: true } }"
/>`;
```

To self-host instead of the CDN, set the `loaderSrc`, `coreSrc` and `cssHref` inputs to your own asset URLs.

## License

MIT · © 2026 BAUER GROUP — the widget loaded at runtime is separately licensed (AGPL-3.0-only or commercial).

---

<a id="-deutsch"></a>

## 🇩🇪 Deutsch

> Angular-19-Standalone-Component (SSR-sicher) für das BAUER GROUP Accessibility Widget.

[🇬🇧 English](#english) · **🇩🇪 Deutsch**

### Installation

```bash
npm install @bauer-group/accessibility-widget-angular
```

**Keine Assets zu hosten** — das Widget lädt vom BAUER GROUP CDN (floating `v1`-Tag) und bleibt automatisch aktuell.

### Nutzung

Zero-Config — die Standalone-Component importieren und einmal platzieren:

```ts
import { Component } from '@angular/core';
import { AccessibilityWidgetComponent } from '@bauer-group/accessibility-widget-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccessibilityWidgetComponent],
  template: `<accessibility-widget />`,
})
export class AppComponent {}
```

### Konfiguration

Der `[config]`-Input ist vollständig typisiert (`WidgetConfig`) und akzeptiert **jede** Option von `window.AccessibilityWidgetConfig` — Darstellung, Verhalten, Inhalt und die 15 Barrierefreiheits-Funktionen (`initialFeatures` / `disabledFeatures`). Komplette Liste (Typen, Defaults, EN/DE): **[Konfigurations-Referenz](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/blob/main/docs/configuration.md)**.

```ts
template: `<accessibility-widget
  [config]="{ position: 'bottom-left', locale: 'de', initialFeatures: { contrast: true } }"
/>`;
```

Zum Self-Hosting statt CDN die Inputs `loaderSrc`, `coreSrc` und `cssHref` auf eigene Asset-URLs setzen.

### Lizenz

MIT · © 2026 BAUER GROUP — das zur Laufzeit geladene Widget ist separat lizenziert (AGPL-3.0-only oder kommerziell).

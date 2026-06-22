# @bauer-group/accessibility-widget-vue

<a id="english"></a>

> Vue 3 wrapper for the BAUER GROUP Accessibility Widget.

**🇬🇧 English** · [🇩🇪 Deutsch](#-deutsch)

## Installation

```bash
npm install @bauer-group/accessibility-widget-vue
```

**No assets to host** — the widget loads from the BAUER GROUP CDN (floating `v1` tag) and stays current automatically.

## Usage

Zero-config — drop the component in once (e.g. in `App.vue`):

```vue
<script setup lang="ts">
import { AccessibilityWidget } from '@bauer-group/accessibility-widget-vue';
</script>

<template>
  <AccessibilityWidget />
</template>
```

## Configuration

The `config` prop is fully typed (`WidgetConfig`) and accepts **every** option of `window.AccessibilityWidgetConfig` — appearance, behaviour, content and the 15 accessibility features (`initialFeatures` / `disabledFeatures`). Full list (types, defaults, EN/DE): **[configuration reference](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/blob/main/docs/configuration.md)**.

```vue
<AccessibilityWidget
  :config="{ position: 'bottom-left', locale: 'de', initialFeatures: { contrast: true } }"
/>
```

To self-host instead of the CDN, set the `loader-src`, `core-src` and `css-href` props to your own asset URLs.

## License

MIT · © 2026 BAUER GROUP — the widget loaded at runtime is separately licensed (AGPL-3.0-only or commercial).

---

<a id="-deutsch"></a>

## 🇩🇪 Deutsch

> Vue-3-Wrapper für das BAUER GROUP Accessibility Widget.

[🇬🇧 English](#english) · **🇩🇪 Deutsch**

### Installation

```bash
npm install @bauer-group/accessibility-widget-vue
```

**Keine Assets zu hosten** — das Widget lädt vom BAUER GROUP CDN (floating `v1`-Tag) und bleibt automatisch aktuell.

### Nutzung

Zero-Config — die Komponente einmal einbinden (z. B. in `App.vue`):

```vue
<script setup lang="ts">
import { AccessibilityWidget } from '@bauer-group/accessibility-widget-vue';
</script>

<template>
  <AccessibilityWidget />
</template>
```

### Konfiguration

Die `config`-Prop ist vollständig typisiert (`WidgetConfig`) und akzeptiert **jede** Option von `window.AccessibilityWidgetConfig` — Darstellung, Verhalten, Inhalt und die 15 Barrierefreiheits-Funktionen (`initialFeatures` / `disabledFeatures`). Komplette Liste (Typen, Defaults, EN/DE): **[Konfigurations-Referenz](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/blob/main/docs/configuration.md)**.

```vue
<AccessibilityWidget
  :config="{ position: 'bottom-left', locale: 'de', initialFeatures: { contrast: true } }"
/>
```

Zum Self-Hosting statt CDN die Props `loader-src`, `core-src` und `css-href` auf eigene Asset-URLs setzen.

### Lizenz

MIT · © 2026 BAUER GROUP — das zur Laufzeit geladene Widget ist separat lizenziert (AGPL-3.0-only oder kommerziell).

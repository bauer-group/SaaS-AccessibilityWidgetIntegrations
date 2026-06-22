# @bauer-group/accessibility-widget-svelte

<a id="english"></a>

> Svelte 5 action for the BAUER GROUP Accessibility Widget.

**🇬🇧 English** · [🇩🇪 Deutsch](#-deutsch)

## Installation

```bash
npm install @bauer-group/accessibility-widget-svelte
```

**No assets to host** — the widget loads from the BAUER GROUP CDN (floating `v1` tag) and stays current automatically.

## Usage

Zero-config — attach the action to any element once (e.g. in your root layout):

```svelte
<script lang="ts">
  import { accessibilityWidget } from '@bauer-group/accessibility-widget-svelte';
</script>

<div use:accessibilityWidget></div>
```

## Configuration

Pass `config` in the action options — fully typed (`WidgetConfig`), accepting **every** option of `window.AccessibilityWidgetConfig` (appearance, behaviour, content and the 15 accessibility features via `initialFeatures` / `disabledFeatures`). Full list (types, defaults, EN/DE): **[configuration reference](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/blob/main/docs/configuration.md)**.

```svelte
<div
  use:accessibilityWidget={{
    config: { position: 'bottom-left', locale: 'de', initialFeatures: { contrast: true } },
  }}
></div>
```

To self-host instead of the CDN, add `loaderSrc`, `coreSrc` and `cssHref` to the action options.

## License

MIT · © 2026 BAUER GROUP — the widget loaded at runtime is separately licensed (AGPL-3.0-only or commercial).

---

<a id="-deutsch"></a>

## 🇩🇪 Deutsch

> Svelte-5-Action für das BAUER GROUP Accessibility Widget.

[🇬🇧 English](#english) · **🇩🇪 Deutsch**

### Installation

```bash
npm install @bauer-group/accessibility-widget-svelte
```

**Keine Assets zu hosten** — das Widget lädt vom BAUER GROUP CDN (floating `v1`-Tag) und bleibt automatisch aktuell.

### Nutzung

Zero-Config — die Action einmal an ein beliebiges Element hängen (z. B. im Root-Layout):

```svelte
<script lang="ts">
  import { accessibilityWidget } from '@bauer-group/accessibility-widget-svelte';
</script>

<div use:accessibilityWidget></div>
```

### Konfiguration

`config` in den Action-Optionen übergeben — vollständig typisiert (`WidgetConfig`), akzeptiert **jede** Option von `window.AccessibilityWidgetConfig` (Darstellung, Verhalten, Inhalt und die 15 Barrierefreiheits-Funktionen über `initialFeatures` / `disabledFeatures`). Komplette Liste (Typen, Defaults, EN/DE): **[Konfigurations-Referenz](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/blob/main/docs/configuration.md)**.

```svelte
<div
  use:accessibilityWidget={{
    config: { position: 'bottom-left', locale: 'de', initialFeatures: { contrast: true } },
  }}
></div>
```

Zum Self-Hosting statt CDN `loaderSrc`, `coreSrc` und `cssHref` zu den Action-Optionen hinzufügen.

### Lizenz

MIT · © 2026 BAUER GROUP — das zur Laufzeit geladene Widget ist separat lizenziert (AGPL-3.0-only oder kommerziell).

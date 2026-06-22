# @bauer-group/accessibility-widget-nuxt

<a id="english"></a>

> Nuxt 3 client plugin for the BAUER GROUP Accessibility Widget.

**🇬🇧 English** · [🇩🇪 Deutsch](#-deutsch)

## Setup

```bash
npm install @bauer-group/accessibility-widget-nuxt
```

**No assets to host** — the widget loads from the BAUER GROUP CDN (floating `v1` tag) and stays current automatically.

1. Copy **both** plugin files into your `plugins/` folder (keep them together):

```bash
cp node_modules/@bauer-group/accessibility-widget-nuxt/src/plugin.client.ts plugins/accessibility-widget.client.ts
cp node_modules/@bauer-group/accessibility-widget-nuxt/src/widget-config.generated.ts plugins/widget-config.generated.ts
```

2. Done — the widget loads on every page. To configure it, add `accessibilityWidget` to `runtimeConfig.public` in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      accessibilityWidget: {
        config: { position: 'bottom-left', locale: 'de', initialFeatures: { contrast: true } },
      },
    },
  },
});
```

## Configuration

`config` is the typed `WidgetConfig` and accepts **every** option of `window.AccessibilityWidgetConfig` — appearance, behaviour, content and the 15 accessibility features (`initialFeatures` / `disabledFeatures`). Full list (types, defaults, EN/DE): **[configuration reference](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/blob/main/docs/configuration.md)**. To self-host instead of the CDN, add `loaderSrc`, `coreSrc` and `cssHref` next to `config`.

## License

MIT · © 2026 BAUER GROUP — the widget loaded at runtime is separately licensed (AGPL-3.0-only or commercial).

---

<a id="-deutsch"></a>

## 🇩🇪 Deutsch

> Nuxt-3-Client-Plugin für das BAUER GROUP Accessibility Widget.

[🇬🇧 English](#english) · **🇩🇪 Deutsch**

### Einrichtung

```bash
npm install @bauer-group/accessibility-widget-nuxt
```

**Keine Assets zu hosten** — das Widget lädt vom BAUER GROUP CDN (floating `v1`-Tag) und bleibt automatisch aktuell.

1. **Beide** Plugin-Dateien in den `plugins/`-Ordner kopieren (zusammen lassen):

```bash
cp node_modules/@bauer-group/accessibility-widget-nuxt/src/plugin.client.ts plugins/accessibility-widget.client.ts
cp node_modules/@bauer-group/accessibility-widget-nuxt/src/widget-config.generated.ts plugins/widget-config.generated.ts
```

2. Fertig — das Widget lädt auf jeder Seite. Zur Konfiguration `accessibilityWidget` in `runtimeConfig.public` in `nuxt.config.ts` ergänzen:

```ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      accessibilityWidget: {
        config: { position: 'bottom-left', locale: 'de', initialFeatures: { contrast: true } },
      },
    },
  },
});
```

### Konfiguration

`config` ist das typisierte `WidgetConfig` und akzeptiert **jede** Option von `window.AccessibilityWidgetConfig` — Darstellung, Verhalten, Inhalt und die 15 Barrierefreiheits-Funktionen (`initialFeatures` / `disabledFeatures`). Komplette Liste (Typen, Defaults, EN/DE): **[Konfigurations-Referenz](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/blob/main/docs/configuration.md)**. Zum Self-Hosting statt CDN `loaderSrc`, `coreSrc` und `cssHref` neben `config` ergänzen.

### Lizenz

MIT · © 2026 BAUER GROUP — das zur Laufzeit geladene Widget ist separat lizenziert (AGPL-3.0-only oder kommerziell).

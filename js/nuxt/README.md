# @bauer-group/accessibility-widget-nuxt

<a id="english"></a>

> Nuxt 3 client plugin for the BAUER GROUP Accessibility Widget.

**🇬🇧 English** · [🇩🇪 Deutsch](#-deutsch)

## Setup

1. Copy the widget assets to `public/accessibility-widget/*`.
2. Copy the plugin file:

```bash
cp node_modules/@bauer-group/accessibility-widget-nuxt/src/plugin.client.ts plugins/accessibility-widget.client.ts
```

3. In `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      accessibilityWidget: {
        loaderSrc: '/accessibility-widget/accessibility-widget-loader.min.js',
        config: { locale: 'auto' },
      },
    },
  },
});
```

## License

MIT · © 2026 BAUER GROUP — the widget loaded at runtime is separately licensed (AGPL-3.0-only or commercial).

---

<a id="-deutsch"></a>

## 🇩🇪 Deutsch

> Nuxt-3-Client-Plugin für das BAUER GROUP Accessibility Widget.

[🇬🇧 English](#english) · **🇩🇪 Deutsch**

### Einrichtung

1. Widget-Assets nach `public/accessibility-widget/*` kopieren.
2. Plugin-Datei kopieren:

```bash
cp node_modules/@bauer-group/accessibility-widget-nuxt/src/plugin.client.ts plugins/accessibility-widget.client.ts
```

3. In `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      accessibilityWidget: {
        loaderSrc: '/accessibility-widget/accessibility-widget-loader.min.js',
        config: { locale: 'auto' },
      },
    },
  },
});
```

### Lizenz

MIT · © 2026 BAUER GROUP — the widget loaded at runtime is separately licensed (AGPL-3.0-only or commercial).

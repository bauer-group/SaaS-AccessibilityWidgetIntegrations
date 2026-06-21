# Accessibility Widget — Shopify Theme Integration

<a id="english"></a>

> Shopify theme integration that loads the BAUER GROUP Accessibility Widget.

**🇬🇧 English** · [🇩🇪 Deutsch](#-deutsch)

## Embedding as a theme block (Online Store 2.0)

1. Copy the widget assets from `packages/widget/dist/` to the Shopify theme's `assets/`:
   - `accessibility-widget-loader.min.js`
   - `accessibility-widget-core.min.js`
   - `accessibility-widget.min.css`
2. Add the Liquid files to the theme:
   - `blocks/accessibility-widget.liquid` → `blocks/`
   - `snippets/accessibility-widget.liquid` → `snippets/`
3. In the theme editor: Section → add the "Accessibility Widget" app block.

## Embedding via `theme.liquid` (classic)

```liquid
{% render 'accessibility-widget',
  position: 'bottom-right',
  locale: 'auto',
  primary_color: '#0058a3' %}
```

AGPL-3.0-only or commercial · © 2026 BAUER GROUP

---

<a id="-deutsch"></a>

## 🇩🇪 Deutsch

> Shopify-Theme-Integration, die das BAUER GROUP Accessibility Widget lädt.

[🇬🇧 English](#english) · **🇩🇪 Deutsch**

### Einbindung als Theme-Block (Online Store 2.0)

1. Widget-Assets aus `packages/widget/dist/` nach `assets/` des Shopify Themes kopieren:
   - `accessibility-widget-loader.min.js`
   - `accessibility-widget-core.min.js`
   - `accessibility-widget.min.css`
2. Liquid-Dateien ins Theme einfügen:
   - `blocks/accessibility-widget.liquid` → `blocks/`
   - `snippets/accessibility-widget.liquid` → `snippets/`
3. Im Theme-Editor: Abschnitt → App-Block "Accessibility Widget" hinzufügen.

### Einbindung per `theme.liquid` (klassisch)

```liquid
{% render 'accessibility-widget',
  position: 'bottom-right',
  locale: 'auto',
  primary_color: '#0058a3' %}
```

AGPL-3.0-only or commercial · © 2026 BAUER GROUP

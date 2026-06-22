# Accessibility Widget — Shopify Theme Integration

<a id="english"></a>

> Shopify (Online Store 2.0) integration that loads the BAUER GROUP Accessibility Widget (BFSG / EN 301 549 / WCAG 2.2 AA).

**🇬🇧 English** · [🇩🇪 Deutsch](#-deutsch)

**No assets to host** — the widget loads from the BAUER GROUP CDN (floating `v1` tag) and stays current automatically.

## Embedding as a theme app block (Online Store 2.0)

1. Add the two Liquid files to your theme (download the `shopify-accessibility-widget-<version>.zip` from the [GitHub Releases](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/releases/latest)):
   - `blocks/accessibility-widget.liquid` → theme `blocks/`
   - `snippets/accessibility-widget.liquid` → theme `snippets/`
2. Theme editor → **Add block** → **Accessibility Widget**.

## Embedding via `theme.liquid` (classic)

```liquid
{% render 'accessibility-widget',
  position: 'bottom-left',
  locale: 'auto',
  primaryColor: '#0058a3',
  initiallyEnabled: 'contrast' %}
```

## Configuration

In the theme editor the block exposes every option, grouped under **Appearance / Behavior / Content / Features / Advanced** headers and shown **bilingual (EN + DE)** in the admin language. Because Shopify caps a block at 25 settings, the 15 accessibility features are two compact comma-separated fields (**Initially enabled** / **Hidden**) — every other option is a dedicated control. Full option list: **[configuration reference](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/blob/main/docs/configuration.md)**.

## License

MIT · © 2026 BAUER GROUP — the widget loaded at runtime is separately licensed (AGPL-3.0-only or commercial).

---

<a id="-deutsch"></a>

## 🇩🇪 Deutsch

> Shopify-Integration (Online Store 2.0), die das BAUER GROUP Accessibility Widget lädt (BFSG / EN 301 549 / WCAG 2.2 AA).

[🇬🇧 English](#english) · **🇩🇪 Deutsch**

**Keine Assets zu hosten** — das Widget lädt vom BAUER GROUP CDN (floating `v1`-Tag) und bleibt automatisch aktuell.

### Einbindung als Theme-App-Block (Online Store 2.0)

1. Die zwei Liquid-Dateien ins Theme einfügen (`shopify-accessibility-widget-<version>.zip` von den [GitHub Releases](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/releases/latest) laden):
   - `blocks/accessibility-widget.liquid` → Theme-`blocks/`
   - `snippets/accessibility-widget.liquid` → Theme-`snippets/`
2. Theme-Editor → **Block hinzufügen** → **Accessibility Widget**.

### Einbindung per `theme.liquid` (klassisch)

```liquid
{% render 'accessibility-widget',
  position: 'bottom-left',
  locale: 'auto',
  primaryColor: '#0058a3',
  initiallyEnabled: 'contrast' %}
```

### Konfiguration

Im Theme-Editor bietet der Block jede Option, gruppiert unter **Darstellung / Verhalten / Inhalt / Funktionen / Erweitert** und **zweisprachig (EN + DE)** in der Admin-Sprache. Da Shopify einen Block auf 25 Einstellungen begrenzt, sind die 15 Barrierefreiheits-Funktionen zwei kompakte kommagetrennte Felder (**Standardmäßig aktiviert** / **Ausgeblendet**) — jede andere Option ist ein eigenes Steuerelement. Komplette Optionsliste: **[Konfigurations-Referenz](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/blob/main/docs/configuration.md)**.

### Lizenz

MIT · © 2026 BAUER GROUP — das zur Laufzeit geladene Widget ist separat lizenziert (AGPL-3.0-only oder kommerziell).

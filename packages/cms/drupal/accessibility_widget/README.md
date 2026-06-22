# Accessibility Widget — Drupal 10/11 Module

<a id="english"></a>

> Drupal 10/11 module that loads the BAUER GROUP Accessibility Widget (BFSG / EN 301 549 / WCAG 2.2 AA).

**🇬🇧 English** · [🇩🇪 Deutsch](#-deutsch)

## Installation

**No assets to host** — the widget loads from the BAUER GROUP CDN (floating `v1` tag) and stays current automatically.

1. Download `drupal-accessibility-widget-<version>.zip` from the [GitHub Releases](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/releases/latest) and extract the `accessibility_widget/` folder into `web/modules/custom/`.
2. Enable it:

```bash
drush en accessibility_widget
```

## Configuration

**Configuration → User interface → Accessibility Widget** (`/admin/config/user-interface/accessibility-widget`). Every option is exposed, grouped into collapsible sections (**Appearance / Behavior / Content / Features / Advanced**) and rendered in the **active interface language (EN + DE)** — position, offset, colour, locale, the 15 accessibility features, behaviour, the accessibility-statement URL and advanced self-hosting. Full option list: **[configuration reference](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/blob/main/docs/configuration.md)**.

## License

GPL-2.0-or-later · © 2026 BAUER GROUP — required by Drupal.org; the widget loaded at runtime is separately licensed (AGPL-3.0-only or commercial).

---

<a id="-deutsch"></a>

## 🇩🇪 Deutsch

> Drupal-10/11-Modul, das das BAUER GROUP Accessibility Widget lädt (BFSG / EN 301 549 / WCAG 2.2 AA).

[🇬🇧 English](#english) · **🇩🇪 Deutsch**

### Installation

**Keine Assets zu hosten** — das Widget lädt vom BAUER GROUP CDN (floating `v1`-Tag) und bleibt automatisch aktuell.

1. `drupal-accessibility-widget-<version>.zip` von den [GitHub Releases](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/releases/latest) herunterladen und den Ordner `accessibility_widget/` nach `web/modules/custom/` entpacken.
2. Aktivieren:

```bash
drush en accessibility_widget
```

### Konfiguration

**Konfiguration → Benutzeroberfläche → Accessibility Widget** (`/admin/config/user-interface/accessibility-widget`). Jede Option ist verfügbar, gruppiert in einklappbare Bereiche (**Darstellung / Verhalten / Inhalt / Funktionen / Erweitert**) und in der **aktiven Oberflächensprache (EN + DE)** dargestellt — Position, Abstand, Farbe, Sprache, die 15 Barrierefreiheits-Funktionen, Verhalten, URL der Barrierefreiheitserklärung und erweitertes Self-Hosting. Komplette Optionsliste: **[Konfigurations-Referenz](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/blob/main/docs/configuration.md)**.

### Lizenz

GPL-2.0-or-later · © 2026 BAUER GROUP — von Drupal.org gefordert; das zur Laufzeit geladene Widget ist separat lizenziert (AGPL-3.0-only oder kommerziell).

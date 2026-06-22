# Accessibility Widget — Shopware 6 Plugin

<a id="english"></a>

> Shopware 6 plugin that loads the BAUER GROUP Accessibility Widget (BFSG / EN 301 549 / WCAG 2.2 AA).

**🇬🇧 English** · [🇩🇪 Deutsch](#-deutsch)

## Installation via Composer

The plugin is **not on Packagist** (public Packagist can't host subdirectory packages from a monorepo). It ships from a small static Composer repository, so add that once, then require as usual:

```bash
# 1. Register the BAUER GROUP Composer repository (one-time, per project)
composer config repositories.bauer-group-accessibility composer \
  https://accessibility-integration.widget.professional-hosting.com/composer

# 2. Require, then install + activate the plugin
composer require bauer-group/accessibility-widget-shopware
bin/console plugin:refresh
bin/console plugin:install --activate AccessibilityWidget
bin/console cache:clear
```

**No assets to host** — the widget loads from the BAUER GROUP CDN (floating `v1` tag); a storefront subscriber injects the config + loader automatically, so there is nothing to `assets:install`.

> **Without Composer:** download `shopware-accessibility-widget-<version>.zip` from the [GitHub Releases](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/releases/latest) and install it under **Extensions → My extensions**.

## Configuration

**Settings → System → Plugins → BAUER GROUP Accessibility Widget.** Every option is exposed, grouped into cards (**Appearance / Behavior / Content / Features / Advanced**) with native **bilingual (EN + DE)** labels — position, offset, colour, locale, the 15 accessibility features, behaviour, the accessibility-statement URL and advanced self-hosting. Full option list: **[configuration reference](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/blob/main/docs/configuration.md)**.

## License

MIT · © 2026 BAUER GROUP — the widget loaded at runtime is separately licensed (AGPL-3.0-only or commercial).

---

<a id="-deutsch"></a>

## 🇩🇪 Deutsch

> Shopware-6-Plugin, das das BAUER GROUP Accessibility Widget lädt (BFSG / EN 301 549 / WCAG 2.2 AA).

[🇬🇧 English](#english) · **🇩🇪 Deutsch**

### Installation per Composer

Das Plugin ist **nicht auf Packagist** (öffentliches Packagist kann keine Unterordner-Pakete aus einem Monorepo hosten). Es kommt aus einem kleinen statischen Composer-Repository — dieses einmal hinzufügen, dann wie gewohnt installieren:

```bash
# 1. BAUER GROUP Composer-Repository registrieren (einmalig je Projekt)
composer config repositories.bauer-group-accessibility composer \
  https://accessibility-integration.widget.professional-hosting.com/composer

# 2. Plugin installieren + aktivieren
composer require bauer-group/accessibility-widget-shopware
bin/console plugin:refresh
bin/console plugin:install --activate AccessibilityWidget
bin/console cache:clear
```

**Keine Assets zu hosten** — das Widget lädt vom BAUER GROUP CDN (floating `v1`-Tag); ein Storefront-Subscriber injiziert Config + Loader automatisch, es gibt also kein `assets:install`.

> **Ohne Composer:** `shopware-accessibility-widget-<version>.zip` von den [GitHub Releases](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/releases/latest) herunterladen und unter **Erweiterungen → Meine Erweiterungen** installieren.

### Konfiguration

**Einstellungen → System → Plugins → BAUER GROUP Accessibility Widget.** Jede Option ist verfügbar, gruppiert in Karten (**Darstellung / Verhalten / Inhalt / Funktionen / Erweitert**) mit nativen **zweisprachigen (EN + DE)** Labels — Position, Abstand, Farbe, Sprache, die 15 Barrierefreiheits-Funktionen, Verhalten, URL der Barrierefreiheitserklärung und erweitertes Self-Hosting. Komplette Optionsliste: **[Konfigurations-Referenz](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/blob/main/docs/configuration.md)**.

### Lizenz

MIT · © 2026 BAUER GROUP — das zur Laufzeit geladene Widget ist separat lizenziert (AGPL-3.0-only oder kommerziell).

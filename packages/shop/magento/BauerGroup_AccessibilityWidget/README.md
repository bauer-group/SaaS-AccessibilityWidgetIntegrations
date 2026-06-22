# Accessibility Widget — Magento 2 Module

<a id="english"></a>

> Magento 2.4 module (Adobe Commerce / Open Source) that loads the BAUER GROUP Accessibility Widget (BFSG / EN 301 549 / WCAG 2.2 AA).

**🇬🇧 English** · [🇩🇪 Deutsch](#-deutsch)

## Installation via Composer

The module is **not on Packagist** (public Packagist can't host subdirectory packages from a monorepo). It ships from a small static Composer repository, so add that once, then require as usual:

```bash
# 1. Register the BAUER GROUP Composer repository (one-time, per project)
composer config repositories.bauer-group-accessibility composer \
  https://accessibility-integration.widget.professional-hosting.com/composer

# 2. Require + enable the module
composer require bauer-group/accessibility-widget-magento
bin/magento module:enable BauerGroup_AccessibilityWidget
bin/magento setup:upgrade
bin/magento cache:flush
```

In production mode also run `bin/magento setup:static-content:deploy`. **No assets to host** — the widget loads from the BAUER GROUP CDN (floating `v1` tag) and the module injects the config + loader into the storefront automatically.

> **Without Composer:** download `magento-accessibility-widget-<version>.zip` from the [GitHub Releases](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/releases/latest), extract it to `app/code/BauerGroup/AccessibilityWidget/`, then run the `module:enable` / `setup:upgrade` steps above.

## Configuration

**Stores → Configuration → General → Accessibility Widget.** Every option is exposed, grouped into sections (**Appearance / Behavior / Content / Features / Advanced**) with typed dropdowns and **bilingual (EN + DE)** labels following the admin locale — position, offset, colour, locale, the 15 accessibility features, behaviour, the accessibility-statement URL and advanced self-hosting. Settings are scope-aware (default / website / store). Full option list: **[configuration reference](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/blob/main/docs/configuration.md)**.

## License

MIT · © 2026 BAUER GROUP — the widget loaded at runtime is separately licensed (AGPL-3.0-only or commercial).

---

<a id="-deutsch"></a>

## 🇩🇪 Deutsch

> Magento-2.4-Modul (Adobe Commerce / Open Source), das das BAUER GROUP Accessibility Widget lädt (BFSG / EN 301 549 / WCAG 2.2 AA).

[🇬🇧 English](#english) · **🇩🇪 Deutsch**

### Installation per Composer

Das Modul ist **nicht auf Packagist** (öffentliches Packagist kann keine Unterordner-Pakete aus einem Monorepo hosten). Es kommt aus einem kleinen statischen Composer-Repository — dieses einmal hinzufügen, dann wie gewohnt installieren:

```bash
# 1. BAUER GROUP Composer-Repository registrieren (einmalig je Projekt)
composer config repositories.bauer-group-accessibility composer \
  https://accessibility-integration.widget.professional-hosting.com/composer

# 2. Modul installieren + aktivieren
composer require bauer-group/accessibility-widget-magento
bin/magento module:enable BauerGroup_AccessibilityWidget
bin/magento setup:upgrade
bin/magento cache:flush
```

Im Produktionsmodus zusätzlich `bin/magento setup:static-content:deploy` ausführen. **Keine Assets zu hosten** — das Widget lädt vom BAUER GROUP CDN (floating `v1`-Tag), und das Modul injiziert Config + Loader automatisch in die Storefront.

> **Ohne Composer:** `magento-accessibility-widget-<version>.zip` von den [GitHub Releases](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/releases/latest) herunterladen, nach `app/code/BauerGroup/AccessibilityWidget/` entpacken, dann die `module:enable`-/`setup:upgrade`-Schritte oben ausführen.

### Konfiguration

**Stores → Configuration → General → Accessibility Widget.** Jede Option ist verfügbar, gruppiert in Bereiche (**Darstellung / Verhalten / Inhalt / Funktionen / Erweitert**) mit typisierten Dropdowns und **zweisprachigen (EN + DE)** Labels gemäß Admin-Sprache — Position, Abstand, Farbe, Sprache, die 15 Barrierefreiheits-Funktionen, Verhalten, URL der Barrierefreiheitserklärung und erweitertes Self-Hosting. Einstellungen sind scope-fähig (Default / Website / Store). Komplette Optionsliste: **[Konfigurations-Referenz](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/blob/main/docs/configuration.md)**.

### Lizenz

MIT · © 2026 BAUER GROUP — das zur Laufzeit geladene Widget ist separat lizenziert (AGPL-3.0-only oder kommerziell).

# Accessibility Widget — TYPO3 13 Extension

<a id="english"></a>

> TYPO3 13 extension that loads the BAUER GROUP Accessibility Widget (BFSG / EN 301 549 / WCAG 2.2 AA).

**🇬🇧 English** · [🇩🇪 Deutsch](#-deutsch)

## Installation via Composer

The extension is **not on Packagist** (public Packagist can't host subdirectory packages from a monorepo). It ships from a small static Composer repository, so add that once, then require as usual:

```bash
# 1. Register the BAUER GROUP Composer repository (one-time, per project)
composer config repositories.bauer-group-accessibility composer \
  https://accessibility-integration.widget.professional-hosting.com/composer

# 2. Require the extension (resolves from the matching release tag)
composer require bauer-group/accessibility-widget-typo3

# 3. Run the extension setup
vendor/bin/typo3 extension:setup
```

Composer-installed extensions are active automatically — **nothing else to wire up**. There is no static TypoScript template to include and **no assets to host**: the widget loads from the BAUER GROUP CDN (floating `v1` tag) and a PSR-15 middleware injects the config + loader into every page automatically.

> **Without Composer:** download `typo3-accessibility-widget-<version>.zip` from the [GitHub Releases](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/releases/latest) and install it in the Extensions module.

## Configuration

**Admin Tools → Settings → Extension Configuration → `accessibility_widget`.** Every option is exposed, grouped (**Appearance / Behavior / Content / Features / Advanced**) with **bilingual (EN + DE)** labels following the backend language — position, offset, colour, locale, the 15 accessibility features (two comma-separated lists), behaviour, the accessibility-statement URL and advanced self-hosting. Full option list: **[configuration reference](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/blob/main/docs/configuration.md)**.

## License

MIT · © 2026 BAUER GROUP — the widget loaded at runtime is separately licensed (AGPL-3.0-only or commercial).

---

<a id="-deutsch"></a>

## 🇩🇪 Deutsch

> TYPO3-13-Extension, die das BAUER GROUP Accessibility Widget lädt (BFSG / EN 301 549 / WCAG 2.2 AA).

[🇬🇧 English](#english) · **🇩🇪 Deutsch**

### Installation per Composer

Die Extension ist **nicht auf Packagist** (öffentliches Packagist kann keine Unterordner-Pakete aus einem Monorepo hosten). Sie kommt aus einem kleinen statischen Composer-Repository — dieses einmal hinzufügen, dann wie gewohnt installieren:

```bash
# 1. BAUER GROUP Composer-Repository registrieren (einmalig je Projekt)
composer config repositories.bauer-group-accessibility composer \
  https://accessibility-integration.widget.professional-hosting.com/composer

# 2. Extension installieren (löst über das passende Release-Tag auf)
composer require bauer-group/accessibility-widget-typo3

# 3. Extension-Setup ausführen
vendor/bin/typo3 extension:setup
```

Per Composer installierte Extensions sind automatisch aktiv — **mehr ist nicht nötig**. Es gibt kein statisches TypoScript-Template einzubinden und **keine Assets zu hosten**: Das Widget lädt vom BAUER GROUP CDN (floating `v1`-Tag), und eine PSR-15-Middleware injiziert Config + Loader automatisch in jede Seite.

> **Ohne Composer:** `typo3-accessibility-widget-<version>.zip` von den [GitHub Releases](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/releases/latest) herunterladen und im Erweiterungen-Modul installieren.

### Konfiguration

**Admin-Werkzeuge → Einstellungen → Extension-Konfiguration → `accessibility_widget`.** Jede Option ist verfügbar, gruppiert (**Darstellung / Verhalten / Inhalt / Funktionen / Erweitert**) mit **zweisprachigen (EN + DE)** Labels gemäß Backend-Sprache — Position, Abstand, Farbe, Sprache, die 15 Barrierefreiheits-Funktionen (zwei kommagetrennte Listen), Verhalten, URL der Barrierefreiheitserklärung und erweitertes Self-Hosting. Komplette Optionsliste: **[Konfigurations-Referenz](https://github.com/bauer-group/SaaS-AccessibilityWidgetIntegrations/blob/main/docs/configuration.md)**.

### Lizenz

MIT · © 2026 BAUER GROUP — das zur Laufzeit geladene Widget ist separat lizenziert (AGPL-3.0-only oder kommerziell).

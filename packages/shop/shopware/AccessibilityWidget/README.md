# Accessibility Widget — Shopware 6 Plugin

<a id="english"></a>

> Shopware 6 plugin that loads the BAUER GROUP Accessibility Widget.

**🇬🇧 English** · [🇩🇪 Deutsch](#-deutsch)

```bash
composer require bauer-group/accessibility-widget-shopware
bin/console plugin:refresh
bin/console plugin:install --activate AccessibilityWidget
bin/console assets:install
```

Copy the widget assets from `packages/widget/dist/` to `src/Resources/public/`. After `bin/console assets:install` they are available under `/bundles/accessibilitywidget/*`.

Configuration: plugin settings in the Shopware admin.

MIT · © 2026 BAUER GROUP — the widget loaded at runtime is separately licensed (AGPL-3.0-only or commercial).

---

<a id="-deutsch"></a>

## 🇩🇪 Deutsch

> Shopware-6-Plugin, das das BAUER GROUP Accessibility Widget lädt.

[🇬🇧 English](#english) · **🇩🇪 Deutsch**

```bash
composer require bauer-group/accessibility-widget-shopware
bin/console plugin:refresh
bin/console plugin:install --activate AccessibilityWidget
bin/console assets:install
```

Widget-Assets aus `packages/widget/dist/` nach `src/Resources/public/` kopieren. Nach `bin/console assets:install` liegen sie unter `/bundles/accessibilitywidget/*`.

Konfiguration: Plugin-Einstellungen im Shopware-Admin.

MIT · © 2026 BAUER GROUP — the widget loaded at runtime is separately licensed (AGPL-3.0-only or commercial).

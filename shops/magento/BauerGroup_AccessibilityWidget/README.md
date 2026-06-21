# Accessibility Widget — Magento 2 Module

<a id="english"></a>

> Magento 2 module that loads the BAUER GROUP Accessibility Widget.

**🇬🇧 English** · [🇩🇪 Deutsch](#-deutsch)

```bash
composer require bauer-group/accessibility-widget-magento
bin/magento module:enable BauerGroup_AccessibilityWidget
bin/magento setup:upgrade
bin/magento setup:static-content:deploy
```

Copy the widget assets from `packages/widget/dist/` to `view/frontend/web/` (`accessibility-widget-loader.min.js`, `accessibility-widget-core.min.js`, `accessibility-widget.min.css`).

Configuration: Stores → Configuration → (custom: `accessibility_widget/settings/*`).

AGPL-3.0-only or commercial · © 2026 BAUER GROUP

---

<a id="-deutsch"></a>

## 🇩🇪 Deutsch

> Magento-2-Modul, das das BAUER GROUP Accessibility Widget lädt.

[🇬🇧 English](#english) · **🇩🇪 Deutsch**

```bash
composer require bauer-group/accessibility-widget-magento
bin/magento module:enable BauerGroup_AccessibilityWidget
bin/magento setup:upgrade
bin/magento setup:static-content:deploy
```

Widget-Assets aus `packages/widget/dist/` nach `view/frontend/web/` kopieren (`accessibility-widget-loader.min.js`, `accessibility-widget-core.min.js`, `accessibility-widget.min.css`).

Konfiguration: Stores → Configuration → (benutzerdefiniert: `accessibility_widget/settings/*`).

AGPL-3.0-only or commercial · © 2026 BAUER GROUP

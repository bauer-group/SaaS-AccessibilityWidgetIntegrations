# @bauer-group/accessibility-widget-astro

<a id="english"></a>

> Astro component for the BAUER GROUP Accessibility Widget.

**🇬🇧 English** · [🇩🇪 Deutsch](#-deutsch)

## Usage

```astro
---
import AccessibilityWidget from '@bauer-group/accessibility-widget-astro/src/AccessibilityWidget.astro';
---

<html lang="de">
  <body>
    <slot />
    <AccessibilityWidget
      loaderSrc="/accessibility-widget/accessibility-widget-loader.min.js"
      cssHref="/accessibility-widget/accessibility-widget.min.css"
      config={{ locale: 'auto' }}
    />
  </body>
</html>
```

Widget assets go to `public/accessibility-widget/*`.

## License

MIT · © 2026 BAUER GROUP — the widget loaded at runtime is separately licensed (AGPL-3.0-only or commercial).

---

<a id="-deutsch"></a>

## 🇩🇪 Deutsch

> Astro-Komponente für das BAUER GROUP Accessibility Widget.

[🇬🇧 English](#english) · **🇩🇪 Deutsch**

### Nutzung

```astro
---
import AccessibilityWidget from '@bauer-group/accessibility-widget-astro/src/AccessibilityWidget.astro';
---

<html lang="de">
  <body>
    <slot />
    <AccessibilityWidget
      loaderSrc="/accessibility-widget/accessibility-widget-loader.min.js"
      cssHref="/accessibility-widget/accessibility-widget.min.css"
      config={{ locale: 'auto' }}
    />
  </body>
</html>
```

Widget-Assets nach `public/accessibility-widget/*`.

### Lizenz

MIT · © 2026 BAUER GROUP — the widget loaded at runtime is separately licensed (AGPL-3.0-only or commercial).

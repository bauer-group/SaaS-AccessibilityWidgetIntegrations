# @bauer-group/accessibility-widget-nextjs

<a id="english"></a>

> Next.js App Router wrapper with the `'use client'` directive.

**🇬🇧 English** · [🇩🇪 Deutsch](#-deutsch)

## Usage

```tsx
// app/layout.tsx
import { AccessibilityWidgetClient } from '@bauer-group/accessibility-widget-nextjs';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        {children}
        <AccessibilityWidgetClient
          loaderSrc="/accessibility-widget/accessibility-widget-loader.min.js"
          cssHref="/accessibility-widget/accessibility-widget.min.css"
          config={{ locale: 'auto' }}
        />
      </body>
    </html>
  );
}
```

Copy the widget assets to `public/accessibility-widget/*`.

## License

AGPL-3.0-only or commercial · © 2026 BAUER GROUP

---

<a id="-deutsch"></a>

## 🇩🇪 Deutsch

> Next.js-App-Router-Wrapper mit `'use client'`-Direktive.

[🇬🇧 English](#english) · **🇩🇪 Deutsch**

### Nutzung

```tsx
// app/layout.tsx
import { AccessibilityWidgetClient } from '@bauer-group/accessibility-widget-nextjs';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        {children}
        <AccessibilityWidgetClient
          loaderSrc="/accessibility-widget/accessibility-widget-loader.min.js"
          cssHref="/accessibility-widget/accessibility-widget.min.css"
          config={{ locale: 'auto' }}
        />
      </body>
    </html>
  );
}
```

Widget-Assets nach `public/accessibility-widget/*` kopieren.

### Lizenz

AGPL-3.0-only or commercial · © 2026 BAUER GROUP

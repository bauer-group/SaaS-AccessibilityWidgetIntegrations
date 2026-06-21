# @bauer-group/accessibility-widget-angular

<a id="english"></a>

> Angular 19 standalone component (SSR-safe) for the BAUER GROUP Accessibility Widget.

**🇬🇧 English** · [🇩🇪 Deutsch](#-deutsch)

## Usage

```ts
import { Component } from '@angular/core';
import { AccessibilityWidgetComponent } from '@bauer-group/accessibility-widget-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccessibilityWidgetComponent],
  template: `<accessibility-widget
    loaderSrc="/accessibility-widget/accessibility-widget-loader.min.js"
    [config]="{ locale: 'de' }"
  />`,
})
export class AppComponent {}
```

## License

MIT · © 2026 BAUER GROUP — the widget loaded at runtime is separately licensed (AGPL-3.0-only or commercial).

---

<a id="-deutsch"></a>

## 🇩🇪 Deutsch

> Angular-19-Standalone-Component (SSR-sicher) für das BAUER GROUP Accessibility Widget.

[🇬🇧 English](#english) · **🇩🇪 Deutsch**

### Nutzung

```ts
import { Component } from '@angular/core';
import { AccessibilityWidgetComponent } from '@bauer-group/accessibility-widget-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccessibilityWidgetComponent],
  template: `<accessibility-widget
    loaderSrc="/accessibility-widget/accessibility-widget-loader.min.js"
    [config]="{ locale: 'de' }"
  />`,
})
export class AppComponent {}
```

### Lizenz

MIT · © 2026 BAUER GROUP — the widget loaded at runtime is separately licensed (AGPL-3.0-only or commercial).

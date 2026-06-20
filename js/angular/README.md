# @bauer-group/accessibility-widget-angular

Angular 19 Standalone Component (SSR-safe).

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

AGPL-3.0-only or commercial · © 2026 BAUER GROUP

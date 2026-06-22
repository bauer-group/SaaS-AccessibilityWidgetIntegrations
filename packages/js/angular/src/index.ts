import { Component, Input, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  type WidgetConfig,
  type WidgetApi,
  DEFAULT_LOADER_SRC,
  DEFAULT_CORE_SRC,
  DEFAULT_CSS_HREF,
} from './widget-config.generated.js';

/**
 * Full widget runtime config — generated from the shared MIT schema
 * (config/widget-config.mjs), so this wrapper keeps no dependency on the (AGPL)
 * widget package. Unknown keys still pass through to the runtime config.
 */
export type {
  WidgetConfig,
  WidgetApi,
  WidgetPosition,
  WidgetLocale,
  FeatureId,
} from './widget-config.generated.js';

declare global {
  interface Window {
    AccessibilityWidgetConfig?: WidgetConfig;
    AccessibilityWidget?: WidgetApi;
  }
}

@Component({
  selector: 'accessibility-widget',
  standalone: true,
  template: '',
})
export class AccessibilityWidgetComponent implements OnInit {
  @Input() loaderSrc = DEFAULT_LOADER_SRC;
  @Input() coreSrc = DEFAULT_CORE_SRC;
  @Input() cssHref = DEFAULT_CSS_HREF;
  @Input() config: WidgetConfig = {};

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    // The loader can't derive core/CSS from its own <script src>; pin them here.
    window.AccessibilityWidgetConfig = {
      ...(window.AccessibilityWidgetConfig ?? {}),
      corePath: this.coreSrc,
      cssPath: this.cssHref,
      ...this.config,
    };

    if (this.cssHref && !document.querySelector('link[data-aw-css]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = this.cssHref;
      link.setAttribute('data-aw-css', '1');
      document.head.appendChild(link);
    }
    if (this.loaderSrc && !document.querySelector('script[data-aw-loader]')) {
      const s = document.createElement('script');
      s.src = this.loaderSrc;
      s.defer = true;
      s.setAttribute('data-aw-loader', '1');
      document.head.appendChild(s);
    }
  }
}

export const openAccessibilityWidget = (): Promise<void> | undefined =>
  window.AccessibilityWidget?.open();
export const closeAccessibilityWidget = (): void => window.AccessibilityWidget?.close();
export const resetAccessibilityWidget = (): void => window.AccessibilityWidget?.reset();

/** Programmatically toggle a widget feature, e.g. `setAccessibilityWidgetFeature('contrast', true)`. */
export const setAccessibilityWidgetFeature = (
  id: string,
  value: unknown,
): Promise<void> | undefined => window.AccessibilityWidget?.set(id, value);

/** Read the widget's current state (active features, preferences, …). */
export const getAccessibilityWidgetState = (): unknown => window.AccessibilityWidget?.getState();

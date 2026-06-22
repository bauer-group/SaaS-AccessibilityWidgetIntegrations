import {
  type WidgetConfig,
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
  WidgetPosition,
  WidgetLocale,
  FeatureId,
} from './widget-config.generated.js';

/**
 * Nuxt client-only plugin. Copy BOTH `plugin.client.ts` and its sibling
 * `widget-config.generated.ts` from this package's `src/` into your Nuxt
 * `plugins/` folder (keep them together) — e.g. as
 * `plugins/accessibility-widget.client.ts`. By default the widget loads from the
 * CDN `v1` tag — no config needed. To self-host/mirror, override via
 * `runtimeConfig.public.accessibilityWidget`
 * in nuxt.config.ts:
 *
 *   export default defineNuxtConfig({
 *     runtimeConfig: {
 *       public: {
 *         accessibilityWidget: {
 *           loaderSrc: '/accessibility-widget/accessibility-widget-loader.min.js',
 *           coreSrc:   '/accessibility-widget/accessibility-widget-core.min.js',
 *           cssHref:   '/accessibility-widget/accessibility-widget.min.css',
 *           config:    { locale: 'auto' },
 *         },
 *       },
 *     },
 *   });
 */
interface NuxtRuntime {
  public: {
    accessibilityWidget?: {
      loaderSrc?: string;
      coreSrc?: string;
      cssHref?: string;
      config?: WidgetConfig;
    };
  };
}

declare function defineNuxtPlugin(fn: () => void): unknown;
declare function useRuntimeConfig(): NuxtRuntime;

export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return;
  const cfg = useRuntimeConfig().public.accessibilityWidget ?? {};
  const loaderSrc = cfg.loaderSrc ?? DEFAULT_LOADER_SRC;
  const coreSrc = cfg.coreSrc ?? DEFAULT_CORE_SRC;
  const cssHref = cfg.cssHref ?? DEFAULT_CSS_HREF;

  const w = window as unknown as { AccessibilityWidgetConfig?: WidgetConfig };
  // The loader can't derive core/CSS from its own <script src>; pin them here.
  w.AccessibilityWidgetConfig = {
    ...(w.AccessibilityWidgetConfig ?? {}),
    corePath: coreSrc,
    cssPath: cssHref,
    ...(cfg.config ?? {}),
  };

  if (cssHref && !document.querySelector('link[data-aw-css]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssHref;
    link.setAttribute('data-aw-css', '1');
    document.head.appendChild(link);
  }
  if (loaderSrc && !document.querySelector('script[data-aw-loader]')) {
    const s = document.createElement('script');
    s.src = loaderSrc;
    s.defer = true;
    s.setAttribute('data-aw-loader', '1');
    document.head.appendChild(s);
  }
});

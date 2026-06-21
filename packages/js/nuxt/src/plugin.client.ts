/**
 * Default CDN origin — the floating `v1` (major) tag. The widget stays current
 * automatically. Override via runtimeConfig only to self-host/mirror.
 */
const CDN_V1 = 'https://widgets.professional-hosting.com/accessibility-widget/v1';
const DEFAULT_LOADER_SRC = `${CDN_V1}/accessibility-widget-loader.min.js`;
const DEFAULT_CORE_SRC = `${CDN_V1}/accessibility-widget-core.min.js`;
const DEFAULT_CSS_HREF = `${CDN_V1}/accessibility-widget.min.css`;

/**
 * Subset of the widget's runtime configuration. Declared locally so this MIT
 * wrapper carries no dependency on the (AGPL) widget package; unknown keys pass through.
 */
export interface WidgetConfig {
  corePath?: string;
  cssPath?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  locale?: string;
  primaryColor?: string;
  [key: string]: unknown;
}

/**
 * Nuxt client-only plugin. Copy this file to `plugins/accessibility-widget.client.ts`
 * in your Nuxt app. By default the widget loads from the CDN `v1` tag — no config
 * needed. To self-host/mirror, override via `runtimeConfig.public.accessibilityWidget`
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

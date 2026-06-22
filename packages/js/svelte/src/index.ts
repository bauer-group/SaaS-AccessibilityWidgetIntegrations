import type { WidgetConfig } from './widget-config.generated.js';

/**
 * Default CDN origin — the floating `v1` (major) tag. The widget stays current
 * automatically. Override the `*Src`/`cssHref` options only to self-host/mirror.
 */
const CDN_V1 = 'https://widgets.professional-hosting.com/accessibility-widget/v1';
const DEFAULT_LOADER_SRC = `${CDN_V1}/accessibility-widget-loader.min.js`;
const DEFAULT_CORE_SRC = `${CDN_V1}/accessibility-widget-core.min.js`;
const DEFAULT_CSS_HREF = `${CDN_V1}/accessibility-widget.min.css`;

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

declare global {
  interface Window {
    AccessibilityWidgetConfig?: WidgetConfig;
    AccessibilityWidget?: {
      open(): Promise<void>;
      close(): void;
      reset(): void;
      getState(): unknown;
    };
  }
}

export interface AccessibilityWidgetOptions {
  loaderSrc?: string;
  coreSrc?: string;
  cssHref?: string;
  config?: WidgetConfig;
}

/**
 * Svelte 5 "action" — attach to any element, e.g.
 * <div use:accessibilityWidget={{ config: {...} }} />.
 * Idempotent: adding the action to multiple elements is safe.
 */
export function accessibilityWidget(
  _node: HTMLElement,
  opts: AccessibilityWidgetOptions = {},
): { destroy(): void } {
  if (typeof window === 'undefined') return { destroy() {} };

  const loaderSrc = opts.loaderSrc ?? DEFAULT_LOADER_SRC;
  const coreSrc = opts.coreSrc ?? DEFAULT_CORE_SRC;
  const cssHref = opts.cssHref ?? DEFAULT_CSS_HREF;

  // The loader can't derive core/CSS from its own <script src>; pin them here.
  window.AccessibilityWidgetConfig = {
    ...(window.AccessibilityWidgetConfig ?? {}),
    corePath: coreSrc,
    cssPath: cssHref,
    ...opts.config,
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
  return { destroy() {} };
}

export const openAccessibilityWidget = (): Promise<void> | undefined =>
  window.AccessibilityWidget?.open();
export const closeAccessibilityWidget = (): void => window.AccessibilityWidget?.close();
export const resetAccessibilityWidget = (): void => window.AccessibilityWidget?.reset();

import { useEffect, useRef } from 'react';

/**
 * Default CDN origin — the floating `v1` (major) tag. The widget stays current
 * automatically: patch/minor updates are picked up without changing this wrapper.
 * Override the `*Src`/`cssHref` props only to self-host or mirror the assets.
 */
const CDN_V1 = 'https://widgets.professional-hosting.com/accessibility-widget/v1';
const DEFAULT_LOADER_SRC = `${CDN_V1}/accessibility-widget-loader.min.js`;
const DEFAULT_CORE_SRC = `${CDN_V1}/accessibility-widget-core.min.js`;
const DEFAULT_CSS_HREF = `${CDN_V1}/accessibility-widget.min.css`;

/**
 * Subset of the widget's runtime configuration. Declared locally so this MIT
 * wrapper carries no dependency on the (AGPL) widget package; unknown keys pass
 * straight through to `window.AccessibilityWidgetConfig`.
 */
export interface WidgetConfig {
  corePath?: string;
  cssPath?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  locale?: string;
  primaryColor?: string;
  [key: string]: unknown;
}

export interface AccessibilityWidgetProps {
  /** Loader script URL. Defaults to the CDN `v1` tag. */
  loaderSrc?: string;
  /** Core bundle URL, injected as `corePath`. Defaults to the CDN `v1` tag. */
  coreSrc?: string;
  /** Stylesheet URL, injected as a `<link>` and as `cssPath`. Defaults to the CDN `v1` tag. */
  cssHref?: string;
  /** Extra widget config; merged onto `window.AccessibilityWidgetConfig` and wins over defaults. */
  config?: WidgetConfig;
}

declare global {
  interface Window {
    AccessibilityWidgetConfig?: WidgetConfig;
    AccessibilityWidget?: {
      open(): Promise<void>;
      close(): void;
      reset(): void;
      set(id: string, value: unknown): Promise<void>;
      getState(): unknown;
    };
  }
}

export function AccessibilityWidget({
  loaderSrc = DEFAULT_LOADER_SRC,
  coreSrc = DEFAULT_CORE_SRC,
  cssHref = DEFAULT_CSS_HREF,
  config,
}: AccessibilityWidgetProps): null {
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    if (typeof window === 'undefined') return;

    // The loader does NOT derive core/CSS from its own <script src>, so corePath
    // and cssPath must be set explicitly. Caller `config` overrides these.
    window.AccessibilityWidgetConfig = {
      ...(window.AccessibilityWidgetConfig ?? {}),
      corePath: coreSrc,
      cssPath: cssHref,
      ...config,
    };

    // Matches the IIFE loader's dedupe selector (link[data-aw-css]).
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
    // No cleanup: the widget persists across route changes in SPAs.
  }, [loaderSrc, coreSrc, cssHref, config]);

  return null;
}

export const openAccessibilityWidget = (): Promise<void> | undefined =>
  window.AccessibilityWidget?.open();
export const closeAccessibilityWidget = (): void => window.AccessibilityWidget?.close();
export const resetAccessibilityWidget = (): void => window.AccessibilityWidget?.reset();

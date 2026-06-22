import { defineComponent, onMounted, type PropType } from 'vue';
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

export const AccessibilityWidget = defineComponent({
  name: 'AccessibilityWidget',
  props: {
    loaderSrc: { type: String, default: DEFAULT_LOADER_SRC },
    coreSrc: { type: String, default: DEFAULT_CORE_SRC },
    cssHref: { type: String, default: DEFAULT_CSS_HREF },
    config: { type: Object as PropType<WidgetConfig>, default: () => ({}) },
  },
  setup(props) {
    onMounted(() => {
      if (typeof window === 'undefined') return;
      // The loader can't derive core/CSS from its own <script src>; pin them here.
      window.AccessibilityWidgetConfig = {
        ...(window.AccessibilityWidgetConfig ?? {}),
        corePath: props.coreSrc,
        cssPath: props.cssHref,
        ...props.config,
      };

      if (props.cssHref && !document.querySelector('link[data-aw-css]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = props.cssHref;
        link.setAttribute('data-aw-css', '1');
        document.head.appendChild(link);
      }
      if (props.loaderSrc && !document.querySelector('script[data-aw-loader]')) {
        const s = document.createElement('script');
        s.src = props.loaderSrc;
        s.defer = true;
        s.setAttribute('data-aw-loader', '1');
        document.head.appendChild(s);
      }
    });
    return () => null;
  },
});

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

import { defineComponent, onMounted, type PropType } from 'vue';

/**
 * Default CDN origin — the floating `v1` (major) tag. The widget stays current
 * automatically. Override the `*Src`/`cssHref` props only to self-host/mirror.
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

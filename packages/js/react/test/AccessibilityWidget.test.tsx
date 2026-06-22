import { afterEach, describe, expect, it } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import {
  AccessibilityWidget,
  openAccessibilityWidget,
  closeAccessibilityWidget,
  resetAccessibilityWidget,
  setAccessibilityWidgetFeature,
  getAccessibilityWidgetState,
  type WidgetApi,
} from '../src/AccessibilityWidget.js';

const CDN_V1 = 'https://widgets.professional-hosting.com/accessibility-widget/v1';

function resetInjectedAssets(): void {
  document.querySelectorAll('[data-aw-loader],[data-aw-css]').forEach((el) => el.remove());
  delete (window as unknown as { AccessibilityWidgetConfig?: unknown }).AccessibilityWidgetConfig;
}

type Cfg = Record<string, unknown>;
function widgetConfig(): Cfg {
  return (window as unknown as { AccessibilityWidgetConfig?: Cfg }).AccessibilityWidgetConfig ?? {};
}

describe('<AccessibilityWidget /> — smoke', () => {
  afterEach(() => {
    cleanup();
    resetInjectedAssets();
  });

  it('defaults all asset URLs to the CDN v1 tag (no SRI)', () => {
    render(<AccessibilityWidget />);

    const script = document.querySelector('script[data-aw-loader]') as HTMLScriptElement;
    const link = document.querySelector('link[data-aw-css]') as HTMLLinkElement;
    expect(script.getAttribute('src')).toBe(`${CDN_V1}/accessibility-widget-loader.min.js`);
    expect(link.getAttribute('href')).toBe(`${CDN_V1}/accessibility-widget.min.css`);
    // The loader can't derive these itself, so the wrapper must pin them.
    expect(widgetConfig().corePath).toBe(`${CDN_V1}/accessibility-widget-core.min.js`);
    expect(widgetConfig().cssPath).toBe(`${CDN_V1}/accessibility-widget.min.css`);
    // No SRI on the floating v1 path.
    expect(script.hasAttribute('integrity')).toBe(false);
  });

  it('injects the loader script and stylesheet exactly once', () => {
    const { rerender } = render(<AccessibilityWidget config={{ position: 'bottom-right' }} />);

    expect(document.querySelectorAll('script[data-aw-loader]')).toHaveLength(1);
    expect(document.querySelectorAll('link[data-aw-css]')).toHaveLength(1);

    // A rerender must be idempotent — dedupe relies on data-aw-* markers.
    rerender(<AccessibilityWidget />);
    expect(document.querySelectorAll('script[data-aw-loader]')).toHaveLength(1);
    expect(document.querySelectorAll('link[data-aw-css]')).toHaveLength(1);
  });

  it('merges config onto window.AccessibilityWidgetConfig without clobbering existing keys', () => {
    (window as unknown as { AccessibilityWidgetConfig?: Cfg }).AccessibilityWidgetConfig = {
      debug: true,
    };

    render(<AccessibilityWidget config={{ locale: 'de' }} />);

    expect(widgetConfig()).toMatchObject({ debug: true, locale: 'de' });
  });

  it('lets the caller override the CDN defaults (self-host escape hatch)', () => {
    render(
      <AccessibilityWidget
        loaderSrc="/assets/aw-loader.min.js"
        coreSrc="/assets/aw-core.min.js"
        cssHref="/assets/aw.min.css"
        config={{ corePath: '/custom/core.min.js' }}
      />,
    );

    const script = document.querySelector('script[data-aw-loader]') as HTMLScriptElement;
    expect(script.getAttribute('src')).toBe('/assets/aw-loader.min.js');
    // config.corePath wins over the coreSrc-derived default.
    expect(widgetConfig().corePath).toBe('/custom/core.min.js');
    expect(widgetConfig().cssPath).toBe('/assets/aw.min.css');
  });
});

describe('imperative API helpers', () => {
  afterEach(() => {
    delete (window as unknown as { AccessibilityWidget?: unknown }).AccessibilityWidget;
  });

  it('forward every call to window.AccessibilityWidget (incl. set / getState)', () => {
    const calls: string[] = [];
    (window as unknown as { AccessibilityWidget?: WidgetApi }).AccessibilityWidget = {
      open: () => {
        calls.push('open');
        return Promise.resolve();
      },
      close: () => calls.push('close'),
      reset: () => calls.push('reset'),
      set: (id, value) => {
        calls.push(`set:${id}=${String(value)}`);
        return Promise.resolve();
      },
      getState: () => ({ contrast: true }),
    };

    openAccessibilityWidget();
    closeAccessibilityWidget();
    resetAccessibilityWidget();
    setAccessibilityWidgetFeature('contrast', true);

    expect(calls).toEqual(['open', 'close', 'reset', 'set:contrast=true']);
    expect(getAccessibilityWidgetState()).toEqual({ contrast: true });
  });

  it('no-op safely before the widget core has loaded', () => {
    expect(() => closeAccessibilityWidget()).not.toThrow();
    expect(getAccessibilityWidgetState()).toBeUndefined();
    expect(setAccessibilityWidgetFeature('contrast', true)).toBeUndefined();
  });
});

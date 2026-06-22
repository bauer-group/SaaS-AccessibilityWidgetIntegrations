/**
 * Single source of truth for the Accessibility Widget integration configuration.
 *
 * Every integration (7 JS wrappers + WordPress, TYPO3, Drupal, Shopify, Shopware,
 * Magento) exposes the SAME options, derived from this file by
 * `scripts/generate-config.mjs`. Editing an option here and running
 * `pnpm generate-config` updates every platform's native settings UI, its i18n
 * catalogs and the typed TS surface at once. CI guards drift with
 * `pnpm generate-config:check`.
 *
 * The runtime contract is `window.AccessibilityWidgetConfig` (widget v1.x). The
 * `key` of each option IS its runtime key and its native setting key on every
 * platform (Magento nests them under the `settings/` group). Structured runtime
 * values are flattened for the flat native stores and reassembled at injection:
 *   - `offset {x,y}`  -> `offsetX` / `offsetY` ints, runtimeKey `offset.x|y`
 *   - features        -> one tri-state select per feature (see FEATURES)
 *   - assets          -> `assetBase` derives `corePath`/`cssPath` unless overridden
 *
 * Authoring rule: every `label`/`help` MUST carry both `en` and `de` — the
 * generator's --check fails otherwise, which is what keeps the admin UIs from
 * drifting back into a mixed-language state.
 *
 * @typedef {import('./widget-config.schema').WidgetConfigSchema} _Schema
 */

/** Default CDN origin — the floating `v1` (major) tag; stays current automatically. */
export const CDN_BASE = 'https://widgets.professional-hosting.com/accessibility-widget/v1';

export const ASSET_FILES = {
  loader: 'accessibility-widget-loader.min.js',
  core: 'accessibility-widget-core.min.js',
  css: 'accessibility-widget.min.css',
};

/** Setting groups, in display order. Each carries its own bilingual title. */
export const GROUPS = [
  { id: 'appearance', label: { en: 'Appearance', de: 'Darstellung' } },
  { id: 'behavior', label: { en: 'Behavior', de: 'Verhalten' } },
  { id: 'content', label: { en: 'Content', de: 'Inhalt' } },
  { id: 'features', label: { en: 'Features', de: 'Funktionen' } },
  { id: 'advanced', label: { en: 'Advanced / self-hosting', de: 'Erweitert / Self-Hosting' } },
];

/** FAB positions (value === label; not localized). */
export const POSITIONS = ['bottom-right', 'bottom-left', 'top-right', 'top-left'];

/** Widget UI locales. `auto` detects the browser/page language. */
export const LOCALES = [
  'auto',
  'de',
  'en',
  'fr',
  'es',
  'it',
  'pl',
  'tr',
  'ar',
  'zh',
  'hi',
  'pt',
  'bn',
  'ru',
  'ja',
  'ko',
  'vi',
  'fa',
  'ur',
  'th',
  'id',
  'he',
  'nl',
  'sv',
  'cs',
  'el',
  'hu',
  'ro',
  'uk',
];

/** Locale option labels — endonyms (language-neutral), so they read the same in any admin. */
export const LOCALE_LABELS = {
  auto: 'Auto',
  de: 'Deutsch',
  en: 'English',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
  pl: 'Polski',
  tr: 'Türkçe',
  ar: 'العربية',
  zh: '中文',
  hi: 'हिन्दी',
  pt: 'Português',
  bn: 'বাংলা',
  ru: 'Русский',
  ja: '日本語',
  ko: '한국어',
  vi: 'Tiếng Việt',
  fa: 'فارسی',
  ur: 'اردو',
  th: 'ไทย',
  id: 'Bahasa Indonesia',
  he: 'עברית',
  nl: 'Nederlands',
  sv: 'Svenska',
  cs: 'Čeština',
  el: 'Ελληνικά',
  hu: 'Magyar',
  ro: 'Română',
  uk: 'Українська',
};

/** The 15 widget features, in display order, with bilingual labels. */
export const FEATURES = [
  { id: 'fontSize', label: { en: 'Font size', de: 'Schriftgröße' } },
  { id: 'lineHeight', label: { en: 'Line height', de: 'Zeilenhöhe' } },
  { id: 'letterSpacing', label: { en: 'Letter spacing', de: 'Buchstabenabstand' } },
  { id: 'contrast', label: { en: 'Contrast', de: 'Kontrast' } },
  { id: 'grayscale', label: { en: 'Grayscale', de: 'Graustufen' } },
  { id: 'invertColors', label: { en: 'Invert colors', de: 'Farben invertieren' } },
  { id: 'dyslexiaFont', label: { en: 'Dyslexia font', de: 'Dyslexie-Schrift' } },
  { id: 'highlightLinks', label: { en: 'Highlight links', de: 'Links hervorheben' } },
  { id: 'pauseAnimations', label: { en: 'Pause animations', de: 'Animationen pausieren' } },
  { id: 'bigCursor', label: { en: 'Big cursor', de: 'Großer Mauszeiger' } },
  { id: 'focusOutline', label: { en: 'Focus outline', de: 'Fokus-Umrandung' } },
  { id: 'readingMask', label: { en: 'Reading mask', de: 'Lesemaske' } },
  { id: 'readingGuide', label: { en: 'Reading guide', de: 'Leselineal' } },
  { id: 'tts', label: { en: 'Text to speech', de: 'Vorlesefunktion' } },
  { id: 'structureNav', label: { en: 'Structure navigation', de: 'Struktur-Navigation' } },
];

/** Tri-state per-feature gating. `default` ⇒ emit nothing (widget decides). */
export const FEATURE_STATES = [
  {
    value: 'default',
    label: { en: 'Default (widget decides)', de: 'Standard (Widget entscheidet)' },
  },
  { value: 'on', label: { en: 'On by default', de: 'Standardmäßig an' } },
  { value: 'off', label: { en: 'Off by default', de: 'Standardmäßig aus' } },
  { value: 'disabled', label: { en: 'Hidden', de: 'Ausgeblendet' } },
];

export const FEATURE_STATE_DEFAULT = 'default';

/** Prefix for the 15 generated per-feature setting keys (e.g. `feature_fontSize`). */
export const FEATURE_KEY_PREFIX = 'feature_';

/**
 * The scalar options, in display order within their group. The synthetic
 * `features` block is expanded by the generator into one setting per FEATURE.
 *
 * Field contract:
 *   key          runtime key + native setting key (camelCase)
 *   group        one of GROUPS[].id
 *   type         'enum' | 'color' | 'int' | 'bool' | 'string' | 'url' | 'features'
 *   source       for enums: 'positions' | 'locales'
 *   default      default value (matches the widget's own default)
 *   nullable     true ⇒ empty admin value is valid and omitted from the config
 *   emptyMeansDefault  empty ⇒ omit the key (asset overrides; resolved at inject)
 *   runtimeKey   dotted path override for nesting (e.g. 'offset.x')
 *   special      'keyboardShortcut' ⇒ empty string maps to runtime `false`
 *   validate     'url-safe' ⇒ reject javascript:/data: schemes
 *   min/max      int bounds
 *   i18n         { label:{en,de}, help:{en,de} }  — BOTH languages required
 */
export const OPTIONS = [
  // ── Appearance ────────────────────────────────────────────────────────────
  {
    key: 'position',
    group: 'appearance',
    type: 'enum',
    source: 'positions',
    default: 'bottom-right',
    i18n: {
      label: { en: 'Position', de: 'Position' },
      help: { en: 'Where the floating button appears.', de: 'Wo die Schaltfläche erscheint.' },
    },
  },
  {
    key: 'offsetX',
    group: 'appearance',
    type: 'int',
    default: 20,
    min: 0,
    runtimeKey: 'offset.x',
    i18n: {
      label: { en: 'Horizontal offset (px)', de: 'Horizontaler Abstand (px)' },
      help: { en: 'Distance from the screen edge.', de: 'Abstand zum Bildschirmrand.' },
    },
  },
  {
    key: 'offsetY',
    group: 'appearance',
    type: 'int',
    default: 20,
    min: 0,
    runtimeKey: 'offset.y',
    i18n: {
      label: { en: 'Vertical offset (px)', de: 'Vertikaler Abstand (px)' },
      help: { en: 'Distance from the screen edge.', de: 'Abstand zum Bildschirmrand.' },
    },
  },
  {
    key: 'zIndex',
    group: 'appearance',
    type: 'int',
    default: 2147483646,
    min: 0,
    i18n: {
      label: { en: 'z-index', de: 'z-index' },
      help: {
        en: 'Stacking order of the widget. Increase if it sits behind other elements.',
        de: 'Stapelreihenfolge des Widgets. Erhöhen, falls es hinter anderen Elementen liegt.',
      },
    },
  },
  {
    key: 'primaryColor',
    group: 'appearance',
    type: 'color',
    default: '#0058a3',
    i18n: {
      label: { en: 'Brand color', de: 'Markenfarbe' },
      help: { en: 'Color of the floating button.', de: 'Farbe der Schaltfläche.' },
    },
  },
  {
    key: 'locale',
    group: 'appearance',
    type: 'enum',
    source: 'locales',
    default: 'auto',
    i18n: {
      label: { en: 'Language', de: 'Sprache' },
      help: {
        en: 'Widget UI language. "Auto" detects the browser/page language.',
        de: 'Sprache der Widget-Oberfläche. „Auto“ erkennt die Browser-/Seitensprache.',
      },
    },
  },
  {
    key: 'buttonLabel',
    group: 'appearance',
    type: 'string',
    nullable: true,
    i18n: {
      label: { en: 'Button label', de: 'Schaltflächen-Beschriftung' },
      help: {
        en: 'Accessible label for the button. Empty uses the localized default.',
        de: 'Barrierefreie Beschriftung der Schaltfläche. Leer = lokalisierter Standard.',
      },
    },
  },

  // ── Behavior ──────────────────────────────────────────────────────────────
  {
    key: 'draggableFab',
    group: 'behavior',
    type: 'bool',
    default: false,
    i18n: {
      label: { en: 'Draggable button', de: 'Verschiebbare Schaltfläche' },
      help: {
        en: 'Let visitors drag the button to reposition it.',
        de: 'Besucher können die Schaltfläche verschieben.',
      },
    },
  },
  {
    key: 'respectReducedMotion',
    group: 'behavior',
    type: 'bool',
    default: true,
    i18n: {
      label: { en: 'Respect reduced motion', de: '„Reduzierte Bewegung“ beachten' },
      help: {
        en: "Honor the visitor's prefers-reduced-motion setting.",
        de: 'Die Einstellung „prefers-reduced-motion“ des Besuchers berücksichtigen.',
      },
    },
  },
  {
    key: 'hideOnPrint',
    group: 'behavior',
    type: 'bool',
    default: true,
    i18n: {
      label: { en: 'Hide on print', de: 'Beim Drucken ausblenden' },
      help: {
        en: 'Hide the widget on printed pages.',
        de: 'Widget in der Druckansicht ausblenden.',
      },
    },
  },
  {
    key: 'keyboardShortcut',
    group: 'behavior',
    type: 'string',
    default: 'ctrl+alt+a',
    special: 'keyboardShortcut',
    i18n: {
      label: { en: 'Keyboard shortcut', de: 'Tastenkürzel' },
      help: {
        en: 'Shortcut to open the widget (e.g. ctrl+alt+a). Empty disables it.',
        de: 'Tastenkürzel zum Öffnen (z. B. ctrl+alt+a). Leer = deaktiviert.',
      },
    },
  },
  {
    key: 'storageKey',
    group: 'behavior',
    type: 'string',
    default: 'accessibility-widget',
    i18n: {
      label: { en: 'Storage key', de: 'Speicher-Schlüssel' },
      help: {
        en: 'localStorage key for saved visitor preferences. Change only to avoid conflicts.',
        de: 'localStorage-Schlüssel für gespeicherte Einstellungen. Nur bei Konflikten ändern.',
      },
    },
  },
  {
    key: 'hidePoweredBy',
    group: 'behavior',
    type: 'bool',
    default: false,
    i18n: {
      label: { en: 'Hide "powered by"', de: '„Powered by“ ausblenden' },
      help: {
        en: 'Hide the provider credit in the widget panel.',
        de: 'Den Anbieter-Hinweis im Widget ausblenden.',
      },
    },
  },
  {
    key: 'debug',
    group: 'behavior',
    type: 'bool',
    default: false,
    i18n: {
      label: { en: 'Debug logging', de: 'Debug-Protokollierung' },
      help: {
        en: 'Log diagnostic messages to the browser console.',
        de: 'Diagnosemeldungen in der Browser-Konsole ausgeben.',
      },
    },
  },

  // ── Content ───────────────────────────────────────────────────────────────
  {
    key: 'statementUrl',
    group: 'content',
    type: 'url',
    nullable: true,
    validate: 'url-safe',
    i18n: {
      label: { en: 'Accessibility statement URL', de: 'URL der Barrierefreiheitserklärung' },
      help: {
        en: 'Link to your accessibility statement.',
        de: 'Link zu Ihrer Barrierefreiheitserklärung.',
      },
    },
  },
  {
    key: 'disclaimer',
    group: 'content',
    type: 'string',
    nullable: true,
    i18n: {
      label: { en: 'Disclaimer text', de: 'Haftungsausschluss-Text' },
      help: { en: 'Short note shown in the widget panel.', de: 'Kurzer Hinweis im Widget-Panel.' },
    },
  },

  // ── Features (synthetic — expanded into one tri-state per FEATURE) ─────────
  {
    key: 'features',
    group: 'features',
    type: 'features',
    i18n: {
      label: { en: 'Features', de: 'Funktionen' },
      help: {
        en: 'Per-feature default state. "Hidden" removes the feature from the panel.',
        de: 'Standardzustand je Funktion. „Ausgeblendet“ entfernt die Funktion aus dem Panel.',
      },
    },
  },

  // ── Advanced / self-hosting ───────────────────────────────────────────────
  {
    key: 'assetBase',
    group: 'advanced',
    type: 'url',
    nullable: true,
    emptyMeansDefault: true,
    asset: 'base',
    i18n: {
      label: { en: 'Asset base URL', de: 'Asset-Basis-URL' },
      help: {
        en: 'Empty loads from the BAUER GROUP CDN (recommended, always current). Set only to self-host/mirror.',
        de: 'Leer = Laden vom BAUER GROUP CDN (empfohlen, immer aktuell). Nur zum Self-Hosting/Spiegeln setzen.',
      },
    },
  },
  {
    key: 'corePath',
    group: 'advanced',
    type: 'url',
    nullable: true,
    emptyMeansDefault: true,
    asset: 'core',
    i18n: {
      label: { en: 'Core script URL', de: 'Core-Skript-URL' },
      help: {
        en: 'Overrides the derived core bundle URL. Advanced self-hosting only.',
        de: 'Überschreibt die abgeleitete Core-Bundle-URL. Nur für fortgeschrittenes Self-Hosting.',
      },
    },
  },
  {
    key: 'cssPath',
    group: 'advanced',
    type: 'url',
    nullable: true,
    emptyMeansDefault: true,
    asset: 'css',
    i18n: {
      label: { en: 'Stylesheet URL', de: 'Stylesheet-URL' },
      help: {
        en: 'Overrides the derived stylesheet URL. Advanced self-hosting only.',
        de: 'Überschreibt die abgeleitete Stylesheet-URL. Nur für fortgeschrittenes Self-Hosting.',
      },
    },
  },
  {
    key: 'coreIntegrity',
    group: 'advanced',
    type: 'string',
    nullable: true,
    emptyMeansDefault: true,
    asset: 'coreIntegrity',
    i18n: {
      label: { en: 'Core SRI hash', de: 'Core-SRI-Hash' },
      help: {
        en: 'Subresource Integrity hash for a pinned core URL. Only with a fixed self-hosted version.',
        de: 'Subresource-Integrity-Hash für eine gepinnte Core-URL. Nur mit fester, selbst gehosteter Version.',
      },
    },
  },
  {
    key: 'cssIntegrity',
    group: 'advanced',
    type: 'string',
    nullable: true,
    emptyMeansDefault: true,
    asset: 'cssIntegrity',
    i18n: {
      label: { en: 'Stylesheet SRI hash', de: 'Stylesheet-SRI-Hash' },
      help: {
        en: 'Subresource Integrity hash for a pinned stylesheet URL.',
        de: 'Subresource-Integrity-Hash für eine gepinnte Stylesheet-URL.',
      },
    },
  },
];

/** Convenience: the enum value list for an option `source`. */
export function enumValues(source) {
  if (source === 'positions') return POSITIONS;
  if (source === 'locales') return LOCALES;
  throw new Error(`Unknown enum source: ${source}`);
}

/** Convenience: option label for an enum value (locale endonym, else the value itself). */
export function enumLabel(source, value) {
  if (source === 'locales') return LOCALE_LABELS[value] ?? value;
  return value;
}

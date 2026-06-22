/**
 * Authoring types for `config/widget-config.mjs`. Not shipped in any package —
 * this only type-checks the schema shape while editing.
 */

/** A string that must exist in both English and German. */
export interface I18nString {
  en: string;
  de: string;
}

export interface Group {
  id: 'appearance' | 'behavior' | 'content' | 'features' | 'advanced';
  label: I18nString;
}

export interface Feature {
  id: string;
  label: I18nString;
}

export interface FeatureState {
  value: 'default' | 'on' | 'off' | 'disabled';
  label: I18nString;
}

export type OptionType = 'enum' | 'color' | 'int' | 'bool' | 'string' | 'url' | 'features';

export interface Option {
  /** Runtime key + native setting key on every platform (camelCase). */
  key: string;
  group: Group['id'];
  type: OptionType;
  /** For `type: 'enum'`: which canonical value list to use. */
  source?: 'positions' | 'locales';
  default?: string | number | boolean;
  /** Empty admin value is valid and simply omitted from the runtime config. */
  nullable?: boolean;
  /** Empty ⇒ omit the key entirely (asset overrides; resolved at inject time). */
  emptyMeansDefault?: boolean;
  /** Dotted runtime path for nesting, e.g. `offset.x`. Defaults to `key`. */
  runtimeKey?: string;
  /** `keyboardShortcut`: empty string maps to runtime `false`. */
  special?: 'keyboardShortcut';
  /** `url-safe`: reject `javascript:` / `data:` schemes. */
  validate?: 'url-safe';
  /** Asset-resolution role (Advanced group). Drives TS runtime type + inject builders. */
  asset?: 'base' | 'core' | 'css' | 'coreIntegrity' | 'cssIntegrity';
  min?: number;
  max?: number;
  i18n: {
    label: I18nString;
    help: I18nString;
  };
}

export interface WidgetConfigSchema {
  CDN_BASE: string;
  ASSET_FILES: { loader: string; core: string; css: string };
  GROUPS: Group[];
  POSITIONS: string[];
  LOCALES: string[];
  LOCALE_LABELS: Record<string, string>;
  FEATURES: Feature[];
  FEATURE_STATES: FeatureState[];
  FEATURE_STATE_DEFAULT: string;
  FEATURE_KEY_PREFIX: string;
  OPTIONS: Option[];
}

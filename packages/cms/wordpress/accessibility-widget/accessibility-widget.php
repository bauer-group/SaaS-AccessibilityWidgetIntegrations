<?php
/**
 * Plugin Name:       Accessibility Widget
 * Description:       BAUER GROUP Accessibility Widget — BFSG / EN 301 549 / WCAG 2.2 AA. Loader ~4 KB gzip, Core ~24 KB gzip (28 Locales). Loaded from the CDN, always current.
 * Version:           2.0.0
 * Requires at least: 6.5
 * Requires PHP:      8.1
 * Author:            BAUER GROUP
 * Author URI:        https://www.bauer-group.com
 * License:           MIT
 * License URI:       https://opensource.org/licenses/MIT
 * Text Domain:       accessibility-widget
 * Domain Path:       /languages
 * Update URI:        https://github.com/bauer-group/SaaS-AccessibilityWidget
 */

if (!defined('ABSPATH')) {
    exit;
}

define('ACCESSIBILITY_WIDGET_VERSION', '2.0.0');
define('ACCESSIBILITY_WIDGET_SLUG', 'accessibility-widget');

/** Settings option key. */
const ACCESSIBILITY_WIDGET_OPTION = 'accessibility_widget_options';

/** The generated config schema (groups + fields + defaults + asset metadata). */
function accessibility_widget_schema(): array
{
    static $schema = null;
    if ($schema === null) {
        $schema = require __DIR__ . '/inc/config-schema.php';
    }
    return $schema;
}

/** Translate a generated (variable) string against this plugin's text domain. */
function accessibility_widget_t(string $text): string
{
    // phpcs:ignore WordPress.WP.I18n.NonSingularStringLiteralText -- strings are generated; catalogs ship with the plugin.
    return $text === '' ? '' : translate($text, 'accessibility-widget');
}

/** Load the German (and any other) translations. */
add_action('init', static function (): void {
    load_plugin_textdomain('accessibility-widget', false, dirname(plugin_basename(__FILE__)) . '/languages');
});

/** Defaults map (key => stored string), derived from the schema. */
function accessibility_widget_defaults(): array
{
    $defaults = [];
    foreach (accessibility_widget_schema()['fields'] as $field) {
        $value = $field['default'] ?? '';
        if (is_bool($value)) {
            $value = $value ? '1' : '';
        }
        $defaults[$field['key']] = is_scalar($value) ? (string) $value : '';
    }
    return $defaults;
}

/** True for http/https/mailto/tel or relative URLs; rejects javascript:/data:. */
function accessibility_widget_is_safe_url(string $url): bool
{
    $scheme = strtolower((string) wp_parse_url($url, PHP_URL_SCHEME));
    return $scheme === '' || in_array($scheme, ['http', 'https', 'mailto', 'tel'], true);
}

/** Coerce a stored value into its runtime type, or null when it should be omitted. */
function accessibility_widget_coerce(array $field, $raw)
{
    switch ($field['type']) {
        case 'bool':
            return !empty($raw);
        case 'int':
            $number = (int) $raw;
            if (isset($field['min']) && $number < $field['min']) {
                $number = (int) $field['min'];
            }
            return $number;
        case 'enum':
        case 'feature_state':
            $values = array_column($field['options'], 'value');
            return in_array($raw, $values, true) ? $raw : ($field['default'] ?? reset($values));
        case 'color':
            return sanitize_hex_color((string) $raw) ?: ($field['default'] ?? '#0058a3');
        case 'url':
            $value = trim((string) $raw);
            if ($value === '') {
                return null;
            }
            if (($field['validate'] ?? '') === 'url-safe' && !accessibility_widget_is_safe_url($value)) {
                return null;
            }
            return esc_url_raw($value);
        default: // string
            $value = sanitize_text_field((string) $raw);
            if (($field['special'] ?? '') === 'keyboardShortcut') {
                return $value === '' ? false : $value;
            }
            return $value === '' ? null : $value;
    }
}

/** Assemble window.AccessibilityWidgetConfig from the stored options. */
function accessibility_widget_build_config(array $opts): array
{
    $schema = accessibility_widget_schema();
    $config = [];
    $offset = [];
    $initial_features = [];
    $disabled_features = [];
    $assets = ['base' => '', 'core' => '', 'css' => '', 'coreIntegrity' => '', 'cssIntegrity' => ''];

    foreach ($schema['fields'] as $field) {
        $key = $field['key'];
        $raw = $opts[$key] ?? ($field['default'] ?? '');

        if (!empty($field['asset'])) {
            $assets[$field['asset']] = trim((string) $raw);
            continue;
        }
        if ($field['type'] === 'feature_state') {
            if ($raw === 'on') {
                $initial_features[$field['feature']] = true;
            } elseif ($raw === 'off') {
                $initial_features[$field['feature']] = false;
            } elseif ($raw === 'disabled') {
                $disabled_features[] = $field['feature'];
            }
            continue;
        }

        $value = accessibility_widget_coerce($field, $raw);
        if ($value === null) {
            continue;
        }
        if (isset($field['runtimeKey']) && strpos($field['runtimeKey'], 'offset.') === 0) {
            $offset[substr($field['runtimeKey'], 7)] = $value;
        } else {
            $config[$key] = $value;
        }
    }

    if ($offset) {
        $config['offset'] = ['x' => $offset['x'] ?? 20, 'y' => $offset['y'] ?? 20];
    }
    if ($initial_features) {
        $config['initialFeatures'] = $initial_features;
    }
    if ($disabled_features) {
        $config['disabledFeatures'] = $disabled_features;
    }

    $base = $assets['base'] !== '' ? rtrim($assets['base'], '/') : rtrim($schema['cdnBase'], '/');
    $config['corePath'] = $assets['core'] !== '' ? $assets['core'] : $base . '/' . $schema['assetFiles']['core'];
    $config['cssPath'] = $assets['css'] !== '' ? $assets['css'] : $base . '/' . $schema['assetFiles']['css'];
    if ($assets['coreIntegrity'] !== '') {
        $config['coreIntegrity'] = $assets['coreIntegrity'];
    }
    if ($assets['cssIntegrity'] !== '') {
        $config['cssIntegrity'] = $assets['cssIntegrity'];
    }

    return $config;
}

/** Enqueue the inline config + the deferred loader on every front-end page. */
function accessibility_widget_enqueue(): void
{
    $schema = accessibility_widget_schema();
    $opts = wp_parse_args(get_option(ACCESSIBILITY_WIDGET_OPTION, []), accessibility_widget_defaults());
    $config = accessibility_widget_build_config($opts);

    $base = !empty($opts['assetBase']) ? rtrim((string) $opts['assetBase'], '/') : rtrim($schema['cdnBase'], '/');
    $loader = esc_url($base . '/' . $schema['assetFiles']['loader']);

    // JSON_HEX_TAG guarantees no value can break out of the <script> context.
    $json = wp_json_encode($config, JSON_HEX_TAG | JSON_HEX_AMP | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

    wp_register_script('accessibility-widget-inline-config', '', [], ACCESSIBILITY_WIDGET_VERSION, true);
    wp_enqueue_script('accessibility-widget-inline-config');
    wp_add_inline_script('accessibility-widget-inline-config', 'window.AccessibilityWidgetConfig = ' . $json . ';', 'before');

    wp_enqueue_script(
        'accessibility-widget-loader',
        $loader,
        [],
        null, // CDN URL is version-pinned via the v1 path; no query string.
        ['strategy' => 'defer', 'in_footer' => true]
    );
}
add_action('wp_enqueue_scripts', 'accessibility_widget_enqueue');

/** Register the single array option with a schema-driven sanitizer. */
function accessibility_widget_register_settings(): void
{
    register_setting(ACCESSIBILITY_WIDGET_SLUG, ACCESSIBILITY_WIDGET_OPTION, [
        'type' => 'array',
        'sanitize_callback' => 'accessibility_widget_sanitize',
        'default' => [],
    ]);
}
add_action('admin_init', 'accessibility_widget_register_settings');

/** Sanitize every submitted field against the schema (whitelists + escaping). */
function accessibility_widget_sanitize($input): array
{
    $input = is_array($input) ? $input : [];
    $out = [];
    foreach (accessibility_widget_schema()['fields'] as $field) {
        $key = $field['key'];
        $raw = $input[$key] ?? null;
        switch ($field['type']) {
            case 'bool':
                $out[$key] = empty($raw) ? '' : '1';
                break;
            case 'int':
                $number = (int) $raw;
                if (isset($field['min']) && $number < $field['min']) {
                    $number = (int) $field['min'];
                }
                $out[$key] = (string) $number;
                break;
            case 'enum':
            case 'feature_state':
                $values = array_column($field['options'], 'value');
                $out[$key] = in_array($raw, $values, true) ? (string) $raw : (string) ($field['default'] ?? reset($values));
                break;
            case 'color':
                $out[$key] = sanitize_hex_color((string) $raw) ?: (string) ($field['default'] ?? '#0058a3');
                break;
            case 'url':
                $value = trim((string) $raw);
                if ($value !== '' && (($field['validate'] ?? '') !== 'url-safe' || accessibility_widget_is_safe_url($value))) {
                    $value = esc_url_raw($value);
                } else {
                    $value = '';
                }
                $out[$key] = $value;
                break;
            default:
                $out[$key] = sanitize_text_field((string) $raw);
        }
    }
    return $out;
}

/** Settings page (Settings → Accessibility Widget). */
function accessibility_widget_settings_page(): void
{
    add_options_page(
        'Accessibility Widget',
        'Accessibility Widget',
        'manage_options',
        ACCESSIBILITY_WIDGET_SLUG,
        'accessibility_widget_render_settings'
    );
}
add_action('admin_menu', 'accessibility_widget_settings_page');

/** Render one table row for a field, switching on its type. */
function accessibility_widget_render_field(array $field, array $opts): void
{
    $key = $field['key'];
    $id = 'aw_' . $key;
    $name = ACCESSIBILITY_WIDGET_OPTION . '[' . $key . ']';
    $value = (string) ($opts[$key] ?? ($field['default'] ?? ''));
    $label = accessibility_widget_t($field['label']);

    echo '<tr><th scope="row"><label for="' . esc_attr($id) . '">' . esc_html($label) . '</label></th><td>';
    switch ($field['type']) {
        case 'enum':
        case 'feature_state':
            echo '<select id="' . esc_attr($id) . '" name="' . esc_attr($name) . '">';
            foreach ($field['options'] as $opt) {
                $opt_label = !empty($field['optionsTranslatable']) ? accessibility_widget_t($opt['label']) : $opt['label'];
                echo '<option value="' . esc_attr($opt['value']) . '" ' . selected($value, $opt['value'], false) . '>' . esc_html($opt_label) . '</option>';
            }
            echo '</select>';
            break;
        case 'bool':
            echo '<input type="checkbox" id="' . esc_attr($id) . '" name="' . esc_attr($name) . '" value="1" ' . checked($value, '1', false) . ' />';
            break;
        case 'int':
            $min = isset($field['min']) ? ' min="' . esc_attr((string) $field['min']) . '"' : '';
            echo '<input type="number" id="' . esc_attr($id) . '" name="' . esc_attr($name) . '" value="' . esc_attr($value) . '"' . $min . ' class="small-text" />';
            break;
        case 'url':
            echo '<input type="url" id="' . esc_attr($id) . '" name="' . esc_attr($name) . '" value="' . esc_attr($value) . '" class="large-text" />';
            break;
        default: // color, string
            echo '<input type="text" id="' . esc_attr($id) . '" name="' . esc_attr($name) . '" value="' . esc_attr($value) . '" class="regular-text" />';
    }
    if (!empty($field['help'])) {
        echo '<p class="description">' . esc_html(accessibility_widget_t($field['help'])) . '</p>';
    }
    echo '</td></tr>';
}

/** Render the grouped settings form. */
function accessibility_widget_render_settings(): void
{
    if (!current_user_can('manage_options')) {
        return;
    }
    $schema = accessibility_widget_schema();
    $opts = wp_parse_args(get_option(ACCESSIBILITY_WIDGET_OPTION, []), accessibility_widget_defaults());
    $intro = accessibility_widget_t('Configure the lazy-loading widget. It loads from the CDN and stays current automatically.');
    $docs = accessibility_widget_t('Documentation');
    ?>
    <div class="wrap">
      <h1>Accessibility Widget</h1>
      <p>
        <?php echo esc_html($intro); ?>
        <a href="https://github.com/bauer-group/SaaS-AccessibilityWidget" target="_blank" rel="noopener"><?php echo esc_html($docs); ?></a>
      </p>
      <form method="post" action="options.php">
        <?php settings_fields(ACCESSIBILITY_WIDGET_SLUG); ?>
        <?php foreach ($schema['groups'] as $group): ?>
          <h2><?php echo esc_html(accessibility_widget_t($group['label'])); ?></h2>
          <table class="form-table" role="presentation">
            <?php
            foreach ($schema['fields'] as $field) {
                if ($field['group'] === $group['id']) {
                    accessibility_widget_render_field($field, $opts);
                }
            }
            ?>
          </table>
        <?php endforeach; ?>
        <?php submit_button(); ?>
      </form>
    </div>
    <?php
}

<?php
/**
 * Plugin Name:       Accessibility Widget
 * Description:       BAUER GROUP Accessibility Widget — BFSG / EN 301 549 / WCAG 2.2 AA. Loader ~4 KB gzip, Core ~24 KB gzip (28 Locales). Loaded from the CDN, always current.
 * Version:           0.0.0
 * Requires at least: 6.5
 * Requires PHP:      8.1
 * Author:            BAUER GROUP
 * Author URI:        https://www.bauer-group.com
 * License:           MIT
 * License URI:       https://opensource.org/licenses/MIT
 * Text Domain:       accessibility-widget
 * Update URI:        https://github.com/bauer-group/SaaS-AccessibilityWidget
 */

if (!defined('ABSPATH')) {
    exit;
}

define('ACCESSIBILITY_WIDGET_VERSION', '0.0.0');
define('ACCESSIBILITY_WIDGET_SLUG', 'accessibility-widget');

/**
 * Default CDN origin — the floating `v1` (major) tag. The widget stays current
 * automatically; no assets are bundled with this plugin. Set a custom base URL
 * in the settings only to self-host or mirror the assets.
 */
define('ACCESSIBILITY_WIDGET_CDN', 'https://widgets.professional-hosting.com/accessibility-widget/v1');

/** Resolve the asset base URL (trailing-slashed): custom override or CDN v1. */
function accessibility_widget_base_url(): string {
    $opts = get_option('accessibility_widget_options', []);
    $base = !empty($opts['asset_base']) ? $opts['asset_base'] : ACCESSIBILITY_WIDGET_CDN;
    return trailingslashit($base);
}

/** Enqueue loader + inline config on every front-end page. */
function accessibility_widget_enqueue(): void {
    $base = accessibility_widget_base_url();
    $opts = wp_parse_args(get_option('accessibility_widget_options', []), [
        'position'      => 'bottom-right',
        'locale'        => 'auto',
        'primary_color' => '#0058a3',
    ]);

    // The loader does NOT derive core/CSS from its own <script src>, so pin them.
    $config = [
        'corePath'     => esc_url($base . 'accessibility-widget-core.min.js'),
        'cssPath'      => esc_url($base . 'accessibility-widget.min.css'),
        'position'     => sanitize_key($opts['position']),
        'locale'       => sanitize_key($opts['locale']),
        'primaryColor' => sanitize_hex_color($opts['primary_color']) ?: '#0058a3',
    ];

    wp_register_script('accessibility-widget-inline-config', '', [], ACCESSIBILITY_WIDGET_VERSION, true);
    wp_enqueue_script('accessibility-widget-inline-config');
    wp_add_inline_script(
        'accessibility-widget-inline-config',
        'window.AccessibilityWidgetConfig = ' . wp_json_encode($config) . ';',
        'before'
    );

    wp_enqueue_script(
        'accessibility-widget-loader',
        $base . 'accessibility-widget-loader.min.js',
        [],
        null, // CDN URL is already version-pinned via the v1 path; no query string.
        ['strategy' => 'defer', 'in_footer' => true]
    );
}
add_action('wp_enqueue_scripts', 'accessibility_widget_enqueue');

/** Settings page (Settings → Accessibility Widget) */
function accessibility_widget_register_settings(): void {
    register_setting(
        'accessibility_widget',
        'accessibility_widget_options',
        [
            'type' => 'array',
            'sanitize_callback' => 'accessibility_widget_sanitize',
            'default' => [],
        ]
    );
}
add_action('admin_init', 'accessibility_widget_register_settings');

function accessibility_widget_sanitize(array $input): array {
    $supported_locales = [
        'auto', 'de', 'en', 'fr', 'es', 'it', 'pl', 'tr', 'ar',
        'zh', 'hi', 'pt', 'bn', 'ru', 'ja', 'ko', 'vi', 'fa', 'ur',
        'th', 'id', 'he', 'nl', 'sv', 'cs', 'el', 'hu', 'ro', 'uk',
    ];
    $locale = sanitize_key($input['locale'] ?? 'auto');
    $base   = trim((string) ($input['asset_base'] ?? ''));
    return [
        'position'      => in_array($input['position'] ?? '', ['bottom-right', 'bottom-left', 'top-right', 'top-left'], true) ? $input['position'] : 'bottom-right',
        'locale'        => in_array($locale, $supported_locales, true) ? $locale : 'auto',
        'primary_color' => sanitize_hex_color($input['primary_color'] ?? '#0058a3') ?: '#0058a3',
        'asset_base'    => $base === '' ? '' : esc_url_raw($base),
    ];
}

function accessibility_widget_settings_page(): void {
    add_options_page(
        'Accessibility Widget',
        'Accessibility Widget',
        'manage_options',
        'accessibility-widget',
        'accessibility_widget_render_settings'
    );
}
add_action('admin_menu', 'accessibility_widget_settings_page');

function accessibility_widget_render_settings(): void {
    if (!current_user_can('manage_options')) {
        return;
    }
    $opts = wp_parse_args(get_option('accessibility_widget_options', []), [
        'position'      => 'bottom-right',
        'locale'        => 'auto',
        'primary_color' => '#0058a3',
        'asset_base'    => '',
    ]);
    $locales = [
        'auto', 'de', 'en', 'fr', 'es', 'it', 'pl', 'tr', 'ar',
        'zh', 'hi', 'pt', 'bn', 'ru', 'ja', 'ko', 'vi', 'fa', 'ur',
        'th', 'id', 'he', 'nl', 'sv', 'cs', 'el', 'hu', 'ro', 'uk',
    ];
    ?>
    <div class="wrap">
      <h1>Accessibility Widget</h1>
      <p>Konfiguration des lazy-loading Widgets. Das Widget wird vom CDN geladen und bleibt automatisch aktuell. Details: <a href="https://github.com/bauer-group/SaaS-AccessibilityWidget" target="_blank" rel="noopener">GitHub</a>.</p>
      <form method="post" action="options.php">
        <?php settings_fields('accessibility_widget'); ?>
        <table class="form-table" role="presentation">
          <tr>
            <th><label for="aw_position">Position</label></th>
            <td>
              <select name="accessibility_widget_options[position]" id="aw_position">
                <?php foreach (['bottom-right', 'bottom-left', 'top-right', 'top-left'] as $p): ?>
                  <option value="<?= esc_attr($p) ?>" <?= selected($opts['position'], $p, false) ?>><?= esc_html($p) ?></option>
                <?php endforeach; ?>
              </select>
            </td>
          </tr>
          <tr>
            <th><label for="aw_locale">Locale</label></th>
            <td>
              <select name="accessibility_widget_options[locale]" id="aw_locale">
                <?php foreach ($locales as $l): ?>
                  <option value="<?= esc_attr($l) ?>" <?= selected($opts['locale'], $l, false) ?>><?= esc_html($l) ?></option>
                <?php endforeach; ?>
              </select>
              <p class="description">28 Locales unterstützt; <code>auto</code> erkennt die Browser-/HTML-Sprache.</p>
            </td>
          </tr>
          <tr>
            <th><label for="aw_color">Markenfarbe</label></th>
            <td>
              <input type="text" id="aw_color" name="accessibility_widget_options[primary_color]" value="<?= esc_attr($opts['primary_color']) ?>" class="regular-text" />
              <p class="description">Hex-Farbe des FAB-Buttons (z. B. #0058a3).</p>
            </td>
          </tr>
          <tr>
            <th><label for="aw_base">Asset-Basis-URL (optional)</label></th>
            <td>
              <input type="url" id="aw_base" name="accessibility_widget_options[asset_base]" value="<?= esc_attr($opts['asset_base']) ?>" class="large-text" placeholder="<?= esc_attr(ACCESSIBILITY_WIDGET_CDN) ?>" />
              <p class="description">Leer lassen, um das Widget vom BAUER GROUP CDN zu laden (empfohlen — immer aktuell). Nur für Self-Hosting/Spiegelung auf eine eigene Origin setzen.</p>
            </td>
          </tr>
        </table>
        <?php submit_button(); ?>
      </form>
    </div>
    <?php
}

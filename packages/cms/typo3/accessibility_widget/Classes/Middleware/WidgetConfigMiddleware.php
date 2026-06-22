<?php

declare(strict_types=1);

namespace BauerGroup\AccessibilityWidget\Middleware;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use TYPO3\CMS\Core\Configuration\ExtensionConfiguration;
use TYPO3\CMS\Core\Http\StreamFactory;
use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * Injects window.AccessibilityWidgetConfig + the loader into the frontend <head>.
 *
 * Replaces the previous raw TypoScript interpolation: the config is assembled in
 * PHP from Extension Configuration (described by Configuration/config-schema.php)
 * and JSON-encoded with JSON_HEX_* so no value can break out of the <script>.
 * Runs automatically — no static TypoScript template inclusion required.
 */
final class WidgetConfigMiddleware implements MiddlewareInterface
{
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $response = $handler->handle($request);

        if (!str_contains($response->getHeaderLine('Content-Type'), 'text/html')) {
            return $response;
        }
        $body = (string) $response->getBody();
        $pos = stripos($body, '</head>');
        if ($pos === false) {
            return $response;
        }

        $merged = substr($body, 0, $pos) . $this->buildHtml() . substr($body, $pos);

        return $response->withBody(
            GeneralUtility::makeInstance(StreamFactory::class)->createStream($merged)
        );
    }

    private function buildHtml(): string
    {
        $schema = require dirname(__DIR__, 2) . '/Configuration/config-schema.php';

        try {
            $conf = GeneralUtility::makeInstance(ExtensionConfiguration::class)->get('accessibility_widget');
        } catch (\Throwable) {
            $conf = [];
        }
        $conf = is_array($conf) ? $conf : [];

        $config = [];
        $offset = [];
        $initialFeatures = [];
        $disabledFeatures = [];
        $assets = ['base' => '', 'core' => '', 'css' => '', 'coreIntegrity' => '', 'cssIntegrity' => ''];

        foreach ($schema['fields'] as $field) {
            $key = $field['key'];
            $raw = $conf[$key] ?? ($field['default'] ?? '');

            if (!empty($field['asset'])) {
                $assets[$field['asset']] = trim((string) $raw);
                continue;
            }
            if ($field['type'] === 'features-list') {
                $ids = array_filter(array_map('trim', explode(',', (string) $raw)));
                foreach ($ids as $id) {
                    if ($field['mode'] === 'enable') {
                        $initialFeatures[$id] = true;
                    } else {
                        $disabledFeatures[] = $id;
                    }
                }
                continue;
            }

            switch ($field['type']) {
                case 'bool':
                    $value = (bool) (int) $raw;
                    break;
                case 'int':
                    $value = (int) $raw;
                    if (isset($field['min']) && $value < $field['min']) {
                        $value = (int) $field['min'];
                    }
                    break;
                default:
                    $value = (string) $raw;
                    if (($field['special'] ?? '') === 'keyboardShortcut') {
                        $value = $value === '' ? false : $value;
                    } elseif ($value === '') {
                        continue 2;
                    } elseif (($field['validate'] ?? '') === 'url-safe' && !$this->isSafeUrl($value)) {
                        continue 2;
                    }
            }

            if (isset($field['runtimeKey']) && str_starts_with((string) $field['runtimeKey'], 'offset.')) {
                $offset[substr((string) $field['runtimeKey'], 7)] = $value;
            } else {
                $config[$key] = $value;
            }
        }

        if ($offset) {
            $config['offset'] = ['x' => $offset['x'] ?? 20, 'y' => $offset['y'] ?? 20];
        }
        if ($initialFeatures) {
            $config['initialFeatures'] = $initialFeatures;
        }
        if ($disabledFeatures) {
            $config['disabledFeatures'] = $disabledFeatures;
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

        $json = json_encode(
            $config,
            JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_SLASHES
        ) ?: '{}';
        $loader = htmlspecialchars($base . '/' . $schema['assetFiles']['loader'], ENT_QUOTES);

        return '<script>window.AccessibilityWidgetConfig = ' . $json . ';</script>'
            . '<script src="' . $loader . '" defer data-aw-loader="1"></script>';
    }

    private function isSafeUrl(string $url): bool
    {
        $scheme = strtolower((string) parse_url($url, PHP_URL_SCHEME));
        return $scheme === '' || in_array($scheme, ['http', 'https', 'mailto', 'tel'], true);
    }
}

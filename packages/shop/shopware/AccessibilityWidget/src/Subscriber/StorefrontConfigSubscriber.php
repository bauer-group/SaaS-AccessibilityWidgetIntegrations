<?php

declare(strict_types=1);

namespace BauerGroup\AccessibilityWidget\Subscriber;

use Shopware\Core\System\SystemConfig\SystemConfigService;
use Shopware\Storefront\Event\StorefrontRenderEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Injects window.AccessibilityWidgetConfig + the loader into the storefront head.
 *
 * The full runtime config (every widget option) is assembled in PHP from the
 * plugin configuration, described by the generated config-schema.php, and passed
 * to meta.html.twig as a tag-break-safe JSON string.
 */
final class StorefrontConfigSubscriber implements EventSubscriberInterface
{
    public function __construct(private readonly SystemConfigService $systemConfig)
    {
    }

    public static function getSubscribedEvents(): array
    {
        return [StorefrontRenderEvent::class => 'onRender'];
    }

    public function onRender(StorefrontRenderEvent $event): void
    {
        $schema = require __DIR__ . '/../Resources/config/config-schema.php';
        $salesChannelId = $event->getSalesChannelContext()->getSalesChannelId();

        $config = [];
        $offset = [];
        $initialFeatures = [];
        $disabledFeatures = [];
        $assets = ['base' => '', 'core' => '', 'css' => '', 'coreIntegrity' => '', 'cssIntegrity' => ''];

        foreach ($schema['fields'] as $field) {
            $raw = $this->systemConfig->get($field['path'], $salesChannelId);
            if ($raw === null) {
                $raw = $field['default'] ?? '';
            }

            if (!empty($field['asset'])) {
                $assets[$field['asset']] = is_string($raw) ? trim($raw) : '';
                continue;
            }
            if ($field['type'] === 'feature_state') {
                if ($raw === 'on') {
                    $initialFeatures[$field['feature']] = true;
                } elseif ($raw === 'off') {
                    $initialFeatures[$field['feature']] = false;
                } elseif ($raw === 'disabled') {
                    $disabledFeatures[] = $field['feature'];
                }
                continue;
            }

            switch ($field['type']) {
                case 'bool':
                    $value = (bool) $raw;
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
                $config[$field['key']] = $value;
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

        // JSON_HEX_* escapes <, >, &, ' and " so the value cannot break out of <script>.
        $json = json_encode(
            $config,
            JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_SLASHES
        ) ?: '{}';

        $event->setParameter('accessibilityWidget', [
            'config' => $json,
            'loader' => $base . '/' . $schema['assetFiles']['loader'],
        ]);
    }

    private function isSafeUrl(string $url): bool
    {
        $scheme = strtolower((string) parse_url($url, PHP_URL_SCHEME));
        return $scheme === '' || in_array($scheme, ['http', 'https', 'mailto', 'tel'], true);
    }
}

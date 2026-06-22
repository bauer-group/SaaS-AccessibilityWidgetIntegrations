<?php

declare(strict_types=1);

/**
 * Registers the frontend middleware that injects window.AccessibilityWidgetConfig
 * + the loader. Placed inside content-length-headers so the recomputed length
 * reflects the injected markup.
 */
return [
    'frontend' => [
        'bauergroup/accessibility-widget' => [
            'target' => \BauerGroup\AccessibilityWidget\Middleware\WidgetConfigMiddleware::class,
            'after' => [
                'typo3/cms-frontend/content-length-headers',
            ],
        ],
    ],
];

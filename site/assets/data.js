/**
 * Single source of truth for the integrations directory.
 *
 * The 13 integrations all ship under ONE locked version per release, so a single
 * GitHub Releases API call (see app.js) supplies the version for every card and
 * the ZIP download URLs for the CMS/shop plugins. Nothing here hard-codes a
 * version — the page reads it live so it never goes stale.
 */

export const REPO = 'bauer-group/SaaS-AccessibilityWidgetIntegrations';
export const CORE_REPO = 'bauer-group/SaaS-AccessibilityWidget';
export const CORE_DOCS = `https://github.com/${CORE_REPO}/tree/main/docs`;
// Live product demo (the core repo's own GitHub Pages site) — the non-developer
// destination linked from the header.
export const CORE_DEMO = 'https://accessibility.widget.professional-hosting.com';
// Production CDN loader (floating v1 — auto-updates within the major). Embedded
// on this page so the directory itself runs the widget it advertises.
export const WIDGET_LOADER =
  'https://widgets.professional-hosting.com/accessibility-widget/v1/accessibility-widget-loader.min.js';
export const CDN_SNIPPET =
  '<script\n  src="https://widgets.professional-hosting.com/accessibility-widget/v1/accessibility-widget-loader.min.js"\n  defer\n></script>';

/**
 * delivery:
 *   'npm'  → installed via a package manager (JS/TS frameworks)
 *   'zip'  → downloaded and installed manually (CMS / shop plugins)
 *
 * assetPrefix matches the release asset filename built by package-plugins.mjs,
 * e.g. "wordpress-accessibility-widget" → wordpress-accessibility-widget-1.0.0.zip
 */
export const INTEGRATIONS = [
  // ── JS / TS frameworks ─────────────────────────────────────────────────────
  {
    id: 'react',
    category: 'frameworks',
    name: 'React',
    mono: 'Re',
    color: '#61DAFB',
    onColor: '#0b1020',
    delivery: 'npm',
    npm: '@bauer-group/accessibility-widget-react',
    req: { en: 'React ≥ 18', de: 'React ≥ 18' },
    desc: {
      en: 'React component + hook that injects the CDN-hosted widget loader.',
      de: 'React-Komponente + Hook, die den CDN-gehosteten Widget-Loader einbindet.',
    },
    source: 'packages/js/react',
  },
  {
    id: 'vue',
    category: 'frameworks',
    name: 'Vue',
    mono: 'Vue',
    color: '#42B883',
    onColor: '#0b1020',
    delivery: 'npm',
    npm: '@bauer-group/accessibility-widget-vue',
    req: { en: 'Vue ≥ 3.3', de: 'Vue ≥ 3.3' },
    desc: {
      en: 'Vue 3 component for the BAUER GROUP Accessibility Widget.',
      de: 'Vue-3-Komponente für das BAUER GROUP Accessibility Widget.',
    },
    source: 'packages/js/vue',
  },
  {
    id: 'angular',
    category: 'frameworks',
    name: 'Angular',
    mono: 'Ng',
    color: '#DD0031',
    onColor: '#ffffff',
    delivery: 'npm',
    npm: '@bauer-group/accessibility-widget-angular',
    req: { en: 'Angular ≥ 19', de: 'Angular ≥ 19' },
    desc: {
      en: 'Angular directive that loads the widget on init.',
      de: 'Angular-Directive, die das Widget beim Init lädt.',
    },
    source: 'packages/js/angular',
  },
  {
    id: 'svelte',
    category: 'frameworks',
    name: 'Svelte',
    mono: 'Sv',
    color: '#FF3E00',
    onColor: '#ffffff',
    delivery: 'npm',
    npm: '@bauer-group/accessibility-widget-svelte',
    req: { en: 'Svelte ≥ 5', de: 'Svelte ≥ 5' },
    desc: {
      en: 'Svelte 5 component + action for the widget.',
      de: 'Svelte-5-Komponente + Action für das Widget.',
    },
    source: 'packages/js/svelte',
  },
  {
    id: 'nextjs',
    category: 'frameworks',
    name: 'Next.js',
    mono: 'N',
    color: '#111827',
    onColor: '#ffffff',
    delivery: 'npm',
    npm: '@bauer-group/accessibility-widget-nextjs',
    req: { en: 'Next.js App Router', de: 'Next.js App Router' },
    desc: {
      en: 'Client component for the Next.js App Router.',
      de: 'Client-Component für den Next.js App Router.',
    },
    source: 'packages/js/nextjs',
  },
  {
    id: 'nuxt',
    category: 'frameworks',
    name: 'Nuxt',
    mono: 'Nx',
    color: '#00DC82',
    onColor: '#0b1020',
    delivery: 'npm',
    npm: '@bauer-group/accessibility-widget-nuxt',
    req: { en: 'Nuxt 3', de: 'Nuxt 3' },
    desc: {
      en: 'Nuxt 3 plugin that registers the widget.',
      de: 'Nuxt-3-Plugin, das das Widget registriert.',
    },
    source: 'packages/js/nuxt',
  },
  {
    id: 'astro',
    category: 'frameworks',
    name: 'Astro',
    mono: 'As',
    color: '#FF5D01',
    onColor: '#ffffff',
    delivery: 'npm',
    npm: '@bauer-group/accessibility-widget-astro',
    req: { en: 'Astro ≥ 5', de: 'Astro ≥ 5' },
    desc: {
      en: 'Astro component for the widget loader.',
      de: 'Astro-Komponente für den Widget-Loader.',
    },
    source: 'packages/js/astro',
  },

  // ── CMS ─────────────────────────────────────────────────────────────────────
  {
    id: 'wordpress',
    category: 'cms',
    name: 'WordPress',
    mono: 'WP',
    color: '#21759B',
    onColor: '#ffffff',
    delivery: 'zip',
    assetPrefix: 'wordpress-accessibility-widget',
    markets: [
      { url: 'https://wordpress.org/plugins/accessibility-widget/', label: 'WordPress.org' },
    ],
    req: { en: 'WordPress 6.x · PHP', de: 'WordPress 6.x · PHP' },
    desc: {
      en: 'Plugin with an admin settings page. Install via Plugins → Add New → Upload.',
      de: 'Plugin mit Einstellungsseite. Installation über Plugins → Installieren → Hochladen.',
    },
    source: 'packages/cms/wordpress',
  },
  {
    id: 'typo3',
    category: 'cms',
    name: 'TYPO3',
    mono: 'T3',
    color: '#FF8700',
    onColor: '#0b1020',
    delivery: 'zip',
    assetPrefix: 'typo3-accessibility-widget',
    markets: [
      {
        url: 'https://packagist.org/packages/bauer-group/accessibility-widget-typo3',
        label: 'Packagist',
      },
      { url: 'https://extensions.typo3.org/extension/accessibility_widget', label: 'TYPO3 TER' },
    ],
    req: { en: 'TYPO3 13 · PHP', de: 'TYPO3 13 · PHP' },
    desc: {
      en: 'Extension. Upload in the Extension Manager or install via Composer.',
      de: 'Extension. Upload im Extension-Manager oder Installation per Composer.',
    },
    source: 'packages/cms/typo3',
  },
  {
    id: 'drupal',
    category: 'cms',
    name: 'Drupal',
    mono: 'Dr',
    color: '#0678BE',
    onColor: '#ffffff',
    delivery: 'zip',
    assetPrefix: 'drupal-accessibility-widget',
    markets: [{ url: 'https://www.drupal.org/project/accessibility_widget', label: 'Drupal.org' }],
    req: { en: 'Drupal 10/11 · PHP', de: 'Drupal 10/11 · PHP' },
    desc: {
      en: 'Module (GPL-2.0-or-later). Install via Extend → Add new module.',
      de: 'Modul (GPL-2.0-or-later). Installation über Erweitern → Neues Modul.',
    },
    source: 'packages/cms/drupal',
  },

  // ── Shops ───────────────────────────────────────────────────────────────────
  {
    id: 'shopify',
    category: 'shop',
    name: 'Shopify',
    mono: 'Sh',
    color: '#95BF47',
    onColor: '#0b1020',
    delivery: 'zip',
    assetPrefix: 'shopify-accessibility-widget',
    req: { en: 'Shopify OS 2.0 · Liquid', de: 'Shopify OS 2.0 · Liquid' },
    desc: {
      en: 'Theme app extension snippet. Add the snippet to your OS 2.0 theme.',
      de: 'Theme-App-Extension-Snippet. Snippet in dein OS-2.0-Theme einbinden.',
    },
    source: 'packages/shop/shopify',
  },
  {
    id: 'shopware',
    category: 'shop',
    name: 'Shopware',
    mono: 'Sw',
    color: '#189EFF',
    onColor: '#ffffff',
    delivery: 'zip',
    assetPrefix: 'shopware-accessibility-widget',
    markets: [
      {
        url: 'https://packagist.org/packages/bauer-group/accessibility-widget-shopware',
        label: 'Packagist',
      },
      {
        url: 'https://store.shopware.com/en/search?search=accessibility+widget',
        label: 'Shopware Store',
      },
    ],
    req: { en: 'Shopware 6 · PHP', de: 'Shopware 6 · PHP' },
    desc: {
      en: 'Plugin. Upload in Admin → Extensions → My extensions, then activate.',
      de: 'Plugin. Upload unter Admin → Erweiterungen → Meine Erweiterungen, dann aktivieren.',
    },
    source: 'packages/shop/shopware',
  },
  {
    id: 'magento',
    category: 'shop',
    name: 'Magento',
    mono: 'Mg',
    color: '#EE672F',
    onColor: '#ffffff',
    delivery: 'zip',
    assetPrefix: 'magento-accessibility-widget',
    markets: [
      {
        url: 'https://packagist.org/packages/bauer-group/accessibility-widget-magento',
        label: 'Packagist',
      },
      {
        url: 'https://marketplace.magento.com/catalogsearch/result/?q=accessibility%20widget',
        label: 'Magento Marketplace',
      },
    ],
    req: { en: 'Magento 2.4 · PHP', de: 'Magento 2.4 · PHP' },
    desc: {
      en: 'Module (Adobe Commerce / Magento Open Source). Install via Composer or app/code.',
      de: 'Modul (Adobe Commerce / Magento Open Source). Installation per Composer oder app/code.',
    },
    source: 'packages/shop/magento',
  },
];

export const CATEGORIES = {
  frameworks: { en: 'JS / TS Frameworks', de: 'JS-/TS-Frameworks' },
  cms: { en: 'Content Management', de: 'Content-Management' },
  shop: { en: 'E-Commerce', de: 'E-Commerce' },
};

export const I18N = {
  en: {
    htmlLang: 'en',
    skip: 'Skip to content',
    nav_demo: 'Live demo',
    nav_docs: 'Docs',
    nav_distribution: 'Distribution',
    hero_eyebrow: 'Integrations',
    hero_title: 'Accessibility Widget — Integrations',
    hero_lead:
      'Ready-to-use framework, CMS and shop integrations for the BAUER GROUP Accessibility Widget. Each one is a thin wrapper that loads the same CDN-hosted core — the widget is never re-bundled.',
    hero_standards: 'BFSG · EN 301 549 · WCAG 2.2 AA',
    hero_version_loading: 'Loading latest version…',
    hero_version_label: 'Current release',
    hero_cta_browse: 'Browse integrations',
    hero_cta_demo: 'Try the live demo',
    snippet_title: 'Or embed in one line (recommended)',
    snippet_note:
      'The CDN one-liner auto-updates within the v1 major. No build step, works on any site.',
    copy: 'Copy',
    copied: 'Copied!',
    filter_all: 'All',
    search_placeholder: 'Search integrations…',
    search_label: 'Search integrations',
    count_one: 'integration',
    count_many: 'integrations',
    no_results: 'No integrations match your search.',
    card_install_npm: 'Install',
    card_download: 'Download ZIP',
    card_download_loading: 'Loading…',
    card_download_fallback: 'Releases',
    card_source: 'Source',
    card_market: 'Marketplace',
    card_version: 'v',
    section_how_title: 'How installation works',
    how_npm_title: 'Frameworks (npm)',
    how_npm_body:
      'Install the wrapper from npm, then render the component. It injects the CDN loader on mount — no extra config required.',
    how_zip_title: 'CMS & shops (manual ZIP)',
    how_zip_body:
      'Download the latest ZIP, upload it in your platform’s admin (Plugins / Extensions / Modules), activate it. The download buttons always point to the newest release.',
    how_cdn_title: 'Plain HTML (CDN)',
    how_cdn_body:
      'No framework? Drop the one-line script tag above into your template. Updates roll out automatically within the major.',
    footer_source_title: 'Source code',
    footer_source_core: 'Core widget repo',
    footer_source_integrations: 'Integrations repo',
    footer_legal_title: 'Legal',
    footer_impressum: 'Legal notice',
    footer_statement: 'Accessibility statement',
    footer_license:
      'MIT licensed — the Drupal module is GPL-2.0-or-later. The Accessibility Widget loaded at runtime is a separate work (AGPL-3.0-only or commercial).',
    api_error:
      'Could not load live version data from GitHub. Download links fall back to the Releases page.',
  },
  de: {
    htmlLang: 'de',
    skip: 'Zum Inhalt springen',
    nav_demo: 'Live-Demo',
    nav_docs: 'Doku',
    nav_distribution: 'Distribution',
    hero_eyebrow: 'Integrationen',
    hero_title: 'Accessibility Widget — Integrationen',
    hero_lead:
      'Einsatzfertige Framework-, CMS- und Shop-Integrationen für das BAUER GROUP Accessibility Widget. Jede ist ein dünner Wrapper, der denselben CDN-gehosteten Core lädt — das Widget wird nie neu gebündelt.',
    hero_standards: 'BFSG · EN 301 549 · WCAG 2.2 AA',
    hero_version_loading: 'Neueste Version wird geladen…',
    hero_version_label: 'Aktuelles Release',
    hero_cta_browse: 'Integrationen ansehen',
    hero_cta_demo: 'Zur Live-Demo',
    snippet_title: 'Oder in einer Zeile einbinden (empfohlen)',
    snippet_note:
      'Der CDN-Einzeiler aktualisiert sich automatisch innerhalb von v1. Kein Build-Schritt, funktioniert auf jeder Seite.',
    copy: 'Kopieren',
    copied: 'Kopiert!',
    filter_all: 'Alle',
    search_placeholder: 'Integrationen durchsuchen…',
    search_label: 'Integrationen durchsuchen',
    count_one: 'Integration',
    count_many: 'Integrationen',
    no_results: 'Keine Integration passt zur Suche.',
    card_install_npm: 'Installieren',
    card_download: 'ZIP herunterladen',
    card_download_loading: 'Lädt…',
    card_download_fallback: 'Releases',
    card_source: 'Quellcode',
    card_market: 'Marktplatz',
    card_version: 'v',
    section_how_title: 'So funktioniert die Installation',
    how_npm_title: 'Frameworks (npm)',
    how_npm_body:
      'Wrapper per npm installieren, Komponente rendern. Sie bindet den CDN-Loader beim Mount ein — ohne weitere Konfiguration.',
    how_zip_title: 'CMS & Shops (manuelles ZIP)',
    how_zip_body:
      'Neuestes ZIP herunterladen, im Admin deiner Plattform hochladen (Plugins / Extensions / Module), aktivieren. Die Download-Buttons zeigen immer auf das neueste Release.',
    how_cdn_title: 'Reines HTML (CDN)',
    how_cdn_body:
      'Kein Framework? Den einzeiligen Script-Tag oben ins Template einfügen. Updates kommen automatisch innerhalb des Majors.',
    footer_source_title: 'Quellcode',
    footer_source_core: 'Core-Widget-Repo',
    footer_source_integrations: 'Integrations-Repo',
    footer_legal_title: 'Rechtliches',
    footer_impressum: 'Impressum',
    footer_statement: 'Barrierefreiheitserklärung',
    footer_license:
      'MIT-lizenziert — das Drupal-Modul GPL-2.0-or-later. Das zur Laufzeit geladene Accessibility Widget ist ein separates Werk (AGPL-3.0-only oder kommerziell).',
    api_error:
      'Live-Versionsdaten konnten nicht von GitHub geladen werden. Download-Links verweisen ersatzweise auf die Releases-Seite.',
  },
};

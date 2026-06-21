#!/usr/bin/env node
/**
 * Build versioned ZIP artifacts for the CMS/shop plugins.
 *
 *   node scripts/package-plugins.mjs [version]
 *
 * Uses `git archive` so each ZIP contains the plugin under its required root
 * folder name (stores reject a wrong structure) and exactly the committed files
 * — no node_modules, no build cruft. Output lands in dist-artifacts/.
 *
 * The version defaults to the root package.json version (which semantic-release
 * has bumped at the released tag); pass an explicit version to override.
 *
 * These artifacts are attached to the GitHub Release for the review-gated stores
 * (Shopify, Shopware Store, Magento Marketplace, TYPO3 TER) whose final
 * submission is manual. npm and Packagist are automated elsewhere.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'dist-artifacts');
const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;

const version =
  process.argv[2] ?? JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version;

if (!SEMVER.test(version)) {
  console.error(`Invalid version: ${version}`);
  process.exit(1);
}

/**
 * src     — path of the plugin within the repo
 * folder  — required root folder name inside the ZIP
 * name    — artifact file stem (platform-prefixed for a tidy release page)
 */
const PLUGINS = [
  {
    src: 'packages/cms/wordpress/accessibility-widget',
    folder: 'accessibility-widget',
    name: 'wordpress-accessibility-widget',
  },
  {
    src: 'packages/cms/typo3/accessibility_widget',
    folder: 'accessibility_widget',
    name: 'typo3-accessibility-widget',
  },
  {
    src: 'packages/cms/drupal/accessibility_widget',
    folder: 'accessibility_widget',
    name: 'drupal-accessibility-widget',
  },
  {
    src: 'packages/shop/shopify',
    folder: 'accessibility-widget',
    name: 'shopify-accessibility-widget',
  },
  {
    src: 'packages/shop/shopware/AccessibilityWidget',
    folder: 'AccessibilityWidget',
    name: 'shopware-accessibility-widget',
  },
  {
    src: 'packages/shop/magento/BauerGroup_AccessibilityWidget',
    folder: 'BauerGroup_AccessibilityWidget',
    name: 'magento-accessibility-widget',
  },
];

mkdirSync(OUT, { recursive: true });

const built = [];
for (const { src, folder, name } of PLUGINS) {
  const out = join(OUT, `${name}-${version}.zip`);
  // No shell: args are passed literally, so the version can never inject.
  // HEAD:<src> archives that subtree; --prefix nests it under the required folder.
  execFileSync(
    'git',
    ['archive', '--format=zip', `--prefix=${folder}/`, '-o', out, `HEAD:${src}`],
    {
      cwd: ROOT,
      stdio: 'inherit',
    },
  );
  built.push(out);
}

console.log(`\nBuilt ${built.length} plugin artifacts (version ${version}):`);
for (const f of built) console.log(`  ${f}`);

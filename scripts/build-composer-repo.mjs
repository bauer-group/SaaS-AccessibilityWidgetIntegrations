#!/usr/bin/env node
/**
 * Build a static Composer repository (`site/composer/packages.json`) for the
 * three PHP plugins, so they can be installed via Composer WITHOUT splitting the
 * monorepo into per-package repos and WITHOUT public Packagist (which only reads
 * a root composer.json).
 *
 *   node scripts/build-composer-repo.mjs
 *
 * Each package version points its `dist` at the GitHub Release ZIP that
 * `scripts/package-plugins.mjs` already builds — Composer flattens the single
 * root folder on extract (verified), so those ZIPs work unchanged. Versions are
 * enumerated from the git tags present at run time (>= the Composer floor), so
 * running this in the Pages deploy after a release picks up the new tag.
 *
 * Consumers add one repository entry, then `composer require` resolves it:
 *
 *   "repositories": [
 *     { "type": "composer", "url": "https://accessibility-integration.widget.professional-hosting.com/composer" }
 *   ]
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Composer distribution starts at this version (earlier tags predate parity). */
const MIN_VERSION = [2, 0, 0];

/** The three Composer plugins: source dir + the release ZIP file stem. */
const PACKAGES = [
  { dir: 'packages/cms/typo3/accessibility_widget', zipStem: 'typo3-accessibility-widget' },
  { dir: 'packages/shop/shopware/AccessibilityWidget', zipStem: 'shopware-accessibility-widget' },
  {
    dir: 'packages/shop/magento/BauerGroup_AccessibilityWidget',
    zipStem: 'magento-accessibility-widget',
  },
];

const readJson = (rel) => JSON.parse(readFileSync(join(ROOT, rel), 'utf8'));

/** `owner/repo` slug from the root package.json repository URL. */
function repoSlug() {
  const url = readJson('package.json').repository?.url ?? '';
  const m = url.match(/github\.com[/:]([^/]+\/[^/]+?)(?:\.git)?$/);
  if (!m) throw new Error(`Cannot derive repo slug from: ${url}`);
  return m[1];
}

const cmp = (a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2];

/** Released versions (semver, >= MIN_VERSION), newest first, from git tags. */
function versions() {
  const out = execFileSync('git', ['tag', '--list', 'v*.*.*'], { cwd: ROOT, encoding: 'utf8' });
  return out
    .split('\n')
    .map((t) => t.trim().match(/^v(\d+)\.(\d+)\.(\d+)$/))
    .filter(Boolean)
    .map((m) => [Number(m[1]), Number(m[2]), Number(m[3])])
    .filter((v) => cmp(v, MIN_VERSION) >= 0)
    .sort((a, b) => cmp(b, a))
    .map((v) => v.join('.'));
}

function build() {
  const slug = repoSlug();
  const tags = versions();
  if (tags.length === 0) {
    console.warn(
      `No release tags >= ${MIN_VERSION.join('.')} found — writing an empty repository.`,
    );
  }

  const packages = {};
  for (const { dir, zipStem } of PACKAGES) {
    // Version-less by design (Packagist convention); we inject version + dist.
    const manifest = readJson(`${dir}/composer.json`);
    const byVersion = {};
    for (const version of tags) {
      byVersion[version] = {
        ...manifest,
        version,
        dist: {
          type: 'zip',
          url: `https://github.com/${slug}/releases/download/v${version}/${zipStem}-${version}.zip`,
          reference: `v${version}`,
        },
      };
    }
    packages[manifest.name] = byVersion;
  }

  const out = join(ROOT, 'site/composer/packages.json');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, `${JSON.stringify({ packages }, null, 2)}\n`);
  const names = Object.keys(packages);
  console.log(
    `Wrote site/composer/packages.json — ${names.length} packages × ${tags.length} version(s) [${tags.join(', ') || 'none'}]`,
  );
  for (const n of names) console.log(`  ${n}`);
}

build();

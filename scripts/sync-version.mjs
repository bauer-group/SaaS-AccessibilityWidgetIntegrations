#!/usr/bin/env node
/**
 * Single-version writer for the integrations monorepo.
 *
 * All integrations ship one locked version per release. semantic-release computes
 * the version and calls this script (via @semantic-release/exec prepareCmd):
 *
 *   node scripts/sync-version.mjs <version>
 *
 * It rewrites the version in every npm manifest AND every PHP/Liquid plugin header
 * (these are not in the pnpm workspace, so `npm version` can't reach them).
 *
 * `node scripts/sync-version.mjs --check` verifies that every target already agrees
 * with the root package.json version (CI drift guard); exits 1 on any mismatch.
 *
 * Composer manifests intentionally carry NO version field (Packagist derives it
 * from the git tag), so they are not touched here.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;

const JS_PKGS = ['react', 'vue', 'angular', 'svelte', 'nextjs', 'nuxt', 'astro'];

/**
 * Regex targets. Each edit's regex captures the version in group 2 (group 1 =
 * prefix, group 3 = optional suffix) so the same pattern drives both write and check.
 */
const REGEX_TARGETS = [
  {
    file: 'packages/cms/wordpress/accessibility-widget/accessibility-widget.php',
    edits: [
      { re: /^( \* Version:\s+)(\S+)()$/m },
      { re: /(define\('ACCESSIBILITY_WIDGET_VERSION',\s*')([^']+)('\);)/ },
    ],
  },
  {
    file: 'packages/cms/wordpress/accessibility-widget/readme.txt',
    edits: [{ re: /^(Stable tag:\s*)(\S+)()$/m }],
  },
  {
    file: 'packages/cms/typo3/accessibility_widget/ext_emconf.php',
    edits: [{ re: /('version'\s*=>\s*')([^']+)(')/ }],
  },
  {
    file: 'packages/cms/drupal/accessibility_widget/accessibility_widget.info.yml',
    edits: [{ re: /^(version:\s*')([^']+)(')$/m }],
  },
  {
    file: 'packages/shop/magento/BauerGroup_AccessibilityWidget/etc/module.xml',
    edits: [{ re: /(setup_version=")([^"]+)(")/ }],
  },
  {
    file: 'packages/shop/shopify/snippets/accessibility-widget.liquid',
    edits: [{ re: /(@version\s+)(\S+)()/ }],
  },
];

const JSON_TARGETS = ['package.json', ...JS_PKGS.map((p) => `packages/js/${p}/package.json`)];

function read(rel) {
  return readFileSync(join(ROOT, rel), 'utf8');
}
function write(rel, content) {
  writeFileSync(join(ROOT, rel), content);
}

/** Write `version` into every target. Throws if any anchor is missing. */
function applyVersion(version) {
  const touched = [];

  for (const rel of JSON_TARGETS) {
    const obj = JSON.parse(read(rel));
    obj.version = version;
    write(rel, `${JSON.stringify(obj, null, 2)}\n`);
    touched.push(rel);
  }

  for (const { file, edits } of REGEX_TARGETS) {
    let content = read(file);
    for (const { re } of edits) {
      if (!re.test(content)) {
        throw new Error(`Version anchor not found in ${file}: ${re}`);
      }
      content = content.replace(re, (_m, p1, _v, p3 = '') => `${p1}${version}${p3}`);
    }
    write(file, content);
    touched.push(file);
  }

  return touched;
}

/** Read the current version from each target for --check. */
function readVersions() {
  const versions = {};
  for (const rel of JSON_TARGETS) {
    versions[rel] = JSON.parse(read(rel)).version;
  }
  for (const { file, edits } of REGEX_TARGETS) {
    const content = read(file);
    versions[file] = edits.map(({ re }) => content.match(re)?.[2] ?? null);
  }
  return versions;
}

function check() {
  const expected = JSON.parse(read('package.json')).version;
  const versions = readVersions();
  const drift = [];

  for (const [file, value] of Object.entries(versions)) {
    const found = Array.isArray(value) ? value : [value];
    for (const v of found) {
      if (v !== expected) drift.push({ file, found: v ?? '(missing)' });
    }
  }

  if (drift.length > 0) {
    console.error(`Version drift — expected ${expected} (from root package.json):`);
    for (const d of drift) console.error(`  ${d.file}: ${d.found}`);
    console.error('\nRun: node scripts/sync-version.mjs ' + expected);
    process.exit(1);
  }
  console.log(`All ${Object.keys(versions).length} targets at ${expected} ✓`);
}

const arg = process.argv[2];
if (arg === '--check') {
  check();
} else if (arg && SEMVER.test(arg)) {
  const touched = applyVersion(arg);
  console.log(`Synced version ${arg} into ${touched.length} files:`);
  for (const f of touched) console.log(`  ${f}`);
} else {
  console.error('Usage: node scripts/sync-version.mjs <semver> | --check');
  process.exit(1);
}

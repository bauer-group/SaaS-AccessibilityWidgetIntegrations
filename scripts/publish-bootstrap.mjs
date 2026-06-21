// Bootstrap the FIRST npm publish of the wrapper packages — locally.
//
// Why local: npm Trusted Publishing (OIDC, used by the release workflow) can only
// publish a package that already EXISTS on the registry. So the very first publish
// has to list each package once — done by a maintainer locally (interactive 2FA /
// passkey via `npm login`). After the packages are listed, configure a Trusted
// Publisher per package on npmjs and every further release publishes from CI via
// OIDC — no token, no local publish.
//
// Usage (from the repo root, after `npm login`):
//   pnpm publish:bootstrap                     # all 7 wrappers
//   pnpm publish:bootstrap -- --package react  # just one (dir name under packages/js)
//   pnpm publish:bootstrap -- --tag next       # a non-latest dist-tag
//
// Publishes the version currently in the manifests (the released version). This is
// a pnpm workspace, so packages are built with pnpm and published from their own
// directory (npm has no workspace view here).

import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseArgs } from 'node:util';

const WRAPPERS = ['react', 'vue', 'angular', 'svelte', 'nextjs', 'nuxt', 'astro'];

// pnpm forwards the `--` separator literally to the script; drop a leading `--`.
const raw = process.argv.slice(2);
const { values } = parseArgs({
  args: raw[0] === '--' ? raw.slice(1) : raw,
  options: {
    package: { type: 'string' },
    tag: { type: 'string', default: 'latest' },
    help: { type: 'boolean', short: 'h', default: false },
  },
});

if (values.help) {
  process.stdout
    .write(`Bootstrap (list) the wrapper packages on npm so Trusted Publishing can be set up.

Usage (after \`npm login\`):
  pnpm publish:bootstrap [-- --package <dir>] [-- --tag <dist-tag>]

Options:
  --package  One wrapper dir under packages/js (default: all 7)
  --tag      npm dist-tag (default: latest)
  -h, --help Show this message
`);
  process.exit(0);
}

if (!/^[a-z0-9][a-z0-9._-]*$/i.test(values.tag)) {
  throw new Error(`Invalid --tag "${values.tag}" (alphanumeric, dot, dash, underscore)`);
}

const root = process.cwd();
const targets = values.package ? [values.package] : WRAPPERS;
for (const t of targets) {
  if (!WRAPPERS.includes(t)) {
    throw new Error(`Unknown wrapper "${t}" — one of: ${WRAPPERS.join(', ')}`);
  }
}

const version = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')).version;
if (!/^\d+\.\d+\.\d+(?:-[\w.]+)?$/.test(version)) {
  throw new Error(`Root package.json version "${version}" is not valid semver.`);
}

// Run through the shell (string command): on Windows pnpm/npm are .cmd shims that
// Node 24 refuses to execFile without a shell, and the args-array-with-shell form
// is deprecated (DEP0190). All interpolated pieces are validated above (semver
// version, dist-tag) or fixed literals — no untrusted input, no spaces.
const sh = (cmd, cwd = root) => execSync(cmd, { stdio: 'inherit', cwd });

// Build everything once with the workspace:^ links intact, so the dependency
// order is correct (react before nextjs) and nextjs resolves react's types.
process.stdout.write('\n▶ Building all wrappers…\n');
sh('pnpm -r build');

let nextjsPinned = false;
try {
  for (const t of targets) {
    const dir = resolve(root, `packages/js/${t}`);
    const name = JSON.parse(readFileSync(resolve(dir, 'package.json'), 'utf8')).name;

    // nextjs ships a workspace:^ dep; the published manifest needs a real range.
    if (t === 'nextjs') {
      sh(`npm pkg set "dependencies.@bauer-group/accessibility-widget-react=^${version}"`, dir);
      nextjsPinned = true;
    }

    process.stdout.write(`\n▶ Publishing ${name}@${version} (${values.tag})…\n`);
    sh(`npm publish --access public --tag ${values.tag}`, dir);
    process.stdout.write(`✓ ${name}\n`);
  }

  process.stdout.write(
    `\nNext: add a Trusted Publisher per package on npmjs (repository + release.yml).\n` +
      `Ongoing releases then publish the real versions from CI via OIDC — no token.\n`,
  );
} finally {
  if (nextjsPinned) {
    // Restore the workspace:^ protocol so the working tree stays clean.
    try {
      sh('git checkout -- packages/js/nextjs/package.json');
    } catch {
      /* git unavailable / nothing to restore — ignore */
    }
  }
}

# Distribution

How the integrations are versioned and shipped. One release publishes a **single
locked version** to every channel.

## Versioning model

- `semantic-release` (on push to `main`) computes the next version from Conventional
  Commits and the last git tag.
- During `prepare`, `@semantic-release/exec` runs `scripts/sync-version.mjs <version>`,
  which writes that one version into **every** manifest and plugin header (npm
  packages + WordPress, TYPO3, Drupal, Magento, Shopify). Composer manifests stay
  version-less on purpose — `build-composer-repo.mjs` injects the version per git tag.
- All of those files are committed in the release commit and the `vX.Y.Z` tag.
- CI guards consistency with `pnpm sync-version:check` (fails on drift).

## Channels at a glance

| Channel                                                    | What                                | Automation                                                      |
| ---------------------------------------------------------- | ----------------------------------- | --------------------------------------------------------------- |
| npm                                                        | 7 JS wrappers                       | `release.yml` → `publish-npm` (OIDC), every release             |
| GitHub Packages                                            | 7 JS wrappers (mirror)              | `release.yml` → `publish-github`                                |
| Composer (static repo)                                     | TYPO3, Shopware, Magento (Composer) | `pages.yml` builds `site/composer/packages.json`, every release |
| WordPress.org                                              | WordPress plugin                    | `release-artifacts.yml`, gated `vars.PUBLISH_WORDPRESS_ORG`     |
| Drupal.org                                                 | Drupal module                       | `release-artifacts.yml`, gated `vars.PUBLISH_DRUPAL_ORG`        |
| GitHub Release ZIPs                                        | all 6 CMS/shop plugins              | `release-artifacts.yml`, every release                          |
| Shopify / Shopware Store / Magento Marketplace / TYPO3 TER | review-gated                        | ZIP hand-off, manual submit                                     |

## Directory & downloads (GitHub Pages)

The public directory site at
<https://accessibility-integration.widget.professional-hosting.com> lists all 13
integrations and offers the latest plugin versions for **manual download**.

- Source lives in [`site/`](../site/) — a dependency-free static page (HTML/CSS/JS).
- Deployed by [`pages.yml`](../.github/workflows/pages.yml) via GitHub Actions
  (Pages `build_type: workflow`); `site/CNAME` carries the custom domain.
- The page fetches `releases/latest` from the GitHub API **in the browser**, so it
  always shows the current version and links the matching CMS/shop ZIP assets — a
  new release needs **no redeploy**. The page only redeploys when `site/**` changes.
- Framework wrappers link to npm; CMS/shop plugins link to the release ZIP built by
  `package-plugins.mjs`.

## npm (OIDC Trusted Publishing)

Ongoing releases publish **tokenless via OIDC**. A package must exist on npm before
a Trusted Publisher can be configured, so there is a one-time bootstrap:

1. **Bootstrap (local, once).** Run `npm login` (completes 2FA in the browser),
   then from the repo root:
   ```bash
   pnpm publish:bootstrap            # first-publishes all 7 wrappers
   # pnpm publish:bootstrap -- --package react   # or just one
   ```
2. **Configure a Trusted Publisher** on npmjs.com for **each** package:
   - Repository: `bauer-group/SaaS-AccessibilityWidgetIntegrations`
   - Workflow: `release.yml`
3. Ongoing releases then publish automatically via OIDC (`id-token: write`) — no
   token, no further local publishing.

`nextjs` depends on `accessibility-widget-react` via `workspace:^`; the publish job
pins it to the released version (`npm pkg set`) before publishing.

> Provenance (`--provenance`) is omitted because it requires a public source repo.
> Re-add it in `release.yml` if this repository is made public.

## Composer (static repository — no Packagist, no monorepo split)

Public **packagist.org reads `composer.json` only from a repository root** (one repo =
one package) and can't resolve subdirectories, so the three subdirectory packages
(TYPO3, Shopware, Magento) can't be published there without splitting the monorepo
into per-package repos. Instead we serve a **static Composer repository** from the
Pages site and reuse the GitHub Release ZIPs as `dist`:

- `scripts/build-composer-repo.mjs` generates `site/composer/packages.json` from the
  three `composer.json` manifests + the git tags (`>= 2.0.0`), pointing each version's
  `dist` at the release ZIP that `package-plugins.mjs` already builds. Composer
  flattens the single root folder on extract, so those ZIPs work unchanged.
- The [`pages.yml`](../.github/workflows/pages.yml) build job runs it on every deploy
  (incl. `workflow_run` after each Release), so a new release publishes automatically —
  no commit, no extra service, no third party.

**Consumers** add one repository entry, then `composer require` resolves from the tag:

```json
{
  "repositories": [
    {
      "type": "composer",
      "url": "https://accessibility-integration.widget.professional-hosting.com/composer"
    }
  ]
}
```

```bash
composer require bauer-group/accessibility-widget-magento   # or -typo3 / -shopware
```

Keep the `version` field **absent** from every `composer.json` — the generator injects
it per tag (`composer validate` runs with `--no-check-publish`, so version-less is fine).

## WordPress.org

1. Submit the plugin once at https://wordpress.org/plugins/developers/add/ (review).
2. After approval, add secrets `WPORG_SVN_USERNAME` / `WPORG_SVN_PASSWORD` and set
   the repo variable `PUBLISH_WORDPRESS_ORG=true`.
3. Each release then deploys via SVN (`10up/action-wordpress-plugin-deploy`), reading
   the stable tag from `readme.txt`. `.distignore` keeps `README.md` out of the build.

## Drupal.org

The Drupal module is **GPL-2.0-or-later** (Drupal.org requires GPL-2.0+; the rest of
the repo is MIT).

1. Create the project on Drupal.org and obtain Git access.
2. Set repo variables `DRUPALORG_REPO` (host/path of the project git) and
   `DRUPALORG_BRANCH`, plus secret `DRUPALORG_TOKEN`; set `PUBLISH_DRUPAL_ORG=true`.
3. Each release pushes the module subtree + tag to Drupal.org, which packages it for
   `composer require drupal/...`.

## Review-gated stores (manual submit)

Shopify, Shopware Store, Magento Marketplace and TYPO3 TER require manual review.
Every release attaches versioned ZIPs (built by `scripts/package-plugins.mjs`, with
the correct root folder per store) to the GitHub Release — download the relevant ZIP
and submit it to the store. TER can additionally be scripted later with `typo3/tailor`.

## Required secrets / variables

| Name                                       | Type     | Used by                     |
| ------------------------------------------ | -------- | --------------------------- |
| `WPORG_SVN_USERNAME`, `WPORG_SVN_PASSWORD` | secret   | WordPress.org deploy        |
| `PUBLISH_WORDPRESS_ORG`                    | variable | enable WordPress.org deploy |
| `DRUPALORG_TOKEN`                          | secret   | Drupal.org push             |
| `DRUPALORG_REPO`, `DRUPALORG_BRANCH`       | variable | Drupal.org push             |
| `PUBLISH_DRUPAL_ORG`                       | variable | enable Drupal.org push      |

npm OIDC and the GitHub Packages mirror need no secrets (OIDC / `GITHUB_TOKEN`).

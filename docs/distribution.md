# Distribution

How the integrations are versioned and shipped. One release publishes a **single
locked version** to every channel.

## Versioning model

- `semantic-release` (on push to `main`) computes the next version from Conventional
  Commits and the last git tag.
- During `prepare`, `@semantic-release/exec` runs `scripts/sync-version.mjs <version>`,
  which writes that one version into **every** manifest and plugin header (npm
  packages + WordPress, TYPO3, Drupal, Magento, Shopify). Composer manifests stay
  version-less on purpose — Packagist derives the version from the git tag.
- All of those files are committed in the release commit and the `vX.Y.Z` tag.
- CI guards consistency with `pnpm sync-version:check` (fails on drift).

## Channels at a glance

| Channel                                                    | What                                | Automation                                                  |
| ---------------------------------------------------------- | ----------------------------------- | ----------------------------------------------------------- |
| npm                                                        | 7 JS wrappers                       | `release.yml` → `publish-npm` (OIDC), every release         |
| GitHub Packages                                            | 7 JS wrappers (mirror)              | `release.yml` → `publish-github`                            |
| Packagist                                                  | TYPO3, Shopware, Magento (Composer) | Webhook, auto on the tag                                    |
| WordPress.org                                              | WordPress plugin                    | `release-artifacts.yml`, gated `vars.PUBLISH_WORDPRESS_ORG` |
| Drupal.org                                                 | Drupal module                       | `release-artifacts.yml`, gated `vars.PUBLISH_DRUPAL_ORG`    |
| GitHub Release ZIPs                                        | all 6 CMS/shop plugins              | `release-artifacts.yml`, every release                      |
| Shopify / Shopware Store / Magento Marketplace / TYPO3 TER | review-gated                        | ZIP hand-off, manual submit                                 |

## npm (OIDC Trusted Publishing)

Tokenless publishing — no `NPM_TOKEN`. Each of the 7 packages needs a one-time setup:

1. **Bootstrap publish** (the package must exist before a Trusted Publisher can be
   configured). Locally, with 2FA, for each `packages/js/*`:
   ```bash
   pnpm --filter <pkg> build
   cd packages/js/<name> && npm publish --access public
   ```
2. **Configure the Trusted Publisher** on npmjs.com for each package:
   - Repository: `bauer-group/SaaS-AccessibilityWidgetIntegrations`
   - Workflow: `release.yml`
3. After that, every release publishes automatically via OIDC (`id-token: write`).

`nextjs` depends on `accessibility-widget-react` via `workspace:^`; the publish job
pins it to the released version (`npm pkg set`) before publishing.

> Provenance (`--provenance`) is omitted because it requires a public source repo.
> Re-add it in `release.yml` if this repository is made public.

## Packagist (Composer)

No CI job. One-time per Composer package (TYPO3, Shopware, Magento):

1. Submit the repo URL at https://packagist.org/packages/submit.
2. Add the GitHub service hook (Packagist auto-suggests it) so new tags sync
   instantly. `composer require bauer-group/<package>` then resolves from the tag.

Keep the `version` field **absent** from every `composer.json` — Packagist reads it
from the tag (CI lints this).

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

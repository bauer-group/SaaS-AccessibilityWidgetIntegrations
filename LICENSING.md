# Licensing

<a id="english"></a>

> How licensing works in this repository — the **integrations are MIT**, the widget they load is separate.

**🇬🇧 English** · [🇩🇪 Deutsch](#-deutsch)

## TL;DR

- **The integrations in this repository** (framework wrappers, CMS plugins, shop integrations) are licensed under the **MIT License** (see [`LICENSE`](./LICENSE)). Use them freely in open-source or proprietary/closed products — no copyleft obligations.
- **Exception — the Drupal module** (`packages/cms/drupal/...`) is licensed **GNU GPL-2.0-or-later**, because Drupal.org requires every hosted module to be GPL-2.0+. This is the universal norm in the Drupal ecosystem and imposes no obligation beyond what Drupal already requires.
- **The Accessibility Widget itself is NOT part of this repository.** It is loaded at runtime from the CDN (or, optionally, installed as the separate npm package `@bauer-group/accessibility-widget`). That widget is **separately licensed** under **GNU AGPL-3.0-only OR a commercial license** by BAUER GROUP. Using these integrations does **not** place your own site or application under the AGPL — you merely load an external script, exactly like any third-party CDN widget.

## Why this split?

The integrations are thin, permissive glue so that adopting the widget on any platform carries **no licensing risk** for the integrator. The widget's copyleft/commercial model stays where the substantive engineering value is — in the widget — and is enforced there, independently of how it is embedded.

## Contributing

Contributions are accepted **inbound = outbound**: by submitting a contribution you agree it is licensed under this repository's license for the affected file (MIT, or GPL-2.0-or-later for the Drupal module). See [`CLA.md`](./CLA.md) for the (lightweight) details and the Developer Certificate of Origin sign-off.

## No conformance guarantee

These integrations and the widget are technical aids. They do **not** establish legally binding conformance with the BFSG, EN 301 549 or WCAG 2.2 and are no substitute for a professional audit. Use at your own risk.

## README block (to paste into a README)

> ## License
>
> MIT — see [`LICENSE`](./LICENSE). The Accessibility Widget loaded at runtime is a separate work, licensed AGPL-3.0-only or commercially; see [`LICENSING.md`](./LICENSING.md).

---

<a id="-deutsch"></a>

## 🇩🇪 Deutsch

> So funktioniert die Lizenzierung in diesem Repository — die **Integrationen sind MIT**, das geladene Widget ist davon getrennt.

[🇬🇧 English](#english) · **🇩🇪 Deutsch**

## Kurzfassung

- **Die Integrationen in diesem Repository** (Framework-Wrapper, CMS-Plugins, Shop-Integrationen) stehen unter der **MIT-Lizenz** (siehe [`LICENSE`](./LICENSE)). Frei nutzbar in Open-Source- wie proprietären/geschlossenen Produkten — ohne Copyleft-Pflichten.
- **Ausnahme — das Drupal-Modul** (`packages/cms/drupal/...`) steht unter **GNU GPL-2.0-or-later**, weil Drupal.org für jedes gehostete Modul GPL-2.0+ verlangt. Das ist im Drupal-Ökosystem die universelle Norm und bedeutet keine Pflicht über das hinaus, was Drupal ohnehin fordert.
- **Das Accessibility Widget selbst ist NICHT Teil dieses Repositorys.** Es wird zur Laufzeit vom CDN geladen (oder optional als separates npm-Paket `@bauer-group/accessibility-widget` installiert). Dieses Widget ist **separat lizenziert** unter **GNU AGPL-3.0-only ODER einer kommerziellen Lizenz** der BAUER GROUP. Die Nutzung dieser Integrationen stellt deine eigene Website oder Anwendung **nicht** unter die AGPL — du lädst lediglich ein externes Script, wie bei jedem anderen Drittanbieter-CDN-Widget.

## Warum diese Trennung?

Die Integrationen sind dünner, permissiver Klebecode, damit die Einführung des Widgets auf jeder Plattform **kein Lizenzrisiko** für den Integrator trägt. Das Copyleft-/Kommerz-Modell des Widgets bleibt dort, wo der substanzielle Engineering-Wert liegt — im Widget — und wird dort durchgesetzt, unabhängig von der Art der Einbindung.

## Beiträge

Beiträge werden **inbound = outbound** angenommen: Mit dem Einreichen eines Beitrags stimmst du zu, dass er unter der Lizenz dieses Repositorys für die betroffene Datei steht (MIT bzw. GPL-2.0-or-later für das Drupal-Modul). Details (schlank gehalten) und der Developer-Certificate-of-Origin-Sign-off stehen in [`CLA.md`](./CLA.md).

## Keine Zusicherung der Rechtskonformität

Diese Integrationen und das Widget sind technische Hilfsmittel. Sie stellen **keine** rechtsverbindliche Konformität mit dem BFSG, der EN 301 549 oder den WCAG 2.2 her und ersetzen keine fachliche Prüfung. Nutzung auf eigenes Risiko.

---

_Last revised / Letzte Überarbeitung: 2026-06-21_

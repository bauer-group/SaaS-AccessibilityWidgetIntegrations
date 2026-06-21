import {
  REPO,
  CORE_REPO,
  CORE_DOCS,
  CORE_DEMO,
  CDN_SNIPPET,
  INTEGRATIONS,
  CATEGORIES,
  I18N,
} from './data.js';

const REPO_URL = `https://github.com/${REPO}`;
const CORE_REPO_URL = `https://github.com/${CORE_REPO}`;
const DISTRIBUTION_URL = `${REPO_URL}/blob/main/docs/distribution.md`;
const RELEASE_API = `https://api.github.com/repos/${REPO}/releases/latest`;
const RELEASES_PAGE = `${REPO_URL}/releases/latest`;

/* ── State ──────────────────────────────────────────────────────────────── */
let lang = localStorage.getItem('lang') || (navigator.language?.startsWith('de') ? 'de' : 'en');
let filter = 'all';
let query = '';

// Populated by the single Releases API call. `ok` gates the ZIP download links.
const release = { version: null, tagUrl: RELEASES_PAGE, assets: new Map(), ok: false };

const $ = (sel, root = document) => root.querySelector(sel);
const t = (key) => I18N[lang][key] ?? key;
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );

const fmtSize = (bytes) => {
  if (!bytes) return '';
  const kb = bytes / 1024;
  return kb < 1024 ? `${Math.round(kb)} KB` : `${(kb / 1024).toFixed(1)} MB`;
};

/* ── Static i18n (hero, how-it-works, footer, nav) ──────────────────────── */
function applyStaticI18n() {
  document.documentElement.lang = I18N[lang].htmlLang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  const search = $('#search');
  search.placeholder = t('search_placeholder');
  search.setAttribute('aria-label', t('search_label'));

  // Filter labels (the "All" button uses data-i18n; categories are dynamic)
  $('[data-filter="frameworks"]').textContent = CATEGORIES.frameworks[lang];
  $('[data-filter="cms"]').textContent = CATEGORIES.cms[lang];
  $('[data-filter="shop"]').textContent = CATEGORIES.shop[lang];

  // Static links — header (product-facing) + footer (source, for developers)
  $('#demo-link').href = CORE_DEMO;
  $('#hero-demo').href = CORE_DEMO;
  $('#docs-link').href = CORE_DOCS;
  $('#distribution-link').href = DISTRIBUTION_URL;
  $('#footer-core').href = CORE_REPO_URL;
  $('#footer-integrations').href = REPO_URL;

  $('#cdn-snippet').textContent = CDN_SNIPPET;

  // Language buttons pressed state
  document
    .querySelectorAll('[data-lang]')
    .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
}

/* ── Version badge ──────────────────────────────────────────────────────── */
function renderVersionBadge() {
  const badge = $('#version-badge');
  if (release.ok) {
    badge.href = release.tagUrl;
    badge.innerHTML = `<span>${t('hero_version_label')} · v${esc(release.version)}</span>`;
  } else {
    badge.href = RELEASES_PAGE;
    badge.innerHTML = `<span>${t('card_download_fallback')}</span>`;
  }
}

/* ── Catalog rendering ──────────────────────────────────────────────────── */
function matches(item) {
  if (filter !== 'all' && item.category !== filter) return false;
  if (!query) return true;
  const hay =
    `${item.name} ${item.id} ${item.req[lang]} ${item.desc[lang]} ${item.npm || ''}`.toLowerCase();
  return hay.includes(query);
}

function cardHTML(item) {
  const ver = release.version ? `v${esc(release.version)}` : '';
  const sourceUrl = `${REPO_URL}/tree/main/${item.source}`;
  const tile = `<span class="mono-tile" style="background:${item.color};color:${item.onColor}" aria-hidden="true">${esc(item.mono)}</span>`;
  const head = `
    <div class="card-head">
      ${tile}
      <span class="card-title"><strong>${esc(item.name)}</strong><span class="req">${esc(item.req[lang])}</span></span>
      ${ver ? `<span class="card-ver">${ver}</span>` : ''}
    </div>`;
  const desc = `<p class="card-desc">${esc(item.desc[lang])}</p>`;

  let body;
  if (item.delivery === 'npm') {
    const cmd = `npm i ${item.npm}`;
    body = `
      <div class="card-install">
        <pre><code>${esc(cmd)}</code></pre>
        <button type="button" class="copy-btn" data-copy-text="${esc(cmd)}"><span>${t('copy')}</span></button>
      </div>
      <div class="link-row">
        <a href="https://www.npmjs.com/package/${encodeURIComponent(item.npm)}" target="_blank" rel="noopener">npm ↗</a>
        <a href="${sourceUrl}" target="_blank" rel="noopener">${t('card_source')} ↗</a>
      </div>`;
  } else {
    const asset = release.assets.get(item.assetPrefix);
    let dl;
    if (release.ok && asset) {
      dl = `<a class="btn btn-primary" href="${esc(asset.url)}">⬇ ${t('card_download')}</a>
            <span class="dl-size">${fmtSize(asset.size)}</span>`;
    } else {
      dl = `<a class="btn btn-secondary" href="${RELEASES_PAGE}" target="_blank" rel="noopener">⬇ ${t('card_download_fallback')} ↗</a>`;
    }
    const markets = (item.markets || [])
      .map((m) => `<a href="${esc(m.url)}" target="_blank" rel="noopener">${esc(m.label)} ↗</a>`)
      .join('');
    body = `
      <div class="card-actions">${dl}</div>
      <div class="link-row">
        ${markets}
        <a href="${sourceUrl}" target="_blank" rel="noopener">${t('card_source')} ↗</a>
      </div>`;
  }

  return `<article class="card">${head}${desc}${body}</article>`;
}

function renderGrid() {
  const grid = $('#grid');
  const visible = INTEGRATIONS.filter(matches);

  $('#no-results').hidden = visible.length > 0;

  const n = visible.length;
  $('#result-count').textContent = `${n} ${n === 1 ? t('count_one') : t('count_many')}`;

  // Group by category, preserving the catalog order
  const order = ['frameworks', 'cms', 'shop'];
  let html = '';
  for (const cat of order) {
    const items = visible.filter((i) => i.category === cat);
    if (!items.length) continue;
    if (filter === 'all') {
      html += `<div class="cat-heading"><h2>${CATEGORIES[cat][lang]}</h2><span>${items.length}</span></div>`;
    }
    html += items.map(cardHTML).join('');
  }
  grid.innerHTML = html;
}

function renderAll() {
  applyStaticI18n();
  renderVersionBadge();
  renderGrid();
}

/* ── Live release data (one call powers every card) ─────────────────────── */
async function loadRelease() {
  try {
    const res = await fetch(RELEASE_API, { headers: { Accept: 'application/vnd.github+json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    release.version = (data.tag_name || '').replace(/^v/, '');
    release.tagUrl = data.html_url || RELEASES_PAGE;
    for (const a of data.assets || []) {
      // Match "wordpress-accessibility-widget-1.2.3.zip" → prefix "wordpress-accessibility-widget"
      const prefix = a.name.replace(/-\d.*\.zip$/, '');
      release.assets.set(prefix, { url: a.browser_download_url, size: a.size, name: a.name });
    }
    release.ok = Boolean(release.version);
  } catch (err) {
    release.ok = false;
    console.warn('[integrations] release fetch failed:', err);
    showToast(t('api_error'), 5000);
  }
  renderVersionBadge();
  renderGrid();
}

/* ── Interactions ───────────────────────────────────────────────────────── */
let toastTimer;
function showToast(msg, ms = 1800) {
  const el = $('#toast');
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (el.hidden = true), ms);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(t('copied'));
  } catch {
    // Fallback for non-secure contexts
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast(t('copied'));
    } catch {
      /* noop */
    }
    ta.remove();
  }
}

function wireEvents() {
  // Clipboard (event delegation — covers hero snippet + per-card commands)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;
    if (btn.dataset.copyText) return copyText(btn.dataset.copyText);
    if (btn.dataset.copyTarget) {
      const node = document.getElementById(btn.dataset.copyTarget);
      if (node) copyText(node.textContent);
    }
  });

  // Language
  document.querySelectorAll('[data-lang]').forEach((b) =>
    b.addEventListener('click', () => {
      lang = b.dataset.lang;
      localStorage.setItem('lang', lang);
      renderAll();
    }),
  );

  // Category filter
  document.querySelectorAll('[data-filter]').forEach((b) =>
    b.addEventListener('click', () => {
      filter = b.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach((x) => {
        const active = x === b;
        x.classList.toggle('is-active', active);
        x.setAttribute('aria-pressed', String(active));
      });
      renderGrid();
    }),
  );

  // Search (debounced)
  let searchTimer;
  $('#search').addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      query = e.target.value.trim().toLowerCase();
      renderGrid();
    }, 120);
  });

  // Theme
  $('#theme-toggle').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
  });
}

/* ── Init ───────────────────────────────────────────────────────────────── */
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
} else if (window.matchMedia?.('(prefers-color-scheme: light)').matches) {
  document.documentElement.dataset.theme = 'light';
}

renderAll();
wireEvents();
loadRelease();

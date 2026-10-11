// Asserts that `astro build --root test/fixture` rendered the wrapper's markup.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('./fixture/dist/index.html', import.meta.url), 'utf8');

assert.match(html, /<script[^>]+data-aw-loader="1"/, 'loader <script> is missing');
assert.match(html, /<link[^>]+data-aw-css="1"/, 'stylesheet <link> is missing');
assert.match(html, /window\.AccessibilityWidgetConfig/, 'inline config script is missing');
assert.match(html, /bottom-left/, 'config prop was not serialized');

process.stdout.write('astro fixture build: wrapper markup OK\n');

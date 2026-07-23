import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const en = () => read('dist/index.html');
const es = () => read('dist/es/index.html');

const sectionIds = (html) => [...html.matchAll(/data-section="([^"]+)"/g)].map((match) => match[1]);
const linkHref = (html, attributes) => {
  const tag = html.match(new RegExp(`<link(?=[^>]*${attributes})[^>]*>`, 'i'))?.[0];
  return tag?.match(/href="([^"]+)"/)?.[1];
};

test('English and Spanish routes expose the same product sections', () => {
  assert.deepEqual(sectionIds(en()), sectionIds(es()));
  assert.deepEqual(sectionIds(en()), [
    'hero',
    'examples',
    'foundation',
    'how-it-works',
    'providers',
    'trust',
    'download',
    'contact',
    'final-cta',
  ]);
  assert.match(en(), /lang="en"/);
  assert.match(es(), /lang="es"/);
});

test('each locale has canonical and complete hreflang metadata', () => {
  const expectations = [
    [en(), 'https://teams.forger.cloud/'],
    [es(), 'https://teams.forger.cloud/es/'],
  ];

  for (const [html, canonical] of expectations) {
    assert.equal(linkHref(html, 'rel="canonical"'), canonical);
    assert.equal(linkHref(html, 'hreflang="en"'), 'https://teams.forger.cloud/');
    assert.equal(linkHref(html, 'hreflang="es"'), 'https://teams.forger.cloud/es/');
    assert.equal(linkHref(html, 'hreflang="x-default"'), 'https://teams.forger.cloud/');
  }
});

test('structured data is valid JSON-LD for WebSite and Organization', () => {
  for (const html of [en(), es()]) {
    const payload = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)?.[1];
    assert.ok(payload, 'JSON-LD payload is present');
    const graph = JSON.parse(payload);
    assert.equal(graph['@context'], 'https://schema.org');
    assert.deepEqual(graph['@graph'].map((entry) => entry['@type']), ['WebSite', 'Organization']);
    assert.equal(graph['@graph'][0].url, 'https://teams.forger.cloud/');
  }
});

test('crawler, sitemap, icon, and social image assets are published', () => {
  assert.match(read('dist/robots.txt'), /Sitemap: https:\/\/teams\.forger\.cloud\/sitemap\.xml/);
  const sitemap = read('dist/sitemap.xml');
  assert.match(sitemap, /https:\/\/teams\.forger\.cloud\//);
  assert.match(sitemap, /https:\/\/teams\.forger\.cloud\/es\//);
  assert.ok(existsSync(new URL('dist/og.jpg', root)));
  assert.ok(existsSync(new URL('dist/favicon.svg', root)));
  assert.match(en(), /property="og:image" content="https:\/\/teams\.forger\.cloud\/og\.jpg"/);
  assert.match(en(), /property="og:image:width" content="1200"/);
  assert.match(en(), /property="og:image:height" content="630"/);
});

test('sales form uses the same-origin proxy and locale contract', () => {
  for (const html of [en(), es()]) {
    assert.match(html, /name="name"/);
    assert.match(html, /name="email"/);
    assert.match(html, /name="phone"[^>]*required/);
    assert.match(html, /name="company"[^>]*required/);
    assert.match(html, /name="message"[^>]*required/);
    assert.match(html, /name="website"/);
    assert.match(html, /data-contact-status[^>]*role="status"[^>]*aria-live="polite"/);
  }
  assert.match(en(), /data-locale="en"/);
  assert.match(es(), /data-locale="es"/);
  assert.match(read('src/lib/contact-request.mjs'), /\/api\/team-demo-requests/);
  assert.match(read('src/lib/team-demo-proxy.mjs'), /https:\/\/platform\.forger\.cloud\/api\/team_demo_requests/);
});

test('release metadata models every download state and explicit remote URLs', () => {
  const config = read('src/config/releases.ts');
  for (const state of ['available', 'gated', 'unavailable', 'unsupported']) {
    assert.match(config, new RegExp(`'${state}'`));
  }
  assert.match(config, /type ReleaseState/);
  assert.match(config, /state:\s*'available';\s*downloadUrl:\s*string/);
  assert.doesNotMatch(config, /actionUrl:\s*['"]\//);
  assert.match(config, /const accessUrl = 'https:\/\//);
  for (const html of [en(), es()]) {
    assert.match(html, /data-download-picker/);
    assert.match(html, /data-platform-option="macos-arm64"/);
    assert.match(html, /data-platform-option="macos-x64"/);
    assert.match(html, /data-platform-option="windows-x64"/);
    assert.match(html, /data-platform-option="linux"/);
  }
});

test('provider boundaries are explicit in both languages', () => {
  assert.match(en(), /selected provider/i);
  assert.match(en(), /plan requirements/i);
  assert.match(en(), /limits still depend/i);
  assert.match(en(), /task content may be sent to the provider you select/i);
  assert.match(es(), /plan.{0,180}límites/is);
  assert.match(es(), /contenido de una tarea puede enviarse al proveedor que elijas/i);
});

test('motion stays short and reduced-motion has a complete override', () => {
  const css = read('src/styles/global.css');
  assert.match(css, /--motion-fast:\s*160ms/);
  assert.match(css, /--motion-slow:\s*240ms/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /animation-duration:\s*0\.01ms\s*!important/);
  assert.match(css, /transition-duration:\s*0\.01ms\s*!important/);
});

test('the new domain has no legacy Teams canonicals', () => {
  const output = `${en()}\n${es()}\n${read('dist/sitemap.xml')}`;
  assert.doesNotMatch(output, /forger\.cloud\/(?:es\/)?teams\/?/i);
  assert.doesNotMatch(output, /teams\.forger\.cloud\/teams\/?/i);
});

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
    'approach',
    'providers',
    'trust',
    'contact',
    'download',
  ]);
  assert.match(en(), /lang="en"/);
  assert.match(es(), /lang="es"/);
});

test('given the Teams site, when the brand is rendered, then it uses the canonical local Forger mark', () => {
  assert.ok(existsSync(new URL('dist/forger-logo.svg', root)));

  for (const html of [en(), es()]) {
    assert.match(html, /<img[^>]+src="\/forger-logo\.svg"[^>]+alt=""/i);
    assert.match(html, /data-brand="forger-teams"/);
    assert.doesNotMatch(html, /class="brand-mark"/);
  }
});

test('given an enterprise evaluator, when they scan either locale, then the product story is concrete and conversion focused', () => {
  const expectations = [
    [en(), [/automate internal operations/i, /centralize/i, /create (?:their own )?agents and workflows/i, /month.{0,12}trial/i, /ChatGPT/i, /Claude/i, /Gemini/i]],
    [es(), [/automatiza la operación interna/i, /centraliza/i, /crear sus propios agentes y flujos/i, /mes de prueba/i, /ChatGPT/i, /Claude/i, /Gemini/i]],
  ];

  for (const [html, patterns] of expectations) {
    for (const pattern of patterns) assert.match(html, pattern);
    assert.doesNotMatch(html, /data-operation-map|data-workflow-stage|mini-interface|review-panel/);
  }
});

test('given a concise product story, when it is rendered, then it does not invent product screens and motion remains safe', () => {
  const css = read('src/styles/global.css');
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});

test('given real operational pain, when use cases render, then both locales explain the before and the operational change', () => {
  for (const html of [en(), es()]) {
    assert.match(html, /data-use-case="monthly-close"/);
    assert.match(html, /data-use-case="onboarding-access"/);
    assert.match(html, /data-use-case="internal-requests"/);
  }
  assert.match(en(), /spreadsheets, email, and chat/i);
  assert.match(en(), /access requests/i);
  assert.match(en(), /procurement, finance, and IT/i);
  assert.match(es(), /planillas, correos y chat/i);
  assert.match(es(), /solicitudes de acceso/i);
  assert.match(es(), /compras, finanzas y TI/i);
});

test('given the onboarding offer, when the evaluator reaches the approach and form, then the free first step and trial are explicit', () => {
  assert.match(en(), /free discovery session/i);
  assert.match(en(), /first workflow blueprint/i);
  assert.match(en(), /one-month trial/i);
  assert.match(es(), /reunión de diagnóstico.{0,40}sin costo/is);
  assert.match(es(), /primera bajada del flujo.{0,40}sin costo/is);
  assert.match(es(), /un mes de prueba/i);
});

test('given supported providers and platforms, when their choices render, then recognizable local logos are used', () => {
  for (const file of ['chatgpt.svg', 'claude.svg', 'gemini.svg']) {
    assert.ok(existsSync(new URL(`dist/provider-logos/${file}`, root)));
  }
  for (const file of ['apple.svg', 'windows.svg', 'linux.svg']) {
    assert.ok(existsSync(new URL(`dist/platform-logos/${file}`, root)));
  }
  for (const html of [en(), es()]) {
    assert.match(html, /src="\/provider-logos\/chatgpt\.svg"/);
    assert.match(html, /src="\/provider-logos\/claude\.svg"/);
    assert.match(html, /src="\/provider-logos\/gemini\.svg"/);
    assert.match(html, /src="\/platform-logos\/apple\.svg"/);
    assert.match(html, /src="\/platform-logos\/windows\.svg"/);
    assert.match(html, /src="\/platform-logos\/linux\.svg"/);
  }
});

test('given a verified public release, when calls to action render, then downloads and enterprise rollout remain distinct', () => {
  assert.match(en(), /href="#contact">Tell us your AI use case/);
  assert.match(es(), /href="#contact">Cuéntanos tu caso de uso para la IA/);
  assert.ok(en().indexOf('data-section="contact"') < en().indexOf('data-section="download"'));
  assert.ok(es().indexOf('data-section="contact"') < es().indexOf('data-section="download"'));
  assert.doesNotMatch(en(), /secure shared company foundation/i);
  assert.doesNotMatch(es(), /base segura y compartida/i);
});

test('given the trust boundaries, when they render, then they are localized and concise', () => {
  assert.doesNotMatch(`${en()}${es()}`, />CONNECTED</);
  assert.doesNotMatch(`${en()}${es()}`, /<button[^>]*>[^<]*(?:Approve|Aprobar|Request changes|Solicitar cambios)/i);
  assert.match(en(), />Local</);
  assert.match(es(), />Local</);
  assert.match(es(), />Equipo</);
  assert.match(es(), />IA</);
  assert.match(es(), /aria-label="Inicio de Forger Teams"/);
  assert.match(es(), /property="og:image:alt" content="Forger Teams para operaciones internas"/);
});

test('given a Spanish evaluator, when release options render, then every visible release detail is localized', () => {
  const html = es();
  assert.match(html, /data-state="available"/);
  assert.match(html, /data-version="0\.5\.12"/);
  assert.match(html, /macOS 13 o posterior · Apple silicon/);
  assert.match(html, /macOS 13 o posterior · Mac con procesador Intel/);
  assert.match(html, /Windows 10 o posterior · 64 bits/);
  assert.match(html, /Linux compatible con Debian · 64 bits/);
  assert.match(html, /Incorporación/);
  assert.doesNotMatch(html, /Acceso coordinado|Sin versión disponible|Sin versión compatible|Coordinated access|No current build|No supported build/i);
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
  assert.match(en(), /Tell us your AI use case/);
  assert.match(es(), /Cuéntanos tu caso de uso para la IA/);
  assert.match(en(), /What would you like to automate or centralize\?/);
  assert.match(es(), /¿Qué te gustaría automatizar o centralizar\?/);
  assert.match(read('src/lib/contact-request.mjs'), /\/api\/team-demo-requests/);
  assert.match(read('src/lib/team-demo-proxy.mjs'), /https:\/\/platform\.forger\.cloud\/api\/team_demo_requests/);
});

test('release metadata models every state and exposes four verified public downloads', () => {
  const config = read('src/config/releases.ts');
  for (const state of ['available', 'gated', 'unavailable', 'unsupported']) {
    assert.match(config, new RegExp(`'${state}'`));
  }
  assert.match(config, /type ReleaseState/);
  assert.match(config, /state:\s*'available';\s*downloadUrl:\s*string/);
  assert.doesNotMatch(config, /actionUrl:\s*['"]\//);
  assert.match(config, /const releaseBaseUrl = 'https:\/\/github\.com\/forger-ai\/forger-teams-releases\/releases\/download\/v0\.5\.12'/);
  assert.match(config, /const releaseNotesUrl = 'https:\/\/github\.com\/forger-ai\/forger-teams-releases\/releases\/tag\/v0\.5\.12'/);
  assert.equal((config.match(/id:\s*'[^']+', state:\s*'available'/g) ?? []).length, 4);
  assert.doesNotMatch(config, /const accessUrl/);
  for (const html of [en(), es()]) {
    assert.match(html, /data-download-picker/);
    assert.match(html, /data-platform-option="macos-arm64"/);
    assert.match(html, /data-platform-option="macos-x64"/);
    assert.match(html, /data-platform-option="windows-x64"/);
    assert.match(html, /data-platform-option="linux"/);
    assert.match(html, /forger-teams-releases\/releases\/download\/v0\.5\.12\/forger-desktop-teams-macos-arm64\.dmg/);
    assert.match(html, /forger-teams-releases\/releases\/download\/v0\.5\.12\/forger-desktop-teams-macos-x64\.dmg/);
    assert.match(html, /forger-teams-releases\/releases\/download\/v0\.5\.12\/forger-desktop-teams-windows-x64\.exe/);
    assert.match(html, /forger-teams-releases\/releases\/download\/v0\.5\.12\/forger-desktop-teams-linux-x64\.deb/);
  }
});

test('provider boundaries are explicit in both languages', () => {
  assert.match(en(), /selected provider/i);
  assert.match(en(), /plan requirements/i);
  assert.match(en(), /limits still depend/i);
  assert.match(en(), /task content may be sent to the selected provider/i);
  assert.match(es(), /plan.{0,180}límites/is);
  assert.match(es(), /contenido de una tarea puede enviarse al proveedor elegido/i);
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

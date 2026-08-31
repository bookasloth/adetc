// SEO invariant checks. Run AFTER `npm run build`:  node scripts/seo-check.mjs
// No test framework — plain asserts against built output in .next/server/app.
// Fails (exit 1) if any SEO invariant regresses.
import assert from 'node:assert';
import { readFileSync, existsSync } from 'node:fs';
import { INDEXABLE_ROUTES } from '../lib/seo.js';

const APP = '.next/server/app';
const read = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : '');
let checks = 0;
const ok = (cond, msg) => { assert.ok(cond, msg); checks++; };

// --- sitemap: lists every indexable route, excludes the paginated dupe ---
const sitemap = read(`${APP}/sitemap.xml.body`);
ok(sitemap.includes('<urlset'), 'sitemap.xml not generated');
for (const { path } of INDEXABLE_ROUTES) {
  const loc = path === '/' ? '</loc>' : `${path}</loc>`;
  ok(sitemap.includes(loc), `sitemap missing indexable route: ${path}`);
}
ok(!sitemap.includes('/blog/page/2'), 'sitemap must NOT list paginated dupe /blog/page/2');

// --- robots: points at sitemap, allows AI crawlers on purpose ---
const robots = read(`${APP}/robots.txt.body`);
ok(/Sitemap:\s*https?:\/\/\S+\/sitemap\.xml/.test(robots), 'robots.txt missing Sitemap line');
for (const bot of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'CCBot', 'Google-Extended']) {
  ok(robots.includes(bot), `robots.txt missing explicit AI crawler rule: ${bot}`);
}

// --- every indexable page ships a self-referencing canonical + OG title ---
import { absoluteUrl } from '../lib/seo.js';
const htmlFor = (path) => {
  const name = path === '/' ? 'index' : path.replace(/^\//, '');
  return read(`${APP}/${name}.html`);
};
for (const { path } of INDEXABLE_ROUTES) {
  const html = htmlFor(path);
  ok(html.length > 0, `built HTML missing for ${path}`);
  const canonical = absoluteUrl(path);
  ok(
    html.includes(`rel="canonical" href="${canonical}"`),
    `missing/incorrect canonical on ${path} (expected ${canonical})`
  );
  ok(html.includes('property="og:title"'), `missing og:title on ${path}`);
  ok(html.includes('name="twitter:card"'), `missing twitter:card on ${path}`);
  // exactly one <h1> per page (ignore SVG <title>, count heading tags only)
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  ok(h1s === 1, `expected exactly one <h1> on ${path}, found ${h1s}`);
}

// --- site-wide JSON-LD present + XSS-safe on every page ---
for (const { path } of INDEXABLE_ROUTES) {
  const html = htmlFor(path);
  ok(
    html.includes('application/ld+json') &&
      html.includes('"@type":"Organization"') &&
      html.includes('"@type":"WebSite"') &&
      html.includes('"@type":"LocalBusiness"'),
    `missing Organization/WebSite/LocalBusiness JSON-LD on ${path}`
  );
  // no raw </script> may appear inside a ld+json block (breakout guard)
  const blocks = html.match(/application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g) || [];
  for (const b of blocks) {
    const body = b.replace(/^.*?>/, '').replace(/<\/script>$/, '');
    ok(!/<\/script/i.test(body), `unescaped </script> inside JSON-LD on ${path}`);
  }
}

// --- contact FAQPage: schema present + every Q&A also visible on the page ---
import { CONTACT_FAQ } from '../lib/faq.js';
const contact = htmlFor('/contact');
ok(contact.includes('"@type":"FAQPage"'), 'contact missing FAQPage JSON-LD');
const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#x27;');
for (const { q, a } of CONTACT_FAQ) {
  ok(contact.includes(esc(q)), `FAQ question not visible on /contact: ${q}`);
  ok(contact.includes(esc(a).slice(0, 40)), `FAQ answer not visible on /contact: ${q}`);
}

console.log(`SEO checks passed: ${checks}`);
